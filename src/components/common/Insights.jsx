import React from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

const modelsPerformance = [
  { model: "Decision Tree", accuracy: 84.76, precision: 85.12, recall: 84.79, f1: 84.68, auc: 89.19 },
  { model: "Random Forest", accuracy: 90.48, precision: 90.94, recall: 90.49, f1: 90.6, auc: 98.42 },
  { model: "Logistic Regression", accuracy: 92.38, precision: 92.45, recall: 92.34, f1: 92.38, auc: 98.22 },
  { model: "Adaboost", accuracy: 84.76, precision: 87.59, recall: 84.76, f1: 85.29, auc: 96.05 },
  { model: "XGBoost", accuracy: 86.67, precision: 87.3, recall: 86.65, f1: 86.86, auc: 97.76 },
  { model: "LightGBM", accuracy: 86.67, precision: 87.5, recall: 86.68, f1: 86.89, auc: 97.35 },
  { model: "CatBoost", accuracy: 92.38, precision: 92.56, recall: 92.34, f1: 92.35, auc: 98.82 },
  { model: "KNN", accuracy: 88.57, precision: 89.68, recall: 88.5, f1: 88.07, auc: 97.47 },
  { model: "SVM", accuracy: 90.48, precision: 90.86, recall: 90.38, f1: 90.28, auc: 97.92 },
];

const catboostConfusion = [
  { label: "Acquittal", Acquittal: 85, Conviction: 5, BailGranted: 3, BailNotGranted: 2 },
  { label: "Conviction", Acquittal: 7, Conviction: 103, BailGranted: 4, BailNotGranted: 3 },
  { label: "Bail Granted", Acquittal: 2, Conviction: 3, BailGranted: 78, BailNotGranted: 6 },
  { label: "Bail Rejected", Acquittal: 4, Conviction: 3, BailGranted: 5, BailNotGranted: 92 },
];

const Insights = () => {
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-bold text-center">Judicial Outcome Prediction Insights</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Model Accuracy Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={modelsPerformance}>
              <XAxis dataKey="model" angle={-45} textAnchor="end" interval={0} height={80} />
              <YAxis domain={[80, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="accuracy" fill="#4F46E5" name="Accuracy (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold mb-2">CatBoost ROC AUC</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={[{ name: "AUC Score", value: 98.82 }, { name: "Remaining", value: 1.18 }]}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              dataKey="value"
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4" >
        <h2 className="text-xl font-semibold mb-4">CatBoost Confusion Matrix (Actual vs Predicted)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={catboostConfusion} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 20 }} >
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="label" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Acquittal" stackId="a" fill="#60A5FA" />
            <Bar dataKey="Conviction" stackId="a" fill="#34D399" />
            <Bar dataKey="BailGranted" stackId="a" fill="#FBBF24" />
            <Bar dataKey="BailNotGranted" stackId="a" fill="#F87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>


      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Model F1 Score Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={modelsPerformance}>
            <XAxis dataKey="model" angle={-45} textAnchor="end" interval={0} height={80} />
            <YAxis domain={[80, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="f1" fill="#6366F1" name="F1 Score (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Insights;