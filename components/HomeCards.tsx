import React from "react";
import HomeCard from "./HomeCard";
import styles from "../styles/home-card.module.css";

const HomeCards = () => {
  return (
    <>
      <div className={styles.cards}>
        <div className={styles.container}>
          <ul className={styles.items}>
            <HomeCard
              src="/Home/Subaru-Mecanic.jpg"
              text="Liste de garages spécialisés Subaru"
              label="Garages"
              path="/garages"
            />
            <HomeCard
              src="/Home/Subaru-Accessport.jpg"
              text="Guides pour tous les types de propriétaires"
              label="Guides"
              path="/guides"
            />
          </ul>
          {/*<ul className={styles.items}>
            <HomeCard
              src="/Home/Subaru-Generations.jpg"
              text="Testez vos connaissances"
              label="Quiz"
              path="/services"
            />
            <HomeCard
              src="/Home/Subaru-Generations.jpg"
              text="À venir"
              label="Adventure"
              path="/products"
            />
            <HomeCard
              src="/Home/Subaru-Generations.jpg"
              text="À venir"
              label="Adrenaline"
              path="/sign-up"
            />
  </ul>*/}
        </div>
      </div>
    </>
  );
};

export default HomeCards;
