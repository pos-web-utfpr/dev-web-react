import { useEffect, useState } from "react";
import styles from "./User.module.css";

export default function User() {
  console.log("User");

  const [username, serUsername] = useState<string | null>(null);

  useEffect(() => {
    // Loading fake!
    setTimeout(() => {
      //----
      fetch("https://jsonplaceholder.typicode.com/users/1")
        .then((response) => response.json())
        .then((data) => serUsername(data.name));
      //----
    }, 1000);
  }, []);

  return (
    <div className={styles.user}>
      <p className={styles.name}>{username ?? "Loading..."}</p>
      <img
        src="https://i.pravatar.cc/64"
        alt="User"
        className={styles.avatar}
      />
    </div>
  );
}
