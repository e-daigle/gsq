import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
  MouseEvent,
} from "react";
import { IInline } from "../../../../interfaces/IEditable";

interface Props {
  content: string;
  handleEdited: (inline: IInline) => void;
}

const PopUpSpan = ({ content, handleEdited }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handleBlur = (e: FocusEvent<HTMLSpanElement>) => {
    setIsEditing(false);
    handleEdited({ text: e.currentTarget.innerHTML });
  };

  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <span
      suppressContentEditableWarning={true}
      contentEditable={isEditing}
      onDoubleClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyboardEvent}
    >
      {content}
    </span>
  );
};

export default PopUpSpan;
