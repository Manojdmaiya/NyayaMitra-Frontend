import React from 'react';
import styles from "../../styles/Marquee.module.css"

const messages = [
    "Justice Through Technology – Upload Your Case File for Instant Analysis ⚖️",
    "Get AI-Based Verdict Predictions and IPC Section Analysis! 🔍",
    "Court Case Prediction Made Smarter with AI and ML 🏛️",
];

const Marquee = () => {
    return (
        <div className={styles.marquee}>
            <div className={styles.marqueeContent}>
                {messages.map((msg, index) => (
                    <span key={index} className={styles.marqueeItem}>{msg}</span>
                ))}
                {messages.map((msg, index) => (
                    <span key={`duplicate-${index}`} className={styles.marqueeItem} aria-hidden="true">{msg}</span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;