import React, { useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import "./HolidayCard.css";

const HolidayCard = ({
  title,
  icon,
  buttonText,
  buttonVariant,
  onClick,
  loading,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasContent = !!children;

  const handleToggle = () => {
    if (expanded) {
      setExpanded(false); // chiudi
    } else {
      onClick?.();        // chiama API
      setExpanded(true);  // apri
    }
  };

  return (
    <Card className="shadow rounded-4 holiday-card">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between mb-2">
          {/* Titolo + icona */}
          <Card.Title className="d-flex align-items-center m-0">
            {icon} {title}
          </Card.Title>

          {/* Bottone singolo che cambia */}
          <Button variant={expanded ? "outline-secondary" : buttonVariant}
                  onClick={handleToggle}
                  disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : expanded ? "Chiudi" : buttonText}
          </Button>
        </div>

        {/* Contenuto espandibile */}
        <CSSTransition
          in={expanded && hasContent}
          timeout={300}
          classNames="fade-slide"
          unmountOnExit
        >
          <div className="mt-3 fs-5 fade-slide-content">{children}</div>
        </CSSTransition>
      </Card.Body>
    </Card>
  );
};

export default HolidayCard;
