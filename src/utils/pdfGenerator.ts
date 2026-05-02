import { jsPDF } from 'jspdf';

export const generatePolicyPDF = (policy: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('INSURANCE ADVISOR', 20, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Official Policy Document', 150, 25);
  
  // Policy Content
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(policy.product, 20, 60);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`${policy.company} • ${policy.id}`, 20, 67);
  
  // Details Section
  doc.setDrawColor(226, 232, 240);
  doc.line(20, 75, 190, 75);
  
  const drawField = (label: string, value: string, x: number, y: number) => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(148, 163, 184);
    doc.text(label.toUpperCase(), x, y);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(value, x, y + 7);
  };
  
  drawField('Status', policy.status, 20, 90);
  drawField('Type', policy.type || 'Insurance', 80, 90);
  drawField('Renewal Date', policy.dueDate, 140, 90);
  
  drawField('Sum Assured', policy.sumAssured, 20, 110);
  drawField('Premium Amount', policy.premium, 80, 110);
  drawField('Policy Period', `${policy.startDate} - ${policy.endDate}`, 140, 110);
  
  // Coverage
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Coverage Details', 20, 135);
  
  if (policy.coverage && Array.isArray(policy.coverage)) {
    policy.coverage.forEach((item: string, index: number) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`• ${item}`, 25, 145 + (index * 8));
    });
  }
  
  // Contact
  const contactY = 200;
  doc.setFillColor(248, 250, 252);
  doc.rect(20, contactY, 170, 40, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('Primary Contact / Advisor', 30, contactY + 12);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${policy.contact.name}`, 30, contactY + 22);
  doc.text(`Phone: ${policy.contact.phone}`, 30, contactY + 29);
  doc.text(`Email: ${policy.contact.email}`, 30, contactY + 36);
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('This is a system-generated document. For verification, please contact support.', 105, 280, { align: 'center' });
  doc.text(`Generated on ${new Date().toLocaleString()}`, 105, 285, { align: 'center' });
  
  doc.save(`${policy.id}_Document.pdf`);
};

export const generateClaimPDF = (claim: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(249, 115, 22); // Orange for claims
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('CLAIM SETTLEMENT', 20, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Claim Acknowledgement Receipt', 140, 25);
  
  // Content
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(claim.type, 20, 60);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Claim ID: ${claim.id} • Policy: ${claim.policy}`, 20, 67);
  
  doc.line(20, 75, 190, 75);
  
  const drawField = (label: string, value: string, x: number, y: number) => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(148, 163, 184);
    doc.text(label.toUpperCase(), x, y);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(value, x, y + 7);
  };
  
  drawField('Current Status', claim.status, 20, 90);
  drawField('Submission Date', claim.date, 80, 90);
  drawField('Estimated Amount', claim.amount, 140, 90);
  
  drawField('Insurer', claim.insurer, 20, 110);
  drawField('Processing Stage', `Stage ${claim.stage} of 4`, 80, 110);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Current Progress', 20, 135);
  
  const stages = ['Submitted', 'Verified', 'Approved', 'Settled'];
  stages.forEach((s, i) => {
    const isPast = i + 1 <= claim.stage;
    doc.setFontSize(10);
    doc.setFont('helvetica', isPast ? 'bold' : 'normal');
    doc.setTextColor(isPast ? 30 : 180, isPast ? 41 : 180, isPast ? 59 : 180);
    doc.text(`${i + 1}. ${s} ${isPast ? '[DONE]' : ''}`, 25, 145 + (i * 8));
  });
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Generated on ${new Date().toLocaleString()}`, 105, 285, { align: 'center' });
  
  doc.save(`${claim.id}_Status.pdf`);
};

export const generateLoanPDF = (loan: any) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(37, 99, 235); // Blue for loans
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('LOAN STATEMENT', 20, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Policy Asset Liquidity Statement', 140, 25);
  
  // Content
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(`Loan Reference: ${loan.id}`, 20, 60);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Collateral: ${loan.policy}`, 20, 67);
  
  doc.line(20, 75, 190, 75);
  
  const drawField = (label: string, value: string, x: number, y: number) => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(148, 163, 184);
    doc.text(label.toUpperCase(), x, y);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(value, x, y + 7);
  };
  
  drawField('Loan Status', loan.status, 20, 90);
  drawField('Disbursal Date', loan.date, 80, 90);
  drawField('Principal Amount', loan.amount, 140, 90);
  
  drawField('Interest Rate', loan.rate, 20, 110);
  drawField('Repayment Type', 'Fixed Monthly', 80, 110);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Terms & Conditions Summary', 20, 135);
  
  const terms = [
    'Fixed interest rate for the entire tenure',
    'No prepayment penalties',
    'Loan secured against policy surrender value',
    'Annual interest review applicable if specified'
  ];
  terms.forEach((t, i) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`• ${t}`, 25, 145 + (i * 8));
  });
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Generated on ${new Date().toLocaleString()}`, 105, 285, { align: 'center' });
  
  doc.save(`${loan.id}_Statement.pdf`);
};

export const generateGenericExportPDF = (title: string, data: any[]) => {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text(title, 20, 20);
  
  doc.setFontSize(10);
  let y = 40;
  data.forEach((item, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    const line = Object.entries(item).map(([key, val]) => `${key}: ${val}`).join(' | ');
    doc.text(line, 20, y);
    y += 10;
  });
  
  doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
};
