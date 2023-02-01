import Link from "next/link";
import React, { Dispatch, useState } from "react";
import { IInline, IParagraph } from "../../../interfaces/IEditable";
import styles from "../../../styles/admin-popup.module.css";
import PopUpLink from "./PopUpLink";
import PopUpSpan from "./PopUpSpan";
import PopUpStrong from "./PopUpStrong";

interface Props {
  inline: IInline[];
}

const PopUpInline = ({ inline }: Props) => {
  const [inlineState, setInlineState] = useState(inline);
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
    setInlineState(old => [...old, { text: "allo" }]);
    console.log(inline)
  };

  return (
    <div className={styles.inline}>
      {inlineState.map((section, id) => renderSwitch(section, id))}
    </div>
  );
};

export default PopUpInline;
