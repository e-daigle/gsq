import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
  MouseEvent,
} from "react";
import { IInline } from "../../../interfaces/IEditable";

interface Props {
  content: string;
  handleEdited: (inline: IInline) => void;
}

const PopUpStrong = ({ content, handleEdited }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handleBlur = (e: FocusEvent<HTMLSpanElement>) => {
    setIsEditing(false);
    handleEdited({ strong: e.currentTarget.innerHTML });
  };

  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <strong
      suppressContentEditableWarning={true}
      contentEditable={isEditing}
      onDoubleClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyboardEvent}
    >
      {content}
    </strong>
  );
};

export default PopUpStrong;
