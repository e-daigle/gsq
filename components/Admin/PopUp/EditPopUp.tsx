import React, { useEffect, useState } from "react";
import { IParagraph } from "../../../interfaces/IEditable";
import styles from "../../../styles/admin-popup.module.css";
import PopUpInline from "./PopUpInline";
import PopUpTitle from "./PopUpTitle";

interface Props {
  paragraph: IParagraph;
  handleSave: () => void;
}

const EditPopUp = ({ paragraph, handleSave }: Props) => {
  
  function renderSwitch(p: IParagraph) {
    if (p.title) return <PopUpTitle title={p.title}/>
    if (p.inline) return <PopUpInline inline={p.inline}/>;
    return null;
    //if(paragraph.text) return <Paragraph/>
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {renderSwitch(paragraph)}
        <div className={styles.buttons}>
          <button className={styles.save} onClick={() => handleSave()}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopUp;
