import styles from "./FlightCard.module.css";
import { formatDate } from "../helpers/date";
import type { Flight } from "../mocks/flights";
import { useState } from "react";

export type FlightCardProps = {
  flight: Flight;
};

export default function FlightCard({ flight }: FlightCardProps) {
  const { number, origin, destination, departure, status } = flight;

  const [baggage, setBaggage] = useState<string>("");

  console.log(baggage);

  const handleUpdateBaggage = () => {
    alert("Declaração de bagagem: " + baggage);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.flightNumber}>{number}</span>
        <span className={styles.status}>{status}</span>
      </div>

      <div className={styles.route}>
        <div className={styles.airport}>
          <span className={styles.code}>{origin}</span>
        </div>
        <span className={styles.plane}>✈</span>
        <div className={styles.airport}>
          <span className={styles.code}>{destination}</span>
        </div>
      </div>

      <div className={styles.baggageSection}>
        <input
          type="text"
          placeholder="Descrição da bagagem (ex: Mala de 23kg)"
          className={styles.baggageInput}
          value={baggage}
          onChange={(e) => setBaggage(e.target.value)}
        />
        <button
          type="button"
          className={styles.baggageButton}
          onClick={handleUpdateBaggage}
        >
          Declarar Bagagem
        </button>
      </div>

      <div className={styles.footer}>
        <span className={styles.label}>Embarque</span>
        <span className={styles.time}>{formatDate(departure)}</span>
      </div>
    </div>
  );
}
