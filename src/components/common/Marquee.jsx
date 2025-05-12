import React from 'react';
import styles from "../../styles/Marquee.module.css"


const Marquee = () => {
    return (
        <div className={styles["scrolling-text"]}>
            <span>Justice Through Technology – Upload Your Case File for Instant Analysis ⚖️</span>
            <span>Get AI-Based Verdict Predictions and IPC Section Analysis! 🔍</span>
            <span>Court Case Prediction Made Smarter with AI and ML 🏛️</span>
        </div>
    );
};


export default Marquee;

