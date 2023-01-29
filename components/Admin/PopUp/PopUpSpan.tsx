import React, { useState, KeyboardEvent, ChangeEvent, FocusEvent } from "react";
import styles from "../../../styles/admin-popup.module.css";

interface Props {
  content: string;
  handleEdited: (text: string) => void;
}

const PopUpSpan = ({ content, handleEdited }: Props) => {
  const [text, setText] = useState(content);
  const [isEditing, setIsEditing] = useState(false);
  const [numRows, setNumRows] = useState(1);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
      setIsEditing(false)
      handleEdited(e.currentTarget.value);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    const rowHeight = 16;
    const rows = Math.ceil(e.target.scrollHeight/rowHeight) -1; 
    setNumRows(rows);
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsEditing(false)
    handleEdited(e.target.value);
  };
  
  return isEditing ? (
    <textarea
      className={styles.spanInput}
      value={text}
      onChange={handleOnChange}
      onKeyDown={handleKeyboardEvent}
      onBlur={handleBlur}
      rows={numRows}
    />
  ) : (
    <span onClick={() => setIsEditing(true)}>{text}</span>
  );
};

export default PopUpSpan;
