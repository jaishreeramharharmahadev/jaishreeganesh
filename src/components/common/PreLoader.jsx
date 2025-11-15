import React, { useEffect } from "react";
import styles from "./Loader.module.css";

const PreLoader = ({
  className = "",
  style,
  text = "",
}) => {
  // Prevent background scrolling while loader is mounted
  // useEffect(() => {
  //   const previousOverflow = document.body.style.overflow;
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = previousOverflow;
  //   };
  // }, []);

  return (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm z-[9999]"
    role="status"
    aria-busy="true"
  >
    <div className="flex flex-col items-center justify-center pointer-events-auto">
      <div className={`${styles.loader} ${className}`} style={style} />
      {text ? (
        <div className="mt-3 text-gray-800 text-center">
          {text}
        </div>
      ) : null}
    </div>
  </div>
);
};

export default PreLoader;