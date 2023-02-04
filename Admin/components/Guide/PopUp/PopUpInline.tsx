import Link from "next/link";
import React, { Dispatch, useState } from "react";
import { IInline, IParagraph } from "../../../../interfaces/IEditable";
import styles from "../../../styles/admin-popup.module.css";
import styless from "../../../styles/admin-guide-editable.module.css";
import PopUpLink from "./PopUpLink";
import PopUpSpan from "./PopUpSpan";
import PopUpStrong from "./PopUpStrong";

interface Props {
  inline: IInline[];
  setP: React.Dispatch<IParagraph>;
}

const PopUpInline = ({ inline, setP }: Props) => {
  function renderSwitch(inline: IInline, id: number) {
    if (inline.text)
      return (
        <PopUpSpan
          key={id}
          content={inline.text}
          handleEdited={(inline: IInline) => changeInline(inline, id)}
        />
      );
    if (inline.strong)
      return (
        <PopUpStrong
          key={id}
          content={inline.strong}
          handleEdited={(inline: IInline) => changeInline(inline, id)}
        />
      );
    if (inline.link)
      return (
        <PopUpLink
          key={id}
          content={inline.link}
          handleEdited={(inline: IInline) => changeInline(inline, id)}
        />
      );
  }

  const changeInline = (inlineParam: IInline, id: number) => {
    inline[id] = inlineParam;
    setP({ inline: inline });
  };

  const handleAdd = (id: number, type: string) => {
    const addId = id + 1;
    let newInline: IInline;
    switch (type) {
      case "span":
        newInline = { text: "Nouveau texte" };
        break;
      case "strong":
        newInline = { strong: "Nouveau gras" };
        break;
      case "link":
        newInline = { link: { text: "Nouveau lien", to: "Vers" } };
        break;
      default:
        alert("Erreur dans l'ajout");
        return;
        break;
    }
    const inlineArr = [
      ...inline.slice(0, addId),
      newInline,
      ...inline.slice(addId),
    ];
    console.log(inlineArr);
    setP({ inline: inlineArr });
  };

  const handleDelete = (id: number) => {
    const inlineArr = inline.filter((s, i) => i != id);
    setP({ inline: inlineArr });
  };

  return (
    <div className={styles.inline}>
      {inline.map((section, id) => (
        <div>
          {renderSwitch(section, id)}
          <div className={styless.addButton}>
            <img src="/Icons/add.png" width={14} height={14} />
            <div className={styless.addChoices}>
              <button onClick={() => handleAdd(id, "span")}>
                <img src="/Icons/add.png" width={14} />
                Texte
              </button>
              <button onClick={() => handleAdd(id, "strong")}>
                <img src="/Icons/add.png" width={14} />
                Gras
              </button>
              <button onClick={() => handleAdd(id, "link")}>
                <img src="/Icons/add.png" width={14} />
                Lien
              </button>
            </div>
          </div>
          <div className={styles.deleteButton} onClick={() => handleDelete(id)}>
            <svg
              height="25px"
              width="25px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z"></path>
              <path d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z"></path>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopUpInline;
