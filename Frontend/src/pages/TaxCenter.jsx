import { useState } from 'react';
import AppLayout from '../components/AppLayout';

export default function TaxCenter() {
  const [taxInputs, setTaxInputs] = useState({
    grossIncome: 1245000,
    section80C: 150000,
    section80D: 25000,
    hra: 96000,
    nps: 50000,
    standardDeduction: 50000,
  });

  // Calculate tax
  const totalDeductions = taxInputs.section80C + taxInputs.section80D + taxInputs.hra + taxInputs.nps + taxInputs.standardDeduction;
  const taxableIncome = taxInputs.grossIncome - totalDeductions;
  const taxBeforeCess = Math.max(0, (taxableIncome * 0.2) - 12500); // Simplified calculation
  const cess = taxBeforeCess * 0.04;
  const totalTaxLiability = taxBeforeCess + cess;

  const deductionData = [
    {
      section: '80C',
      subtitle: 'ELSS, PPF, Life Insurance',
      used: taxInputs.section80C,
      limit: 150000,
    },
    { section: '80D', subtitle: 'Health Insurance', used: taxInputs.section80D, limit: 50000 },
    { section: 'HRA', subtitle: 'House Rent Allowance', used: taxInputs.hra, limit: 120000 },
    { section: 'NPS', subtitle: 'National Pension Scheme', used: taxInputs.nps, limit: 50000 },
  ];

  return (
    <AppLayout pageTitle="Tax Center" breadcrumb={['Home', 'Tax Center']}>
      {/* Top Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left: Income & Deduction Inputs */}
        <div className="bg-white border border-[#e0ddd6] p-8">
          <h3
            className="mb-6"
            style={{
              fontFamily: "'Crimson Pro', serif",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#1a1816",
            }}
          >
            Income & Deductions
          </h3>

          <div className="space-y-4">
            {[
              { label: 'Gross Income', key: 'grossIncome' },
              { label: '80C Deductions', key: 'section80C' },
              { label: '80D Health Insurance', key: 'section80D' },
              { label: 'HRA', key: 'hra' },
              { label: 'NPS (80CCD)', key: 'nps' },
              { label: 'Standard Deduction', key: 'standardDeduction' },
            ].map((field, i) => (
              <div key={i}>
                <label
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "#1a1816",
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  {field.label}
                </label>
                <input
                  type="number"
                  value={taxInputs[field.key]}
                  onChange={(e) =>
                    setTaxInputs({ ...taxInputs, [field.key]: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-2.5 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    color: "#1a1816",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Tax Computation */}
        <div className="bg-white border border-[#e0ddd6] p-8">
          <h3
            className="mb-6"
            style={{
              fontFamily: "'Crimson Pro', serif",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#1a1816",
            }}
          >
            Tax Computation
          </h3>

          <div className="space-y-4">
            {[
              { label: 'Taxable Income', value: `₹${taxableIncome.toLocaleString('en-IN')}` },
              {
                label: 'Tax Before Cess',
                value: `₹${Math.round(taxBeforeCess).toLocaleString('en-IN')}`,
              },
              { label: 'Health & Education Cess (4%)', value: `₹${Math.round(cess).toLocaleString('en-IN')}` },
            ].map((item, i) => (
              <div key={i} className="flex justify-between py-3 border-b border-[#e0ddd6]">
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9375rem",
                    color: "#5a5550",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#1a1816",
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}

            <div className="bg-[#f5f3ed] p-6 border-l-4 border-[#c9a961] mt-6">
              <div
                className="mb-1"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#8a867f",
                }}
              >
                Total Tax Liability
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "3rem",
                  fontWeight: 700,
                  color: "#1a1816",
                  lineHeight: "1",
                }}
              >
                ₹{Math.round(totalTaxLiability).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Old vs New Regime Comparison */}
      <div className="mb-8">
        <h3
          className="mb-6"
          style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#1a1816",
          }}
        >
          Regime Comparison
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Old Regime - Recommended */}
          <div className="bg-white border-2 border-[#c9a961] p-8 relative">
            <div className="absolute top-0 right-0 bg-[#c9a961] text-[#1a1816] px-4 py-1 text-sm font-semibold">
              Recommended
            </div>
            <h4
              className="mt-6 mb-6"
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#1a1816",
              }}
            >
              Old Tax Regime
            </h4>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-[#e0ddd6]">
                <span className="text-[#5a5550]">Gross Income</span>
                <span className="font-semibold text-[#1a1816]">
                  ₹{taxInputs.grossIncome.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#e0ddd6]">
                <span className="text-[#5a5550]">Total Deductions</span>
                <span className="font-semibold text-[#2d5a3a]">
                  -₹{totalDeductions.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#e0ddd6]">
                <span className="text-[#5a5550]">Taxable Income</span>
                <span className="font-semibold text-[#1a1816]">
                  ₹{taxableIncome.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="bg-[#f5f3ed] p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#1a1816]">Total Tax Liability</span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    fontWeight: 600,
                    color: "#1a1816",
                  }}
                >
                  ₹{Math.round(totalTaxLiability).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* New Regime */}
          <div className="bg-white border border-[#e0ddd6] p-8 opacity-75">
            <h4
              className="mb-6"
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#1a1816",
              }}
            >
              New Tax Regime
            </h4>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b border-[#e0ddd6]">
                <span className="text-[#5a5550]">Gross Income</span>
                <span className="font-semibold text-[#1a1816]">
                  ₹{taxInputs.grossIncome.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#e0ddd6]">
                <span className="text-[#5a5550]">Deductions</span>
                <span className="font-semibold text-[#8a867f]">Not Allowed</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#e0ddd6]">
                <span className="text-[#5a5550]">Taxable Income</span>
                <span className="font-semibold text-[#1a1816]">
                  ₹{taxInputs.grossIncome.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="bg-[#f5f3ed] p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#1a1816]">Total Tax Liability</span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    fontWeight: 600,
                    color: "#1a1816",
                  }}
                >
                  ₹{Math.round((taxInputs.grossIncome * 0.2 - 12500) * 1.04).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deduction Tracker */}
      <div className="bg-white border border-[#e0ddd6] p-8 mb-8">
        <h3
          className="mb-6"
          style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#1a1816",
          }}
        >
          Deduction Tracker
        </h3>

        <div className="space-y-6">
          {deductionData.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <div>
                  <div
                    style={{
                      fontFamily: "'Crimson Pro', serif",
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#1a1816",
                    }}
                  >
                    Section {item.section}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8125rem",
                      color: "#8a867f",
                    }}
                  >
                    {item.subtitle}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#1a1816",
                    }}
                  >
                    ₹{item.used.toLocaleString('en-IN')}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8125rem",
                      color: "#8a867f",
                    }}
                  >
                    of ₹{item.limit.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
              <div className="w-full bg-[#e0ddd6] h-3 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    item.used === item.limit ? 'bg-[#2d5a3a]' : 'bg-[#c9a961]'
                  }`}
                  style={{ width: `${Math.min((item.used / item.limit) * 100, 100)}%` }}
                />
              </div>
              {item.used < item.limit && (
                <div
                  className="mt-2"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8125rem",
                    color: "#5a5550",
                  }}
                >
                  ₹{(item.limit - item.used).toLocaleString('en-IN')} remaining
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Suggestion Callout */}
      <div className="bg-[#c9a961]/10 border-l-4 border-[#c9a961] p-8">
        <div className="flex items-start gap-4">
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              color: "#c9a961",
              lineHeight: "1",
            }}
          >
            ✦
          </div>
          <div>
            <h4
              className="mb-2"
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "#1a1816",
              }}
            >
              AI Recommendation
            </h4>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "#1a1816",
                lineHeight: "1.6",
              }}
            >
              The <strong>Old Tax Regime</strong> saves you{' '}
              <strong>₹{Math.round((taxInputs.grossIncome * 0.2 - 12500) * 1.04 - totalTaxLiability).toLocaleString('en-IN')}</strong> compared to the New Regime based on your
              current deductions.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
