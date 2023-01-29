import React, { useState } from "react";
import { IParagraph } from "../../../interfaces/IEditable";
import styles from "../../../styles/admin-popup.module.css";
import PopUpInline from "./PopUpInline";

interface Props {
  paragraph: IParagraph;
  handleCancel: () => void;
  handleSave: (paragraph: IParagraph) => void;
}

const EditPopUp = ({ paragraph, handleSave, handleCancel }: Props) => {
  const [p, setP] = useState({ ...paragraph });

  

  function renderSwitch(p: IParagraph) {
    if (p.title) return <p>allo</p>;
    if (p.inline) return <PopUpInline inline={p.inline} />;
    return <></>;
    //if(paragraph.text) return <Paragraph/>
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {renderSwitch(p)}
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={handleCancel}>
            Annuler
          </button>
          <button className={styles.save} onClick={() => handleSave(p)}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopUp;
