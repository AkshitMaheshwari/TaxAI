import AppLayout from '../components/AppLayout';

export default function Dashboard() {
  // Sample data - replace with real API data later
  const metrics = [
    { label: 'Total Income', value: '₹12,45,000', icon:' ⌂' },
    { label: 'Total Expenses', value: '₹3,67,200', icon: '₹' },
    { label: 'Tax Liability', value: '₹1,24,800', icon: '§' },
    { label: 'Estimated Savings', value: '₹31,200', icon: '✦' },
  ];

  const monthlyData = [
    { month: 'Jan', income: 85000, expense: 28000 },
    { month: 'Feb', income: 92000, expense: 31000 },
    { month: 'Mar', income: 87000, expense: 29000 },
    { month: 'Apr', income: 95000, expense: 33000 },
    { month: 'May', income: 89000, expense: 30000 },
    { month: 'Jun', income: 91000, expense: 32000 },
  ];

  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.income, d.expense)));

  const aiInsights = [
    'You can save ₹31,200 by switching to the old tax regime',
    'Food expenses are 34% above last month',
    'You have ₹18,000 remaining in 80C deductions',
  ];

  return (
    <AppLayout pageTitle="Dashboard" breadcrumb={['Home', 'Dashboard']}>
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white border border-[#e0ddd6] p-6">
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "3rem",
                fontWeight: 600,
                color: "#1a1816",
                lineHeight: "1",
                marginBottom: "0.75rem",
              }}
            >
              {metric.value}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "#8a867f",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Chart + Tax Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Income/Expense Chart */}
        <div className="bg-white border border-[#e0ddd6] p-8">
          <h3
            className="mb-6"
            style={{
              fontFamily: "'Crimson Pro', serif",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "#1a1816",
            }}
          >
            Monthly Overview
          </h3>

          <div className="space-y-6">
            {monthlyData.map((data, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "#1a1816",
                    }}
                  >
                    {data.month}
                  </span>
                  <div className="flex gap-4">
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.875rem",
                        color: "#2d5a3a",
                      }}
                    >
                      ↑ ₹{(data.income / 1000).toFixed(0)}k
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.875rem",
                        color: "#8a867f",
                      }}
                    >
                      ↓ ₹{(data.expense / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 h-12">
                  {/* Income Bar */}
                  <div
                    className="bg-[#2d5a3a] transition-all"
                    style={{
                      width: `${(data.income / maxValue) * 100}%`,
                    }}
                  />
                  {/* Expense Bar */}
                  <div
                    className="bg-[#e0ddd6]"
                    style={{
                      width: `${(data.expense / maxValue) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-6 mt-6 pt-6 border-t border-[#e0ddd6]">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#2d5a3a]" />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8125rem",
                  color: "#5a5550",
                }}
              >
                Income
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#e0ddd6]" />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8125rem",
                  color: "#5a5550",
                }}
              >
                Expenses
              </span>
            </div>
          </div>
        </div>

        {/* Tax Summary Card */}
        <div className="bg-white border border-[#e0ddd6] p-8">
          <h3
            className="mb-6"
            style={{
              fontFamily: "'Crimson Pro', serif",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "#1a1816",
            }}
          >
            Tax Summary
          </h3>

          <div className="space-y-4">
            {[
              { label: 'Gross Income', value: '₹12,45,000', color: '#1a1816' },
              { label: 'Total Deductions', value: '- ₹1,80,000', color: '#2d5a3a' },
              { label: 'Taxable Income', value: '₹10,65,000', color: '#1a1816' },
              { label: 'Tax Payable', value: '₹1,24,800', color: '#c9a961' },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex justify-between py-3 ${
                  i < 3 ? 'border-b border-[#e0ddd6]' : ''
                }`}
              >
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
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: item.color,
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Total Tax Liability Card */}
          <div className="mt-6 bg-[#f5f3ed] p-6 border-l-4 border-[#c9a961]">
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
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#1a1816",
              }}
            >
              ₹1,24,800
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Strip */}
      <div>
        <h3
          className="mb-4"
          style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#1a1816",
          }}
        >
          AI Insights
        </h3>

        <div className="space-y-3">
          {aiInsights.map((insight, i) => (
            <div
              key={i}
              className="bg-white border border-[#e0ddd6] p-6 flex items-start gap-4 hover:border-[#c9a961] transition-colors"
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  color: "#c9a961",
                  lineHeight: "1",
                }}
              >
                ✦
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  color: "#1a1816",
                  lineHeight: "1.6",
                }}
              >
                {insight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
