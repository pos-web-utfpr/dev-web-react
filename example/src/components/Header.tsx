import styles from "./Header.module.css";
import User from "./User";

export default function Header() {
  console.log("Header");

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Aeroporto EAD</h1>

      <User />
    </header>
  );
}
