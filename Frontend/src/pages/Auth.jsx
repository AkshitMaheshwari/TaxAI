import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    pancard_number: '',
    password: '',
    identifier: '', // for login
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.identifier, formData.password);
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register({
        name: formData.name,
        email: formData.email,
        mobile_number: formData.mobile_number,
        pancard_number: formData.pancard_number,
        password: formData.password,
      });
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Dark Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#16100A] relative overflow-hidden flex-col justify-between p-12">
        {/* Ledger Grid Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #c9a961 0, #c9a961 1px, transparent 1px, transparent 100%), repeating-linear-gradient(90deg, #c9a961 0, #c9a961 1px, transparent 1px, transparent 100%)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Film Grain Effect */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          }}
        />

        {/* Watermark Rupee Symbol */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "32rem",
            lineHeight: "1",
            color: "#c9a961",
          }}
        >
          ₹
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              fontWeight: 600,
              color: "#f5f5f0",
            }}
          >
            Tax<span style={{ color: "#c9a961" }}>Hacker</span>
          </h1>
        </div>

        {/* Headline & Subtext */}
        <div className="relative z-10 max-w-md">
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "3.5rem",
              fontWeight: 400,
              color: "#f5f5f0",
              lineHeight: "1.2",
              marginBottom: "1.5rem",
            }}
          >
            Your taxes, in{' '}
            <span style={{ fontStyle: 'italic', color: '#c9a961' }}>trusted hands.</span>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.125rem",
              lineHeight: "1.7",
              color: "#8a867f",
            }}
          >
            Join thousands who trust TaxHacker with their financial futures. Smart, secure, and
            surprisingly simple.
          </p>
        </div>

        {/* Stat Pills */}
        <div className="relative z-10 flex gap-6">
          <div className="bg-[#c9a961]/10 border border-[#c9a961]/20 px-6 py-3">
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.75rem",
                fontWeight: 600,
                color: "#c9a961",
              }}
            >
              12,000+
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#8a867f",
              }}
            >
              Returns Filed
            </div>
          </div>

          <div className="bg-[#c9a961]/10 border border-[#c9a961]/20 px-6 py-3">
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.75rem",
                fontWeight: 600,
                color: "#c9a961",
              }}
            >
              ₹2.4Cr+
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#8a867f",
              }}
            >
              Taxes Saved
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Light Panel with Form */}
      <div className="w-full lg:w-1/2 bg-[#FAFAF7] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Tab Toggle */}
          <div className="flex gap-1 mb-8 bg-[#e0ddd6]/30 p-1">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 py-3 transition-all duration-300 ${
                isLogin ? 'bg-[#1A1208] text-[#FAFAF7]' : 'bg-transparent text-[#5a5550]'
              }`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 py-3 transition-all duration-300 ${
                !isLogin ? 'bg-[#1A1208] text-[#FAFAF7]' : 'bg-transparent text-[#5a5550]'
              }`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Register
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="mb-6 p-4 bg-[#d4534f]/10 border border-[#d4534f]/30"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                color: "#a84340",
              }}
            >
              {error}
            </div>
          )}

          {/* Forms */}
          <div className="relative overflow-hidden">
            {/* Login Form */}
            <form
              onSubmit={handleLogin}
              className={`transition-all duration-500 ${
                isLogin
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8 absolute inset-0 pointer-events-none'
              }`}
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="identifier"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "#1a1816",
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Email or Mobile Number
                  </label>
                  <input
                    type="text"
                    id="identifier"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                      color: "#1a1816",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="login-password"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "#1a1816",
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="login-password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                      color: "#1a1816",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#1A1208] text-[#FAFAF7] hover:bg-[#2a2218] transition-colors disabled:opacity-50"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>

            {/* Register Form */}
            <form
              onSubmit={handleRegister}
              className={`transition-all duration-500 ${
                !isLogin
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8 absolute inset-0 pointer-events-none'
              }`}
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
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
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                      color: "#1a1816",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
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
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                      color: "#1a1816",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobile_number"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
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
                    id="mobile_number"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                      color: "#1a1816",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="pancard_number"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
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
                    id="pancard_number"
                    name="pancard_number"
                    value={formData.pancard_number}
                    onChange={handleInputChange}
                    required
                    maxLength={10}
                    className="w-full px-4 py-3 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none transition-colors uppercase"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                      color: "#1a1816",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: "#8a867f",
                      marginTop: '0.5rem',
                    }}
                  >
                    10-character alphanumeric code (e.g., ABCDE1234F)
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="register-password"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "#1a1816",
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="register-password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-[#e0ddd6] bg-white focus:border-[#c9a961] focus:outline-none transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                      color: "#1a1816",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#1A1208] text-[#FAFAF7] hover:bg-[#2a2218] transition-colors disabled:opacity-50"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>

          {/* Toggle Link */}
          <p
            className="text-center mt-6"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.875rem",
              color: "#8a867f",
            }}
          >
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-[#c9a961] hover:text-[#d4b76f] transition-colors font-semibold"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
