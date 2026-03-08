// src/app/dashboard/add-house/page.jsx
"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  RiUploadCloud2Line, RiCloseLine, RiLoader4Line,
  RiCheckLine, RiHome2Line, RiImageLine, RiInformationLine,
} from 'react-icons/ri';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = 'domus_profiles';

const divisions = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];
const types     = ['Flat', 'House', 'Villa', 'Studio', 'Duplex', 'Penthouse'];
const tags      = ['Featured', 'New', 'Popular', 'Luxury', 'Budget', ''];

// Upload a single file to Cloudinary
async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  const res  = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST', body: formData,
  });
  const data = await res.json();
  if (!data.secure_url) throw new Error('Upload failed');
  return data.secure_url;
}

export default function AddHousePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '', description: '', location: '', division: 'Dhaka',
    price: '', currency: 'BDT', period: 'month',
    beds: '1', baths: '1', sqft: '',
    type: 'Flat', tag: 'Featured', available: true, phone: '',
  });

  // Main image
  const [mainImage,        setMainImage]        = useState(null);   // preview url
  const [mainImageUrl,     setMainImageUrl]      = useState('');     // cloudinary url
  const [mainUploading,    setMainUploading]     = useState(false);
  const mainInputRef = useRef(null);

  // Additional images
  const [extraImages,      setExtraImages]       = useState([]);     // [{preview, url, uploading}]
  const extraInputRef = useRef(null);

  const [saving,   setSaving]   = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  };

  // Main image upload
  const handleMainImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMainImage(URL.createObjectURL(file));
    setMainUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setMainImageUrl(url);
    } catch {
      setError('Main image upload failed.');
      setMainImage(null);
    } finally {
      setMainUploading(false);
    }
  };

  // Multiple extra images upload
  const handleExtraImages = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Max 5 additional images
    const remaining = 5 - extraImages.length;
    const toUpload  = files.slice(0, remaining);

    // Add placeholders immediately
    const placeholders = toUpload.map((file) => ({
      preview:   URL.createObjectURL(file),
      url:       '',
      uploading: true,
    }));
    setExtraImages((prev) => [...prev, ...placeholders]);

    // Upload each
    const startIndex = extraImages.length;
    for (let i = 0; i < toUpload.length; i++) {
      try {
        const url = await uploadToCloudinary(toUpload[i]);
        setExtraImages((prev) => {
          const updated = [...prev];
          updated[startIndex + i] = { ...updated[startIndex + i], url, uploading: false };
          return updated;
        });
      } catch {
        setExtraImages((prev) => {
          const updated = [...prev];
          updated.splice(startIndex + i, 1);
          return updated;
        });
      }
    }
  };

  const removeExtraImage = (index) => {
    setExtraImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainImageUrl) { setError('Please upload a main image.'); return; }
    if (extraImages.some((img) => img.uploading)) { setError('Please wait for images to finish uploading.'); return; }

    setSaving(true);
    setError('');

    try {
      const res = await fetch('/api/houses/add', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          ...form,
          image:  mainImageUrl,
          images: extraImages.map((img) => img.url).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }

      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 1500);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Dashboard</p>
        <h1 className="text-3xl font-black text-secondary">List a House</h1>
        <p className="text-gray-400 text-sm mt-1">Fill in the details to publish your property</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ── MAIN IMAGE ── */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <RiImageLine className="text-primary text-base" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Main Image</p>
            <span className="text-rose-400 text-xs">*required</span>
          </div>

          {mainImage ? (
            <div className="relative h-56 rounded-xl overflow-hidden group">
              <Image src={mainImage} alt="Main" fill className="object-cover" />
              {mainUploading && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
                  <RiLoader4Line className="text-white text-2xl animate-spin" />
                  <p className="text-white text-xs font-bold">Uploading...</p>
                </div>
              )}
              {!mainUploading && mainImageUrl && (
                <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1">
                  <RiCheckLine className="text-sm" />
                </div>
              )}
              <button
                type="button"
                onClick={() => { setMainImage(null); setMainImageUrl(''); }}
                className="absolute top-2 left-2 bg-black/60 text-white rounded-full p-1
                           opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <RiCloseLine className="text-sm" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => mainInputRef.current?.click()}
              className="w-full h-48 border-2 border-dashed border-primary/30 rounded-xl
                         flex flex-col items-center justify-center gap-3
                         hover:border-primary hover:bg-primary/5 transition-all duration-200"
            >
              <RiUploadCloud2Line className="text-4xl text-primary/50" />
              <div className="text-center">
                <p className="text-sm font-bold text-secondary">Click to upload main image</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG or WEBP — this is the cover photo</p>
              </div>
            </button>
          )}
          <input ref={mainInputRef} type="file" accept="image/*" onChange={handleMainImage} className="hidden" />
        </div>

        {/* ── ADDITIONAL IMAGES ── */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <RiImageLine className="text-primary text-base" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Additional Images</p>
            </div>
            <span className="text-[11px] text-gray-400">{extraImages.length}/5 uploaded</span>
          </div>

          {/* Grid of uploaded extras */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
            {extraImages.map((img, i) => (
              <div key={i} className="relative h-20 rounded-xl overflow-hidden group">
                <Image src={img.preview} alt={`Extra ${i + 1}`} fill className="object-cover" />
                {img.uploading ? (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <RiLoader4Line className="text-white text-lg animate-spin" />
                  </div>
                ) : (
                  <>
                    <div className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5">
                      <RiCheckLine className="text-[10px]" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExtraImage(i)}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center
                                 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <RiCloseLine className="text-white text-lg" />
                    </button>
                  </>
                )}
              </div>
            ))}

            {/* Add more button */}
            {extraImages.length < 5 && (
              <button
                type="button"
                onClick={() => extraInputRef.current?.click()}
                className="h-20 border-2 border-dashed border-gray-200 rounded-xl
                           flex flex-col items-center justify-center gap-1
                           hover:border-primary hover:bg-primary/5 transition-all duration-200"
              >
                <RiUploadCloud2Line className="text-xl text-gray-400" />
                <span className="text-[10px] text-gray-400">Add</span>
              </button>
            )}
          </div>
          <input
            ref={extraInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleExtraImages}
            className="hidden"
          />
          <p className="text-[11px] text-gray-400 flex items-center gap-1">
            <RiInformationLine /> You can upload up to 5 additional photos
          </p>
        </div>

        {/* ── BASIC INFO ── */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <RiHome2Line className="text-primary text-base" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Property Info</p>
          </div>

          <div className="space-y-4">

            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-1.5">
                Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text" name="title" value={form.title} onChange={handleChange} required
                placeholder="e.g. Modern Flat in Gulshan"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-secondary
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-1.5">
                Description <span className="text-rose-400">*</span>
              </label>
              <textarea
                name="description" value={form.description} onChange={handleChange} required rows={4}
                placeholder="Describe the property in detail..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-secondary
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                           transition-colors resize-none"
              />
            </div>

            {/* Location + Division */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-1.5">
                  Location <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text" name="location" value={form.location} onChange={handleChange} required
                  placeholder="e.g. Gulshan-2, Dhaka"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-secondary
                             focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-1.5">
                  Division <span className="text-rose-400">*</span>
                </label>
                <select
                  name="division" value={form.division} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-secondary
                             focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                             transition-colors bg-white"
                >
                  {divisions.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {/* Type + Tag */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-1.5">
                  Property Type
                </label>
                <select
                  name="type" value={form.type} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-secondary
                             focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                             transition-colors bg-white"
                >
                  {types.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-1.5">
                  Tag
                </label>
                <select
                  name="tag" value={form.tag} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-secondary
                             focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                             transition-colors bg-white"
                >
                  {tags.map((t) => <option key={t} value={t}>{t || 'None'}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ── PRICING & SPECS ── */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-5">
            Pricing & Specs
          </p>

          <div className="space-y-4">

            {/* Price + Currency + Period */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-1.5">
                  Price <span className="text-rose-400">*</span>
                </label>
                <input
                  type="number" name="price" value={form.price} onChange={handleChange} required min="0"
                  placeholder="45000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-secondary
                             focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-1.5">
                  Currency
                </label>
                <select
                  name="currency" value={form.currency} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-secondary
                             focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                             transition-colors bg-white"
                >
                  <option>BDT</option>
                  <option>USD</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-1.5">
                  Period
                </label>
                <select
                  name="period" value={form.period} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-secondary
                             focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                             transition-colors bg-white"
                >
                  <option>month</option>
                  <option>year</option>
                  <option>day</option>
                </select>
              </div>
            </div>

            {/* Beds + Baths + Sqft */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'beds',  label: 'Bedrooms',   placeholder: '3', min: 1 },
                { name: 'baths', label: 'Bathrooms',  placeholder: '2', min: 1 },
                { name: 'sqft',  label: 'Area (ft²)', placeholder: '1800', min: 0 },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-1.5">
                    {f.label}
                  </label>
                  <input
                    type="number" name={f.name} value={form[f.name]}
                    onChange={handleChange} min={f.min} placeholder={f.placeholder}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-secondary
                               focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── OWNER CONTACT ── */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-5">
            Contact Info
          </p>
          <div className="space-y-4">
            {/* Name + email read-only from session */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-1.5">
                  Owner Name
                </label>
                <input
                  type="text" disabled
                  defaultValue={"Taken from your account"}
                  className="w-full px-4 py-3 rounded-lg border border-gray-100 text-sm
                             text-gray-400 bg-gray-50 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+8801711000000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-secondary
                             focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            {/* Available toggle */}
            <div className="flex items-center gap-3 pt-1">
              <input
                type="checkbox" name="available" id="available"
                checked={form.available} onChange={handleChange}
                className="checkbox checkbox-sm border-gray-300 checked:border-primary"
                style={{ accentColor: '#C05621' }}
              />
              <label htmlFor="available" className="text-sm font-semibold text-secondary cursor-pointer">
                This property is currently available for rent
              </label>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="px-4 py-3 bg-rose-50 border border-rose-200 rounded-lg">
            <p className="text-rose-600 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2">
            <RiCheckLine className="text-emerald-500 shrink-0" />
            <p className="text-emerald-600 text-sm font-medium">House listed successfully! Redirecting...</p>
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-3 pb-8">
          <button
            type="submit"
            disabled={saving || success || mainUploading || extraImages.some((i) => i.uploading)}
            className="flex-1 py-3.5 bg-primary text-white text-xs font-bold uppercase tracking-widest
                       rounded-lg hover:bg-primary/90 transition-colors duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <><RiLoader4Line className="animate-spin" /> Publishing...</>
            ) : success ? (
              <><RiCheckLine /> Published!</>
            ) : (
              'Publish Listing'
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3.5 border border-gray-200 text-secondary text-xs font-bold uppercase
                       tracking-widest rounded-lg hover:border-secondary transition-colors duration-200"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}