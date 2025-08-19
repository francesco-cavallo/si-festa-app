import React, { useState } from "react";
import { FaUmbrellaBeach } from "react-icons/fa";
import HolidayCard from "./HolidayCard";
import moment from "moment";
import "moment/locale/it";

const NextHolidayCard = ({ baseURL, giorni }) => {
  const [nextHoliday, setNextHoliday] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const fetchNextHoliday = () => {
    setLoading(true);
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
      .finally(() => setLoading(false));
  };

  return (
    <HolidayCard
      title="La prossima festa"
      icon={<FaUmbrellaBeach className="me-2 text-success" />}
      buttonText="Scopri"
      buttonVariant="success"
      onClick={fetchNextHoliday}
      loading={loading}
    >
      {nextHoliday && (
        <div className="fs-5">
          🎉 <strong>{nextHoliday.localName}</strong><br />
          <span className="text-muted">{nextHoliday.dataF} ({nextHoliday.giorno})</span>
        </div>
      )}
    </HolidayCard>
  );
};

export default NextHolidayCard;
