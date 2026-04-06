import React, { forwardRef } from "react";
import { Award, Frown, Smile } from "lucide-react";

const Certificate = forwardRef(({ name, score, subject, date, isPass }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: '297mm', // A4 Landscape
        height: '210mm',
        backgroundColor: '#ffffff',
        fontFamily: 'Inter, sans-serif',
        padding: '24px',
        boxSizing: 'border-box'
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        border: isPass ? '12px solid #0f172a' : '12px solid #f87171',
        padding: '12px',
        position: 'relative',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          border: isPass ? '2px solid #e2e8f0' : '2px dashed #fca5a5',
          backgroundColor: isPass ? '#fafafa' : '#fff5f5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '60px',
          boxSizing: 'border-box'
        }}>
          
          {/* Watermark Logo */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-15deg)',
            opacity: 0.03, pointerEvents: 'none'
          }}>
            {isPass ? <Award size={600} /> : <Frown size={600} />}
          </div>

          <div style={{
            color: isPass ? '#0f172a' : '#b91c1c',
            marginTop: '-20px', marginBottom: '20px'
          }}>
            {isPass ? <Award size={80} strokeWidth={1.5} /> : <Smile size={80} strokeWidth={1.5} />}
          </div>

          <h1 style={{
            fontSize: '48px', fontWeight: '800',
            color: isPass ? '#1e293b' : '#991b1b',
            textTransform: 'uppercase', letterSpacing: '4px',
            marginBottom: '40px', textAlign: 'center'
          }}>
            {isPass ? "Certificate of Achievement" : "Certificate of Participation 😄"}
          </h1>

          <p style={{
            fontSize: '20px', color: '#64748b', marginBottom: '20px', fontStyle: 'italic'
          }}>
            This certificate is proudly presented to
          </p>

          <h2 style={{
            fontSize: '42px', fontWeight: '700', color: '#0f172a',
            borderBottom: '2px solid #cbd5e1', paddingBottom: '10px',
            marginBottom: '20px', textAlign: 'center', width: '80%'
          }}>
            {name}
          </h2>

          <p style={{
            fontSize: '20px', color: '#64748b', marginBottom: '10px'
          }}>
            {isPass ? "for successfully passing the assessment in" : "for bravely attempting the assessment in"}
          </p>

          <h3 style={{
            fontSize: '28px', fontWeight: '600', color: '#334155',
            marginBottom: '20px'
          }}>
            {subject}
          </h3>

          <p style={{
            fontSize: '20px', color: '#64748b', marginBottom: '10px'
          }}>
            {isPass ? "with a verified score of" : "achieving a score of"}
          </p>

          <h1 style={{
            fontSize: '48px', fontWeight: '800',
            color: isPass ? '#10b981' : '#f59e0b',
            marginBottom: '40px'
          }}>
            {score}%
          </h1>

          {!isPass && (
            <p style={{
              fontSize: '18px', color: '#ef4444', fontStyle: 'italic', fontWeight: '500', marginBottom: '20px'
            }}>
              "Better luck next time! Learning is a journey." 🚀
            </p>
          )}

          {/* Footer Signatures */}
          <div style={{
            display: 'flex', width: '100%', justifyContent: 'space-between',
            marginTop: 'auto', padding: '0 40px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '18px', fontWeight: '600', color: '#0f172a',
                borderBottom: '1px solid #cbd5e1', paddingBottom: '8px', padding: '0 20px', marginBottom: '8px'
              }}>
                {date}
              </div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>Date of Issue</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '28px', fontFamily: "'Brush Script MT', cursive, serif", color: '#0f172a',
                borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', padding: '0 20px', marginBottom: '8px',
                height: '40px', lineHeight: '40px'
              }}>
                Arup Das
              </div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>Course Instructor</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Certificate;