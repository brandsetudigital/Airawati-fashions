import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit3, 
  Trash2, 
  X, 
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // New product form state
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'Banarasi',
    price: '',
    stock: '',
    image: '/images/hero_model.jpg',
    description: ''
  });

  // Filter products by department or category
  const filteredProducts = products.filter((p) => {
    if (categoryFilter !== 'All') {
      const catLower = (p.category || '').toLowerCase();
      const titleLower = (p.title || p.name || '').toLowerCase();

      if (categoryFilter === 'Sarees') {
        const isBlouse = catLower.includes('blouse') || catLower.includes('boutique') || titleLower.includes('blouse');
        const isAcc = catLower.includes('accessories') || catLower.includes('jewel') || catLower.includes('potli') || catLower.includes('belt') || titleLower.includes('necklace') || titleLower.includes('haram');
        if (isBlouse || isAcc) return false;
        return true;
      }

      if (categoryFilter === 'Boutique / Blouse') {
        return catLower.includes('blouse') || catLower.includes('boutique') || titleLower.includes('blouse');
      }

      if (categoryFilter === 'Jewellery & Accessories' || categoryFilter === 'Jewellery' || categoryFilter === 'Accessories') {
        const isBlouse = catLower.includes('blouse') || catLower.includes('boutique') || titleLower.includes('blouse');
        if (isBlouse) return false;
        return catLower.includes('accessories') || catLower.includes('jewel') || catLower.includes('potli') || catLower.includes('belt') || titleLower.includes('necklace') || titleLower.includes('haram');
      }

      const filterLower = categoryFilter.toLowerCase();
      const matchesCategory =
        catLower === filterLower ||
        catLower.includes(filterLower) ||
        filterLower.includes(catLower);
      if (!matchesCategory) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        (p.name || p.title || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.sku || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.price) return;

    addProduct({
      name: newProductForm.name,
      category: newProductForm.category,
      price: Number(newProductForm.price),
      stock: Number(newProductForm.stock) || 0,
      image: newProductForm.image || '/images/hero_model.jpg',
      description: newProductForm.description || 'Authentic handcrafted pure silk saree from Airawati artisans.'
    });

    setIsAddModalOpen(false);
    setNewProductForm({
      name: '',
      category: 'Banarasi',
      price: '',
      stock: '',
      image: '/images/hero_model.jpg',
      description: ''
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, {
      name: editingProduct.name,
      category: editingProduct.category,
      price: Number(editingProduct.price),
      stock: Number(editingProduct.stock),
      description: editingProduct.description
    });
    setEditingProduct(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* TITLE & ADD PRODUCT BUTTON (Matching Screenshot 5) */}
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

        {/* SEARCH BAR & CATEGORY FILTER */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product by title, category, sku..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#F0D5DA] rounded-lg text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            {[
              { id: 'All', label: 'All (सब)' },
              { id: 'Sarees', label: '🥻 Sarees (साड़ियां)' },
              { id: 'Boutique / Blouse', label: '✂️ Boutique / Blouse' },
              { id: 'Jewellery & Accessories', label: '💎 Jewellery & Accessories' },
              { id: 'Banarasi', label: 'Banarasi' },
              { id: 'Maheshwari', label: 'Maheshwari' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                  categoryFilter === tab.id
                    ? 'bg-[#5C1329] text-white shadow-xs font-bold'
                    : 'bg-white border border-[#F0D5DA] text-stone-600 hover:border-[#5C1329]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS TABLE CARD (Matching Screenshot 5) */}
        <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
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
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-10 text-center text-stone-400">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const isOutOfStock = product.status === 'Out of Stock' || product.stock <= 0;
                    return (
                      <tr 
                        key={product.id}
                        className="hover:bg-[#FDF8F7] transition-colors"
                      >
                        <td className="py-3.5 px-4 font-semibold text-stone-900">
                          <Link 
                            to={`/admin/products/${product.id}`}
                            className="flex items-center gap-3 hover:text-[#5C1329] transition-colors"
                          >
                            <img 
                              src={product.image || '/images/hero_model.jpg'} 
                              alt={product.name}
                              className="w-9 h-9 rounded-md object-cover border border-[#F0D5DA] shrink-0" 
                            />
                            <span className="truncate max-w-xs">{product.name}</span>
                          </Link>
                        </td>
                        <td className="py-3.5 px-4 font-medium">
                          {(() => {
                            const cat = (product.category || '').toLowerCase();
                            const title = (product.title || product.name || '').toLowerCase();
                            if (cat.includes('blouse') || cat.includes('boutique') || title.includes('blouse')) {
                              return (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
                                  <span>✂️</span>
                                  <span>Boutique Blouse</span>
                                </span>
                              );
                            }
                            if (cat.includes('accessories') || cat.includes('jewel') || cat.includes('potli') || cat.includes('belt') || title.includes('necklace') || title.includes('haram')) {
                              return (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                                  <span>💎</span>
                                  <span>{product.category || 'Jewellery'}</span>
                                </span>
                              );
                            }
                            return (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                                <span>🥻</span>
                                <span>Saree ({product.category})</span>
                              </span>
                            );
                          })()}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-stone-900">₹ {product.price.toLocaleString('en-IN')}</td>
                        <td className="py-3.5 px-4 font-medium">
                          {isOutOfStock ? '-' : product.stock}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${
                            isOutOfStock
                              ? 'bg-[#C54A4A] text-white'
                              : 'bg-[#487346] text-white'
                          }`}>
                            {isOutOfStock ? 'Out of Stock' : 'Active'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <Link
                            to={`/admin/products/${product.id}`}
                            className="px-4 py-1.5 bg-[#5C1329] hover:bg-[#470e1f] text-white rounded text-[11px] font-semibold transition-all shadow-xs inline-block"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION BAR (Matching Screenshot 5: AWT12341 < 1 2 [3] 2 >) */}
          <div className="py-3.5 px-4 bg-[#FAF2F4]/40 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-500 text-[11px]">
              Showing {filteredProducts.length} products
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

      {/* ADD PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-[#F0D5DA] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-lg text-[#5C1329]">
                Add New Saree Product
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3.5 text-xs text-stone-700">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  placeholder="e.g. Peacock Blue Pure Silk Maheshwari Saree"
                  className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Category</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                  >
                    <option value="Banarasi">Banarasi</option>
                    <option value="Maheshwari">Maheshwari</option>
                    <option value="Kanjivaram">Kanjivaram</option>
                    <option value="Chanderi">Chanderi</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Silk">Silk</option>
                    <option value="Boutique / Blouse">Boutique / Blouse</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                    placeholder="8150"
                    className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Inventory Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={newProductForm.stock}
                    onChange={(e) => setNewProductForm({ ...newProductForm, stock: e.target.value })}
                    placeholder="10"
                    className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Image Thumbnail</label>
                  <select
                    value={newProductForm.image}
                    onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                  >
                    <option value="/images/hero_model.jpg">Hero Bridal Model</option>
                    <option value="/images/saree_banarasi_coral_pink.jpg">Coral Pink Banarasi</option>
                    <option value="/images/saree_olive_green_cotton.jpg">Olive Green Saree</option>
                    <option value="/images/saree_royal_blue_banarasi_mashru.jpg">Royal Blue Mashru</option>
                    <option value="/images/saree_kanjeevaram_zari_silk.jpg">Kanjivaram Silk</option>
                    <option value="/images/saree_maheshwari_green_blue.jpg">Maheshwari Silk</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                  placeholder="Masterpiece woven by our artisan cluster..."
                  className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5C1329] hover:bg-[#470e1f] text-white text-xs font-semibold rounded-lg shadow-xs"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW & EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-[#F0D5DA] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif font-bold text-lg text-[#5C1329]">
                Product Management
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs text-stone-700">
              <div className="flex items-center gap-3 bg-[#FAF2F4]/40 p-3 rounded-lg border border-[#F0D5DA]">
                <img 
                  src={editingProduct.image || '/images/hero_model.jpg'} 
                  alt={editingProduct.name}
                  className="w-14 h-14 rounded-lg object-cover border border-[#F0D5DA]" 
                />
                <div>
                  <span className="font-serif font-bold text-sm text-[#5C1329] block">
                    {editingProduct.name}
                  </span>
                  <span className="text-[11px] text-stone-500">ID: {editingProduct.id} • {editingProduct.category}</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">Stock Count</label>
                  <input
                    type="number"
                    min="0"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border border-[#F0D5DA] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Delete "${editingProduct.name}" from catalog?`)) {
                      deleteProduct(editingProduct.id);
                      setEditingProduct(null);
                    }
                  }}
                  className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Product</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#5C1329] hover:bg-[#470e1f] text-white text-xs font-semibold rounded-lg shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
