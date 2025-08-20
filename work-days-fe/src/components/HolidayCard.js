import React, { useState, useRef } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import "./HolidayCard.css";

const HolidayCard = ({
  title,
  icon,
  buttonText,
  onClick,
  loading,
  children,
  btnClass,
  iconColor,
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasContent = !!children;

  // ref specifico per il nodo animato
  const contentRef = useRef(null);

  const handleToggle = () => {
    if (expanded) {
      setExpanded(false);
    } else {
      onClick?.();
      setExpanded(true);
    }
  };

  return (
    <Card className="rounded-4 holiday-card">
      <Card.Body>
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between">
          {/* Titolo + icona */}
          <Card.Title className="d-flex align-items-center m-0 mb-2 mb-md-0 flex-grow-1">
            {React.cloneElement(icon, {
              style: { color: iconColor, marginRight: "0.5rem" },
            })}
            {title}
          </Card.Title>

          {/* Bottone singolo */}
          <Button
            onClick={handleToggle}
            disabled={loading}
            className={`holiday-btn ${btnClass} mt-2 mt-md-0`}
          >
            {loading ? (
              <Spinner size="sm" animation="border" />
            ) : expanded ? (
              "Chiudi"
            ) : (
              buttonText
            )}
          </Button>
        </div>

        {/* Contenuto espandibile */}
        <CSSTransition
          in={expanded && hasContent}
          timeout={300}
          classNames="fade-slide"
          unmountOnExit
          nodeRef={contentRef}   // 👈 obbligatorio per StrictMode
        >
          <div ref={contentRef} className="mt-3 fs-5 fade-slide-content">
            {children}
          </div>
        </CSSTransition>
      </Card.Body>
    </Card>
  );
};

export default HolidayCard;
