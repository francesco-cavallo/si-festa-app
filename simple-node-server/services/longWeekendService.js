const {
  addDays,
  subDays,
  eachDayOfInterval,
  format,
  getDay,
  isWeekend,
  isBefore,
  isAfter,
  parseISO,
} = require("date-fns");

const DEFAULT_MAX_WINDOW_DAYS = 30;

// Filtro festività utilizzabili
function filterHolidays(holidays, {
    includeLocal = false,
    county = null
} = {}) {
    return holidays.filter(h => {
        if (!h.types?.includes("Public")) {
            return false;
        }
        if (h.global) {
            return true;
        }
        if (includeLocal && county && h.counties?.includes(county)) {
            return true;
        }
        return false
    });
}

// Crea calendario annuale
function buildCalendar(year, holidays) {
    const holidayMap = new Map(
        holidays.map(h => [
            h.date,
            h
        ])
    );
    const start = `${year}-01-01`;
    const end = `${year}-12-31`;

    return eachDayOfInterval({
        start: parseISO(start),
        end: parseISO(end)
    })
    .map(date => {
        const dateString = format(date, "yyyy-MM-dd");
        const holiday = holidayMap.get(dateString);
        const weekend = isWeekend(date);
        return {
            date: dateString,
            weekend,
            holiday: !!holiday,
            holidayData: holiday ?? null,
            // SAB E DOM ORA NON LAVORATIVI
            workingDay: !weekend && !holiday
        };
    });
}

// Estrae i giorni ponti in una window
function getBridgeDays(window) {
    return window
        .filter(day => day.workingDay)
        .map(day => day.date);
}

// Verify valid window
function isValidWindow(window, maxBridgeDays) {
    const hasWeekend = window.some(d => d.weekend);
    const hasHoliday = window.some(d => d.holiday);
    const saturday = window.some(d =>
        getDay(parseISO(d.date)) === 6
    );
    const sunday = window.some(d =>
        getDay(parseISO(d.date)) === 0
    );
    const bridgeDays = getBridgeDays(window);
    if (!hasWeekend || !hasHoliday) {
        return false;
    }
    if (!saturday || !sunday) {
        return false;
    }
    return bridgeDays.length <= maxBridgeDays;
}

// crea obj result
function createResult(window) {
    const bridgeDays = getBridgeDays(window);
    const holidays = window
        .filter(d => d.holiday)
        .map(d => ({
            date: d.date,
            name: d.holidayData.localName
        }));
    return {
        startDate: window[0].date,
        endDate: window[window.length -1].date,
        dayCount: window.length,
        bridgeDays,
        needBridgeDay: bridgeDays.length > 0,
        holidays
    };
}

// expandAroundHoliday
function expandAroundHoliday(
    calendar,
    holidayIndex,
    maxBridgeDays
) {
    const results = [];
    const maxExpand = 14;
    for (let left = 0; left <= maxExpand; left++) {
        for (let right = 0; right <= maxExpand; right++) {
            const start = holidayIndex - left;
            const end = holidayIndex + right;
            if (
                start < 0 ||
                end >= calendar.length
            ) {
                continue;
            }
            const window = calendar.slice(
                start,
                end + 1
            );
            const bridgeDays = getBridgeDays(window);
            if (bridgeDays.length > maxBridgeDays) {
                continue;
            }
            /*
             * Evita di aggiungere giorni lavorativi
             * dopo l'ultima festività presente.
             *
             * Esempio:
             * 02/06 festa
             * 03/06 ferie
             *
             * viene scartato.
             */
            const lastHolidayIndex =
                window
                    .map(d => d.holiday)
                    .lastIndexOf(true);
            if (lastHolidayIndex !== -1) {
                const afterHoliday =
                    window.slice(lastHolidayIndex + 1);
                const uselessDays =
                    afterHoliday.filter(
                        d => d.workingDay
                    );
                if (uselessDays.length > 0) {
                    continue;
                }
            }
            const hasWeekend =
                window.some(d => d.weekend);
            if (!hasWeekend) {
                continue;
            }
            const firstDay = window[0];
            const lastDay = window[window.length - 1];
            if (
                firstDay.workingDay &&
                !firstDay.holiday
            ) {
                continue;
            }
            results.push(
                createResult(window)
            );
        }
    }
    return results;
}

//  Trova tutte le finestre
function findCandidates(
    calendar,
    maxBridgeDays
) {
    const results = [];
    calendar.forEach(
        (day, index) => {
            if (!day.holiday) {
                return;
            }
            const expanded =
                expandAroundHoliday(
                    calendar,
                    index,
                    maxBridgeDays
                );
            results.push(
                ...expanded
            );
        }
    );
    return results;
}

// ranking
function isBetterResult(a, b) {
    // meno ferie utilizzate prima
    if (a.bridgeDays.length !== b.bridgeDays.length) {
        return a.bridgeDays.length < b.bridgeDays.length;
    }
    // poi più giorni a casa
    if (a.dayCount !== b.dayCount) {
        return a.dayCount > b.dayCount;
    }
    return a.startDate > b.startDate;
}

// merge risultati sovrapposti
function mergeResults(results) {
    if (!results.length) {
        return [];
    }
    results.sort((a, b) => a.startDate.localeCompare(b.startDate));
    const merged = [];
    for (const current of results) {
        const last = merged[merged.length - 1];
        if (
            !last || isAfter(
                parseISO(current.startDate),
                addDays(
                    parseISO(last.endDate),
                    1
                )
            )
        ) {
            merged.push(current);
            continue;
        }
        // tengo best result
        if (isBetterResult(current, last)) {
            merged[merged.length - 1] = current;
        }
    }
    return merged;
}

// selecteBestByHoliday
function selectBestByHoliday(results, maxBridgeDays) {
    const groups = new Map();
    for (const result of results) {
        const key = result.holidays
            .map(h => h.date)
            .sort()
            .join(",");
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(result);
    }
    const selected = [];
    for (const candidates of groups.values()) {
        let chosen = null;
        const minBridge =
            maxBridgeDays === 0
                ? 0
                : 0;
        for (
            let bridge = maxBridgeDays;
            bridge >= minBridge;
            bridge--
        ) {
            const valid = candidates.filter(
                c => c.bridgeDays.length === bridge
            );
            if (valid.length) {
                chosen = valid.sort(
                    (a, b) => b.dayCount - a.dayCount
                )[0];

                break;
            }
        }
        if (chosen) {
            selected.push(chosen);
        }
    }
    return selected;
}

// ENTRY POINT
function findLongWeekends({
    year,
    maxBridgeDays,
    holidays,
    maxWindowDays = DEFAULT_MAX_WINDOW_DAYS,
    includeLocalHolidays = false,
    county = null
}) {
    const filtered = filterHolidays(
        holidays,
        { includeLocal: includeLocalHolidays, county}
    );
    const calendar = buildCalendar(year, filtered);
    const candidates = findCandidates(
        calendar,
        maxBridgeDays
    );
    return selectBestByHoliday(
    candidates,
    maxBridgeDays
    )
    .sort((a,b)=>
        a.startDate.localeCompare(b.startDate)
    );
}

module.exports = {
    findLongWeekends
};