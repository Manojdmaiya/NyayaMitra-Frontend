import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "../../styles/Home.module.css";

const text = "Harnessing advanced AI and machine learning, our system predicts court case outcomes with remarkable accuracy. Determine whether a case results in a 'Guilty' or 'Not Guilty' verdict while gaining insights into relevant legal sections, potential punishments, and key influencing factors—empowering legal professionals with data-driven foresight.";

const Home = ({ basePath = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const typingSpeed = 30;
  const navigate = useNavigate();

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else {
      setCursorVisible(false);
    }
  }, [index]);

  return (
    <motion.div
      className={styles["home-container"]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Image Section */}
      <motion.img
        src="/NM2.jpeg"
        alt="NyayaMitra"
        className={styles.NM2}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      />

      {/* Text Section */}
      <motion.div
        className={styles["text-container"]}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className={styles.tle}>Welcome to NyayMitra</h1>
        <p className={styles.typing} style={{ textAlign: "center" }}>
          {displayedText}
          {cursorVisible && <span className={styles.cursor}>|</span>}
        </p>

        {/* Predict Button Below Text */}
        <div className={styles.predict}>
          <motion.button
            className="btn btn-success" // Default Bootstrap button (medium size)
            style={{ padding: "12px 24px", fontSize: "1.25rem" }} // Adjusted for medium size
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(`${basePath}/prediction`)}
          >
            Predict
          </motion.button>

        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
