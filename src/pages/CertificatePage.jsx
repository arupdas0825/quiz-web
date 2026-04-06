import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Certificate from "../Certificate";
import { ArrowLeft, Download, Printer } from "lucide-react";

export default function CertificatePage({ navigate, result }) {
  if (!result) { navigate('welcome'); return null }

  const certRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => certRef.current,
    documentTitle: `${result.studentName} - Quiz Certificate`,
  });

  const handleDownloadPDF = async () => {
    const element = certRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${result.studentName}_Quiz_Certificate.pdf`);
    } catch (error) {
      console.error("Error generating PDF", error);
      alert("Failed to generate PDF. You can try the Print option instead.");
    }
  };

  const isPass = result.gradePoint > 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050a18',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px', fontFamily: 'Inter, sans-serif',
      color: '#f8fafc'
    }}>
      <div style={{ width: '100%', maxWidth: '297mm', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          onClick={() => navigate('result')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '15px', fontWeight: '500', transition: 'color 0.2s' }}
          onMouseOver={(e) => e.target.style.color = '#fff'}
          onMouseOut={(e) => e.target.style.color = '#94a3b8'}
        >
          <ArrowLeft size={18} /> Back to Result
        </button>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handlePrint}
            style={{
              background: 'transparent', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.2)',
              padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Printer size={18} /> Print
          </button>
          
          <button
            onClick={handleDownloadPDF}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none',
              padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', transition: 'transform 0.2s',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Download size={18} /> Download PDF
          </button>
        </div>
      </div>

      <div style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        borderRadius: '8px'
      }}>
        <Certificate
          ref={certRef}
          name={result.studentName}
          score={result.percentage}
          subject={result.subject}
          date={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          isPass={isPass}
        />
      </div>
    </div>
  );
}