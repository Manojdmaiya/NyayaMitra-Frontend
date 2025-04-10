import React, { useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import styles from '../styles/Prediction.module.css';

const verdictImages = {
    "Acquitted": "Acquitted.jpeg",
    "Bail Granted": "BAIL GRANTED.jpeg",
    "Bail Rejected": "BAIL REJECTED.jpeg",
    "Convicted": "Convicted.jpeg"
};

const Prediction = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [majorPrediction, setMajorPrediction] = useState(null);
    const [summary, setSummary] = useState(null);
    const [ipcSection, setIpcSection] = useState(null);

    const uploadUrl = import.meta.env.VITE_PREDICTION_FILE_UPLOAD_URL

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        setLoading(true);
        setChartData(null);
        setMajorPrediction(null);
        setSummary(null);
        setIpcSection(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(uploadUrl, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const predictions = response.data.prediction;
            const categories = ["Acquitted", "Bail Granted", "Bail Rejected", "Convicted"];

            // Group models by category
            const categoryData = categories.map(category => ({
                category,
                count: Object.entries(predictions).filter(([model, value]) => value === category).length,
                models: Object.entries(predictions)
                    .filter(([model, value]) => value === category)
                    .map(([model]) => model) // Store model names
            }));

            // Find the major prediction (highest count)
            const major = categoryData.reduce((prev, current) => (prev.count > current.count ? prev : current), categoryData[0]);

            setLoading(false);
            setChartData(categoryData);
            setMajorPrediction(major);
            setSummary(response.data.summary);
            setIpcSection(response.data.IPC_section);
        } catch (error) {
            setLoading(false);
            alert("File upload failed! Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className={styles["ttle"]}>Predictions</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fileUpload" className="form-label">Upload your file</label>
                    <input className="form-control" type="file" id="fileUpload" onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm"></span> Submitting...
                        </>
                    ) : (
                        "Submit"
                    )}
                </button>
            </form>

            {summary && (
                <div className="mt-4 pt-5">
                    <h2 className={styles["labl"]}>Case Summary</h2>
                    <div className={styles["summary-box"]}>
                        <p>{summary}</p>
                    </div>
                </div>
            )}

            {ipcSection && (
                <div className="mt-4">
                    <h2 className={styles["labl"]}>IPC Sections & Punishments</h2>
                    <div className={styles["ipc-box"]}>
                        <ul>
                            {ipcSection.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {chartData && (
                <div className="mt-4 pt-5">
                    <h2 className={styles["labl"]}>Prediction Results</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis allowDecimals={false} />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className={styles["tooltip-box"]} style={{
                                                background: "#fff",
                                                padding: "10px",
                                                border: "1px solid #ccc",
                                                borderRadius: "5px"
                                            }}>
                                                <p><strong>{data.category}</strong>: {data.count}</p>
                                                {data.models.length > 0 && (
                                                    <div>
                                                        <p><strong>Models:</strong></p>
                                                        <ul style={{ margin: 0, paddingLeft: "15px" }}>
                                                            {data.models.map((model, index) => (
                                                                <li key={index} style={{ listStyleType: "circle" }}>{model}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar dataKey="count" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>

                    {majorPrediction && (
                        <div className={styles["pred"]}>
                            <h2 className={styles["labl"]}>Major Prediction:</h2>
                            <img
                                src={verdictImages[majorPrediction.category]}
                                alt={majorPrediction.category}
                                className={styles["verdict-image"]}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Prediction;
