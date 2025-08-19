import React from "react";
import HolidayCard from "./HolidayCard";
import { useNavigate } from "react-router-dom";
import { FaPlane } from "react-icons/fa";

const LongWeekendsCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/longWeekends");
  };

  return (
    <HolidayCard
      title="Weekend lunghi"
    //   icon={<FaPlane className="bi bi-calendar-week text-success me-2 icon-longweekend"/>}
      icon={<FaPlane/>}
      iconColor="#6f42c1"
      buttonText="Scopri"
      onClick={handleClick}
      loading={false} // non serve lo spinner perché non ci sono fetch
      btnClass="btn-longweekend"
      iconClass={"icon-longweekend"}
    >
      <p className="mt-2">Scopri tutti i weekend lunghi e pianifica le tue ferie!</p>
    </HolidayCard>
  );
};

export default LongWeekendsCard;
