// frontend/src/pages/admin/AdminConsultations.jsx
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Scissors, 
  Phone, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Clock3, 
  X, 
  Filter, 
  Eye, 
  User, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../services/api';

export default function AdminConsultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  // Load consultations from backend and localStorage
  const fetchConsultations = async () => {
    setLoading(true);
    let loaded = [];

    try {
      const adminToken = localStorage.getItem('airawati_admin_token') || localStorage.getItem('airawati_token');
      if (adminToken) {
        const res = await api.boutique.getConsultations();
        if (res && res.consultations && res.consultations.length > 0) {
          loaded = res.consultations.map(c => ({
            id: c._id || c.bookingId,
            bookingId: c.bookingId || `AIRA-ST-${String(c._id).slice(-6)}`,
            customerName: c.customerName,
            customerPhone: c.customerPhone,
            customerEmail: c.customerEmail || 'customer@airawati.com',
            blouseTitle: c.blouseTitle || 'Custom Blouse',
            blouseSku: c.blouseSku || '',
            size: c.size || 'M',
            preferredDate: c.preferredDate || new Date().toISOString().split('T')[0],
            timeSlot: c.timeSlot || '10:00 AM - 12:00 PM',
            fabricChoice: c.fabricChoice || 'Pure Silk',
            status: c.status || 'New',
            createdAt: c.createdAt || new Date().toISOString()
          }));
        }
      }
    } catch (err) {
      console.warn('Consultations fetch notice:', err.message);
    }

    // Also check local storage consultations
    try {
      const local = JSON.parse(localStorage.getItem('airawati_stitch_consultations') || '[]');
      local.forEach(loc => {
        if (!loaded.some(item => item.bookingId === loc.bookingId)) {
          loaded.push({
            id: loc.bookingId,
            bookingId: loc.bookingId,
            customerName: loc.fullName,
            customerPhone: loc.phone,
            customerEmail: loc.email || 'customer@airawati.com',
            blouseTitle: loc.blouse?.title || 'Custom Blouse',
            blouseSku: loc.blouse?.sku || '',
            size: loc.size || 'M',
            preferredDate: loc.date,
            timeSlot: loc.timeSlot,
            fabricChoice: loc.blouse?.fabric || 'Pure Silk',
            status: loc.status || 'New',
            createdAt: loc.bookedAt || new Date().toISOString()
          });
        }
      });
    } catch (e) {}

    // Fallback sample if brand new install
    if (loaded.length === 0) {
      loaded = [
        {
          id: 'AIRA-ST-892101',
          bookingId: 'AIRA-ST-892101',
          customerName: 'Pooja Agarwal',
          customerPhone: '+91 98201 54321',
          customerEmail: 'pooja.a@example.com',
          blouseTitle: 'Embroidered Classic',
          blouseSku: 'BL-001',
          size: 'M',
          preferredDate: 'Tomorrow',
          timeSlot: '02:00 PM - 04:00 PM',
          fabricChoice: 'Raw Silk with Zardozi Hand Embroidery',
          status: 'New',
          createdAt: new Date().toISOString()
        },
        {
          id: 'AIRA-ST-892102',
          bookingId: 'AIRA-ST-892102',
          customerName: 'Meera Rajput',
          customerPhone: '+91 94120 78901',
          customerEmail: 'meera.r@example.com',
          blouseTitle: 'Silk Traditional (Peacock Motif)',
          blouseSku: 'BL-002',
          size: 'L',
          preferredDate: 'Next Day',
          timeSlot: '10:00 AM - 12:00 PM',
          fabricChoice: 'Handwoven Rani Silk with Gold Dori Tassels',
          status: 'In Consultation',
          createdAt: new Date().toISOString()
        }
      ];
    }

    setConsultations(loaded);
    setLoading(false);
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.boutique.updateStatus(id, newStatus);
    } catch (e) {}

    // Update in local state
    setConsultations(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    if (selectedConsultation && selectedConsultation.id === id) {
      setSelectedConsultation(prev => ({ ...prev, status: newStatus }));
    }

    // Update in localStorage
    try {
      const local = JSON.parse(localStorage.getItem('airawati_stitch_consultations') || '[]');
      const updated = local.map(l => l.bookingId === id ? { ...l, status: newStatus } : l);
      localStorage.setItem('airawati_stitch_consultations', JSON.stringify(updated));
    } catch (e) {}
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-[#B83227] text-white';
      case 'In Consultation':
        return 'bg-[#4A729A] text-white';
      case 'In Stitching':
        return 'bg-[#C7873D] text-white';
      case 'Completed':
        return 'bg-[#2D6A4F] text-white';
      case 'Cancelled':
        return 'bg-stone-400 text-white';
      default:
        return 'bg-stone-500 text-white';
    }
  };

  const filteredConsultations = consultations.filter((c) => {
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.customerName?.toLowerCase().includes(q) ||
        c.customerPhone?.includes(q) ||
        c.bookingId?.toLowerCase().includes(q) ||
        c.blouseTitle?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalNew = consultations.filter(c => c.status === 'New').length;
  const totalInConsult = consultations.filter(c => c.status === 'In Consultation').length;
  const totalInStitching = consultations.filter(c => c.status === 'In Stitching').length;

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* TITLE & HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A151B] flex items-center gap-2">
              <Scissors className="w-7 h-7 text-[#5C1329]" />
              <span>Boutique Consultations</span>
            </h1>
            <p className="text-xs text-stone-500 mt-1 font-light">
              Master tailor appointments &amp; bespoke blouse stitching requests booked by customers
            </p>
          </div>

          <button
            onClick={fetchConsultations}
            className="px-4 py-2 bg-white border border-[#F0D5DA] hover:border-[#5C1329] text-[#5C1329] font-semibold text-xs rounded-lg transition-all shadow-2xs self-start sm:self-auto cursor-pointer"
          >
            ↻ Refresh List
          </button>
        </div>

        {/* METRIC STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#F0D5DA] shadow-2xs">
            <span className="text-[11px] text-stone-500 block">Total Requests</span>
            <span className="font-serif font-bold text-2xl text-stone-900 mt-1 block">
              {consultations.length}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-2xs bg-rose-50/20">
            <span className="text-[11px] text-[#B83227] font-semibold block">New (Call Pending)</span>
            <span className="font-serif font-bold text-2xl text-[#B83227] mt-1 block">
              {totalNew}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-2xs">
            <span className="text-[11px] text-blue-700 font-semibold block">In Consultation</span>
            <span className="font-serif font-bold text-2xl text-blue-800 mt-1 block">
              {totalInConsult}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs">
            <span className="text-[11px] text-amber-700 font-semibold block">In Stitching</span>
            <span className="font-serif font-bold text-2xl text-amber-800 mt-1 block">
              {totalInStitching}
            </span>
          </div>
        </div>

        {/* SEARCH & STATUS FILTER */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name, phone, booking ID, or blouse..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#F0D5DA] rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            {['All', 'New', 'In Consultation', 'In Stitching', 'Completed', 'Cancelled'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-medium text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#5C1329] text-white shadow-xs'
                    : 'bg-white border border-[#F0D5DA] text-stone-600 hover:border-[#5C1329]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* CONSULTATIONS TABLE CARD */}
        <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF2F4] text-[#5C1329] uppercase font-bold text-[11px] tracking-wider border-b border-[#F0D5DA]">
                <tr>
                  <th className="py-3.5 px-4">Booking ID</th>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Blouse Design &amp; Size</th>
                  <th className="py-3.5 px-4">Appointment Schedule</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredConsultations.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-stone-400">
                      No boutique consultations found.
                    </td>
                  </tr>
                ) : (
                  filteredConsultations.map((c) => (
                    <tr key={c.id} className="hover:bg-[#FDF8F7] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#5C1329]">
                        {c.bookingId}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-stone-900">{c.customerName}</div>
                        <a
                          href={`tel:${c.customerPhone}`}
                          className="text-[11px] text-stone-500 hover:text-[#5C1329] flex items-center gap-1 mt-0.5"
                        >
                          <Phone className="w-3 h-3 text-[#B83227]" />
                          <span>{c.customerPhone}</span>
                        </a>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-stone-900">{c.blouseTitle}</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold">
                          Size: {c.size}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 font-medium text-stone-800">
                          <Calendar className="w-3.5 h-3.5 text-[#5C1329]" />
                          <span>{c.preferredDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>{c.timeSlot}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={c.status}
                          onChange={(e) => handleUpdateStatus(c.id, e.target.value)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border-none focus:outline-none cursor-pointer ${getStatusBadge(c.status)}`}
                        >
                          <option value="New" className="bg-white text-stone-800">New</option>
                          <option value="In Consultation" className="bg-white text-stone-800">In Consultation</option>
                          <option value="In Stitching" className="bg-white text-stone-800">In Stitching</option>
                          <option value="Completed" className="bg-white text-stone-800">Completed</option>
                          <option value="Cancelled" className="bg-white text-stone-800">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedConsultation(c)}
                          className="px-3 py-1.5 bg-[#FAF2F4] hover:bg-[#5C1329] text-[#5C1329] hover:text-white rounded text-[11px] font-semibold transition-all shadow-2xs inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* CONSULTATION DETAIL MODAL */}
      {selectedConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#5C1329] uppercase tracking-wider block">
                  Reference: {selectedConsultation.bookingId}
                </span>
                <h3 className="font-serif font-bold text-xl text-stone-900">
                  Tailor Consultation Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedConsultation(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-[#FAF9F7] p-4 rounded-xl space-y-2 border border-stone-100">
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Customer:</span>
                  <span className="font-bold text-stone-900">{selectedConsultation.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Phone Number:</span>
                  <a href={`tel:${selectedConsultation.customerPhone}`} className="font-bold text-[#B83227] hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{selectedConsultation.customerPhone}</span>
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Email:</span>
                  <span className="text-stone-700">{selectedConsultation.customerEmail}</span>
                </div>
              </div>

              <div className="bg-[#FAF9F7] p-4 rounded-xl space-y-2 border border-stone-100">
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Blouse Design:</span>
                  <span className="font-bold text-stone-900">{selectedConsultation.blouseTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Selected Size:</span>
                  <span className="font-bold text-[#5C1329] bg-[#5C1329]/10 px-2 py-0.5 rounded-full">
                    Size: {selectedConsultation.size}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Fabric / Details:</span>
                  <span className="text-stone-700">{selectedConsultation.fabricChoice}</span>
                </div>
              </div>

              <div className="bg-[#FAF9F7] p-4 rounded-xl space-y-2 border border-stone-100">
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Preferred Date:</span>
                  <span className="font-bold text-stone-900">{selectedConsultation.preferredDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Time Slot:</span>
                  <span className="font-bold text-stone-900">{selectedConsultation.timeSlot}</span>
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-stone-700 font-bold mb-1.5">
                  Update Consultation Status:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['New', 'In Consultation', 'In Stitching', 'Completed', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateStatus(selectedConsultation.id, st)}
                      className={`py-2 px-3 rounded-lg font-semibold text-[11px] transition-all cursor-pointer ${
                        selectedConsultation.status === st
                          ? `${getStatusBadge(st)} shadow-xs ring-2 ring-[#5C1329]/20`
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-stone-100">
              <a
                href={`tel:${selectedConsultation.customerPhone}`}
                className="px-4 py-2 bg-[#2D6A4F] hover:bg-[#20513B] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Customer</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedConsultation(null)}
                className="px-5 py-2 bg-[#5C1329] hover:bg-[#430D1E] text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
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
