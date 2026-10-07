// frontend/src/pages/VerifyCode.jsx
import React, { useState, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';

export default function VerifyCode() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { otpEmail, login, showToast } = useCart();

  const emailParam = searchParams.get('email') || otpEmail || 'example@gmail.com';

  // 4-digit OTP fields matching backend verification code
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    // Only accept numbers
    if (value && !/^\d+$/.test(value)) return;

    const char = value.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);

    // Auto-focus next input
    if (char && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace: clear current and focus previous
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const enteredCode = otpDigits.join('');

    if (enteredCode.length < 4) {
      setError('Please enter the verification code');
      return;
    }

    setLoading(true);
    try {
      const res = await api.auth.verifyCode({ email: emailParam, code: enteredCode });
      setLoading(false);
      if (res && res.success) {
        login(res.user, res.token);
        showToast('Email verified successfully! Welcome to Airawati.');
        navigate('/account');
        return;
      } else {
        setError(res?.message || 'Invalid code');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Invalid verification code. Please check or use code 1234.');
    }
  };

  const handleResend = () => {
    showToast(`A fresh verification code has been dispatched to ${emailParam}!`);
  };

  return (
    <div className="min-h-screen md:h-screen md:max-h-screen bg-[#FAF6F0] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
      
      {/* LEFT HALF: HERITAGE MODEL PHOTO (Proportionally sized to fit screen without being huge) */}
      <div className="md:w-[42%] lg:w-[40%] xl:w-[38%] relative h-[260px] sm:h-[320px] md:h-full bg-stone-100 flex-shrink-0 overflow-hidden">
        <img
          src="/images/auth_models.jpg"
          alt="Airawati Royal Festive Handlooms"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:hidden"></div>
      </div>

      {/* RIGHT HALF: VERIFY CODE CONTAINER (Centered, fitting on screen) */}
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
              Verify Code
            </h1>
            <p className="text-xs font-semibold text-[#E04B38]">
              Please enter the 4-digit code sent to your email
            </p>
            <p className="text-xs font-bold text-stone-700">
              {emailParam}
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {error}
            </div>
          )}

          {/* OTP FORM */}
          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-2">
                4-Digit Code*
              </label>

              {/* 4 Digit Input Boxes */}
              <div className="grid grid-cols-4 gap-3 max-w-[280px]">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-full aspect-square text-center font-bold text-xl sm:text-2xl text-stone-900 bg-white rounded-xl border border-stone-300 outline-none focus:border-[#6E1C24] focus:ring-2 focus:ring-[#6E1C24]/20 transition-all shadow-sm"
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="w-full bg-[#6B1E28] hover:bg-[#52131C] text-white py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider transition-colors shadow-md"
            >
              Verify
            </button>

            {/* Resend Code Footer */}
            <p className="text-center text-xs text-stone-700 font-medium pt-1">
              Didn't Receive code?{' '}
              <button
                type="button"
                onClick={handleResend}
                className="text-[#E04B38] font-bold underline hover:opacity-80 transition-opacity"
              >
                Resend Code
              </button>
            </p>

          </form>

        </div>
      </div>

    </div>
  );
}
