import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Idea } from '../types';

interface ExportModalProps {
  idea: Idea | null;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ idea, onClose }) => {
  if (!idea) return null;

  const [format, setFormat] = useState<'markdown' | 'json' | 'summary' | 'pdf'>('pdf');
  const [copied, setCopied] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  // Generate Markdown
  const markdownText = `# ${idea.title} - Technical Blueprint
**Tagline:** ${idea.tagline}
**Industry:** ${idea.industry} | **Complexity:** ${idea.complexity} | **Vibe:** ${idea.vibe}

## Description
${idea.description}

## Recommended Tech Stack
${idea.techStack.map((ts) => `- **${ts.name}** (${ts.category})`).join('\n')}

## Feature Breakdown
${idea.featureBreakdown.map((f, i) => `### ${i + 1}. ${f.title}\n${f.description}`).join('\n\n')}

## 3-Phase Implementation Roadmap

### ${idea.implementationRoadmap?.phase1?.title || 'Phase 1'}
${(idea.implementationRoadmap?.phase1?.tasks || []).map((t) => `- [ ] ${t}`).join('\n')}

### ${idea.implementationRoadmap?.phase2?.title || 'Phase 2'}
${(idea.implementationRoadmap?.phase2?.tasks || []).map((t) => `- [ ] ${t}`).join('\n')}

### ${idea.implementationRoadmap?.phase3?.title || 'Phase 3'}
${(idea.implementationRoadmap?.phase3?.tasks || []).map((t) => `- [ ] ${t}`).join('\n')}

## AI Developer Strategy
${idea.generatedStrategy || 'N/A'}
`;

  // Generate JSON
  const jsonText = JSON.stringify(idea, null, 2);

  // Generate Summary Text
  const summaryText = `PROJECT: ${idea.title}
TAGLINE: ${idea.tagline}
INDUSTRY: ${idea.industry} (${idea.complexity} level)

STACK: ${idea.techStack.map((t) => t.name).join(', ')}

SUMMARY:
${idea.description}
`;

  // PDF Preview Text
  const pdfPreviewText = `[PDF DOCUMENT GENERATOR ACTIVE]

Project Title: ${idea.title}
Tagline: ${idea.tagline}
Industry: ${idea.industry} | Complexity: ${idea.complexity}

Included in PDF Document:
✓ Executive Overview & Problem Context
✓ High-Resolution Tech Stack Specifications
✓ Complete Feature Breakdown & Time Estimates
✓ 3-Phase Interactive Implementation Roadmap
✓ AI Developer Prompting & Architectural Strategy

Click "Download PDF Blueprint" below to generate and save your formatted PDF document.`;

  const contentToDisplay =
    format === 'markdown'
      ? markdownText
      : format === 'json'
      ? jsonText
      : format === 'summary'
      ? summaryText
      : pdfPreviewText;

  const handleCopy = () => {
    navigator.clipboard.writeText(contentToDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    setIsGeneratingPdf(true);

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;

      const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
      };

      // Colors
      const purpleColor: [number, number, number] = [99, 14, 212];
      const darkColor: [number, number, number] = [25, 28, 30];
      const grayColor: [number, number, number] = [123, 116, 135];

      // Header Banner
      doc.setFillColor(...purpleColor);
      doc.rect(margin, y, contentWidth, 22, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text('IDEALAB - TECHNICAL PROJECT BLUEPRINT', margin + 6, y + 10);
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated on ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, margin + 6, y + 16);
      y += 30;

      // Title & Tagline
      doc.setTextColor(...darkColor);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      const titleLines = doc.splitTextToSize(idea.title, contentWidth);
      doc.text(titleLines, margin, y);
      y += titleLines.length * 8;

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10.5);
      doc.setTextColor(...grayColor);
      const taglineLines = doc.splitTextToSize(idea.tagline, contentWidth);
      doc.text(taglineLines, margin, y);
      y += taglineLines.length * 6 + 4;

      // Metadata Box
      doc.setFillColor(242, 244, 246);
      doc.roundedRect(margin, y, contentWidth, 20, 3, 3, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...darkColor);
      doc.text(`Industry: ${idea.industry}`, margin + 6, y + 8);
      doc.text(`Complexity: ${idea.complexity}`, margin + 6, y + 14);
      doc.text(`Vibe: ${idea.vibe}`, margin + 75, y + 8);
      if (idea.estimatedDevTime) {
        doc.text(`Est. Dev Time: ${idea.estimatedDevTime}`, margin + 75, y + 14);
      }
      y += 26;

      // Helper for section header
      const addSectionHeader = (title: string) => {
        checkPageBreak(16);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(...purpleColor);
        doc.text(title, margin, y);
        y += 2;
        doc.setDrawColor(...purpleColor);
        doc.setLineWidth(0.4);
        doc.line(margin, y, margin + contentWidth, y);
        y += 7;
      };

      // 1. Overview
      addSectionHeader('1. EXECUTIVE OVERVIEW & PROBLEM STATEMENT');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...darkColor);
      const descLines = doc.splitTextToSize(idea.description, contentWidth);
      checkPageBreak(descLines.length * 4.8);
      doc.text(descLines, margin, y);
      y += descLines.length * 4.8 + 8;

      // 2. Tech Stack
      addSectionHeader('2. RECOMMENDED TECHNOLOGY STACK');
      idea.techStack.forEach((tech) => {
        const text = `• ${tech.name} (${tech.category}): ${tech.reason || 'Optimal choice for production scaling.'}`;
        const lines = doc.splitTextToSize(text, contentWidth - 4);
        checkPageBreak(lines.length * 4.5 + 2);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...darkColor);
        doc.text(lines, margin + 4, y);
        y += lines.length * 4.5 + 2;
      });
      y += 6;

      // 3. Feature Breakdown
      if (idea.featureBreakdown && idea.featureBreakdown.length > 0) {
        addSectionHeader('3. CORE FEATURE BREAKDOWN');
        idea.featureBreakdown.forEach((feat, idx) => {
          checkPageBreak(16);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9.5);
          doc.setTextColor(...darkColor);
          doc.text(`${idx + 1}. ${feat.title}`, margin + 2, y);
          y += 5;

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(60, 60, 60);
          const fLines = doc.splitTextToSize(feat.description, contentWidth - 6);
          checkPageBreak(fLines.length * 4.2);
          doc.text(fLines, margin + 6, y);
          y += fLines.length * 4.2 + 5;
        });
        y += 4;
      }

      // 4. Roadmap
      if (idea.implementationRoadmap) {
        addSectionHeader('4. 3-PHASE IMPLEMENTATION ROADMAP');
        const phases = [
          idea.implementationRoadmap.phase1,
          idea.implementationRoadmap.phase2,
          idea.implementationRoadmap.phase3,
        ].filter(Boolean);

        phases.forEach((p, idx) => {
          checkPageBreak(14);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9.5);
          doc.setTextColor(...purpleColor);
          doc.text(`Phase ${idx + 1}: ${p.title}`, margin + 2, y);
          y += 5;

          p.tasks.forEach((task) => {
            const tLines = doc.splitTextToSize(`[ ] ${task}`, contentWidth - 10);
            checkPageBreak(tLines.length * 4.2);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8.5);
            doc.setTextColor(...darkColor);
            doc.text(tLines, margin + 8, y);
            y += tLines.length * 4.2 + 2;
          });
          y += 4;
        });
        y += 4;
      }

      // 5. AI Developer Strategy
      if (idea.generatedStrategy) {
        addSectionHeader('5. AI DEVELOPER ARCHITECTURAL STRATEGY');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...darkColor);
        const stratLines = doc.splitTextToSize(idea.generatedStrategy, contentWidth);
        checkPageBreak(stratLines.length * 4.2);
        doc.text(stratLines, margin, y);
        y += stratLines.length * 4.2 + 8;
      }

      const filename = `${idea.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-blueprint.pdf`;
      doc.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadFile = () => {
    if (format === 'pdf') {
      handleDownloadPDF();
      return;
    }
    const ext = format === 'markdown' ? 'md' : format === 'json' ? 'json' : 'txt';
    const blob = new Blob([contentToDisplay], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${idea.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-blueprint.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="glass-card bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-white/80 shadow-2xl space-y-6 max-h-[90vh] flex flex-col justify-between">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#e0e3e5] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl action-gradient flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-xl">download</span>
            </div>
            <div>
              <h3 className="text-lg font-black text-[#191c1e] font-headline">
                Export Technical Blueprint
              </h3>
              <p className="text-xs text-[#7b7487]">{idea.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-[#f2f4f6] text-[#7b7487] hover:text-[#191c1e]"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Format Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFormat('pdf')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              format === 'pdf'
                ? 'bg-[#630ed4] text-white shadow-sm'
                : 'bg-[#f2f4f6] text-[#4a4455] hover:bg-[#e6e8ea]'
            }`}
          >
            <span className="material-symbols-outlined text-base">picture_as_pdf</span>
            PDF Document (.pdf)
          </button>
          <button
            onClick={() => setFormat('markdown')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              format === 'markdown'
                ? 'bg-[#630ed4] text-white shadow-sm'
                : 'bg-[#f2f4f6] text-[#4a4455] hover:bg-[#e6e8ea]'
            }`}
          >
            <span className="material-symbols-outlined text-base">code</span>
            Markdown (.md)
          </button>
          <button
            onClick={() => setFormat('json')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              format === 'json'
                ? 'bg-[#630ed4] text-white shadow-sm'
                : 'bg-[#f2f4f6] text-[#4a4455] hover:bg-[#e6e8ea]'
            }`}
          >
            <span className="material-symbols-outlined text-base">data_object</span>
            JSON Spec (.json)
          </button>
          <button
            onClick={() => setFormat('summary')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              format === 'summary'
                ? 'bg-[#630ed4] text-white shadow-sm'
                : 'bg-[#f2f4f6] text-[#4a4455] hover:bg-[#e6e8ea]'
            }`}
          >
            <span className="material-symbols-outlined text-base">description</span>
            Summary (.txt)
          </button>
        </div>

        {/* Content Box */}
        <div className="flex-1 overflow-hidden">
          <textarea
            readOnly
            value={contentToDisplay}
            rows={11}
            className="w-full h-full font-mono text-xs p-4 rounded-2xl bg-[#191c1e] text-emerald-400 focus:outline-none resize-none leading-relaxed"
          />
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#e0e3e5]">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-[#f2f4f6] hover:bg-[#e6e8ea] text-[#191c1e] text-xs font-bold flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-base">
              {copied ? 'check' : 'content_copy'}
            </span>
            {copied ? 'Copied to Clipboard!' : 'Copy Preview Text'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="action-gradient action-gradient-hover text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-md shadow-[#630ed4]/20 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">picture_as_pdf</span>
              {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF Blueprint'}
            </button>

            {format !== 'pdf' && (
              <button
                onClick={handleDownloadFile}
                className="bg-[#f2f4f6] hover:bg-[#e6e8ea] text-[#191c1e] text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all"
              >
                <span className="material-symbols-outlined text-base">download</span>
                Download .{format === 'markdown' ? 'md' : format === 'json' ? 'json' : 'txt'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

