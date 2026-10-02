import React, { useState, useEffect } from "react";
import { FaCalendarDay } from "react-icons/fa";
import { Card } from "react-bootstrap";
import moment from "moment";
import "moment/locale/it";

const TodayHolidayCard = ({ baseURL, giorni }) => {
  const [isFesta, setIsFesta] = useState('');
  const [nextHoliday, setNextHoliday] = useState(undefined);
  const today = moment().format("D MMMM YYYY");

  useEffect(() => {
      checkTodayHoliday();
      fetchNextHoliday();
    }, []);

  const checkTodayHoliday = () => {
    fetch(`${baseURL}/isTodayPublicHoliday`)
      .then(res => res.json())
      .then(json => setIsFesta(json))
      .finally();
  };

  const fetchNextHoliday = () => {
    fetch(`${baseURL}/nextPublicHoliday`)
      .then(res => res.json())
      .then(json => {
        moment.locale("it");
        const holiday = {
          ...json,
          dataF: moment(json.date).format("L"),
          giorno: giorni.find(el => new Date(json.date).getDay() === el.value).name,
        };
        setNextHoliday(holiday);
      })
      .finally();
  };

  return (
    <Card className="rounded-4 holiday-card">
      <Card.Body>
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
          {/* Titolo + icona */}
          <Card.Title className="d-flex align-items-center m-0 mb-2 mb-md-0 flex-grow-1 justify-content-center">
            <FaCalendarDay style={{ color: "#198754" }}></FaCalendarDay>
            {`Oggi - ${today}`}
          </Card.Title>
        </div>
        {/* Contenuto espanso */}
        {isFesta && nextHoliday && (
            <div className="mt-2 fs-5 fw-bold">
              {isFesta.isFesta !== "No"
                ? <span className="text-success">🎉 Oggi è festivo!</span>
                : <span className="text-muted">{`Oggi non è festa. La prossima festa sarà ${nextHoliday.dataF} ${nextHoliday.giorno}`}</span>}
            </div>)}
      </Card.Body>
    </Card>
  );
};

export default TodayHolidayCard;
