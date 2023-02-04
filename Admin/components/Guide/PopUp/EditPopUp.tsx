import React, { useEffect, useState } from "react";
import { IParagraph } from "../../../../interfaces/IEditable";
import styles from "../../../styles/admin-popup.module.css"
import PopUpInline from "./PopUpInline";
import PopUpTitle from "./PopUpTitle";

interface Props {
  paragraph: IParagraph;
  handleSave: (paragraph: IParagraph) => void;
  handleCancel: () => void;
}

const EditPopUp = ({ paragraph, handleSave, handleCancel }: Props) => {
  const [p, setP] = useState<IParagraph>(JSON.parse(JSON.stringify(paragraph)));

  function renderSwitch(p: IParagraph) {
    if (p.title) return <PopUpTitle title={p.title} setP={setP} />;
    if (p.inline) return <PopUpInline inline={p.inline} setP={setP}/>;
    return null;
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
