import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  useRef,
} from "react";
import styles from "../../../styles/admin-popup.module.css";
import { IInline, ILink } from "../../../../interfaces/IEditable";

interface Props {
  content: ILink;
  handleEdited: (inline: IInline) => void;
}

const PopUpLink = ({ content, handleEdited }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const toRef = useRef<HTMLSpanElement>(null);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handleBlur = (e: FocusEvent<HTMLSpanElement>) => {
    setIsEditing(false);
    if (!textRef.current || !toRef.current) {
      alert("Erreur de modification");
      return;
    }
    handleEdited({
      link: {
        text: textRef.current.innerHTML,
        to: toRef.current.innerHTML,
      },
    });
  };

  const handleClick = (e: MouseEvent<HTMLSpanElement>) => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.link}>
      <p>
        Text:
        <span
          suppressContentEditableWarning={true}
          contentEditable={isEditing}
          onDoubleClick={handleClick}
          onBlur={handleBlur}
          onKeyDown={handleKeyboardEvent}
          ref={textRef}
        >
          {content.text}
        </span>
      </p>
      <p>
        Lien:
        <span
          suppressContentEditableWarning={true}
          contentEditable={isEditing}
          onDoubleClick={handleClick}
          onBlur={handleBlur}
          onKeyDown={handleKeyboardEvent}
          ref={toRef}
        >
          {content.to}
        </span>
      </p>
    </div>
  );
};

export default PopUpLink;
