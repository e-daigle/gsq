import Link from "next/link";
import React, { useEffect, useState } from "react";
import Editable from "../../components/Editable";
import IGuideContent from "../../interfaces/IGuideContent";
import { getGuide } from "../../lib/guides";

const index = () => {
  const [guide, setGuide] = useState<IGuideContent>();
  const [guides, setGuides] = useState<string[]>(["banane", "fruit", "allo"]);
  const handleEdit = (id: number, text: string) => {
    setGuides((guides) => {
      let g = [...guides];
      g[id] = text;
      return g;
    });
  };
  const handleChange = (paragraphID: number, id: number, text: string) => {
    try {
      if (!guide) return;
      if (!guide.paragraphs[paragraphID].inline?.[id].text) return;
      setGuide((guide) => {
        if (!guide) return guide;
        let g = { ...guide };
        g.paragraphs[paragraphID].inline![id].text = text;
        return g;
      });
      console.log(guide)
    } catch (error) {}
  };

  useEffect(() => {
    const fetchGuide = async () => {
      console.log("ALLO");
      let guide = await getGuide("bov");
      console.log(guide);
      setGuide(guide);
    };
    fetchGuide();
  }, []);

  return (
    <div>
      <>
        {guide ? (
          <div className="mainText">
            <h2>{guide.title}</h2>
            {guide.paragraphs.map((text, pid) => (
              <React.Fragment key={pid}>
                {text.title && <h3 key={pid}>{text.title}</h3>}
                {text.inline && (
                  <p key={pid}>
                    {text.inline.map((inline, idx) => (
                      <React.Fragment key={idx}>
                        {inline.text && (
                          <Editable
                            handleChange={(text: string) =>
                              handleChange(pid, idx, text)
                            }
                            text={inline.text}
                          />
                        )}
                        {inline.strong && <strong>{inline.strong}</strong>}
                        {inline.link && (
                          <Link href={`/${inline.link.to}`}>
                            {inline.link.text}
                          </Link>
                        )}
                        &nbsp;
                      </React.Fragment>
                    ))}
                  </p>
                )}
                {text.image && (
                  <div className="imageBPV">
                    <img alt="Bypass Valve" src={text.image.src} />
                    <h4 className="desc">{text.image.desc}</h4>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p>alllo</p>
        )}
      </>
      {guides.map((g, idx) => (
        <p>allo</p>
      ))}
    </div>
  );
};

export default index;
