import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/hero.module.css";

const Hero = () => {
  const [currentScrollTop, setCurrentScrollTop] = useState(0);
  let previousScroll = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (Math.abs(previousScroll - window.scrollY) > 40) {
        previousScroll = window.scrollY;
        previousScroll < window.innerHeight && setCurrentScrollTop(previousScroll)
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const calculateOpacity = (scroll: number): number => {
    const threshold = 50;
    if (scroll < threshold) {
      return 1;
    }    
    const distance = scroll - threshold;
    const maxDistance = window.innerHeight;
    if (distance > maxDistance) {
      return 0;
    }
    return 0.5 - distance / maxDistance;
  };

  const style = {
    opacity: calculateOpacity(currentScrollTop),
  };

  return (
    <>
      <></>
      <video
        typeof="video/mp4"
        loop
        playsInline
        muted
        autoPlay
        src="/Rally.mp4"
        className={styles.video}
      />
      <div className={styles.container}>
        <div style={style} className={styles.text}>
          <h1>GSQ</h1>
          <p>Guide Subaru Québec</p>
        </div>
      </div>
    </>
  );
};

export default Hero;
