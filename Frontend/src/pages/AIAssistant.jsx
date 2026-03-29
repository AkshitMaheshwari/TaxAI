import { useState } from 'react';
import AppLayout from '../components/AppLayout';

export default function AIAssistant() {
  const [activeTab, setActiveTab] = useState('tax');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({
    tax: [
      {
        role: 'ai',
        content: "Hello! I'm your Tax Assistant. I can help you with tax queries, deductions, regime selection, and filing processes. What would you like to know?",
      },
    ],
    financial: [
      {
        role: 'ai',
        content: "Hello! I'm your Financial Advisor. I analyze your spending patterns, income trends, and provide personalized recommendations. How can I assist you today?",
      },
    ],
    personal: [
      {
        role: 'ai',
        content: "Hello! I'm here to answer questions about your financial data and tax records. Ask me anything about your transactions, documents, or tax history.",
      },
    ],
  });

  const tabs = [
    { id: 'tax', label: 'Tax Assistant' },
    { id: 'financial', label: 'Financial Advisor' },
    { id: 'personal', label: 'Personal Q&A' },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Add user message
      setMessages({
        ...messages,
        [activeTab]: [
          ...messages[activeTab],
          { role: 'user', content: message },
          {
            role: 'ai',
            content: 'This is a demo response. In production, this will be powered by our AI engine.',
          },
        ],
      });
      setMessage('');
    }
  };

  return (
    <AppLayout pageTitle="AI Assistant" breadcrumb={['Home', 'AI Assistant']}>
      {/* Tab Switcher */}
      <div className="flex gap-8 border-b border-[#e0ddd6] mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 relative transition-colors ${
              activeTab === tab.id ? 'text-[#c9a961]' : 'text-[#8a867f] hover:text-[#1a1816]'
            }`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c9a961]" />
            )}
          </button>
        ))}
      </div>

      {/* Context Strip for Financial Advisor */}
      {activeTab === 'financial' && (
        <div
          className="bg-[#f5f3ed] border-l-4 border-[#c9a961] p-4 mb-6"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            color: "#5a5550",
          }}
        >
          Based on your last 3 months of transactions and AY 2025–26 data
        </div>
      )}

      {/* Chat Interface */}
      <div className="bg-white border border-[#e0ddd6] flex flex-col h-[600px]">
        {/* Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages[activeTab].map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-2xl ${
                  msg.role === 'user'
                    ? 'bg-[#f5f3ed] border border-[#e0ddd6]'
                    : 'bg-[#1A1208] text-[#FAFAF7]'
                } px-6 py-4`}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9375rem",
                    lineHeight: "1.6",
                    color: msg.role === 'user' ? '#1a1816' : '#FAFAF7',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: msg.content.replace(/₹(\d+,?\d*)/g, '<span style="color: #c9a961;">₹$1</span>').replace(/Section (\w+)/g, '<span style="color: #c9a961;">Section $1</span>'),
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-[#e0ddd6] p-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-3 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "#1a1816",
              }}
            />
            <button
              onClick={handleSend}
              className="px-8 py-3 bg-[#1A1208] text-[#FAFAF7] hover:bg-[#2a2218] transition-colors"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
