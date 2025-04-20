// OpinionsList.jsx - This component shows opinion summaries and top comments

import React from "react";

export default function OpinionsList({ opinions = {}, comentaris = {} }) {
  // Separate the opinions and comments by sentiment
  const { positives = [], negatives = [] } = opinions;
  const { positius = [], negatius = [] } = comentaris;

  // Sort positive comments by vote count and take top 3
  const destacatsPositius = [...positius]
    .filter(c => c.text?.trim() !== "")
    .sort((a, b) => b.vots - a.vots)
    .slice(0, 3);

  // Sort negative comments by vote count and take top 3
  const destacatsNegatius = [...negatius]
    .filter(c => c.text?.trim() !== "")
    .sort((a, b) => b.vots - a.vots)
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left block: positive opinions and comments */}
      <div className="space-y-6">

        {/* Box with summary of positive opinions */}
        <div className="rounded-xl border border-green-100 bg-green-50 p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-green-800 border-b pb-2">
            Opinions positives
          </h3>

          <ul className="space-y-2 text-sm text-green-900">
            {positives.length > 0 ? (
              positives.map((op, i) => (
                <li key={i} className="leading-relaxed">
                  {op}
                </li>
              ))
            ) : (
              <li>No hi ha opinions positives destacades.</li>
            )}
          </ul>
        </div>

        {/* Box with top positive comments */}
        <div className="rounded-xl border border-green-100 bg-green-50 p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-green-800 border-b pb-2">
            Comentaris destacats positius
          </h3>

          <ul className="space-y-3">
            {destacatsPositius.length > 0 ? (
              destacatsPositius.map((c, i) => (
                <li key={i} className="text-sm leading-relaxed">
                  <p className="text-green-900">{c.text}</p>
                  <span className="text-xs text-gray-600">
                    Vots: {c.vots} · Respostes: {c.respostes}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-sm">No hi ha comentaris positius destacats amb contingut.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Right block: negative opinions and comments */}
      <div className="space-y-6">

        {/* Box with summary of negative opinions */}
        <div className="rounded-xl border border-red-100 bg-red-50 p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-red-800 border-b pb-2">
            Opinions negatives
          </h3>

          <ul className="space-y-2 text-sm text-red-900">
            {negatives.length > 0 ? (
              negatives.map((op, i) => (
                <li key={i} className="leading-relaxed">
                  {op}
                </li>
              ))
            ) : (
              <li>No hi ha opinions negatives destacades.</li>
            )}
          </ul>
        </div>

        {/* Box with top negative comments */}
        <div className="rounded-xl border border-red-100 bg-red-50 p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-red-800 border-b pb-2">
            Comentaris destacats negatius
          </h3>

          <ul className="space-y-3">
            {destacatsNegatius.length > 0 ? (
              destacatsNegatius.map((c, i) => (
                <li key={i} className="text-sm leading-relaxed">
                  <p className="text-red-900">{c.text}</p>
                  <span className="text-xs text-gray-600">
                    Vots: {c.vots} · Respostes: {c.respostes}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-sm">No hi ha comentaris negatius destacats amb contingut.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
