import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AppLayout({ children, pageTitle, breadcrumb }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '⌂' },
    { name: 'Upload & Scan', path: '/upload', icon: '⇪' },
    { name: 'Transactions', path: '/transactions', icon: '₹' },
    { name: 'Tax Center', path: '/tax-center', icon: '§' },
    { name: 'AI Assistant', path: '/ai-assistant', icon: '◆' },
    { name: 'Filing', path: '/filing', icon: '✓' },
    { name: 'Settings', path: '/settings', icon: '⚙' },
  ];

  // Get user info from auth context
  const userName = user?.name || 'User';
  const userEmail = user?.email || 'user@taxhacker.com';
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#16100A] flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-[#3a3632]">
          <h1
            onClick={() => navigate('/dashboard')}
            className="cursor-pointer"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.75rem",
              fontWeight: 600,
              color: "#f5f5f0",
            }}
          >
            Tax<span style={{ color: "#c9a961" }}>Hacker</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full px-6 py-3 flex items-center gap-3 transition-all relative ${
                isActive(item.path)
                  ? 'bg-[#2a2218] text-[#f5f5f0]'
                  : 'text-[#8a867f] hover:text-[#f5f5f0] hover:bg-[#1f1810]'
              }`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9375rem",
                fontWeight: isActive(item.path) ? 600 : 500,
              }}
            >
              {/* Gold left border for active item */}
              {isActive(item.path) && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c9a961]" />
              )}

              {/* Icon */}
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  color: isActive(item.path) ? '#c9a961' : 'inherit',
                }}
              >
                {item.icon}
              </span>

              {/* Label */}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-[#3a3632] p-6">
          <div className="flex items-center gap-3 mb-4">
            {/* Avatar with initials */}
            <div
              className="w-10 h-10 bg-[#c9a961] rounded-full flex items-center justify-center"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#1a1816",
              }}
            >
              {userInitials}
            </div>

            {/* Name and Email */}
            <div className="flex-1 min-w-0">
              <div
                className="truncate"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#f5f5f0",
                }}
              >
                {userName}
              </div>
              <div
                className="truncate"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  color: "#8a867f",
                }}
              >
                {userEmail}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full py-2 border border-[#3a3632] text-[#8a867f] hover:border-[#c9a961] hover:text-[#c9a961] transition-colors"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8125rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 bg-[#FAFAF7] overflow-y-auto">
        {/* Top Bar with Breadcrumb/Page Title */}
        <div className="bg-white border-b border-[#e0ddd6] px-8 py-6 sticky top-0 z-10">
          {/* Breadcrumb */}
          {breadcrumb && (
            <div className="mb-2 flex items-center gap-2">
              {breadcrumb.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && (
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.875rem",
                        color: "#8a867f",
                      }}
                    >
                      /
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
                      color: index === breadcrumb.length - 1 ? '#1a1816' : '#8a867f',
                      fontWeight: index === breadcrumb.length - 1 ? 600 : 400,
                    }}
                  >
                    {crumb}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Page Title */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.5rem",
              fontWeight: 500,
              color: "#1a1816",
              lineHeight: "1.2",
            }}
          >
            {pageTitle}
          </h1>
        </div>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
