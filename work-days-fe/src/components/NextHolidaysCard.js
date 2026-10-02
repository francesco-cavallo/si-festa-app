import React, { useState, useEffect } from "react";
import { FaUmbrellaBeach } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HolidayCard from "./ExpandableHolidayCard";
import moment from "moment";
import "moment/locale/it";

const NextHolidaysCard = ({ baseURL, giorni }) => {
  const [nextHoliday, setNextHoliday] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    fetchNextHoliday();
  }, []);

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

  const handleClick = () => {
    navigate("/publicHolidays");
  };

  return (
    <HolidayCard
      title="Prossime festività"
      // bodyText={'Guarda cosa arriva nei prossimi mesi'}
      icon={<FaUmbrellaBeach/>}
      iconColor={"#fd7e14"}
      buttonText="Vedi calendario →"
      onClick={handleClick}
      loading={loading}
      btnClass="btn-next"
      iconClass={"icon-longweekend"}
    >
    </HolidayCard>
  );
};

export default NextHolidaysCard;
