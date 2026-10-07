// frontend/src/pages/admin/AdminProductDetail.jsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Edit3, 
  Play, 
  ArrowLeft, 
  Package, 
  Check, 
  Clock, 
  TrendingUp,
  X
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useAdmin();

  // Find product by id or sku, default to first or p-2 (Rakashi Olive Banarasi Saree)
  const product = products.find((p) => p.id === id || p.sku === id) || products[0];

  const [activeImage, setActiveImage] = useState(
    product?.gallery?.[0] || product?.image || '/images/wedding_vibes.jpg'
  );
  const [currentPage, setCurrentPage] = useState(3);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Gallery items (fallback to rich list)
  const gallery = product?.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [
        product?.image || '/images/wedding_vibes.jpg',
        '/images/hero_model.jpg',
        '/images/saree_banarasi_coral_pink.jpg'
      ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* TOP BAR: PRODUCTS TITLE & + ADD PRODUCT (Matching Screenshot 1) */}
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A151B]">
            Products
          </h1>

          <Link
            to="/admin/products/add"
            className="px-4 py-2 bg-[#F9ECEF] hover:bg-[#5C1329] text-[#5C1329] hover:text-white font-semibold text-xs rounded-lg transition-all border border-[#F0D5DA] flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Product</span>
          </Link>
        </div>

        {/* SEARCH BAR (Matching Screenshot 1) */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search product..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#F0D5DA] rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
          />
        </div>

        {/* PRODUCT DETAILS SUBHEADER & EDIT BUTTON */}
        <div className="flex items-center justify-between pt-1">
          <h2 className="font-serif text-xl font-bold text-[#4A151B]">
            Product Details
          </h2>

          <Link
            to={`/admin/products/edit/${product.id}`}
            className="px-3.5 py-1.5 bg-white hover:bg-[#F9ECEF] text-stone-700 hover:text-[#5C1329] text-xs font-semibold rounded-lg border border-stone-200 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#5C1329]" />
            <span>Edit Product</span>
          </Link>
        </div>

        {/* PRODUCT OVERVIEW CARD (Matching Screenshot 1) */}
        <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs p-5 sm:p-7 space-y-6">
          
          {/* Header Info */}
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#5C1329]">
              {product.name}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Product ID: <span className="font-mono font-medium text-stone-700">{product.sku || 'AWT-BAN-021'}</span>
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-stone-600 font-medium">
                Category: <strong className="text-stone-800">{product.category}</strong>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#487346] text-white">
                {product.status || 'Active'}
              </span>
            </div>
          </div>

          {/* Media & Key Metrics Grid (Matching Screenshot 1) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Gallery: Main Featured Image + Thumbnails */}
            <div className="md:col-span-7 flex flex-col sm:flex-row items-center gap-4">
              
              {/* Featured Large Media with Video Badge */}
              <div className="relative w-full sm:w-64 h-80 rounded-xl overflow-hidden border border-[#F0D5DA] shadow-sm bg-stone-100 group shrink-0">
                <img 
                  src={activeImage} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                
                {/* Play Button Overlay (Matching Screenshot 1) */}
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-black/60 hover:bg-[#5C1329] text-white flex items-center justify-center backdrop-blur-xs transition-colors shadow-md"
                  title="Watch artisan loom reel"
                >
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </button>
              </div>

              {/* 3 Vertical Thumbnails (Matching Screenshot 1) */}
              <div className="flex sm:flex-col gap-3 w-full sm:w-20 overflow-x-auto sm:overflow-visible">
                {gallery.slice(0, 3).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === img
                        ? 'border-[#5C1329] ring-2 ring-[#5C1329]/20'
                        : 'border-stone-200 hover:border-[#C5A059]'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Metrics (Matching Screenshot 1) */}
            <div className="md:col-span-5 space-y-5 border-t md:border-t-0 md:border-l border-stone-100 md:pl-8">
              
              {/* Metric 1: Total Units Sold */}
              <div>
                <span className="text-xs text-stone-500 font-semibold block">Total Units Sold</span>
                <span className="text-3xl font-bold text-stone-900 leading-tight block mt-0.5">
                  {product.unitsSold || 15}
                </span>
              </div>

              {/* Metric 2: Total Revenue */}
              <div>
                <span className="text-xs text-stone-500 font-semibold block">Total Revenue</span>
                <span className="text-2xl sm:text-3xl font-bold text-[#5C1329] leading-tight block mt-0.5">
                  ₹ {(product.totalRevenue || (product.price * (product.unitsSold || 15))).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Metric 3: Last Ordered Date */}
              <div>
                <span className="text-xs text-stone-500 font-semibold block">Last Ordered Date</span>
                <span className="text-sm font-semibold text-stone-800 block mt-0.5">
                  {product.lastOrdered || 'Yesterday'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* PRODUCT DESCRIPTION CARD (Matching Screenshot 1) */}
        <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs p-6 space-y-3">
          <h3 className="font-serif text-lg font-bold text-[#4A151B]">
            Product Description
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed">
            {product.description || 'Elegant olive green Banarasi saree with intricate golden zari work.'}
          </p>
          <p className="text-xs text-stone-700">
            <strong>Fabric Details:</strong> {product.fabricDetails || 'Pure Banarasi silk with rich golden brocade.'}
          </p>
          <p className="text-xs text-stone-700">
            <strong>Care Instructions:</strong> {product.careInstructions || 'Dry clean only, avoid wringing'}
          </p>
        </div>

        {/* RECENT ORDERS TABLE (Matching Screenshot 1 & 2) */}
        <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#4A151B]">
            Recent Orders
          </h3>

          <div className="overflow-x-auto rounded-lg border border-stone-100">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF2F4] text-[#5C1329] uppercase font-bold text-[11px] tracking-wider border-b border-[#F0D5DA]">
                <tr>
                  <th className="py-3.5 px-4">Product Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                {products.map((p) => {
                  const isOutOfStock = p.status === 'Out of Stock' || p.stock <= 0;
                  return (
                    <tr key={p.id} className="hover:bg-[#FDF8F7] transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-stone-900 flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#5C1329] shrink-0" />
                        <span>{p.name}</span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-stone-600">{p.category}</td>
                      <td className="py-3.5 px-4 font-bold text-stone-900">₹ {p.price.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-4 font-medium">{isOutOfStock ? '-' : p.stock}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-semibold ${
                          isOutOfStock ? 'bg-[#C54A4A] text-white' : 'bg-[#487346] text-white'
                        }`}>
                          {isOutOfStock ? 'Out of Stock' : 'Active'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <Link
                          to={`/admin/products/${p.id}`}
                          className="px-4 py-1.5 bg-[#5C1329] hover:bg-[#470e1f] text-white rounded text-[11px] font-semibold transition-all shadow-xs inline-block"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* PAGINATION BAR (Matching Screenshot 1 & 2: AWT12341 < 1 2 [3] 2 >) */}
          <div className="py-3 px-4 bg-[#FAF2F4]/40 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="font-mono text-stone-600 font-bold text-[11px] flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-[#5C1329]" />
              <span>AWT12341</span>
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
                onClick={() => setCurrentPage(2)}
                className="w-7 h-7 flex items-center justify-center rounded border border-stone-200 hover:bg-white text-[11px] font-semibold"
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

      {/* VIDEO PREVIEW MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
            <div className="p-4 bg-[#5C1329] text-white flex items-center justify-between">
              <span className="font-serif font-bold text-sm">Artisan Weaving Reel Preview</span>
              <button onClick={() => setIsVideoModalOpen(false)} className="text-white hover:opacity-80">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 text-center space-y-4">
              <img 
                src={activeImage} 
                alt="Product preview" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <p className="text-xs text-stone-600">
                Master weaver demonstrating kadhwa brocade zari technique on traditional pit-loom in Varanasi.
              </p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
