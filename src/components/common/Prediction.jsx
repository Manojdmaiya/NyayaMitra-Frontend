import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import styles from '../../styles/Prediction.module.css';

const verdictImages = {
    "Acquitted": "/Acquitted.jpeg",
    "Bail Granted": "/BAIL GRANTED.jpeg",
    "Bail Rejected": "/BAIL REJECTED.jpeg",
    "Convicted": "/Convicted.jpeg"
};

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
};


const Prediction = ({ baseurl = "" }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [majorPrediction, setMajorPrediction] = useState(null);
    const [summary, setSummary] = useState(null);
    const [ipcSection, setIpcSection] = useState(null);
    const uploadUrl = `https://nyayamitra-backend-dev.onrender.com/api/${baseurl}/v1/upload`;

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

        const authToken = getCookie("authToken");


        try {
            const response = await axios.post(uploadUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${authToken}`,
                }
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

    const handleDownloadPDF = async () => {
        try {
            const doc = new jsPDF();

            const loadImage = (src) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img);
                    img.onerror = (err) => reject(err);
                });
            };

            let y = 50;

            try {
                const img = await loadImage("../../../public/judiciary_logo-removebg-preview.png"); // Your own logo
                doc.addImage(img, "PNG", 20, 5, 35, 35);
            } catch (err) {
                console.warn("Logo image failed to load. Continuing without it.");
            }

            // Header - Private Branding
            doc.setFont("Times", "bold");
            doc.setFontSize(18);
            doc.text("NYAYA-MITRA", 105, 20, { align: "center" });

            doc.setFont("Times", "italic");
            doc.setFontSize(14);
            doc.text("AI-Powered Case Outcome Analysis", 105, 28, { align: "center" });

            doc.setFont("Times", "normal");
            doc.setFontSize(12);
            doc.text("Case Outcome Report", 105, 36, { align: "center" });

            doc.line(10, 40, 200, 40);

            // Summary
            if (summary) {
                doc.setFont("Helvetica", "bold");
                doc.setFontSize(12);
                doc.text("Case Summary:", 10, y);
                y += 8;

                doc.setFont("Helvetica", "normal");
                const lines = doc.splitTextToSize(summary, 190);
                doc.text(lines, 10, y);
                y += lines.length * 6 + 10;
            }

            // IPC Sections
            if (ipcSection) {
                doc.setFont("Helvetica", "bold");
                doc.text("Relevant IPC Sections & Potential Legal Implications:", 10, y);
                y += 8;

                doc.setFont("Helvetica", "normal");
                ipcSection.forEach((item, index) => {
                    const wrappedText = doc.splitTextToSize(`${index + 1}. ${item}`, 190);
                    doc.text(wrappedText, 10, y);
                    y += wrappedText.length * 6;
                });
                y += 10;
            }

            // Final Verdict - AI Prediction
            // Final Verdict with Color and Hammer Symbol
            if (majorPrediction) {
                y += 15; // Add some space before verdict section

                doc.setFont("Helvetica", "bold");
                doc.setFontSize(12);
                doc.text("Final Verdict (AI-Powered Prediction):", 10, y);
                y += 10;

                const category = majorPrediction.category;
                const verdictText = category?.toUpperCase() || "UNSPECIFIED";
                let verdictColor = [0, 0, 255]; // Default: blue

                if (category === "Convicted") verdictColor = [255, 0, 0];        // Red
                else if (category === "Acquitted") verdictColor = [0, 128, 0];   // Green
                else if (category === "Bail Rejected") verdictColor = [255, 102, 0]; // Orange
                else if (category === "Bail Granted") verdictColor = [0, 0, 139];    // Dark Blue

                // Set color and print verdict text
                doc.setTextColor(...verdictColor);
                doc.setFont("Helvetica", "bold");
                doc.setFontSize(14);
                doc.text(verdictText, 40, y);

                // Hammer symbol (small icon beside the verdict)
                try {
                    const hammerIcon = await loadImage("../../../public/hammer.png"); // adjust path
                    doc.addImage(hammerIcon, "PNG", 10, y - 4, 25, 15); // small hammer left to verdict
                } catch (imgErr) {
                    console.warn("Hammer icon not loaded:", imgErr);
                }

                doc.setTextColor(0, 0, 0); // Reset to black
                y += 25; // Space after verdict
            }



            // Prepare disclaimer lines
            const disclaimer = "Disclaimer: This document contains AI-generated insights intended for informational use only. It does not constitute legal advice or a judicial opinion. For official counsel, consult a licensed legal professional.";
            doc.setFont("Times", "italic");
            doc.setFontSize(10);
            const disclaimerLines = doc.splitTextToSize(disclaimer, 180);
            const disclaimerHeight = disclaimerLines.length * 5; // Rough estimate (5px per line)

            // Place disclaimer ~30 units from the bottom
            const disclaimerY = 295 - disclaimerHeight - 10;
            doc.text(disclaimerLines, 10, disclaimerY);

            // Footer below disclaimer
            doc.setFont("Helvetica", "normal");
            doc.setFontSize(8);
            doc.text("Generated by NyayaMitra | Private & Confidential", 105, 290, { align: "center" });

            doc.save("Case_Prediction_Report.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        }
    };

    const handleViewPDF = async () => {
        try {
            const doc = new jsPDF();

            const loadImage = (src) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img);
                    img.onerror = (err) => reject(err);
                });
            };

            let y = 50;

            try {
                const img = await loadImage("../../../public/judiciary_logo-removebg-preview.png"); // Your own logo
                doc.addImage(img, "PNG", 20, 5, 35, 35);
            } catch (err) {
                console.warn("Logo image failed to load. Continuing without it.");
            }

            // Header - Private Branding
            doc.setFont("Times", "bold");
            doc.setFontSize(18);
            doc.text("NYAYA-MITRA", 105, 20, { align: "center" });

            doc.setFont("Times", "italic");
            doc.setFontSize(14);
            doc.text("AI-Powered Case Outcome Analysis", 105, 28, { align: "center" });

            doc.setFont("Times", "normal");
            doc.setFontSize(12);
            doc.text("Case Outcome Report", 105, 36, { align: "center" });

            doc.line(10, 40, 200, 40);

            // Summary
            if (summary) {
                doc.setFont("Helvetica", "bold");
                doc.setFontSize(12);
                doc.text("Case Summary:", 10, y);
                y += 8;

                doc.setFont("Helvetica", "normal");
                const lines = doc.splitTextToSize(summary, 190);
                doc.text(lines, 10, y);
                y += lines.length * 6 + 10;
            }

            // IPC Sections
            if (ipcSection) {
                doc.setFont("Helvetica", "bold");
                doc.text("Relevant IPC Sections & Potential Legal Implications:", 10, y);
                y += 8;

                doc.setFont("Helvetica", "normal");
                ipcSection.forEach((item, index) => {
                    const wrappedText = doc.splitTextToSize(`${index + 1}. ${item}`, 190);
                    doc.text(wrappedText, 10, y);
                    y += wrappedText.length * 6;
                });
                y += 10;
            }

            // Final Verdict - AI Prediction
            if (majorPrediction) {
                y += 15; // Add some space before verdict section

                doc.setFont("Helvetica", "bold");
                doc.setFontSize(12);
                doc.text("Final Verdict (AI-Powered Prediction):", 10, y);
                y += 10;

                const category = majorPrediction.category;
                const verdictText = category?.toUpperCase() || "UNSPECIFIED";
                let verdictColor = [0, 0, 255]; // Default: blue

                if (category === "Convicted") verdictColor = [255, 0, 0];        // Red
                else if (category === "Acquitted") verdictColor = [0, 128, 0];   // Green
                else if (category === "Bail Rejected") verdictColor = [255, 102, 0]; // Orange
                else if (category === "Bail Granted") verdictColor = [0, 0, 139];    // Dark Blue

                // Set color and print verdict text
                doc.setTextColor(...verdictColor);
                doc.setFont("Helvetica", "bold");
                doc.setFontSize(14);
                doc.text(verdictText, 40, y);

                // Hammer symbol (small icon beside the verdict)
                try {
                    const hammerIcon = await loadImage("../../../public/hammer.png"); // adjust path
                    doc.addImage(hammerIcon, "PNG", 10, y - 4, 25, 15); // small hammer left to verdict
                } catch (imgErr) {
                    console.warn("Hammer icon not loaded:", imgErr);
                }

                doc.setTextColor(0, 0, 0); // Reset to black
                y += 25; // Space after verdict
            }

            // Disclaimer
            const disclaimer = "Disclaimer: This document contains AI-generated insights intended for informational use only. It does not constitute legal advice or a judicial opinion. For official counsel, consult a licensed legal professional.";
            doc.setFont("Times", "italic");
            doc.setFontSize(10);
            const disclaimerLines = doc.splitTextToSize(disclaimer, 180);
            const disclaimerHeight = disclaimerLines.length * 5;

            const disclaimerY = 295 - disclaimerHeight - 10;
            doc.text(disclaimerLines, 10, disclaimerY);

            // Footer
            doc.setFont("Helvetica", "normal");
            doc.setFontSize(8);
            doc.text("Generated by NyayaMitra | Private & Confidential", 105, 290, { align: "center" });

            // Open PDF in a new tab
            const pdfBlob = doc.output("blob");
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, "_blank");
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className={styles["ttle"]}>Predictions</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fileUpload" className={styles["note"]}>Please upload a file to get started with predictions</label>
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

            {/* Button to Download PDF */}
            {(summary || ipcSection || majorPrediction) && (
                <div className="text-center">
                    <h3 className="mb-3">Generate Your Report</h3>
                    <div className="d-flex justify-content-center align-items-center gap-3">
                        <button
                            className="btn btn-secondary d-flex align-items-center gap-2"
                            onClick={handleViewPDF}
                            title="View the report in a new tab"
                        >
                            <i className="fas fa-eye"></i> View PDF
                        </button>
                        <button
                            className="btn btn-primary d-flex align-items-center gap-2"
                            onClick={handleDownloadPDF}
                            title="Download the report as a PDF file"
                        >
                            <i className="fas fa-download"></i> Download PDF
                        </button>

                    </div>
                    <p className="mt-2 mb-5 text-muted">
                        The report includes case summary, IPC sections, and AI-powered predictions.
                    </p>
                </div>
            )}

        </div>
    );
};

export default Prediction;
