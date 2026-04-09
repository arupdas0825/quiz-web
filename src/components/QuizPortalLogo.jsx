import React from "react";

export default function QuizPortalLogo({ theme = "dark", size = "md" }) {
  const scale = size === "sm" ? 0.7 : size === "lg" ? 1.3 : 1;
  const w = Math.round(220 * scale);
  const h = Math.round(52 * scale);
  const isDark = theme === "dark";

  return (
    <svg width={w} height={h} viewBox="0 0 220 52"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="qpgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#6366f1"/>
        </linearGradient>
      </defs>
      <rect x="0" y="6" width="40" height="40" rx="10"
        fill="url(#qpgrad)"/>
      <text x="20" y="32" textAnchor="middle"
        fontFamily="Inter,sans-serif"
        fontSize="20" fontWeight="700" fill="#fff">Q</text>
      <rect x="28" y="4" width="12" height="12" rx="3"
        fill={isDark ? "#f59e0b" : "#d97706"}/>
      <text x="34" y="13.5" textAnchor="middle"
        fontFamily="Inter,sans-serif"
        fontSize="7" fontWeight="700" fill="#fff">P</text>
      <text x="54" y="24" fontFamily="Inter,sans-serif"
        fontSize="20" fontWeight="700"
        fill={isDark ? "#ffffff" : "#0f172a"}>Quiz</text>
      <text x="104" y="24" fontFamily="Inter,sans-serif"
        fontSize="20" fontWeight="700" fill="#6366f1">Portal</text>
      <text x="54" y="38" fontFamily="Inter,sans-serif"
        fontSize="10" fontWeight="400"
        fill={isDark ? "#94a3b8" : "#64748b"}
        letterSpacing="2">EXAM SYSTEM</text>
    </svg>
  );
}
