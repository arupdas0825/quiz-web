// QuestionNavigator.jsx
// Drop this file into: src/components/QuestionNavigator.jsx

import React from "react";
import "./QuestionNavigator.css";

/**
 * Props:
 *  - totalQuestions : number   (e.g. 25)
 *  - currentIndex   : number   (0-based index of active question)
 *  - answers        : object   { [questionIndex]: selectedOption }  — only present when answered
 *  - visited        : Set<number>  — indices the user has opened at least once
 *  - onNavigate     : (index: number) => void
 */
const QuestionNavigator = ({
  totalQuestions = 25,
  currentIndex = 0,
  answers = {},
  visited = new Set(),
  onNavigate,
}) => {
  const getStatus = (idx) => {
    if (answers[idx] !== undefined) return "answered";   // green
    if (visited.has(idx)) return "visited";              // red  (visited but unanswered)
    return "not-viewed";                                 // white/grey
  };

  return (
    <div className="qnav-panel">
      <div className="qnav-header">
        <span className="qnav-icon">☰</span>
        <span className="qnav-title">Questions</span>
      </div>

      <div className="qnav-grid">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const status = getStatus(i);
          const isActive = i === currentIndex;
          return (
            <button
              key={i}
              className={`qnav-btn qnav-${status}${isActive ? " qnav-active" : ""}`}
              onClick={() => onNavigate && onNavigate(i)}
              title={`Question ${i + 1}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="qnav-legend">
        <div className="qnav-legend-item">
          <span className="qnav-dot dot-answered" />
          <span>Answered</span>
        </div>
        <div className="qnav-legend-item">
          <span className="qnav-dot dot-visited" />
          <span>Not Answered</span>
        </div>
        <div className="qnav-legend-item">
          <span className="qnav-dot dot-not-viewed" />
          <span>Not Visited</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigator;
