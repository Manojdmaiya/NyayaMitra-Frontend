import React from "react";
import { useNavigate } from "react-router-dom";
import styles from '../../styles/Unauthorized.module.css'

const Unauthorized = () => {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        navigate("/login");
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <img
                    src="/401-unauthorised.png"  // Replace with your image path
                    alt="Unauthorized access"
                    className={styles.image}
                />
                <div className={styles.content}>
                    <h1 className={styles.title}>Unauthorized Access</h1>
                    <p className={styles.message}>
                        You are attempting to access a resource that requires proper authentication.<br />
                        For your security, this activity has been logged.
                    </p>
                    <p className={styles.warning}>
                        Please log in with appropriate credentials to continue.
                    </p>
                    <button className={styles.button} onClick={redirectToLogin}>
                        Go to Login Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
