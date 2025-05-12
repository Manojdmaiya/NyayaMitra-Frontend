import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "../../styles/Header.module.css";
import environmentBadge from "environment-badge";
import NormalMarquee from "./NormalMarquee";
import { checkAuthorization } from "../utils/auth";
import { FaUserCircle } from "react-icons/fa";

const NormalHeader = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Initialize environment badge
    environmentBadge([
        {
            displayName: "dev",
            host: /(^localhost(:[0-9]+)?$|^([a-z0-9-]*-)?dev\.)/,
            backgroundColor: "#0000ff",
            foregroundColor: "#ffffff",
        },
        {
            displayName: "qa",
            host: /^([a-z0-9-]*-)?qa\./,
            backgroundColor: "#ff69b4",
            foregroundColor: "#000000",
        },
        {
            displayName: "prod",
            host: /^([a-z0-9-]*-)?prod\./,
            backgroundColor: "#ff0000",
            foregroundColor: "#ffffff",
        }
    ]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        document.cookie.split(";").forEach((cookie) => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });

        window.location.href = "/login";
    };



    const [isAuthorized, setIsAuthorized] = useState(null);
    useEffect(() => {
        const verify = async () => {
            const authorized = await checkAuthorization("/api/normal/v1/home");
            setIsAuthorized(authorized);
        };
        verify();
    }, []);

    if (isAuthorized === null) {
        return <></>;
    }

    if (!isAuthorized) {
        return <></>;
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white shadow-sm">
                <div className="container d-flex justify-content-between align-items-center">
                    {/* Left - Logo & Title */}
                    <div className="d-flex align-items-center gap-3">
                        <img src="NyayaMitralogobgr.png" className={styles.emblem} alt="Indian Emblem" />
                        <h1 className="fw-bold mb-0">NyayaMitra</h1>
                        <img src="judiciary_logo-removebg-preview.png" className={styles.jlogo} alt="Judiciary Logo" />
                    </div>

                    {/* Mobile Toggle */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navigation Links */}
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav gap-4">
                            <li className="nav-item"><Link className="nav-link fw-bold" to="/normal/home">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link fw-bold" to="/normal/prediction">Prediction</Link></li>
                            <li className="nav-item"><Link className="nav-link fw-bold" to="/normal/insights">Insights</Link></li>
                            <li className="nav-item"><Link className="nav-link fw-bold" to="/normal/contact">Contact</Link></li>

                            <li className="nav-item">
                                <Link className="nav-link fw-bold text-primary" to="/normal/request-approval">Request Approval</Link>
                            </li>

                        </ul>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <div className="dropdown">
                            <button
                                className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
                                onClick={toggleDropdown}
                            >
                                <FaUserCircle size={24} />
                            </button>

                            <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`} style={{ right: 0, left: "auto" }}>
                                <li>
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <NormalMarquee />
        </>
    );
};

export default NormalHeader;
