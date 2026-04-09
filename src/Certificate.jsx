import React, { forwardRef } from "react";

const Certificate = forwardRef(({ name, score, subject, date, isPass }, ref) => {
  const theme = isPass ? {
    bg: '#050a18',
    innerBg: '#0a1024',
    primary: '#fbbf24',
    secondary: '#cbd5e1',
    accent: '#10b981',
    font: '#f8fafc',
    watermark: 'CERTIFIED',
    title: 'Certificate of Achievement',
    desc: 'for successfully passing the assessment in',
    scoreLabel: 'with a verified score of'
  } : {
    bg: '#fef3c7',
    innerBg: '#fffbeb',
    primary: '#d97706',
    secondary: '#78350f',
    accent: '#f59e0b',
    font: '#451a03',
    watermark: 'ATTEMPTED',
    title: 'Certificate of Participation',
    desc: 'for bravely attempting the assessment in',
    scoreLabel: 'achieving a score of'
  };

  const Corner = ({ top, right, bottom, left }) => (
    <div style={{
      position: 'absolute',
      width: '60px',
      height: '60px',
      top: top ? '24px' : 'auto',
      bottom: bottom ? '24px' : 'auto',
      left: left ? '24px' : 'auto',
      right: right ? '24px' : 'auto',
      borderTop: top ? `4px solid ${theme.primary}` : 'none',
      borderBottom: bottom ? `4px solid ${theme.primary}` : 'none',
      borderLeft: left ? `4px solid ${theme.primary}` : 'none',
      borderRight: right ? `4px solid ${theme.primary}` : 'none',
    }} />
  );

  return (
    <div ref={ref} style={{ width: '297mm', height: '210mm', backgroundColor: theme.bg, fontFamily: 'Inter, sans-serif', padding: '24px', boxSizing: 'border-box' }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');`}
      </style>
      <div style={{ width: '100%', height: '100%', backgroundColor: theme.innerBg, padding: '40px', position: 'relative', boxSizing: 'border-box', overflow: 'hidden' }}>
        
        {/* Corners */}
        <Corner top left />
        <Corner top right />
        <Corner bottom left />
        <Corner bottom right />

        {/* Watermark */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-15deg)', opacity: 0.04, pointerEvents: 'none', fontSize: '160px', fontWeight: '900', color: theme.primary, letterSpacing: '24px', whiteSpace: 'nowrap', zIndex: 0 }}>
          {theme.watermark}
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
          
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '56px', fontWeight: '700', color: theme.primary, margin: '0 0 24px 0', letterSpacing: '2px' }}>
            {theme.title}
          </h1>

          <p style={{ fontSize: '22px', color: theme.secondary, margin: '0 0 20px 0', fontStyle: 'italic', fontFamily: '"Playfair Display", serif' }}>
            This certificate is proudly presented to
          </p>

          <h2 style={{ fontSize: '48px', fontWeight: '700', color: theme.font, borderBottom: `2px solid ${theme.primary}40`, paddingBottom: '12px', margin: '0 0 24px 0', width: '75%', textTransform: 'capitalize' }}>
            {name}
          </h2>

          <p style={{ fontSize: '20px', color: theme.secondary, margin: '0 0 12px 0' }}>
            {theme.desc}
          </p>

          <h3 style={{ fontSize: '32px', fontWeight: '600', color: theme.font, margin: '0 0 24px 0', letterSpacing: '1px' }}>
            {subject}
          </h3>

          <p style={{ fontSize: '20px', color: theme.secondary, margin: '0 0 6px 0' }}>
            {theme.scoreLabel}
          </p>

          <h1 style={{ fontSize: '64px', fontWeight: '800', color: theme.accent, margin: '0 0 16px 0', textShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            {score}%
          </h1>

          {!isPass && (
            <p style={{ fontSize: '18px', color: theme.primary, fontStyle: 'italic', fontWeight: '600', margin: '0 0 20px 0' }}>
              "Better luck next time! Learning is a continuous journey." 
            </p>
          )}

          {/* Footer Branding */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '3px', backgroundColor: theme.primary, marginBottom: '20px', opacity: 0.5 }} />
            <div style={{ fontSize: '16px', fontWeight: '700', color: theme.font, letterSpacing: '2px', textTransform: 'uppercase' }}>
              QuizPortal System
            </div>
            <div style={{ fontSize: '14px', color: theme.secondary, marginTop: '8px', fontWeight: '500' }}>
              {date}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

export default Certificate;