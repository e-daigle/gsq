import React from 'react'

interface Props {
    text: string,

}
const EditableTitle = ({text} : Props) => {
  return (
    <h3>{text}</h3>
  )
}

export default EditableTitle