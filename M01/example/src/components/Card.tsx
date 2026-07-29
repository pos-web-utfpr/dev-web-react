import styles from './Card.module.css';

type CardProps = {
    name: string,
    flight?: number,
    gate?: string,
    items?: string[],
    children?: React.ReactNode,
}

export default function Card({ name, flight, gate = "Não Definido", items = [], children }: CardProps) {
    return <section className={styles.card}>
        <h2 className={styles.title}>
            Cartão de Embarque
            <span>✈️</span>
        </h2>

        <div className={styles.infoRow}>
            <div className={styles.infoBlock}>
                <span className={styles.label}>Passageiro</span>
                <span className={styles.value}>{name}</span>
            </div>

            <div className={styles.infoBlock}>
                <span className={styles.label}>Portão</span>
                <span className={styles.value}>{gate}</span>
            </div>
        </div>

        <div className={styles.infoRow}>
            <div className={styles.infoBlock}>
                <span className={styles.label}>Vôo</span>
                <span className={styles.value}>{flight ? `#${flight}` : 'Não Definido'}</span>
            </div>
        </div>

        <div className={styles.infoBlock}>
            <span className={styles.baggageTitle}>Itens de Bagagem</span>
            {items.length > 0 ? (
                <ul className={styles.baggageList}>
                    {items.map((item, index) => (
                        <li key={index} className={styles.baggageItem}>
                            {item}
                        </li>
                    ))}
                </ul>
            ) : (
                <span className={styles.emptyBaggage}>Nenhum item registrado</span>
            )}
        </div>

        {children && <div className={styles.childrenContainer}>
            {children}
        </div>}
    </section>
}