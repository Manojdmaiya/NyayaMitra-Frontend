import React, { useEffect, useState } from "react";
import styles from '../../styles/Prediction.module.css';
import Unauthorized from "../background/Unauthorised";
import Loading from "../background/Loading";
import { checkAuthorization } from "../utils/auth";

const NormalPrediction = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(true);
    }, []);


    const [isAuthorized, setIsAuthorized] = useState(null);
    useEffect(() => {
        const verify = async () => {
            const authorized = await checkAuthorization("/api/normal/v1/prediction");
            setIsAuthorized(authorized);
        };
        verify();
    }, []);

    if (isAuthorized === null) {
        return <Loading />
    }

    if (!isAuthorized) {
        return <Unauthorized />;
    }

    return (
        <div className="container mt-5">
            <h1 className={styles["ttle"]}>Predictions</h1>

            {/* Blurred Form */}
            <div className={styles["blur-container"]}>
                <form className={styles["blurred-form"]}>
                    <div className="mb-3">
                        <label htmlFor="fileUpload" className="form-label">Upload your file</label>
                        <input className="form-control" type="file" id="fileUpload" disabled />
                    </div>
                    <button type="submit" className="btn btn-success" disabled>
                        Submit
                    </button>
                </form>
            </div>

            {/* Modal Popup */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Restricted Access</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Access to the prediction feature is currently restricted.</p>
                                <p>Only approved users are allowed to use this service.</p>
                                <p>If you believe you should have access, please submit a request for approval.</p>
                                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                                    Our team will review your request and respond within 3-4 business days.
                                </p>
                            </div>
                            <div className="modal-footer">
                                <a href="/normal/request-approval" className="btn btn-primary">
                                    Request Access
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NormalPrediction;
