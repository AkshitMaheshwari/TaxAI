import { useState } from 'react';
import AppLayout from '../components/AppLayout';

export default function Upload() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedData, setExtractedData] = useState({
    merchant: { value: 'Starbucks Coffee', confidence: 'high' },
    amount: { value: '₹1,250', confidence: 'high' },
    date: { value: '2026-03-15', confidence: 'high' },
    category: { value: 'Food & Dining', confidence: 'medium' },
    gst: { value: 'GSTIN29AABCT1234A1Z5', confidence: 'low' },
  });

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'high':
        return '#2d5a3a';
      case 'medium':
        return '#c9a961';
      case 'low':
        return '#d4534f';
      default:
        return '#8a867f';
    }
  };

  return (
    <AppLayout pageTitle="Upload & Scan" breadcrumb={['Home', 'Upload & Scan']}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Upload Drop Zone */}
        <div>
          <p
            className="mb-6"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: "#5a5550",
            }}
          >
            Upload your tax documents, receipts, and invoices. Our AI will automatically extract and categorize all the data.
          </p>

          <label
            htmlFor="file-upload"
            className="block bg-white border-2 border-dashed border-[#e0ddd6] p-16 text-center hover:border-[#c9a961] transition-colors cursor-pointer"
          >
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.csv"
              onChange={handleFileUpload}
            />

            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "5rem",
                color: "#c9a961",
                marginBottom: "1rem",
                lineHeight: "1",
              }}
            >
              ⇪
            </div>

            <h3
              className="mb-2"
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#1a1816",
              }}
            >
              Drop files here or click to browse
            </h3>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9375rem",
                color: "#8a867f",
                marginBottom: "1.5rem",
              }}
            >
              Supports PDF, JPG, PNG, CSV (Max 10MB per file)
            </p>

            {uploadedFile && (
              <div
                className="inline-block bg-[#f5f3ed] border border-[#e0ddd6] px-4 py-2"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "#1a1816",
                }}
              >
                {uploadedFile.name}
              </div>
            )}
          </label>

          <div className="mt-6 space-y-3">
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#1a1816",
              }}
            >
              Accepted Documents:
            </p>
            <ul className="space-y-2">
              {['Form 16 & AIS', 'Bank Statements', 'Receipts & Invoices', 'Pay Stubs'].map(
                (doc, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
                      color: "#5a5550",
                    }}
                  >
                    <span style={{ color: '#c9a961' }}>✓</span> {doc}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Right Side - Extraction Preview */}
        <div>
          {/* Preview Panel Header */}
          <div className="bg-[#1a1816] px-6 py-4 border-b border-[#3a3632]">
            <h3
              style={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: "1.125rem",
                fontWeight: 600,
                color: "#f5f5f0",
              }}
            >
              Extraction Preview
            </h3>
          </div>

          {/* Document Preview */}
          <div className="bg-white border-x border-[#e0ddd6] p-8">
            <div className="bg-[#f5f3ed] border border-[#e0ddd6] p-12 text-center mb-6">
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "3rem",
                  color: "#e0ddd6",
                  marginBottom: "0.5rem",
                }}
              >
                ◆
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "#8a867f",
                }}
              >
                {uploadedFile ? 'Document preview' : 'No document uploaded'}
              </p>
            </div>

            {/* Extracted Fields */}
            {uploadedFile && (
              <div>
                <h4
                  className="mb-4"
                  style={{
                    fontFamily: "'Crimson Pro', serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#1a1816",
                  }}
                >
                  Extracted Data
                </h4>

                <div className="space-y-4">
                  {Object.entries(extractedData).map(([key, data]) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.8125rem",
                            fontWeight: 500,
                            color: "#1a1816",
                            textTransform: "capitalize",
                          }}
                        >
                          {key}
                        </label>
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getConfidenceColor(data.confidence) }}
                          />
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.7rem",
                              fontWeight: 500,
                              color: "#8a867f",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}
                          >
                            {data.confidence}
                          </span>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={data.value}
                        onChange={(e) =>
                          setExtractedData({
                            ...extractedData,
                            [key]: { ...data, value: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.9375rem",
                          color: "#1a1816",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          {uploadedFile && (
            <div className="bg-white border border-[#e0ddd6] border-t-0 p-6">
              <button
                className="w-full py-4 bg-[#1A1208] text-[#FAFAF7] hover:bg-[#2a2218] transition-colors"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Save to Transactions
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
