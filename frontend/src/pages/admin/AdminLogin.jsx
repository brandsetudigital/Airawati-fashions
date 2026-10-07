// frontend/src/pages/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { adminLogin } = useAdmin();

  const [email, setEmail] = useState('admin@airawati.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email ? email.trim() : '';
    const cleanPassword = password ? password.trim() : '';

    if (!cleanEmail || !cleanPassword) {
      setError('Please provide both email and password');
      return;
    }

    setLoading(true);
    try {
      const res = await adminLogin(cleanEmail, cleanPassword);
      setLoading(false);
      if (res && res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res?.error || 'Invalid admin credentials');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Login failed. Please check credentials.');
    }
  };

  return (
    <div className="flex-1 min-h-[75vh] py-12 bg-[#FDF8F7] flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-[#5C1329] selection:text-white">
      
      {/* BRAND LOGO AT TOP (Matching Screenshot 1) */}
      <div className="text-center mb-6">
        <Link to="/" title="Airawati Storefront" className="inline-block group">
          <img 
            src="/images/airawati_logo.png" 
            alt="Airawati" 
            className="h-16 sm:h-20 w-auto mx-auto object-contain transition-transform group-hover:scale-105" 
          />
        </Link>
      </div>

      {/* ADMIN LOGIN TITLE */}
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A151B] mb-6 text-center">
        Admin Login
      </h1>

      {/* LOGIN CARD CONTAINER (Matching Screenshot 1) */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-[#F0D5DA] p-6 sm:p-8 relative">
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@admin.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0D5DA] bg-[#FAF2F4]/60 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5C1329]/30 focus:border-[#5C1329] transition-all"
              />
            </div>
          </div>

          {/* Password Field with Eye Toggle */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#F0D5DA] bg-[#FAF2F4]/60 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5C1329]/30 focus:border-[#5C1329] transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#5C1329] transition-colors p-1"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#5C1329] hover:bg-[#470e1f] text-white font-medium text-sm rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>

        {/* Forgot password link */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => alert("Password reset link has been dispatched to administrator's registered email.")}
            className="text-xs text-stone-500 hover:text-[#5C1329] transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Quick Demo Credentials Tip */}
        <div className="mt-6 pt-4 border-t border-stone-100 text-center">
          <p className="text-[11px] text-stone-500 mb-1.5">
            Default Admin Demo: <span className="font-semibold text-stone-700">admin@airawati.com</span> / <span className="font-semibold text-stone-700">admin123</span>
          </p>
          <button
            type="button"
            onClick={() => {
              setEmail('admin@airawati.com');
              setPassword('admin123');
              setError('');
            }}
            className="text-[11px] text-[#5C1329] hover:text-[#3B0C1A] underline font-medium cursor-pointer"
          >
            Auto-fill Admin Credentials
          </button>
        </div>
      </div>

      {/* Return to website */}
      <div className="mt-6">
        <Link 
          to="/" 
          className="text-xs text-[#5C1329] hover:text-[#C5A059] font-medium flex items-center gap-1.5 transition-colors"
        >
          <span>Return to Airawati Customer Website</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
