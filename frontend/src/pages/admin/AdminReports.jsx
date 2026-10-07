// frontend/src/pages/admin/AdminReports.jsx
import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  ArrowUpRight, 
  Calendar 
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminReports() {
  const categorySales = [
    { category: 'Banarasi Sarees', revenue: '₹ 4,85,200', count: 48, share: '42%' },
    { category: 'Kanjivaram Silk', revenue: '₹ 3,12,000', count: 26, share: '27%' },
    { category: 'Maheshwari Handloom', revenue: '₹ 1,98,400', count: 32, share: '17%' },
    { category: 'Chanderi Collection', revenue: '₹ 1,62,500', count: 24, share: '14%' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A151B]">
            Sales & Performance Reports
          </h1>
        </div>

        {/* STAT OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-[#F0D5DA] shadow-xs">
            <span className="text-xs text-stone-500 font-semibold block mb-1">Monthly Gross Revenue</span>
            <div className="text-2xl font-bold text-[#5C1329]">₹ 11,58,100</div>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +18.4% from last month
            </span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-[#F0D5DA] shadow-xs">
            <span className="text-xs text-stone-500 font-semibold block mb-1">Average Order Value (AOV)</span>
            <div className="text-2xl font-bold text-stone-900">₹ 8,920</div>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +6.2% improvement
            </span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-[#F0D5DA] shadow-xs">
            <span className="text-xs text-stone-500 font-semibold block mb-1">Handloom Artisan Payouts</span>
            <div className="text-2xl font-bold text-[#C5A059]">₹ 7,42,000</div>
            <span className="text-[11px] text-stone-500 font-medium block mt-1">
              Direct fair-wage impact
            </span>
          </div>
        </div>

        {/* CATEGORY BREAKDOWN TABLE */}
        <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs p-5 sm:p-6 space-y-4">
          <h2 className="font-serif text-lg font-bold text-[#4A151B]">
            Revenue by Weave Category
          </h2>

          <div className="overflow-x-auto rounded-lg border border-stone-100">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF2F4] text-[#5C1329] uppercase font-bold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Craft Cluster</th>
                  <th className="py-3.5 px-4">Total Revenue</th>
                  <th className="py-3.5 px-4">Units Sold</th>
                  <th className="py-3.5 px-4">Revenue Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {categorySales.map((c) => (
                  <tr key={c.category} className="hover:bg-[#FDF8F7] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-stone-900">{c.category}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#5C1329]">{c.revenue}</td>
                    <td className="py-3.5 px-4 font-medium">{c.count} Sarees</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-stone-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#5C1329] h-full rounded-full" 
                            style={{ width: c.share }}
                          />
                        </div>
                        <span className="font-semibold text-stone-800 text-[11px]">{c.share}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
