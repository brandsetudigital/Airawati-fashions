// frontend/src/pages/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Package, 
  Eye,
  X
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminDashboard() {
  const { orders, updateOrderStatus } = useAdmin();
  const [filterTab, setFilterTab] = useState('All Orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Status badge styling helper
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-[#487346] text-white';
      case 'shipped':
        return 'bg-[#4A729A] text-white';
      case 'pending':
        return 'bg-[#C7873D] text-white';
      case 'delivered':
        return 'bg-[#5B7B5A] text-white';
      case 'cancelled':
        return 'bg-red-600 text-white';
      default:
        return 'bg-stone-500 text-white';
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    // Tab filter
    if (filterTab === 'New' && order.date !== 'Today') return false;
    if (filterTab === 'Shipped' && order.status !== 'Shipped') return false;
    
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(q) ||
        order.customer.toLowerCase().includes(q) ||
        order.product.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* PAGE HEADING */}
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A151B]">
            Dashboard
          </h1>
        </div>

        {/* 4 TOP STAT CARDS (Matching Screenshot 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Orders */}
          <div className="bg-white rounded-xl p-5 border border-[#F0D5DA] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#5C1329] text-white flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-stone-900 leading-none">1,215</div>
              <div className="text-xs text-stone-500 mt-1 font-medium">Total Orders</div>
            </div>
          </div>

          {/* Card 2: New Orders Today */}
          <div className="bg-white rounded-xl p-5 border border-[#F0D5DA] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#487346] text-white flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="text-2xl font-bold text-stone-900 leading-none">12</div>
              <div className="text-xs text-stone-500 mt-1 font-medium">New Orders Today</div>
            </div>
          </div>

          {/* Card 3: Pending Orders */}
          <div className="bg-white rounded-xl p-5 border border-[#F0D5DA] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C7873D] text-white flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-stone-900 leading-none">8</div>
              <div className="text-xs text-stone-500 mt-1 font-medium">Pending Orders</div>
            </div>
          </div>

          {/* Card 4: Completed Orders */}
          <div className="bg-white rounded-xl p-5 border border-[#F0D5DA] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#5B7B5A] text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-stone-900 leading-none">1,087</div>
              <div className="text-xs text-stone-500 mt-1 font-medium">Completed Orders</div>
            </div>
          </div>
        </div>

        {/* RECENT ORDERS SECTION (Matching Screenshot 3) */}
        <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs p-5 sm:p-6 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="font-serif text-lg font-bold text-[#4A151B]">
              Recent Orders
            </h2>

            {/* Filter Pills Bar */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              {['All Orders', 'New', 'Shipped'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
                  className={`px-3.5 py-1.5 rounded-md font-medium transition-colors ${
                    filterTab === tab
                      ? 'bg-[#F9ECEF] text-[#5C1329] font-bold border border-[#F0D5DA]'
                      : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Actions Bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search product, customer, or order ID..."
                className="w-full pl-9 pr-3 py-2 bg-[#FAF2F4]/50 border border-[#F0D5DA] rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
              />
            </div>
            <button 
              onClick={() => alert("Showing default sort: Most recent first")}
              className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs rounded-lg font-medium flex items-center gap-1.5 shrink-0"
            >
              <span>Sort</span>
              <ArrowUpDown className="w-3 h-3" />
            </button>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto rounded-lg border border-stone-100">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF2F4] text-[#5C1329] uppercase font-bold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-stone-400">
                      No matching orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.slice(0, 5).map((order) => (
                    <tr 
                      key={order.id} 
                      className="hover:bg-[#FDF8F7] transition-colors cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="py-3.5 px-4 font-semibold text-stone-900 flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#5C1329] shrink-0" />
                        <span>{order.id}</span>
                      </td>
                      <td className="py-3.5 px-4">{order.customer}</td>
                      <td className="py-3.5 px-4 font-medium">₹ {order.amount.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium">₹ {order.amount.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-4 text-stone-500">{order.date}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                          }}
                          className="p-1 text-stone-500 hover:text-[#5C1329] rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* VIEW ALL ORDERS BUTTON (Matching Screenshot 3) */}
          <div className="pt-2 text-center">
            <Link
              to="/admin/orders"
              className="inline-block px-6 py-2.5 bg-[#5C1329] hover:bg-[#470e1f] text-white text-xs font-semibold rounded-lg transition-all shadow-xs"
            >
              View All Orders
            </Link>
          </div>
        </div>

      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-[#F0D5DA] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#5C1329]">
                  Order {selectedOrder.id}
                </h3>
                <p className="text-[11px] text-stone-500">{selectedOrder.orderDate}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="grid grid-cols-2 gap-3 bg-[#FAF2F4]/40 p-3 rounded-lg border border-[#F0D5DA]">
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Customer</span>
                  <span className="font-semibold text-stone-900">{selectedOrder.customer}</span>
                  <p className="text-stone-500 text-[11px]">{selectedOrder.email}</p>
                  <p className="text-stone-500 text-[11px]">{selectedOrder.phone}</p>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Payment & Status</span>
                  <span className="font-semibold text-stone-900">{selectedOrder.payment}</span>
                  <div className="mt-1">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${getStatusBadge(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold mb-1">Product</span>
                <p className="font-medium text-stone-900">{selectedOrder.product}</p>
                <p className="text-[#5C1329] font-bold mt-0.5">₹ {selectedOrder.amount.toLocaleString('en-IN')}</p>
              </div>

              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold mb-1">Shipping Address</span>
                <p className="text-stone-600 leading-relaxed">{selectedOrder.address}</p>
              </div>

              {/* Status Updater */}
              <div className="pt-2 border-t border-stone-100">
                <span className="text-stone-500 block text-[10px] uppercase font-bold mb-1.5">
                  Update Order Status:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Pending', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, st);
                        setSelectedOrder((prev) => ({ ...prev, status: st }));
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-all cursor-pointer ${
                        selectedOrder.status === st
                          ? 'bg-[#5C1329] text-white border-[#5C1329]'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-[#5C1329]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 text-right">
              <button
                onClick={() => setSelectedOrder(null)}
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
