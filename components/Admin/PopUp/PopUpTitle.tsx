import React, { useState, KeyboardEvent, FocusEvent } from "react";
import { IInline } from "../../../interfaces/IEditable";

interface Props {
  title: string;
}

const PopUpTitle = ({ title }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handleBlur = (e: FocusEvent<HTMLHeadingElement>) => {
    setIsEditing(false);
    title = e.currentTarget.innerHTML;
    console.log(title)
  };

  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <h2
      suppressContentEditableWarning={true}
      contentEditable={isEditing}
      onDoubleClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyboardEvent}
    >
      {title}
    </h2>
  );
};

export default PopUpTitle;
