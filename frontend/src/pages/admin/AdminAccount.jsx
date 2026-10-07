// frontend/src/pages/admin/AdminAccount.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Edit3, 
  Lock, 
  Key, 
  ShieldCheck, 
  Clock, 
  Globe, 
  ChevronRight, 
  X, 
  CheckCircle2 
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminAccount() {
  const { adminProfile, updateProfile, showNotification } = useAdmin();

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: adminProfile?.name || 'Aditi Sharma',
    email: adminProfile?.email || 'admin@airawati.com',
    supportEmail: adminProfile?.supportEmail || 'hello@airawati.com',
    role: adminProfile?.role || 'Admin',
    bio: adminProfile?.bio || 'Woven with luxurious gold zari work. Perfect for weddings and festive occasions.'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditProfileOpen(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordForm.newPassword) return;
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    showNotification("Admin password changed successfully!");
    setIsPasswordModalOpen(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-6xl">
        
        {/* TOP BREADCRUMB & ACTION BUTTONS (Matching Screenshot 2) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-stone-500 font-medium">
            <Link to="/admin/dashboard" className="hover:text-[#5C1329]">Dashboard</Link>
            <span className="mx-2">/</span>
            <span className="text-[#5C1329] font-bold">My Account</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => showNotification("Draft preferences saved successfully")}
              className="px-3.5 py-1.5 bg-[#FAF2F4] hover:bg-[#F9ECEF] text-stone-700 text-xs font-semibold rounded-md border border-[#F0D5DA] transition-colors"
            >
              Save Draft
            </button>
            <button 
              onClick={() => showNotification("Settings published successfully")}
              className="px-4 py-1.5 bg-[#5C1329] hover:bg-[#470e1f] text-white text-xs font-semibold rounded-md transition-all shadow-xs"
            >
              Save & Publish
            </button>
            <Link 
              to="/admin/dashboard"
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-semibold rounded-md transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* HEADING */}
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A151B]">
            My Account
          </h1>
        </div>

        {/* 2-COLUMN MAIN CONTENT GRID (Matching Screenshot 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT COLUMN: Profile Info & Bio */}
          <div className="space-y-6">
            
            {/* Card 1: Profile Information */}
            <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs p-6 space-y-4">
              <h2 className="font-semibold text-stone-900 text-sm">
                Profile Information
              </h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-[#C5A059]/40 shadow-xs shrink-0">
                  <img 
                    src={adminProfile.avatar || '/images/admin_avatar.jpg'} 
                    alt={adminProfile.name}
                    className="w-full h-full object-cover" 
                  />
                </div>

                <div className="space-y-1 text-xs text-stone-600 flex-1">
                  <div className="font-bold text-stone-900 text-sm">{adminProfile.name}</div>
                  <div><span className="font-semibold text-stone-500">Email:</span> {adminProfile.email}</div>
                  <div><span className="font-semibold text-stone-500">Name:</span> {adminProfile.supportEmail}</div>
                  <div><span className="font-semibold text-stone-500">Role:</span> {adminProfile.role}</div>
                </div>

                <button
                  onClick={() => setIsEditProfileOpen(true)}
                  className="px-4 py-2 bg-[#5C1329] hover:bg-[#470e1f] text-white text-xs font-semibold rounded-lg transition-all shadow-xs shrink-0"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Card 2: Admin Account Settings (Bio / Notes) */}
            <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-stone-900 text-sm">
                  Admin Account Settings
                </h2>
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="px-3.5 py-1.5 bg-[#FAF2F4] hover:bg-[#F9ECEF] text-[#5C1329] text-xs font-semibold rounded-md border border-[#F0D5DA] transition-colors"
                >
                  Change Password
                </button>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed pt-1">
                {adminProfile.bio}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Password & Login Activity (Matching Screenshot 2) */}
          <div className="space-y-6">
            
            {/* Card 3: Security & Activity */}
            <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs p-6 space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h2 className="font-semibold text-stone-900 text-sm">
                  Admin Account Settings
                </h2>
              </div>

              {/* Change Password Bar */}
              <div className="space-y-2">
                <div 
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="flex items-center justify-between text-xs font-semibold text-stone-800 cursor-pointer hover:text-[#5C1329] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-3.5 h-3.5 text-[#5C1329]" />
                    <span>Change Password</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </div>

                <div className="flex gap-2">
                  <input
                    type="password"
                    disabled
                    value="••••••••••••"
                    className="flex-1 px-3 py-2 bg-[#FAF2F4]/50 border border-[#F0D5DA] rounded-lg text-xs text-stone-500 font-mono tracking-widest"
                  />
                  <button
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="px-4 py-2 bg-[#FAF2F4] hover:bg-[#5C1329] text-[#5C1329] hover:text-white font-semibold text-xs rounded-lg transition-all border border-[#F0D5DA] shrink-0"
                  >
                    Change Password
                  </button>
                </div>
              </div>

              {/* Login Activity (Matching Screenshot 2) */}
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <h3 className="text-xs font-bold text-stone-900">Login Activity</h3>
                <p className="text-xs text-stone-600">
                  Last login: <span className="font-medium text-stone-800">{adminProfile.lastLogin}</span>
                </p>
                <p className="text-xs text-stone-600">
                  IP: <span className="font-mono text-stone-800 font-semibold">{adminProfile.ip}</span>
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setIsLogModalOpen(true)}
                    className="px-5 py-2 bg-[#5C1329] hover:bg-[#470e1f] text-white text-xs font-semibold rounded-lg transition-all shadow-xs"
                  >
                    View Log
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-[#F0D5DA] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-lg text-[#5C1329]">
                Edit Profile Information
              </h3>
              <button onClick={() => setIsEditProfileOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-3.5 text-xs text-stone-700">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Support Email / Name</label>
                <input
                  type="text"
                  value={profileForm.supportEmail}
                  onChange={(e) => setProfileForm({ ...profileForm, supportEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Admin Note / Bio</label>
                <textarea
                  rows="3"
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 border border-stone-200 text-stone-700 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5C1329] text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-[#F0D5DA] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-lg text-[#5C1329]">
                Change Admin Password
              </h3>
              <button onClick={() => setIsPasswordModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3.5 text-xs text-stone-700">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  placeholder="At least 6 characters"
                  className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  placeholder="Re-enter new password"
                  className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 text-stone-700 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5C1329] text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LOGIN ACTIVITY LOG MODAL */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-[#F0D5DA] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-lg text-[#5C1329]">
                Admin Security Audit Log
              </h3>
              <button onClick={() => setIsLogModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-stone-700">
              {[
                { time: 'April 23, 2024, 11:40 AM', ip: '123.456.78.90', device: 'Chrome on macOS', status: 'Success' },
                { time: 'April 22, 2024, 04:15 PM', ip: '123.456.78.90', device: 'Chrome on macOS', status: 'Success' },
                { time: 'April 21, 2024, 09:30 AM', ip: '123.456.78.90', device: 'Safari on iPhone', status: 'Success' },
                { time: 'April 20, 2024, 02:50 PM', ip: '103.21.144.12', device: 'Firefox on Windows', status: 'Success' }
              ].map((log, i) => (
                <div key={i} className="p-3 bg-[#FAF2F4]/40 border border-[#F0D5DA] rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-stone-900 block">{log.time}</span>
                    <span className="text-stone-500 text-[11px]">{log.ip} • {log.device}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 text-right">
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
