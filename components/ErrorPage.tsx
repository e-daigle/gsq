import Link from "next/link";
import React from "react";
import styles from "../styles/error.module.css";

type Props = {
  message: string;
};

const ErrorPage = ({ message }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.imageWrapper}>
          <h1>Désolé, nous avons rencontré un probléme!</h1>
          <div className={styles.image}>
            <img src="/HeadGasket.png" alt="Head gasket" />
          </div>
          <div className={styles.error}>
            <h2>Détails de l'erreur:</h2>
            <p>"{message}"</p>
          </div>
        </div>
        <p>C'est déjà moins pire qu'un head gasket failure</p>
        <p>L'erreur sera transmise aux administrateurs, veuillez réessayer plus tard</p>
        <Link href={"/"}>Retourner à l'accueil</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
