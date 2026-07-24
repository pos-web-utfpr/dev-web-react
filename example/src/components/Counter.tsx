import { useEffect, useState } from "react";
import styles from "./Counter.module.css";

export default function Counter() {
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    console.log("Montagem");

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      console.log("Limpeza!");
      clearInterval(timer);
    };
  }, [setTimeLeft]);

  return <span className={styles.counter}>Timer: {timeLeft}s</span>;
}
