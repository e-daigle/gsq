import React, { useEffect, useState } from "react";
import EditableContainer from "../../components/Admin/EditableContainer";
import EditableParagraph from "../../components/Admin/EditableParagraph";
import EditableTitle from "../../components/Admin/EditableTitle";
import EditPopUp from "../../components/Admin/PopUp/EditPopUp";
import Editable from "../../components/Editable";
import IGuideContent from "../../interfaces/IEditable";
import IContent, { IParagraph } from "../../interfaces/IEditable";
import { getGuide } from "../../lib/guides";

const test = () => {
  const [guide, setGuide] = useState<IGuideContent>();
  const [editingID, setEditingID] = useState<number | null>(null);

  function renderSwitch(paragraph: IParagraph) {
    if (paragraph.title) return <EditableTitle text={paragraph.title} />;
    if (paragraph.inline)
      return <EditableParagraph inline={paragraph.inline} />;
    if (paragraph.image) return <EditableTitle text="image" />;
    //if(paragraph.text) return <Paragraph/>
  }
  useEffect(() => {
    const fetchGuide = async () => {
      console.log("ALLO");
      let guide = await getGuide("bov");
      console.log(guide);
      setGuide(guide);
    };
    fetchGuide();
  }, []);
  const handleTextChange = (paragraphID: number, id: number, text: string) => {
    /*try {
      if (!guide) return;
      if (!guide.paragraphs[paragraphID].inline?.[id].text) return;
      setGuide((guide) => {
        if (!guide) return guide;
        let g = { ...guide };
        g.paragraphs[paragraphID].inline![id].text = text;
        return g;
      });
      console.log(guide)
    } catch (error) {}*/
  };
  const handleOpenPopUp = (pid: number) => {
    if (!pid && pid != 0) return;
    if (!guide) return;
    setEditingID(pid);
  };

  const handleSave = (paragraph: IParagraph) => {
    console.log(paragraph)
    if (!guide) return;
    if (!paragraph) return;
    if (!editingID) return;
    setGuide((guide) => {
      if (!guide) return;
      guide.paragraphs[editingID] = paragraph;
      return guide;
    });
    setEditingID(null);
  };

  const handleCancel = () => {
    setEditingID(null);
  };

  const handleArrow = (up: boolean, pid: number) => {
    if (!guide) return;
    if (pid <= 0 && up) return;
    if (pid >= guide.paragraphs.length - 1 && !up) return;
    console.log("ok");
    let paragraphs = guide.paragraphs;
    let element = paragraphs[pid];
    paragraphs.splice(pid, 1);
    paragraphs.splice(up ? pid - 1 : pid + 1, 0, element);
    setGuide((guide) => {
      if (!guide) return;
      return {
        title: guide.title,
        paragraphs: paragraphs,
      };
    });
  };

  return (
    <>
      {guide ? (
        <>
          <div className="mainText">
            <h2>{guide.title}</h2>
            {guide.paragraphs.map((paragraph, pid) => (
              <EditableContainer
                key={pid}
                handleArrow={(up: boolean) => handleArrow(up, pid)}
                handleOpenPopUp={() => handleOpenPopUp(pid)}
              >
                {renderSwitch(paragraph)}
              </EditableContainer>
            ))}
          </div>
          {editingID !=null ? (
            <EditPopUp
              paragraph={guide.paragraphs[editingID]}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          ) : null}
        </>
      ) : (
        <p>Erreur</p>
      )}
    </>
  );
};

export default test;
