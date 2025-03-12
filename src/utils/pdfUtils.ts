
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AnalysisData } from '@/components/analysis/AnalysisResult';

export const generatePDF = async (result: AnalysisData, elementId: string): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found");
    }

    // Create PDF with A4 dimensions
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Capture the element as a canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      logging: false,
      useCORS: true,
      allowTaint: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    
    // Calculate dimensions to fit the image within PDF
    const ratio = Math.min(
      pdfWidth / imgProps.width,
      pdfHeight / imgProps.height
    );
    const imgWidth = imgProps.width * ratio;
    const imgHeight = imgProps.height * ratio;
    
    // Add image to PDF
    pdf.addImage(
      imgData,
      'PNG',
      (pdfWidth - imgWidth) / 2, // Center image horizontally
      10, // Top margin
      imgWidth,
      imgHeight
    );
    
    // Add metadata
    pdf.setProperties({
      title: `Medical Report - ${result.documentType}`,
      subject: 'Medical Analysis Report',
      author: 'HealthLens AI',
      creator: 'HealthLens AI'
    });
    
    // Save the PDF
    pdf.save(`medical-report-${Date.now()}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  }
};
