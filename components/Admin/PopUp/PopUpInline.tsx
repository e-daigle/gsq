import Link from "next/link";
import React from "react";
import { IInline } from "../../../interfaces/IEditable";
import styles from "../../../styles/admin-popup.module.css";
import PopUpSpan from "./PopUpSpan";

interface Props {
  inline: IInline[];
}

const PopUpInline = ({ inline }: Props) => {
  function renderSwitch(inline: IInline, id: number) {
    if (inline.text)
      return (
        <PopUpSpan
          key={id}
          content={inline.text}
          handleEdited={(text: string) => changeInline(text, id)}
        />
      );
    if (inline.strong) return <strong key={id}>{inline.strong} </strong>;
    if (inline.link)
      return (
        <Link key={id} href={inline.link.to}>
          {inline.link.text}{" "}
        </Link>
      );
  }
  const changeInline = (text: string, id: number) => {
    
  };
  return (
    <div className={styles.inline}>
      {inline.map((section, id) => renderSwitch(section, id))}
    </div>
  );
};

export default PopUpInline;
