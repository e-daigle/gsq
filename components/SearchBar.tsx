import React from "react";
import styles from "../styles/search-bar.module.css"

interface IProps {
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchWord, setSearchWord } : IProps ) => {
  return (
    <div>
      <input
        type="search"
        placeholder="Rechercher un guide..."
        className={styles.input}
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
