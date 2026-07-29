import Header from "../components/Header";
import FlightCard from "../components/FlightCard";
import { flights } from "../mocks/flights";
import styles from "./Home.module.css";

export default function Home() {
  console.log("Home");

  return (
    <main className={styles.container}>
      <Header />

      <section className={styles.titleSection}>
        <h2>Próximos Voos</h2>
        <p>
          Confira a lista de seus voos agendados e o status atualizado de cada
          um.
        </p>
      </section>

      <section className={styles.flightsList}>
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </section>
    </main>
  );
}
