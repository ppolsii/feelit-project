// SentimentChart.jsx – Displays a sentiment distribution chart (pie or bar)

import React, { useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

import styles from "./Visuals.module.css"; // Import styles for layout and toggles

// Define chart colors for each sentiment category
const COLORS = {
  positiu: "#22c55e", // green
  negatiu: "#ef4444", // red
  neutre: "#9ca3af",  // gray
};

export default function SentimentChart({ sentiments }) {
  // Toggle state for chart view (pie or bar)
  const [showPieChart, setShowPieChart] = useState(true);

  // Transform sentiment counts into data format for charts
  const chartData = [
    { name: "Positius", value: sentiments.positiu, color: COLORS.positiu },
    { name: "Negatius", value: sentiments.negatiu, color: COLORS.negatiu },
    { name: "Neutres", value: sentiments.neutre, color: COLORS.neutre },
  ];

  return (
    <div className={styles.chartWrapper}>
      {/* Top section: title and chart toggle */}
      <div className={styles.chartHeader}>
        <h2 className={styles.chartTitle}>{/* Sentiment distribution   */}</h2>

        {/* Toggle buttons to switch between chart types */}
        <div className={styles.chartToggle}>
          <span className={styles.chartToggleLabel}>Chart:</span>
          <div className={styles.chartToggleGroup}>
            <button
              onClick={() => setShowPieChart(false)}
              className={`${styles.chartToggleButton} ${!showPieChart ? styles.chartToggleActive : ""}`}
            >
              Bars
            </button>
            <button
              onClick={() => setShowPieChart(true)}
              className={`${styles.chartToggleButton} ${showPieChart ? styles.chartToggleActive : ""}`}
            >
              Pie
            </button>
          </div>
        </div>
      </div>

      {/* Main chart display (either Pie or Bar) */}
      <ResponsiveContainer width="100%" height={300}>
        {showPieChart ? (
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <BarChart data={chartData} layout="vertical">
            <XAxis type="number" hide domain={[0, "dataMax + 10"]} />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
