import Link from "next/link";
import React from "react";
import IGuide from "../interfaces/IGuide";
import styles from "../styles/guides.module.css";

const GuideCard = ({ guide }: { guide: IGuide }) => {
  return (
    <div className={styles.cardWraper}>
      <div className={styles.card}>
        <img className={styles.card__img} src={guide.image} alt="image guide" />
        <div className={styles.card__info}>
          <h1>{guide.titre}</h1>
          <h2>{guide.desc}</h2>
          <div>
            <Link href={`/guides/${guide.link}`}>En apprendre plus</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
