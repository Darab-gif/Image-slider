import React, { useEffect, useState } from "react";
import backArrow from "./icon/back.png";
import nextArrow from "./icon/next.png";
import nat1 from "./img/nature1.jpg";
import nat2 from "./img/nature2.jpg";
import nat3 from "./img/nature3.jpg";
import nat4 from "./img/nature4.jpg";
import nat5 from "./img/nature5.jpg";
import nat6 from "./img/nature6.jpg";
import styles from "./styles.module.css";

const imageList = [nat1, nat2, nat3, nat4, nat5, nat6];
const Slider = ({
  width,
  height,
  loop = true,
  autoPlay = true,
  autoPlayInterval = 3000,
  showArrowControl = true,
  showDotControl = true,
  bgColor = "none",
}) => {
  let [active, setActive] = useState(0);

  const previousImage = () => {
    if (active !== 0) {
      setActive((active -= 1));
    } else {
      if (loop) {
        setActive((active = imageList.length - 1));
      }
    }
  };

  const previousClickHandle = () => {
    previousImage();
  };

  const nextClickHandle = () => {
    nextImage();
  };
  const nextImage = () => {
    if (active !== imageList.length - 1) {
      setActive((active += 1));
    } else {
      if (loop) {
        setActive((active = 0));
      }
    }
  };

  const dotClickHandle = (e) => {
    let dotNum = e.target.getAttribute("data-key");
    setActive((active = parseInt(dotNum)));
  };

  useEffect(() => {
    if (autoPlay) {
      let slider = setInterval(nextImage, autoPlayInterval);

      return () => clearInterval(slider);
    }
  });
  return (
    <div>
      <div className={styles.wrapper} style={{ backgroundColor: bgColor }}>
        {((showArrowControl && !loop && active !== 0) ||
          (showArrowControl && loop)) && (
          <div onClick={previousClickHandle} className={styles.leftClick}>
            <img className={styles.button} src={backArrow} alt="back" />
          </div>
        )}

        <img
          src={imageList[active]}
          alt=""
          style={{
            width: width,
            height: height,
            objectFit: "cover",
          }}
        />
        {((showArrowControl && !loop && active !== imageList.length - 1) ||
          (showArrowControl && loop)) && (
          <div onClick={nextClickHandle} className={styles.rightClick}>
            <img src={nextArrow} alt="next" className={styles.button} />
          </div>
        )}
      </div>
      {showDotControl && (
        <div className={styles.dots}>
          {imageList.map((img, index) => {
            if (index !== active) {
              return (
                <div
                  key={index}
                  onClick={dotClickHandle}
                  data-key={index}
                  className={styles.dot}
                />
              );
            } else {
              return <div key={index} className={styles.activeDot}></div>;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Slider;
