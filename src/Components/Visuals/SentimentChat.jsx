// SentimentChart.jsx - Shows a pie or bar chart with sentiment distribution

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"; // Chart components
import { Switch } from "@headlessui/react"; // UI toggle (not used in this file)

const COLORS = {
  positiu: "#22c55e",  // Green
  negatiu: "#ef4444",  // Red
  neutre: "#9ca3af",   // Gray
};

export default function SentimentChart({ sentiments }) {
  const [showPieChart, setShowPieChart] = useState(true); // Controls chart type

  // Prepare the data to be shown in the charts
  const chartData = [
    { name: "Positius", value: sentiments.positiu, color: COLORS.positiu },
    { name: "Negatius", value: sentiments.negatiu, color: COLORS.negatiu },
    { name: "Neutres", value: sentiments.neutre, color: COLORS.neutre },
  ];

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Header with chart type toggle */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-blue-gray-800">
          Distribució de sentiments
        </h2>

        {/* Toggle buttons to switch chart type */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Gràfic:</span>

          <div className="relative inline-flex items-center bg-gray-200 rounded-full w-28 h-9 p-1">
            {/* Bar chart button */}
            <button
              onClick={() => setShowPieChart(false)}
              className={`w-1/2 text-sm rounded-full transition-all duration-300 
                ${!showPieChart ? "bg-blue-600 text-white shadow" : "text-gray-600"}
              `}
            >
              Barres
            </button>

            {/* Pie chart button */}
            <button
              onClick={() => setShowPieChart(true)}
              className={`w-1/2 text-sm rounded-full transition-all duration-300 
                ${showPieChart ? "bg-blue-600 text-white shadow" : "text-gray-600"}
              `}
            >
              Pastís
            </button>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <ResponsiveContainer width="100%" height={300}>
        {showPieChart ? (
          // Pie chart view
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false} // Hide label lines
            >
              {/* Color each pie slice */}
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip /> {/* Show values on hover */}
            <Legend /> {/* Show legend with labels */}
          </PieChart>
        ) : (
          // Bar chart view
          <BarChart data={chartData} layout="vertical">
            <XAxis type="number" hide domain={[0, "dataMax + 10"]} /> {/* Hide x-axis */}
            <YAxis
              type="category"
              dataKey="name"
              width={80} // Avoid text being cut off
            />
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
