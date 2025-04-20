// CommentCard.jsx - This component shows a single comment with its details

import React from "react";

// 💡 Style settings depending on the comment's sentiment
const sentimentStyles = {
  positiu: {
    border: "border-green-100",
    bg: "bg-green-50",
    text: "text-green-800",
  },
  negatiu: {
    border: "border-red-100",
    bg: "bg-red-50",
    text: "text-red-800",
  },
  neutre: {
    border: "border-gray-200",
    bg: "bg-gray-50",
    text: "text-gray-700",
  },
};

export default function CommentCard({ comentari }) {
  // Extract data from the comment
  const { text, sentiment, vots, respostes } = comentari;

  // Pick the right styles based on sentiment
  const styles = sentimentStyles[sentiment] || sentimentStyles.neutre;

  return (
    <div className={`rounded border ${styles.border} ${styles.bg} p-5 shadow-sm`}>
      {/* Main comment text */}
      <p className={`mb-3 text-sm leading-relaxed ${styles.text}`}>
        {text}
      </p>

      {/* Comment details: votes, replies and sentiment */}
      <div className="text-xs text-gray-600 flex flex-wrap gap-4">
        <span>
          Vots: <strong>{vots}</strong>
        </span>
        <span>
          Respostes: <strong>{respostes}</strong>
        </span>
        <span>
          Sentiment: <span className="capitalize">{sentiment}</span>
        </span>
      </div>
    </div>
  );
}
