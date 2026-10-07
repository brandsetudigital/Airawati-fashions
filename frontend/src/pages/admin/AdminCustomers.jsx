// frontend/src/pages/admin/AdminCustomers.jsx
import React, { useState } from 'react';
import { Search, Eye, X, Phone, Mail, ShoppingBag } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminCustomers() {
  const { customers } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(3);

  const filtered = customers.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* TITLE */}
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A151B]">
            Customers
          </h1>
        </div>

        {/* SEARCH BAR (Matching Screenshot 4) */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#F0D5DA] rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
          />
        </div>

        {/* CUSTOMERS TABLE CARD (Matching Screenshot 4) */}
        <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF2F4] text-[#5C1329] uppercase font-bold text-[11px] tracking-wider border-b border-[#F0D5DA]">
                <tr>
                  <th className="py-3.5 px-5">Customer Name</th>
                  <th className="py-3.5 px-5">Email</th>
                  <th className="py-3.5 px-5 text-center">Total Orders</th>
                  <th className="py-3.5 px-5">Total Spent</th>
                  <th className="py-3.5 px-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FDF8F7] transition-colors">
                    
                    {/* Customer Name + Phone */}
                    <td className="py-4 px-5">
                      <div className="font-bold text-stone-900 text-xs">{c.name}</div>
                      <div className="text-stone-500 text-[11px] mt-0.5">{c.phone}</div>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-5">
                      <div className="text-stone-800 font-medium text-xs">{c.email}</div>
                      {c.city && <div className="text-stone-400 text-[11px] mt-0.5">{c.city}</div>}
                    </td>

                    {/* Total Orders */}
                    <td className="py-4 px-5 text-center font-bold text-stone-800 text-xs">
                      {c.ordersCount}
                    </td>

                    {/* Total Spent */}
                    <td className="py-4 px-5 font-bold text-stone-900 text-xs">
                      ₹ {c.totalSpent.toLocaleString('en-IN')}
                    </td>

                    {/* Actions View Button (Maroon) */}
                    <td className="py-4 px-5 text-center">
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="px-4 py-1.5 bg-[#5C1329] hover:bg-[#470e1f] text-white rounded text-[11px] font-semibold transition-all shadow-xs"
                      >
                        View
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION BAR (Matching Screenshot 4: < 1 2 [3] 2 >) */}
          <div className="py-3.5 px-5 bg-[#FAF2F4]/40 border-t border-stone-100 flex items-center justify-center text-xs">
            <div className="flex items-center space-x-1.5">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="w-7 h-7 flex items-center justify-center rounded border border-stone-200 text-stone-600 hover:bg-white text-[11px]"
              >
                &lt;
              </button>
              <button 
                onClick={() => setCurrentPage(1)}
                className={`w-7 h-7 flex items-center justify-center rounded text-[11px] font-semibold ${
                  currentPage === 1 ? 'bg-[#5C1329] text-white' : 'border border-stone-200 hover:bg-white'
                }`}
              >
                1
              </button>
              <button 
                onClick={() => setCurrentPage(2)}
                className={`w-7 h-7 flex items-center justify-center rounded text-[11px] font-semibold ${
                  currentPage === 2 ? 'bg-[#5C1329] text-white' : 'border border-stone-200 hover:bg-white'
                }`}
              >
                2
              </button>
              <button 
                onClick={() => setCurrentPage(3)}
                className={`w-7 h-7 flex items-center justify-center rounded text-[11px] font-semibold ${
                  currentPage === 3 ? 'bg-[#5C1329] text-white' : 'border border-stone-200 hover:bg-white'
                }`}
              >
                3
              </button>
              <button 
                onClick={() => setCurrentPage(2)}
                className="w-7 h-7 flex items-center justify-center rounded border border-stone-200 text-stone-600 hover:bg-white text-[11px] font-semibold"
              >
                2
              </button>
              <button 
                onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                className="w-7 h-7 flex items-center justify-center rounded border border-stone-200 text-stone-600 hover:bg-white text-[11px]"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* CUSTOMER DETAILS MODAL */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-[#F0D5DA] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-lg text-[#5C1329]">
                Customer Profile
              </h3>
              <button onClick={() => setSelectedCustomer(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="bg-[#FAF2F4]/50 p-4 rounded-lg border border-[#F0D5DA] flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#5C1329] text-white font-serif font-bold text-lg flex items-center justify-center">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{selectedCustomer.name}</h4>
                  <p className="text-stone-500 text-[11px]">{selectedCustomer.city || 'India'} • Member since {selectedCustomer.joined || '2024'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-stone-50 rounded-lg">
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Total Orders</span>
                  <span className="text-lg font-bold text-stone-900">{selectedCustomer.ordersCount}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg">
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Lifetime Spent</span>
                  <span className="text-lg font-bold text-[#5C1329]">₹ {selectedCustomer.totalSpent.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex items-center gap-2 text-stone-700">
                  <Mail className="w-3.5 h-3.5 text-[#5C1329]" />
                  <span>{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <Phone className="w-3.5 h-3.5 text-[#5C1329]" />
                  <span>{selectedCustomer.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 text-right">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-[#5C1329] text-white text-xs font-semibold rounded-lg shadow-xs"
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
