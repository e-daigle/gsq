import React, { useEffect, useState } from 'react'
import IGuide from '../../interfaces/IGuide';

const Guides = () => {
  const [guides, setGuides] = useState<IGuide[]>([]);

  useEffect(() => {
    const getGuides = async () => {
      try {
        const response = await fetch("/api/guides");
        const data = await response.json();
        setGuides(data);
      } catch (error) {
        console.log(error);
      }
    };
    getGuides();
  }, []);
  return (
    <div>ALLO</div>
  )
}

export default Guides