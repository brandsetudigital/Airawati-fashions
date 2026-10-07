// frontend/src/pages/SignIn.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../services/api';

export default function SignIn() {
  const navigate = useNavigate();
  const { login, showToast } = useCart();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const res = await api.auth.login({ email: email.trim().toLowerCase(), password });
      setLoading(false);
      if (res && res.success) {
        login(res.user, res.token);
        navigate('/account');
        return;
      } else {
        setError(res?.message || 'Invalid email or password');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Invalid email or password. Please try again.');
    }
  };

  const handleGoogleSignIn = () => {
    showToast('Google Sign In is ready. Please log in with your credentials.');
  };

  return (
    <div className="min-h-screen md:h-screen md:max-h-screen bg-[#FAF6F0] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
      
      {/* LEFT HALF: HERITAGE MODEL PHOTO */}
      <div className="md:w-[42%] lg:w-[40%] xl:w-[38%] relative h-[260px] sm:h-[320px] md:h-full bg-stone-100 flex-shrink-0 overflow-hidden">
        <img
          src="/images/auth_models.jpg"
          alt="Airawati Royal Festive Handlooms"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:hidden"></div>
      </div>

      {/* RIGHT HALF: SIGN IN FORM CONTAINER */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#FAF6F0] md:h-full md:overflow-y-auto">
        <div className="max-w-md w-full my-auto space-y-4">
          
          {/* AIRAWATI BRAND LOGO */}
          <div className="text-center mb-2">
            <Link to="/" className="inline-block group" title="Airawati - Every handwoven saree, one home">
              <img 
                src="/images/airawati_logo.png" 
                alt="Airawati" 
                className="h-14 sm:h-16 w-auto mx-auto object-contain group-hover:scale-105 transition-transform" 
              />
            </Link>
          </div>

          {/* PAGE TITLE & SUBTITLE */}
          <div className="space-y-1">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A151B]">
              Sign In
            </h1>
            <p className="text-xs font-semibold text-[#E04B38]">
              Please fill your detail to access your account
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Email*
              </label>
              <input
                type="email"
                required
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 border border-stone-200 outline-none focus:border-[#6E1C24] focus:ring-1 focus:ring-[#6E1C24] transition-all shadow-2xs"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white rounded-lg pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 border border-stone-200 outline-none focus:border-[#6E1C24] focus:ring-1 focus:ring-[#6E1C24] transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-stone-800 font-semibold select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#6E1C24] w-4 h-4 rounded cursor-pointer"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => showToast('Password reset link sent to your registered email.')}
                className="text-stone-700 hover:text-[#6E1C24] font-semibold underline transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#6B1E28] hover:bg-[#52131C] text-white py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider transition-colors shadow-md mt-1"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative my-3 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-300"></div>
              </div>
              <span className="relative bg-[#FAF6F0] px-3 text-xs font-semibold text-stone-500">
                or Sign in with
              </span>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Sign In With Google</span>
            </button>

            {/* Footer Redirect */}
            <p className="text-center text-xs text-stone-700 font-medium pt-1">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#6E1C24] font-bold underline hover:text-[#52131C]">
                Sign Up
              </Link>
            </p>

          </form>

        </div>
      </div>

    </div>
  );
}
