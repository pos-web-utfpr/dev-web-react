export default function Card() {
    const name = "Fulano Silva";

    const flight = null;
    const gate = null;

    // const flight = 816;
    // const gate = "8";

    const items = [
        "Bolsa",
        "Mochila",
        "Mochila de mão",
        "Laptop",
        "Tablet"
    ]

    return <main>
        <h2>Cartão de Embarque</h2>

        <p><b>Passageiro:</b> {name}</p>

        {flight && <p><b>Vôo:</b> {flight}</p>}

        <p>
            <b>Portão:</b>
            {gate ? gate : "Não Definido"}
        </p>

        <b>Itens de Bagagem:</b>

        <ul>
            {
                items.map(item => <li>
                    {item}
                </li>)
            }
        </ul>

    </main>
}