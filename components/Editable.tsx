import React, { useState, KeyboardEvent  } from 'react'



const Editable = ({ text, handleChange } : {text : string, handleChange : (text: string) => void}) => {
    const [isEditing, setIsEditing] = useState(false);
    const handleKeyboardEvent = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.currentTarget.blur();
          }
      };

  return (
    <>
    {isEditing ? <span contentEditable onBlur={(e) => { handleChange(e.target.innerHTML); setIsEditing(false)}} onKeyDown={handleKeyboardEvent}>{text}</span>
       : <span onClick={() => setIsEditing(true)}>{text}</span>}
    </>
  )
}

export default Editable