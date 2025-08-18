import React, { useState } from "react";
import { FaCalendarDay } from "react-icons/fa";
import HolidayCard from "./HolidayCard";

const TodayHolidayCard = ({ baseURL }) => {
  const [isFesta, setIsFesta] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const checkTodayHoliday = () => {
    setLoading(true);
    fetch(`${baseURL}/isTodayPublicHoliday`)
      .then(res => res.json())
      .then(json => setIsFesta(json))
      .finally(() => setLoading(false));
  };

  return (
    <HolidayCard
      title="È festa oggi?"
      icon={<FaCalendarDay className="me-2 text-danger" />}
      buttonText="Controlla"
      buttonVariant="danger"
      onClick={checkTodayHoliday}
    >
      {isFesta && (
        <div className="mt-2 fs-5 fw-bold">
          {isFesta.isFesta !== "No"
            ? <span className="text-success">🎉 Oggi è festivo!</span>
            : <span className="text-muted">Oggi non è una festa.</span>}
        </div>
      )}
    </HolidayCard>
  );
};

export default TodayHolidayCard;
