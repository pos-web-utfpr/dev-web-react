import { useState } from "react";
import styles from "./Reminder.module.css";
import Counter from "./Counter";

export default function Reminder() {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className={styles.reminder}>
      <button
        type="button"
        onClick={handleToggle}
        className={`${styles.button} ${isActive ? styles.active : ""}`}
      >
        Timer: {isActive ? "ON" : "OFF"}
      </button>

      {isActive && <Counter />}
    </div>
  );
}
