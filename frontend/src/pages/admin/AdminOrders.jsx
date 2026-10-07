// frontend/src/pages/admin/AdminOrders.jsx
import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  SlidersHorizontal, 
  Package, 
  Eye, 
  X, 
  Check, 
  Trash2, 
  Filter
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminOrders() {
  const { orders, updateOrderStatus, deleteOrder } = useAdmin();
  
  const [activeTab, setActiveTab] = useState('All Orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Status badge styling helper
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-[#C7873D] text-white';
      case 'confirmed':
        return 'bg-[#487346] text-white';
      case 'packed':
      case 'processing':
        return 'bg-[#9C6644] text-white';
      case 'shipped':
        return 'bg-[#4A729A] text-white';
      case 'out for delivery':
        return 'bg-[#6B1E28] text-white';
      case 'delivered':
        return 'bg-[#2D6A4F] text-white';
      case 'cancelled':
        return 'bg-red-600 text-white';
      default:
        return 'bg-stone-500 text-white';
    }
  };

  // Filter logic
  const filteredOrders = orders.filter((order) => {
    // Tab filter
    if (activeTab === 'Pending' && order.status !== 'Pending') return false;
    if (activeTab === 'Confirmed' && order.status !== 'Confirmed') return false;
    if (activeTab === 'Packed' && order.status !== 'Packed') return false;
    if (activeTab === 'Shipped' && order.status !== 'Shipped') return false;
    if (activeTab === 'Delivered' && order.status !== 'Delivered') return false;

    // Status dropdown filter
    if (statusFilter !== 'All' && order.status !== statusFilter) return false;

    // Date dropdown filter
    if (dateFilter === 'Today' && order.date !== 'Today') return false;
    if (dateFilter === 'Yesterday' && order.date !== 'Yesterday') return false;

    // Search query
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
        
        {/* TITLE */}
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A151B]">
            Orders
          </h1>
        </div>

        {/* TOP FILTER TABS & BUTTONS (Matching Screenshot 4) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            {['All Orders', 'Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-[#5C1329] text-white font-bold shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-[#F9ECEF] border border-stone-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filters Button on right */}
          <button 
            onClick={() => {
              setStatusFilter('All');
              setDateFilter('All');
              setSearchQuery('');
            }}
            className="px-3.5 py-1.5 bg-white border border-stone-200 hover:bg-[#F9ECEF] text-stone-700 text-xs rounded-md font-medium flex items-center gap-1.5 self-start sm:self-auto"
            title="Reset Filters"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#5C1329]" />
            <span>Filters ☰</span>
          </button>
        </div>

        {/* SEARCH & DROPDOWN ROW (Matching Screenshot 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          
          {/* Search Box */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders, customers, products..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#F0D5DA] rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
            />
          </div>

          {/* Order Status Dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none px-3 py-2 bg-white border border-[#F0D5DA] rounded-lg text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#5C1329] cursor-pointer"
            >
              <option value="All">Order Status ▾ (All)</option>
              <option value="Pending">Pending (Awaiting Admin)</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* All Dates Dropdown */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full appearance-none px-3 py-2 bg-white border border-[#F0D5DA] rounded-lg text-xs text-stone-700 focus:outline-none focus:ring-1 focus:ring-[#5C1329] cursor-pointer"
            >
              <option value="All">All Dates ▾</option>
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* ORDERS TABLE CARD (Matching Screenshot 4) */}
        <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF2F4] text-[#5C1329] uppercase font-bold text-[11px] tracking-wider border-b border-[#F0D5DA]">
                <tr>
                  <th className="py-3.5 px-4">Order ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4">Order Date</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-10 text-center text-stone-400">
                      No orders match your current filters.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="hover:bg-[#FDF8F7] transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4 font-semibold text-stone-900 flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#5C1329] shrink-0" />
                        <span>{order.id}</span>
                      </td>
                      <td className="py-3.5 px-4 font-medium">{order.customer}</td>
                      <td className="py-3.5 px-4 text-stone-800">{order.product}</td>
                      <td className="py-3.5 px-4 text-stone-500">{order.date}</td>
                      <td className="py-3.5 px-4 font-medium">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] ${
                          order.payment === 'Paid' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {order.payment}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                          }}
                          className="px-2.5 py-1 bg-[#FAF2F4] text-[#5C1329] hover:bg-[#5C1329] hover:text-white rounded text-[11px] font-semibold transition-colors"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION BAR (Matching Screenshot 4: < 1 2 [3] 2 >) */}
          <div className="py-3.5 px-4 bg-[#FAF2F4]/40 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-500 text-[11px]">
              Showing {filteredOrders.length} of {orders.length} orders
            </span>

            <div className="flex items-center space-x-1">
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
                onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                className="w-7 h-7 flex items-center justify-center rounded border border-stone-200 text-stone-600 hover:bg-white text-[11px]"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* MANAGE ORDER MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-[#F0D5DA] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#5C1329]">
                  Order Details: {selectedOrder.id}
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
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Payment Method</span>
                  <span className="font-semibold text-stone-900">{selectedOrder.payment}</span>
                  <div className="mt-1">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${getStatusBadge(selectedOrder.status)}`}>
                      Current: {selectedOrder.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold mb-1">Item Purchased</span>
                <p className="font-semibold text-stone-900 text-sm">{selectedOrder.product}</p>
                <p className="text-[#5C1329] font-bold text-sm mt-0.5">₹ {selectedOrder.amount.toLocaleString('en-IN')}</p>
              </div>

              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold mb-1">Shipping Destination</span>
                <p className="text-stone-600 leading-relaxed">{selectedOrder.address}</p>
              </div>

              {/* Status Change Buttons */}
              <div className="pt-3 border-t border-stone-100">
                <span className="text-stone-600 block text-xs font-bold mb-2">
                  Change Order Status:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {['Pending', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        updateOrderStatus(selectedOrder.id, st);
                        setSelectedOrder((prev) => ({ ...prev, status: st }));
                      }}
                      className={`py-1.5 px-2 rounded text-[11px] font-semibold border transition-all text-center cursor-pointer ${
                        selectedOrder.status === st
                          ? 'bg-[#5C1329] text-white border-[#5C1329] shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-[#5C1329]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => {
                  if (window.confirm(`Delete order ${selectedOrder.id}?`)) {
                    deleteOrder(selectedOrder.id);
                    setSelectedOrder(null);
                  }
                }}
                className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Order</span>
              </button>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
