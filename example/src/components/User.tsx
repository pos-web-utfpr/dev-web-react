import styles from "./User.module.css";

export default function User() {
  console.log("User");

  return (
    <div className={styles.user}>
      <p className={styles.name}>Username</p>
      <img
        src="https://i.pravatar.cc/64"
        alt="User"
        className={styles.avatar}
      />
    </div>
  );
}
