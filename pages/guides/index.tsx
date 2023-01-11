import React, { useEffect, useState } from "react";
import GuideCard from "../../components/GuideCard";
import SearchBar from "../../components/SearchBar";
import IGuide from "../../interfaces/IGuide";
import styles from "../../styles/guides.module.css";

const Guides = () => {
  const [guides, setGuides] = useState<IGuide[]>([]);
  const [searchWord, setSearchWord] = useState("");

  const getGuides = async () => {
    console.log("ALLO");
    try {
      const response = await fetch("/api/guides");
      const data = await response.json();
      setGuides(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGuides();
  }, []);

  return (
    <div className={styles.container}>
      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord}/>
      <div className={styles.cards}>
        {guides
          .filter((guide) =>
            (guide.titre.toLowerCase() + guide.desc.toLowerCase()).includes(
              searchWord.toLowerCase()
            )
          )
          .map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
      </div>
    </div>
  );
};

export default Guides;
