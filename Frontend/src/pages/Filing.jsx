import { useState } from 'react';
import AppLayout from '../components/AppLayout';

export default function Filing() {
  const [expandedSection, setExpandedSection] = useState('personal');

  const steps = [
    { id: 'data', label: 'Data Complete', status: 'complete' },
    { id: 'review', label: 'Review', status: 'active' },
    { id: 'export', label: 'Export', status: 'pending' },
    { id: 'filed', label: 'Filed', status: 'pending' },
  ];

  const itrSections = [
    {
      id: 'personal',
      title: 'Personal Information',
      status: 'complete',
      fields: ['Name', 'PAN', 'Address', 'Email', 'Mobile'],
    },
    {
      id: 'income',
      title: 'Income Details',
      status: 'complete',
      fields: ['Salary Income: ₹12,45,000', 'Other Income: ₹0'],
    },
    {
      id: 'deductions',
      title: 'Deductions',
      status: 'complete',
      fields: [
        '80C: ₹1,50,000',
        '80D: ₹25,000',
        'HRA: ₹96,000',
        'NPS: ₹50,000',
        'Standard Deduction: ₹50,000',
      ],
    },
    {
      id: 'computation',
      title: 'Tax Computation',
      status: 'complete',
      fields: [
        'Gross Total Income: ₹12,45,000',
        'Total Deductions: ₹3,71,000',
        'Taxable Income: ₹8,74,000',
        'Tax Payable: ₹62,400',
      ],
    },
    {
      id: 'taxPaid',
      title: 'Tax Paid',
      status: 'review',
      fields: ['TDS: ₹45,000', 'Advance Tax: ₹15,000'],
      reviewFlag: 'Total TDS and Advance Tax (₹60,000) is ₹2,400 less than tax liability. Additional payment required.',
    },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      complete: { bg: '#2d5a3a', text: '#fff' },
      incomplete: { bg: '#e0ddd6', text: '#8a867f' },
      review: { bg: '#d4894f', text: '#fff' },
    };
    const style = styles[status] || styles.incomplete;

    return (
      <span
        className="inline-block px-3 py-1"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          backgroundColor: style.bg,
          color: style.text,
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <AppLayout pageTitle="Filing" breadcrumb={['Home', 'Filing']}>
      {/* Status Bar */}
      <div className="bg-white border border-[#e0ddd6] p-8 mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 flex items-center justify-center border-2 transition-colors ${
                    step.status === 'complete'
                      ? 'border-[#2d5a3a] bg-[#2d5a3a] text-white'
                      : step.status === 'active'
                      ? 'border-[#c9a961] bg-[#c9a961] text-white'
                      : 'border-[#e0ddd6] bg-white text-[#8a867f]'
                  }`}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                  }}
                >
                  {step.status === 'complete' ? '✓' : i + 1}
                </div>
                <div
                  className="mt-2"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8125rem",
                    fontWeight: step.status === 'active' ? 600 : 500,
                    color: step.status === 'active' ? '#c9a961' : '#1a1816',
                  }}
                >
                  {step.label}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-4"
                  style={{
                    backgroundColor: step.status === 'complete' ? '#2d5a3a' : '#e0ddd6',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ITR Draft Preview */}
      <div className="bg-white border border-[#e0ddd6] mb-6">
        <div className="bg-[#f5f3ed] px-8 py-4 border-b border-[#e0ddd6]">
          <h3
            style={{
              fontFamily: "'Crimson Pro', serif",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#1a1816",
            }}
          >
            ITR Draft Preview
          </h3>
        </div>

        {/* Collapsible Sections */}
        <div>
          {itrSections.map((section) => (
            <div key={section.id} className="border-b border-[#e0ddd6] last:border-b-0">
              {/* Section Header */}
              <button
                onClick={() =>
                  setExpandedSection(expandedSection === section.id ? null : section.id)
                }
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-[#fafaf7] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span
                    style={{
                      fontFamily: "'Crimson Pro', serif",
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#1a1816",
                    }}
                  >
                    {section.title}
                  </span>
                  {getStatusBadge(section.status)}
                </div>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1.25rem",
                    color: "#8a867f",
                  }}
                >
                  {expandedSection === section.id ? '−' : '+'}
                </span>
              </button>

              {/* Section Content */}
              {expandedSection === section.id && (
                <div className="px-8 pb-6">
                  {section.reviewFlag && (
                    <div className="bg-[#d4894f]/10 border-l-4 border-[#d4894f] p-4 mb-4">
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.9375rem",
                          color: "#8a4a20",
                          lineHeight: "1.6",
                        }}
                      >
                        <strong>⚠ Review Required:</strong> {section.reviewFlag}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {section.fields.map((field, i) => (
                      <div
                        key={i}
                        className="py-2 border-b border-[#e0ddd6] last:border-b-0"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.9375rem",
                          color: "#1a1816",
                        }}
                      >
                        {field}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          className="flex-1 py-4 bg-[#1A1208] text-[#FAFAF7] hover:bg-[#2a2218] transition-colors"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Download PDF
        </button>
        <button
          className="flex-1 py-4 bg-[#c9a961] text-[#1a1816] hover:bg-[#d4b76f] transition-colors"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Mark as Filed
        </button>
      </div>
    </AppLayout>
  );
}
