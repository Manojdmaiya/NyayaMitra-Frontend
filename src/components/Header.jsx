import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";

// Import environment-badge
import environmentBadge from "environment-badge";

const Header = () => {
    // Initialize environment badge
    environmentBadge([
        {
            displayName: "dev",
            host: /(^localhost(:[0-9]+)?$|^([a-z0-9-]*-)?dev\.)/, // Includes localhost
            backgroundColor: "#0000ff", // Blue for Dev
            foregroundColor: "#ffffff", // White text
        },
        {
            displayName: "qa",
            host: /^([a-z0-9-]*-)?qa\./,
            backgroundColor: "#ff69b4", // Pink for QA
            foregroundColor: "#000000", // Black text
        },
        {
            displayName: "prod",
            host: /^([a-z0-9-]*-)?prod\./,
            backgroundColor: "#ff0000", // Red for Prod
            foregroundColor: "#ffffff", // White text
        }
    ]);
    

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Left Section - Logo, Title, Emblem */}
                <div className="d-flex align-items-center gap-3">
                    <img src="judiciary_logo-removebg-preview.png" className={styles.jlogo} alt="Judiciary Logo" />
                    <h1 className="fw-bold mb-0">NyayaMitra</h1>
                    <img src="emblem.jpg" className={styles.emblem} alt="Indian Emblem" />
                </div>

                {/* Navbar Toggler for Mobile */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Center Navigation */}
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav gap-4">
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="/prediction">Prediction</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="/insights">Insights</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold" to="/contact">Contact</Link>
                        </li>
                        
                    </ul>
                </div>

                {/* Right Section - Sign In Button */}
                <div className="d-flex align-items-center gap-3">
                    <Link to="/signin" className="btn btn-primary fw-bold">Sign In</Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
