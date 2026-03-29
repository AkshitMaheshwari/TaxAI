import { useState } from 'react';
import AppLayout from '../components/AppLayout';

export default function Transactions() {
  const [hoveredRow, setHoveredRow] = useState(null);

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      date: '2026-03-20',
      merchant: 'Starbucks Coffee',
      amount: -450,
      category: 'Food & Dining',
      source: 'OCR',
    },
    {
      id: 2,
      date: '2026-03-19',
      merchant: 'Client Payment - ABC Corp',
      amount: 85000,
      category: 'Income',
      source: 'Manual',
    },
    {
      id: 3,
      date: '2026-03-18',
      merchant: 'Amazon India',
      amount: -2340,
      category: 'Shopping',
      source: 'CSV',
    },
    {
      id: 4,
      date: '2026-03-17',
      merchant: 'Uber Trip',
      amount: -280,
      category: 'Transportation',
      source: 'OCR',
    },
    {
      id: 5,
      date: '2026-03-16',
      merchant: 'Salary Credit',
      amount: 95000,
      category: 'Income',
      source: 'Manual',
    },
  ];

  return (
    <AppLayout pageTitle="Transactions" breadcrumb={['Home', 'Transactions']}>
      {/* Filter Bar */}
      <div className="bg-white border border-[#e0ddd6] p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date Range */}
          <div>
            <label
              className="block mb-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "#1a1816",
              }}
            >
              Date Range
            </label>
            <input
              type="date"
              className="w-full px-4 py-2.5 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9375rem",
              }}
            />
          </div>

          {/* Category */}
          <div>
            <label
              className="block mb-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "#1a1816",
              }}
            >
              Category
            </label>
            <select
              className="w-full px-4 py-2.5 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9375rem",
              }}
            >
              <option>All Categories</option>
              <option>Income</option>
              <option>Food & Dining</option>
              <option>Shopping</option>
              <option>Transportation</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <label
              className="block mb-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "#1a1816",
              }}
            >
              Search
            </label>
            <input
              type="text"
              placeholder="Search merchant or category..."
              className="w-full px-4 py-2.5 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9375rem",
              }}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      {transactions.length > 0 ? (
        <div className="bg-white border border-[#e0ddd6] overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#f5f3ed] border-b border-[#e0ddd6]">
            {['Date', 'Merchant', 'Amount', 'Category', 'Source', 'Actions'].map((header, i) => (
              <div
                key={i}
                className={i === 0 ? 'col-span-2' : i === 1 ? 'col-span-3' : i === 2 || i === 3 ? 'col-span-2' : 'col-span-2'}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#8a867f",
                }}
              >
                {header}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          <div>
            {transactions.map((transaction, i) => (
              <div
                key={transaction.id}
                onMouseEnter={() => setHoveredRow(transaction.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#e0ddd6] transition-all relative ${
                  i % 2 === 1 ? 'bg-[#fafaf7]' : 'bg-white'
                }`}
              >
                {/* Gold left border on hover */}
                {hoveredRow === transaction.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c9a961]" />
                )}

                {/* Date */}
                <div
                  className="col-span-2"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    color: "#1a1816",
                  }}
                >
                  {new Date(transaction.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>

                {/* Merchant */}
                <div
                  className="col-span-3"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#1a1816",
                  }}
                >
                  {transaction.merchant}
                </div>

                {/* Amount */}
                <div
                  className="col-span-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: transaction.amount > 0 ? '#2d5a3a' : '#1a1816',
                  }}
                >
                  {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
                </div>

                {/* Category */}
                <div className="col-span-2">
                  <span
                    className="inline-block border border-[#e0ddd6] px-3 py-1"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "#5a5550",
                    }}
                  >
                    {transaction.category}
                  </span>
                </div>

                {/* Source */}
                <div
                  className="col-span-2"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8125rem",
                    color: "#8a867f",
                  }}
                >
                  {transaction.source}
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-center gap-2">
                  {hoveredRow === transaction.id && (
                    <>
                      <button
                        className="text-[#c9a961] hover:text-[#d4b76f] transition-colors"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.875rem",
                        }}
                        title="Edit"
                      >
                        ✎
                      </button>
                      <button
                        className="text-[#8a867f] hover:text-[#d4534f] transition-colors"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.875rem",
                        }}
                        title="Delete"
                      >
                        ✕
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-[#f5f3ed] border-t border-[#e0ddd6] flex items-center justify-between">
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                color: "#5a5550",
              }}
            >
              Showing 1-5 of 5 transactions
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 border border-[#e0ddd6] bg-white hover:border-[#c9a961] transition-colors disabled:opacity-50"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8125rem",
                  color: "#1a1816",
                }}
                disabled
              >
                Previous
              </button>
              <button
                className="px-4 py-2 border border-[#e0ddd6] bg-white hover:border-[#c9a961] transition-colors disabled:opacity-50"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8125rem",
                  color: "#1a1816",
                }}
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Empty State
        <div className="bg-white border border-[#e0ddd6] p-24 text-center">
          <p
            style={{
              fontFamily: "'Crimson Pro', serif",
              fontSize: "1.5rem",
              fontStyle: "italic",
              color: "#8a867f",
            }}
          >
            No transactions found. Start by uploading documents or adding manual entries.
          </p>
        </div>
      )}
    </AppLayout>
  );
}
