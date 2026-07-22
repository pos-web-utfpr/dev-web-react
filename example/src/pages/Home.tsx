import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { passengers } from "../mocks/passengers";
import styles from "./Home.module.css";

export default function Home() {
    return <div className={styles.container}>
        <Header />

        <main className={styles.mainContent}>
            <div className={styles.cardsGrid}>
                <Card name="Fulano" items={[]}>
                    <p style={{ color: "#f87171", fontWeight: "bold" }}>
                        <b>Observações: </b>
                        Restrição alimentar;
                    </p>
                </Card>

                {
                    passengers.map(passenger => <Card
                        key={passenger.id}
                        name={passenger.name}
                        flight={passenger.flight}
                        gate={passenger.gate}
                        items={passenger.items}
                    />)
                }
            </div>
        </main>

        <Footer />
    </div>
}