import Link from "next/link";
import React from "react";
import { IInline } from "../../../interfaces/IEditable";

interface Props {
  inline: IInline[];
}

function renderSwitch(inline: IInline) {
    if(inline.text) return <span>{inline.text} {" "}</span>
    if(inline.strong) return <strong>{inline.strong}{" "}</strong>
    if(inline.link) return <Link href={inline.link.to}>{inline.link.text}{" "}</Link>

}

const EditableParagraph = ({ inline }: Props) => {
  return (
    <p>
      {inline.map((section) => (
        renderSwitch(section)
      ))}
    </p>
  );
};

export default EditableParagraph;
