import React from 'react';

export default function ExamLayout({ leftPane, rightPane, headerLeft, headerRight }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#050a18',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        height: '70px',
        background: 'rgba(10, 16, 36, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', position: 'sticky', top: 0, zIndex: 10
      }}>
        <div>{headerLeft}</div>
        <div>{headerRight}</div>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: '32px',
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        padding: '32px'
      }}>
        {/* Left Pane (Questions, Controls) */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {leftPane}
        </div>

        {/* Right Pane (Timer, Navigator) */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '24px',
          position: 'sticky', top: '102px', height: 'fit-content'
        }}>
          {rightPane}
        </div>
      </main>
    </div>
  );
}
