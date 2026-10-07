// frontend/src/pages/admin/AdminProductForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Trash2, 
  Settings, 
  Check, 
  ChevronDown, 
  ChevronRight,
  ImageIcon,
  Sparkles,
  X,
  Plus,
  Link as LinkIcon,
  Star,
  Camera,
  Layers
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../services/api';

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, showNotification } = useAdmin();
  const fileInputRef = useRef(null);

  const isEditing = Boolean(id);
  const existingProduct = isEditing ? products.find((p) => p.id === id || p.sku === id) : null;

  // Form State (Clean defaults for new product, no dummy saree data)
  const [formData, setFormData] = useState({
    name: '',
    sku: `SKU${Math.floor(100000 + Math.random() * 900000)}`,
    category: 'Banarasi',
    subCategory: '',
    taxGst: '',
    stock: 10,
    stockStatus: 'In Stock',
    lowStockAlert: '3',
    mrp: '',
    discount: '',
    sellingPrice: '',
    status: 'Active',
    description: '',
    fabricDetails: '',
    careInstructions: 'Dry clean recommended'
  });

  // Gallery thumbnails starts EMPTY for new products
  const [gallery, setGallery] = useState([]);
  const [targetSlotIndex, setTargetSlotIndex] = useState(null);

  const ANGLE_SLOTS = [
    {
      id: 'front',
      slotNum: 1,
      title: 'Angle 1: Front View (सामने का फोटो)',
      subtitle: 'Main Storefront Cover Photo',
      badge: 'Front / Cover',
      isPrimary: true
    },
    {
      id: 'back',
      slotNum: 2,
      title: 'Angle 2: Back View (पीछे का डिज़ाइन)',
      subtitle: 'Back Neckline / Cut / Saree Pallu',
      badge: 'Back View',
      isPrimary: false
    },
    {
      id: 'side',
      slotNum: 3,
      title: 'Angle 3: Side / Drape (साइड लुक)',
      subtitle: 'Side Profile or Full Drape View',
      badge: 'Side Profile',
      isPrimary: false
    },
    {
      id: 'detail',
      slotNum: 4,
      title: 'Angle 4: Detail / Close-Up (बारीक काम)',
      subtitle: 'Fabric Weave, Zari, Stones & Craft',
      badge: 'Detail / Zoom',
      isPrimary: false
    }
  ];

  const [isUploading, setIsUploading] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);

  // Category specific presets
  const getCategoryPresets = () => {
    const cat = (formData.category || '').toLowerCase();
    if (cat.includes('blouse') || cat.includes('boutique')) {
      return [
        '/images/blouse_red_bridal.jpg',
        '/images/blouse_purple_custom.jpg',
        '/images/blouse_magenta_sweetheart.jpg',
        '/images/blouse_olive_embroidery.jpg',
        '/images/blouse_green_handloom.jpg'
      ];
    }
    if (cat.includes('accessories') || cat.includes('jewel')) {
      return [
        '/images/accessory_temple_necklace_set.jpg',
        '/images/accessory_emerald_polki_choker.jpg',
        '/images/acc_potli_bag.jpg',
        '/images/acc_waist_belt.jpg',
        '/images/accessory_lakshmi_nakshi_haram.jpg'
      ];
    }
    return [
      '/images/saree_royal_blue_banarasi_mashru.jpg',
      '/images/saree_kanjeevaram_zari_silk.jpg',
      '/images/saree_maheshwari_green_blue.jpg',
      '/images/saree_indian_designer_red.jpg',
      '/images/saree_banarasi_coral_pink.jpg',
      '/images/saree_olive_green_cotton.jpg'
    ];
  };

  // Prefill if editing, or clean if adding new product
  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name || existingProduct.title || '',
        sku: existingProduct.sku || 'SKU123456',
        category: existingProduct.category || 'Banarasi',
        subCategory: existingProduct.subCategory || '',
        taxGst: existingProduct.taxGst || '',
        stock: existingProduct.stock !== undefined ? existingProduct.stock : 25,
        stockStatus: existingProduct.stockStatus || (existingProduct.stock > 0 ? 'In Stock' : 'Out of Stock'),
        lowStockAlert: existingProduct.lowStockAlert || '5',
        mrp: existingProduct.mrp || (existingProduct.price ? Math.round(existingProduct.price * 1.18) : ''),
        discount: existingProduct.discount !== undefined ? existingProduct.discount : '',
        sellingPrice: existingProduct.price || '',
        status: existingProduct.status || 'Active',
        description: existingProduct.description || '',
        fabricDetails: existingProduct.fabricDetails || '',
        careInstructions: existingProduct.careInstructions || 'Dry clean recommended'
      });
      if (existingProduct.gallery && existingProduct.gallery.length > 0) {
        setGallery(existingProduct.gallery);
      } else if (existingProduct.thumbnails && existingProduct.thumbnails.length > 0) {
        setGallery(existingProduct.thumbnails);
      } else if (existingProduct.image) {
        setGallery([existingProduct.image]);
      } else {
        setGallery([]);
      }
    } else {
      setFormData({
        name: '',
        sku: `SKU${Math.floor(100000 + Math.random() * 900000)}`,
        category: 'Banarasi',
        subCategory: '',
        taxGst: '',
        stock: 10,
        stockStatus: 'In Stock',
        lowStockAlert: '3',
        mrp: '',
        discount: '',
        sellingPrice: '',
        status: 'Active',
        description: '',
        fabricDetails: '',
        careInstructions: 'Dry clean recommended'
      });
      setGallery([]);
    }
  }, [existingProduct]);

  // Dynamic price calculation
  const handleMrpChange = (newMrp) => {
    const mrpVal = Number(newMrp) || 0;
    const disc = Number(formData.discount) || 0;
    const sell = Math.round(mrpVal * (1 - disc / 100));
    const gst = Math.round(sell * 0.18);
    setFormData((prev) => ({
      ...prev,
      mrp: mrpVal,
      sellingPrice: sell,
      taxGst: gst.toLocaleString('en-IN')
    }));
  };

  const handleDiscountChange = (newDisc) => {
    const discVal = Number(newDisc) || 0;
    const mrpVal = Number(formData.mrp) || 0;
    const sell = Math.round(mrpVal * (1 - discVal / 100));
    const gst = Math.round(sell * 0.18);
    setFormData((prev) => ({
      ...prev,
      discount: discVal,
      sellingPrice: sell,
      taxGst: gst.toLocaleString('en-IN')
    }));
  };

  // Image Upload Handler
  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    showNotification(`Uploading ${files.length} image(s)...`);

    const newUploaded = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) continue;

      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });

      try {
        const res = await api.upload.uploadImage(dataUrl, file.name);
        if (res && res.url) {
          newUploaded.push(res.url);
        } else {
          newUploaded.push(dataUrl);
        }
      } catch (e) {
        newUploaded.push(dataUrl);
      }
    }

    if (newUploaded.length > 0) {
      if (targetSlotIndex !== null) {
        setGallery((prev) => {
          const updated = [...prev];
          if (targetSlotIndex < updated.length) {
            updated[targetSlotIndex] = newUploaded[0];
          } else {
            updated.push(newUploaded[0]);
          }
          if (newUploaded.length > 1) {
            updated.push(...newUploaded.slice(1));
          }
          return updated.filter(Boolean);
        });
        showNotification("Angle photo uploaded successfully!");
        setTargetSlotIndex(null);
      } else {
        setGallery((prev) => [...prev, ...newUploaded]);
        showNotification(`${newUploaded.length} angle photo(s) uploaded successfully!`);
      }
    }
    setIsUploading(false);
  };

  const handleSlotUploadTrigger = (slotIndex) => {
    setTargetSlotIndex(slotIndex);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleBulkUploadTrigger = () => {
    setTargetSlotIndex(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    handleFileUpload(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleSetMainImage = (index) => {
    if (index === 0) return;
    setGallery((prev) => {
      const copy = [...prev];
      const [selected] = copy.splice(index, 1);
      return [selected, ...copy];
    });
    showNotification("Main storefront cover photo updated!");
  };

  const handleMoveImage = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= gallery.length) return;
    setGallery((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, item);
      return copy;
    });
  };

  const handleAddUrlImage = () => {
    if (!customImageUrl.trim()) return;
    setGallery((prev) => [...prev, customImageUrl.trim()]);
    setCustomImageUrl('');
    showNotification("Image link added to gallery!");
  };

  const handleAddPreset = () => {
    const presets = getCategoryPresets();
    const nextImg = presets[gallery.length % presets.length];
    setGallery((prev) => [...prev, nextImg]);
    showNotification("Preset sample angle added!");
  };

  const handleRemoveImage = (indexToRemove) => {
    setGallery(gallery.filter((_, idx) => idx !== indexToRemove));
    showNotification("Angle image removed.");
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.name.trim()) {
      alert("Please enter a product name.");
      return;
    }

    if (gallery.length === 0) {
      alert("Please upload at least one image (Front Angle) for this product.");
      return;
    }

    const priceVal = Number(formData.sellingPrice || formData.mrp || 0);
    const mrpVal = Number(formData.mrp || formData.sellingPrice || priceVal);

    const payload = {
      name: formData.name.trim(),
      title: formData.name.trim(),
      sku: formData.sku,
      category: formData.category,
      price: priceVal,
      mrp: mrpVal,
      discount: Number(formData.discount || 0),
      stock: Number(formData.stock || 10),
      stockStatus: formData.stockStatus,
      status: formData.status,
      description: formData.description,
      fabricDetails: formData.fabricDetails,
      careInstructions: formData.careInstructions,
      image: gallery[0],
      gallery: gallery,
      thumbnails: gallery
    };

    try {
      if (isEditing && existingProduct) {
        await updateProduct(existingProduct.id, payload);
        showNotification("Product updated successfully!");
        navigate(`/admin/products/${existingProduct.id}`);
      } else {
        const created = await addProduct(payload);
        showNotification("New product added to inventory!");
        navigate('/admin/products');
      }
    } catch (err) {
      console.error(err);
      showNotification("Error saving product: " + err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-5xl">
        
        {/* TOP BREADCRUMB & ACTION BUTTONS (Matching Screenshot 3) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-stone-500 font-medium">
            <Link to="/admin/dashboard" className="hover:text-[#5C1329]">Dashboard</Link>
            <span className="mx-2">/</span>
            <Link to="/admin/products" className="hover:text-[#5C1329]">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-[#5C1329] font-bold">
              {isEditing ? 'Edit Product' : 'Add Product'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-[#5C1329] hover:bg-[#470e1f] text-white text-xs font-semibold rounded-md transition-all shadow-xs"
            >
              Save & Publish
            </button>
            <button
              type="button"
              onClick={() => showNotification("Draft saved to memory")}
              className="px-4 py-2 bg-[#FAF2F4] hover:bg-[#F9ECEF] text-stone-700 text-xs font-semibold rounded-md border border-[#F0D5DA] transition-colors"
            >
              Save Draft
            </button>
            <Link
              to="/admin/products"
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-semibold rounded-md transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* HEADING & SUBTITLE */}
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A151B]">
            {isEditing ? 'Edit Product' : 'Add Product'}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">Basic Information</p>
        </div>

        {/* MAIN FORM CARD (Matching Screenshot 3) */}
        <form onSubmit={handleSave} className="space-y-6">
          
          <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs p-6 sm:p-8 space-y-5">
            
            {/* Field: Product Name * */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rakashi Olive Banarasi Saree"
                className="w-full px-3.5 py-2.5 bg-[#FAF2F4]/40 border border-[#F0D5DA] rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
              />
            </div>

            {/* Row 1: Product SKU & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  Product SKU
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="SKU123456"
                  className="w-full px-3.5 py-2.5 bg-[#FAF2F4]/40 border border-[#F0D5DA] rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-stone-800">
                    Category (कैटलॉग विभाग) <span className="text-red-500">*</span>
                  </label>
                  {/* Smart target location badge */}
                  {(() => {
                    const cat = (formData.category || '').toLowerCase();
                    if (cat.includes('blouse') || cat.includes('boutique')) {
                      return <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">✂️ Goes to: Boutique</span>;
                    }
                    if (cat.includes('accessories') || cat.includes('jewel') || cat.includes('potli')) {
                      return <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">💎 Goes to: Accessories</span>;
                    }
                    return <span className="text-[10px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">🥻 Goes to: Sarees Shop</span>;
                  })()}
                </div>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF2F4]/40 border border-[#F0D5DA] rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#5C1329] font-medium"
                >
                  <optgroup label="🥻 Sarees Collection (साड़ी)">
                    <option value="Banarasi">Banarasi Saree</option>
                    <option value="Maheshwari">Maheshwari Saree</option>
                    <option value="Chanderi">Chanderi Saree</option>
                    <option value="Kanjivaram">Kanjivaram Saree</option>
                    <option value="Cotton">Cotton Saree</option>
                    <option value="Silk">Pure Silk Saree</option>
                  </optgroup>
                  <optgroup label="✂️ Boutique & Blouses (बुटीक / ब्लाउज)">
                    <option value="Boutique / Blouse">Boutique / Blouse (Custom Tailored)</option>
                  </optgroup>
                  <optgroup label="💎 Jewellery & Accessories (गहने / पोटली बैग)">
                    <option value="Jewellery">Handmade Jewellery / हार व कड़े</option>
                    <option value="Accessories">Accessories (कमरबंद / लटकन)</option>
                    <option value="Potli Bags">Potli Bags (पोटली बैग)</option>
                  </optgroup>
                </select>
                <p className="text-[10px] text-stone-500 mt-1">
                  {(() => {
                    const cat = (formData.category || '').toLowerCase();
                    if (cat.includes('blouse') || cat.includes('boutique')) {
                      return "📍 यह ब्लाउज 'Boutique' (/boutique) कस्टमाइज़ेशन पेज पर जाएगा।";
                    }
                    if (cat.includes('accessories') || cat.includes('jewel') || cat.includes('potli')) {
                      return "📍 यह गहना/सामान 'Accessories' (/accessories) पेज पर जाएगा।";
                    }
                    return "📍 यह साड़ी 'Shop' (/shop) साड़ी कैटलॉग में जाएगी।";
                  })()}
                </p>
              </div>
            </div>

            {/* Row 2: Subcategory & Stock (GST) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  Sub-Category / Craft
                </label>
                <input
                  type="text"
                  value={formData.subCategory}
                  onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                  placeholder="Heritage Handloom"
                  className="w-full px-3.5 py-2.5 bg-[#FAF2F4]/40 border border-[#F0D5DA] rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  Stock (GST) <span className="text-stone-400 font-normal">Optional</span>
                </label>
                <input
                  type="text"
                  value={formData.taxGst}
                  onChange={(e) => setFormData({ ...formData, taxGst: e.target.value })}
                  placeholder="1,456"
                  className="w-full px-3.5 py-2.5 bg-[#FAF2F4]/40 border border-[#F0D5DA] rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>
            </div>

            {/* Row 3: Inventory & Stock Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="25"
                  className="w-full px-3.5 py-2.5 bg-[#FAF2F4]/40 border border-[#F0D5DA] rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  Stock Status
                </label>
                <select
                  value={formData.stockStatus}
                  onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF2F4]/40 border border-[#F0D5DA] rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                >
                  <option value="In Stock">In Stock (उपलब्ध है)</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Backorder">Backorder (प्री-ऑर्डर)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  Low Stock Alert <span className="text-stone-400 font-normal">Optional</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.lowStockAlert}
                  onChange={(e) => setFormData({ ...formData, lowStockAlert: e.target.value })}
                  placeholder="5"
                  className="w-full px-3.5 py-2.5 bg-[#FAF2F4]/40 border border-[#F0D5DA] rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                />
              </div>
            </div>

            {/* Row 4: Multi-Angle Visual Gallery Manager */}
            <div className="space-y-4 pt-4 border-t border-[#F0D5DA]/60">
              
              {/* Header with Title and Bulk Upload Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-[#FAF2F4] to-white p-3.5 rounded-xl border border-[#F0D5DA]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-[#5C1329] text-white rounded-lg shadow-2xs">
                      <Camera className="w-4 h-4" />
                    </span>
                    <h3 className="text-xs font-bold text-stone-900 tracking-wide">
                      Product Photos & Multi-Angle Views (अलग-अलग एंगल की तस्वीरें)
                    </h3>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Front, Back, Side और Detail क्लोज़-अप एंगल अपलोड करें ताकि ग्राहक को हर तरफ़ से उत्पाद साफ़ दिखे।
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleBulkUploadTrigger}
                    className="px-3.5 py-2 bg-[#5C1329] hover:bg-[#470e1f] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Multiple Photos</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAddPreset}
                    className="px-2.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[11px] font-semibold flex items-center gap-1 border border-stone-200 transition-colors cursor-pointer"
                    title="Add a sample photo preset"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#5C1329]" />
                    <span>Sample</span>
                  </button>
                </div>
              </div>

              {/* Hidden File Input for Native File Browser */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="product-image-file-input"
              />

              {/* Drag and Drop notice if dragging */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`transition-all rounded-xl ${dragOver ? 'border-2 border-dashed border-[#5C1329] bg-[#FAF2F4] p-4 text-center text-xs font-bold text-[#5C1329]' : ''}`}
              >
                {dragOver && <div>Drop images here to add to gallery...</div>}
              </div>

              {/* 4 Dedicated Angle Slots Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ANGLE_SLOTS.map((slot, idx) => {
                  const hasImage = Boolean(gallery[idx]);
                  const imgUrl = gallery[idx];

                  return (
                    <div
                      key={slot.id}
                      className={`relative flex flex-col rounded-xl border transition-all overflow-hidden ${
                        hasImage
                          ? 'border-[#5C1329]/40 bg-white shadow-2xs'
                          : 'border-dashed border-[#F0D5DA] bg-[#FAF2F4]/30 hover:border-[#5C1329]/60 hover:bg-[#FAF2F4]/60'
                      }`}
                    >
                      {/* Slot Header Banner */}
                      <div className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider flex items-center justify-between border-b ${
                        idx === 0 
                          ? 'bg-[#5C1329] text-white border-[#5C1329]' 
                          : 'bg-[#FAF2F4] text-stone-700 border-[#F0D5DA]'
                      }`}>
                        <div className="flex items-center gap-1.5">
                          {idx === 0 && <Star className="w-3 h-3 fill-current text-amber-300" />}
                          <span>{slot.badge}</span>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                          hasImage ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                        }`}>
                          {hasImage ? 'Uploaded' : 'Empty'}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        {hasImage ? (
                          <div className="space-y-2.5">
                            {/* Image Preview Box */}
                            <div className="relative aspect-4/5 rounded-lg overflow-hidden border border-stone-200 bg-stone-50 group">
                              <img
                                src={imgUrl}
                                alt={slot.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                <button
                                  type="button"
                                  onClick={() => handleSlotUploadTrigger(idx)}
                                  className="px-2.5 py-1 bg-white text-stone-800 text-[10px] font-bold rounded-md hover:bg-stone-100 shadow"
                                >
                                  Replace Photo
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(idx)}
                                  className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-bold rounded-md hover:bg-red-700 shadow"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>

                            {/* Angle Labels */}
                            <div>
                              <p className="text-xs font-bold text-stone-900 leading-tight">
                                {slot.title}
                              </p>
                              <p className="text-[10px] text-stone-500 mt-0.5">
                                {slot.subtitle}
                              </p>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="pt-1 flex items-center justify-between gap-1 border-t border-stone-100">
                              {idx !== 0 ? (
                                <button
                                  type="button"
                                  onClick={() => handleSetMainImage(idx)}
                                  className="text-[10px] font-semibold text-[#5C1329] hover:underline flex items-center gap-1"
                                  title="Make this angle the primary card cover photo"
                                >
                                  <Star className="w-3 h-3 text-amber-500" />
                                  <span>Make Cover</span>
                                </button>
                              ) : (
                                <span className="text-[10px] font-bold text-[#5C1329] flex items-center gap-1">
                                  ✓ Storefront Cover
                                </span>
                              )}

                              <button
                                type="button"
                                onClick={() => handleRemoveImage(idx)}
                                className="text-[10px] text-red-500 hover:text-red-700 font-medium"
                                title="Remove this photo"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* Empty Slot Box: Clickable to Upload */
                          <div
                            onClick={() => handleSlotUploadTrigger(idx)}
                            className="aspect-4/5 rounded-lg border-2 border-dashed border-[#F0D5DA] hover:border-[#5C1329] flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-colors group bg-white/60"
                          >
                            <div className="w-10 h-10 rounded-full bg-[#FAF2F4] group-hover:bg-[#5C1329] group-hover:text-white text-[#5C1329] flex items-center justify-center border border-[#F0D5DA] transition-colors mb-2">
                              <Plus className="w-5 h-5" />
                            </div>
                            <p className="text-xs font-bold text-stone-800 group-hover:text-[#5C1329] transition-colors">
                              + Upload {slot.badge}
                            </p>
                            <p className="text-[10px] text-stone-600 font-medium mt-1">
                              {slot.title}
                            </p>
                            <p className="text-[9px] text-stone-400 mt-0.5">
                              {slot.subtitle}
                            </p>
                            {idx === 0 && (
                              <span className="mt-2 text-[9px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
                                Required (आवश्यक)
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Extra Gallery Images (if more than 4 angles are uploaded) */}
              {gallery.length > 4 && (
                <div className="bg-[#FAF2F4]/30 rounded-xl p-3 border border-[#F0D5DA] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#5C1329]" />
                      <span>Additional Angles & Gallery Photos ({gallery.length - 4} more):</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 overflow-x-auto pb-1">
                    {gallery.slice(4).map((extraImg, extraIdx) => {
                      const realIndex = 4 + extraIdx;
                      return (
                        <div key={realIndex} className="relative w-20 h-24 rounded-lg overflow-hidden border border-[#F0D5DA] group shrink-0 bg-white shadow-2xs">
                          <img src={extraImg} alt={`Extra ${realIndex}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(realIndex)}
                              className="self-end w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 text-xs"
                              title="Delete photo"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSetMainImage(realIndex)}
                              className="w-full py-0.5 bg-[#5C1329] text-white text-[9px] font-bold rounded hover:bg-[#470e1f] text-center"
                              title="Make this photo the main storefront cover"
                            >
                              Set Main
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* URL input helper */}
              <div className="flex items-center gap-2 pt-1 max-w-lg">
                <div className="relative flex-1">
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="Or paste direct image URL (https://...)"
                    className="w-full pl-7 pr-14 py-1.5 bg-[#FAF2F4]/40 border border-[#F0D5DA] rounded-lg text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#5C1329]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddUrlImage();
                      }
                    }}
                  />
                  <LinkIcon className="w-3.5 h-3.5 text-stone-400 absolute left-2 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={handleAddUrlImage}
                    className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-[#5C1329] text-white text-[10px] font-semibold rounded hover:bg-[#470e1f] transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Helper note in Hindi / English */}
              <div className="text-[11px] text-stone-500 bg-amber-50/70 border border-amber-200/80 rounded-lg p-2.5 flex items-start gap-2">
                <span className="text-amber-600 font-bold text-sm leading-none mt-0.5">💡</span>
                <div>
                  <span className="font-semibold text-stone-700">फोटो एंगल गाइड:</span> पहली फोटो (Angle 1: Front View) हमेशा वेबसाइट और कैटलॉग में मुख्य कवर फोटो रहेगी। ब्लाउज या साड़ी का पिछला भाग दिखाने के लिए Angle 2 (Back View) अपलोड करें। आप किसी भी फ़ोटो पर <span className="font-semibold text-[#5C1329]">'Make Cover'</span> दबाकर उसे तुरंत मुख्य फ़ोटो बना सकते हैं।
                </div>
              </div>

            </div>

          </div>

          {/* BOTTOM 3 CARDS ROW (Matching Screenshot 3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1: Pricing Breakdown */}
            <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800 border-b border-stone-100 pb-2">
                <span>Product Pricing</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-semibold">MRP</span>
                  <input
                    type="number"
                    value={formData.mrp}
                    onChange={(e) => handleMrpChange(e.target.value)}
                    className="w-24 text-right px-2 py-1 bg-[#FAF2F4]/40 border border-[#F0D5DA] rounded text-xs font-bold text-stone-900"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-semibold">Discount %</span>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => handleDiscountChange(e.target.value)}
                    className="w-24 text-right px-2 py-1 bg-[#FAF2F4]/40 border border-[#F0D5DA] rounded text-xs font-bold text-stone-900"
                  />
                </div>

                <div className="flex justify-between items-center pt-1 border-t border-stone-100">
                  <span className="text-stone-700 font-bold">Selling Price</span>
                  <span className="font-bold text-[#5C1329] text-sm">₹ {formData.sellingPrice.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center text-[11px] text-stone-500">
                  <span>Tax (GST 18%)</span>
                  <span>₹ {formData.taxGst}</span>
                </div>
              </div>
            </div>

            {/* Card 2: Stock & Inventory */}
            <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800 border-b border-stone-100 pb-2">
                <span>Stock & Inventory</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-stone-500 font-semibold block mb-1">Stock Quantity</span>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-1.5 bg-[#FAF2F4]/40 border border-[#F0D5DA] rounded text-xs text-stone-800"
                  />
                </div>

                <div>
                  <span className="text-stone-500 font-semibold block mb-1">Low Stock Alert</span>
                  <input
                    type="number"
                    value={formData.lowStockAlert}
                    onChange={(e) => setFormData({ ...formData, lowStockAlert: e.target.value })}
                    className="w-full px-3 py-1.5 bg-[#FAF2F4]/40 border border-[#F0D5DA] rounded text-xs text-stone-800"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Status Selector */}
            <div className="bg-white rounded-xl border border-[#F0D5DA] shadow-xs p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800 border-b border-stone-100 pb-2">
                <span>Product Status</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
              </div>

              <div className="space-y-2 pt-1 text-xs">
                {['Active', 'Draft', 'Inactive'].map((st) => (
                  <label key={st} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={st}
                      checked={formData.status === st}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="text-[#5C1329] focus:ring-[#5C1329]"
                    />
                    <span className="font-medium text-stone-800">{st}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* FULL-WIDTH SAVE PRODUCT BUTTON (Matching Screenshot 3) */}
          <div>
            <button
              type="submit"
              className="w-full py-3.5 bg-[#5C1329] hover:bg-[#470e1f] text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Save Product
            </button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
}
