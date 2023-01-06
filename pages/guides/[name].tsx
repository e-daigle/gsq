import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import IGuideSection from "../../interfaces/IGuideSection";


const Guide = () => {
  const [guide, setGuide] = useState<IGuideSection[]>([]);
  const router = useRouter();
  const { name } = router.query;

  useEffect(() => {
    if(!name) {
      return;
    }
    const getGuide = async () => {
      try {
        const response = await fetch(`/api/guides/${name}`);
        const data = await response.json();
        setGuide(data); 
        
      } catch (error) {
        console.log(error);
      }
    };
    getGuide();
  }, [name]);
  
  return <p>Post: {name}</p>;
};

export default Guide;