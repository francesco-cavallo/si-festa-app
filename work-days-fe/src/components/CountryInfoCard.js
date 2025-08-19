import React, { useState } from "react";
import { FaFlag } from "react-icons/fa";
import HolidayCard from "./HolidayCard";
import { Badge } from "react-bootstrap";

const CountryInfoCard = ({ baseURL }) => {
  const [infoNazione, setInfoNazione] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const fetchCountryInfo = () => {
    setLoading(true);
    fetch(`${baseURL}/countryInfo`)
      .then(res => res.json()
      )
      .then(json => {
        const elem = json;
        const confini = elem.borders.map(b => ({
          continente: b.region,
          nomeUff: b.officialName,
          codice: b.countryCode,
          nome: b.commonName
        }));
        setInfoNazione({
          continente: elem.region,
          nomeUff: elem.officialName,
          codice: elem.countryCode,
          nome: elem.commonName,
          confini
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <HolidayCard
      title="Info sul Paese"
      icon={<FaFlag className="me-2 text-primary" />}
      buttonText="Ottieni Info"
      buttonVariant="primary"
      onClick={fetchCountryInfo}
      loading={loading}
    >
      {infoNazione && (
        <div className="mt-2 fade-in">
          <p><strong>Continente:</strong> {infoNazione.continente}</p>
          <p><strong>Nome ufficiale:</strong> {infoNazione.nomeUff}</p>
          <p><strong>Nome comune:</strong> {infoNazione.nome}</p>
          <p>
            <strong>Confini:</strong>{" "}
            {infoNazione.confini.map(c => (
              <Badge key={c.codice} bg="secondary" className="me-1">{c.nome}</Badge>
            ))}
          </p>
        </div>
      )}
    </HolidayCard>
  );
};

export default CountryInfoCard;
