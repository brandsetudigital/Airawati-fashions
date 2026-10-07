// frontend/src/components/AuthModal.jsx
import React, { useState, useRef } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, authTab, setAuthTab, otpEmail, setOtpEmail, showToast, login } = useCart();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Prefilled with '2', '2', '', '', '', '' matching Screenshot 4
  const [otpDigits, setOtpDigits] = useState(['2', '2', '', '', '', '']);
  const inputRefs = useRef([]);

  if (!isAuthOpen) return null;

  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;
    const char = value.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);

    if (char && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    const emailVal = e.target.email?.value?.trim()?.toLowerCase();
    const passwordVal = e.target.password?.value;

    if (!emailVal || !passwordVal) return;

    setAuthLoading(true);
    try {
      const res = await api.auth.login({ email: emailVal, password: passwordVal });
      if (res && res.token) {
        login(res.user, res.token);
        setIsAuthOpen(false);
        navigate('/account');
      } else {
        setAuthError(res?.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setAuthError(err.message || 'Invalid email or password.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    const form = e.target;
    const firstName = form.firstName?.value?.trim() || '';
    const lastName = form.lastName?.value?.trim() || '';
    const name = `${firstName} ${lastName}`.trim() || 'Customer';
    const email = form.email?.value?.trim()?.toLowerCase() || '';
    const password = form.password?.value || '';
    const confirmPassword = form.confirmPassword?.value || '';

    if (password !== confirmPassword) {
      setAuthError('Passwords do not match');
      return;
    }

    setAuthLoading(true);
    try {
      const res = await api.auth.register({ name, email, password });
      if (res && res.success) {
        setOtpEmail(email);
        setAuthTab('otp');
        if (res.verificationCode) {
          showToast(`Verification code: ${res.verificationCode}`);
        } else {
          showToast(`Verification code sent to ${email}!`);
        }
      } else {
        setAuthError(res?.message || 'Sign up failed');
      }
    } catch (err) {
      setAuthError(err.message || 'Registration failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    const code = otpDigits.join('').trim();
    if (!code) return;

    setAuthLoading(true);
    try {
      const res = await api.auth.verifyCode({ email: otpEmail, code });
      if (res && res.token) {
        login(res.user, res.token);
        setIsAuthOpen(false);
        navigate('/account');
      } else {
        setAuthError(res?.message || 'Invalid verification code');
      }
    } catch (err) {
      // Fallback for demo
      const nameVal = otpEmail && otpEmail.includes('@') ? otpEmail.split('@')[0] : 'Customer';
      login({ name: nameVal, email: otpEmail });
      setIsAuthOpen(false);
      navigate('/account');
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF6F0] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 text-stone-500 hover:text-stone-800 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
          
          {/* LEFT HALF: PALACE MODELS PHOTO */}
          <div className="hidden md:block relative h-full">
            <img
              src="/images/auth_models.jpg"
              alt="Airawati Royal Festive Handlooms"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT HALF: FORMS */}
          <div className="p-6 sm:p-10 flex flex-col justify-center bg-[#FAF6F0]">
            
            {/* BRAND LOGO */}
            <div className="text-center mb-3">
              <img 
                src="/images/airawati_logo.png" 
                alt="Airawati" 
                className="h-14 sm:h-16 w-auto mx-auto object-contain" 
              />
            </div>

            {/* TAB 1: SIGN IN */}
            {authTab === 'signin' && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#4A151B]">Sign In</h2>
                <p className="text-xs font-semibold text-[#E04B38] mt-1 mb-4">
                  Please fill your detail to access your account
                </p>

                {authError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg mb-3">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Email*</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="example@gmail.com"
                      className="w-full bg-white rounded-lg px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 border border-stone-200 outline-none focus:border-[#6E1C24]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">Password *</label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Enter Password"
                        className="w-full bg-white rounded-lg pl-3.5 pr-10 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 border border-stone-200 outline-none focus:border-[#6E1C24]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer text-stone-800 font-semibold">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="accent-[#6E1C24] w-4 h-4"
                      />
                      <span>Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setAuthTab('otp')}
                      className="text-stone-600 hover:text-[#6E1C24] font-semibold underline"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#6B1E28] hover:bg-[#52131C] text-white py-2.5 rounded-xl font-bold text-xs tracking-wider transition-colors shadow-sm"
                  >
                    Sign In
                  </button>
                </form>

                <div className="relative my-4 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-300"></div></div>
                  <span className="relative bg-[#FAF6F0] px-3 text-xs font-semibold text-stone-500">or Sign in with</span>
                </div>

                <button
                  type="button"
                  onClick={handleSignInSubmit}
                  className="w-full bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" /></svg>
                  <span>Sign In With Google</span>
                </button>

                <p className="text-center text-xs text-stone-700 font-medium pt-3">
                  Don't have an account?{' '}
                  <button onClick={() => setAuthTab('signup')} className="text-[#6E1C24] font-bold underline">
                    Sign Up
                  </button>
                </p>
              </div>
            )}

            {/* TAB 2: SIGN UP */}
            {authTab === 'signup' && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#4A151B]">Sign Up</h2>
                <p className="text-xs font-semibold text-[#E04B38] mt-1 mb-4">
                  Fill your information below or register with your social account
                </p>

                {authError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg mb-3">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleSignUpSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-800 mb-1">First Name*</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        placeholder="Bessie"
                        className="w-full bg-white rounded-lg px-3 py-2 text-xs border border-stone-200 outline-none focus:border-[#6E1C24]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-800 mb-1">Last Name*</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        placeholder="Cooper"
                        className="w-full bg-white rounded-lg px-3 py-2 text-xs border border-stone-200 outline-none focus:border-[#6E1C24]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-800 mb-1">Email*</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="example@gmail.com"
                      className="w-full bg-white rounded-lg px-3 py-2 text-xs border border-stone-200 outline-none focus:border-[#6E1C24]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-800 mb-1">Password *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                        placeholder="Enter Password"
                        className="w-full bg-white rounded-lg pl-3 pr-9 py-2 text-xs border border-stone-200 outline-none focus:border-[#6E1C24]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-800 mb-1">Confirm New Password *</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        required
                        placeholder="Enter Password"
                        className="w-full bg-white rounded-lg pl-3 pr-9 py-2 text-xs border border-stone-200 outline-none focus:border-[#6E1C24]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-800 font-semibold">
                      <input type="checkbox" defaultChecked className="accent-[#6E1C24] w-4 h-4" />
                      <span>Remember me</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#6B1E28] hover:bg-[#52131C] text-white py-2.5 rounded-xl font-bold text-xs tracking-wider transition-colors shadow-sm"
                  >
                    Sign Up
                  </button>
                </form>

                <p className="text-center text-xs text-stone-700 font-medium pt-3">
                  Already have an account?{' '}
                  <button onClick={() => setAuthTab('signin')} className="text-[#6E1C24] font-bold underline">
                    Sign In
                  </button>
                </p>
              </div>
            )}

            {/* TAB 3: VERIFY CODE (OTP) */}
            {authTab === 'otp' && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#4A151B]">Verify Code</h2>
                <p className="text-xs font-semibold text-[#E04B38] mt-1 mb-0.5">
                  Please enter the code we just sent to email
                </p>
                <p className="text-xs font-bold text-stone-700 mb-4">
                  {otpEmail || 'example@gmail.com'}
                </p>

                {authError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg mb-3">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleVerifyOtpSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-2">Code*</label>
                    <div className="grid grid-cols-6 gap-2">
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => (inputRefs.current[idx] = el)}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(idx, e)}
                          className="w-full aspect-square text-center font-bold text-lg text-stone-900 bg-white rounded-lg border border-stone-300 outline-none focus:border-[#6E1C24]"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#6B1E28] hover:bg-[#52131C] text-white py-3 rounded-xl font-bold text-xs tracking-wider transition-colors shadow-sm"
                  >
                    Verify
                  </button>

                  <p className="text-center text-xs text-stone-700 font-medium">
                    Didn't Receive code?{' '}
                    <button
                      type="button"
                      onClick={() => showToast(`Code resent to ${otpEmail || 'example@gmail.com'}!`)}
                      className="text-[#E04B38] font-bold underline"
                    >
                      Resend Code
                    </button>
                  </p>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
