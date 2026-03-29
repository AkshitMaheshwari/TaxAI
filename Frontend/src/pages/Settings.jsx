import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', label: 'Profile' },
    { id: 'tax', label: 'Tax Preferences' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
  ];

  return (
    <AppLayout pageTitle="Settings" breadcrumb={['Home', 'Settings']}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Mini Settings Nav */}
        <div className="lg:col-span-1">
          <nav className="bg-white border border-[#e0ddd6]">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full px-6 py-4 text-left border-b border-[#e0ddd6] last:border-b-0 transition-colors relative ${
                  activeSection === section.id
                    ? 'bg-[#f5f3ed] text-[#1a1816]'
                    : 'bg-white text-[#8a867f] hover:bg-[#fafaf7] hover:text-[#1a1816]'
                }`}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9375rem",
                  fontWeight: activeSection === section.id ? 600 : 500,
                }}
              >
                {activeSection === section.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c9a961]" />
                )}
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: Active Settings Panel */}
        <div className="lg:col-span-3">
          {/* Profile Section */}
          {activeSection === 'profile' && (
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
                Profile Information
              </h3>

              <div className="space-y-5">
                <div>
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
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    defaultValue={user?.name || ''}
                    className="w-full px-4 py-3 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                    }}
                  />
                </div>

                <div>
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
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    defaultValue={user?.email || ''}
                    className="w-full px-4 py-3 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                    }}
                  />
                </div>

                <div>
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
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    defaultValue={user?.mobile_number || ''}
                    className="w-full px-4 py-3 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                    }}
                  />
                </div>

                <div>
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
                    PAN Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    defaultValue={user?.pancard_number || ''}
                    className="w-full px-4 py-3 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none uppercase"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                    }}
                    maxLength={10}
                  />
                </div>

                <button
                  className="w-full mt-6 py-4 bg-[#1A1208] text-[#FAFAF7] hover:bg-[#2a2218] transition-colors"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Tax Preferences Section */}
          {activeSection === 'tax' && (
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
                Tax Preferences
              </h3>

              <div className="space-y-5">
                <div>
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
                    Current Financial Year
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                    }}
                  >
                    <option>FY 2025-26 (AY 2026-27)</option>
                    <option>FY 2024-25 (AY 2025-26)</option>
                    <option>FY 2023-24 (AY 2024-25)</option>
                  </select>
                </div>

                <div>
                  <label
                    className="mb-3 block"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      color: "#1a1816",
                    }}
                  >
                    Preferred Tax Regime
                  </label>
                  <div className="flex gap-4">
                    {['Old Regime', 'New Regime', 'Auto (Recommend)'].map((option, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="regime"
                          defaultChecked={i === 0}
                          className="w-4 h-4 text-[#c9a961] border-[#e0ddd6] focus:ring-[#c9a961]"
                        />
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.9375rem",
                            color: "#1a1816",
                          }}
                        >
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 border-t border-b border-[#e0ddd6]">
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.9375rem",
                        fontWeight: 500,
                        color: "#1a1816",
                        marginBottom: '0.25rem',
                      }}
                    >
                      Advance Tax Reminders
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.8125rem",
                        color: "#8a867f",
                      }}
                    >
                      Get notified before advance tax due dates
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#e0ddd6] peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c9a961]"></div>
                  </label>
                </div>

                <button
                  className="w-full mt-6 py-4 bg-[#1A1208] text-[#FAFAF7] hover:bg-[#2a2218] transition-colors"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
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
                Notification Preferences
              </h3>

              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', desc: 'Receive updates via email' },
                  { label: 'Tax Deadline Alerts', desc: 'Reminders for important tax dates' },
                  { label: 'Transaction Alerts', desc: 'Notify when new transactions are added' },
                  { label: 'AI Insights', desc: 'Weekly financial insights and recommendations' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-4 border-b border-[#e0ddd6] last:border-b-0"
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.9375rem",
                          fontWeight: 500,
                          color: "#1a1816",
                          marginBottom: '0.25rem',
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.8125rem",
                          color: "#8a867f",
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-[#e0ddd6] peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c9a961]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === 'security' && (
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
                Security Settings
              </h3>

              <div className="space-y-6">
                {/* Change Password */}
                <div className="pb-6 border-b border-[#e0ddd6]">
                  <h4
                    className="mb-4"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#1a1816",
                    }}
                  >
                    Change Password
                  </h4>
                  <button
                    className="px-6 py-3 border-2 border-[#1A1208] text-[#1A1208] hover:bg-[#1A1208] hover:text-white transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Update Password
                  </button>
                </div>

                {/* Active Sessions */}
                <div>
                  <h4
                    className="mb-4"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "#1a1816",
                    }}
                  >
                    Active Sessions
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        device: 'Windows • Chrome',
                        location: 'Mumbai, India',
                        time: 'Current session',
                        current: true,
                      },
                      {
                        device: 'iPhone • Safari',
                        location: 'Mumbai, India',
                        time: '2 days ago',
                        current: false,
                      },
                    ].map((session, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 border border-[#e0ddd6]"
                      >
                        <div>
                          <div
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.9375rem",
                              fontWeight: 500,
                              color: "#1a1816",
                              marginBottom: '0.25rem',
                            }}
                          >
                            {session.device}
                            {session.current && (
                              <span
                                className="ml-2 bg-[#2d5a3a] text-white px-2 py-0.5"
                                style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: "0.6875rem",
                                  fontWeight: 600,
                                  letterSpacing: "0.05em",
                                  textTransform: "uppercase",
                                }}
                              >
                                Active
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.8125rem",
                              color: "#8a867f",
                            }}
                          >
                            {session.location} • {session.time}
                          </div>
                        </div>
                        {!session.current && (
                          <button
                            className="text-[#d4534f] hover:text-[#a84340]"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.8125rem",
                              fontWeight: 500,
                            }}
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
