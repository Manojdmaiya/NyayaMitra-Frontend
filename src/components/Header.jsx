import { Link, useLocation } from "react-router-dom";
import styles from '../styles/Header.module.css'
import Home from "./common/Home";
import AdminHeader from "./admin/AdminHeader";
import ApprovedHeader from "./approved/ApprovedHeader";
import NormalHeader from "./normal/NormalHeader";


const Header = () => {
    const location = useLocation();

    let role = "";

    if (location.pathname.startsWith("/admin/")) {
        role = "admin";
    } else if (location.pathname.startsWith("/approved/")) {
        role = "approved";
    } else if (location.pathname.startsWith("/normal/")) {
        role = "normal";
    } else {
        role = "public";
    }

    return (
        <header>
            {role === "admin" && <AdminHeader />}
            {role === "approved" && <ApprovedHeader />}
            {role === "normal" && <NormalHeader />}
            {role === "public" && (
                <div>
                    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
                        <div className="container d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                                <img src="../NyayaMitralogobgr.png" className={styles.emblem} alt="Indian Emblem" />
                                <h1 className="fw-bold mb-0">NyayaMitra</h1>
                                <img src="../judiciary_logo-removebg-preview.png" className={styles.jlogo} alt="Judiciary Logo" />
                            </div>

                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="d-flex align-items-center gap-3">
                                <Link to="/login" className="btn btn-primary fw-bold">Sign In</Link>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
