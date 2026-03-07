// src/app/dashboard/edit-profile/page.jsx
"use client";

import { useState, useRef } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { RiUploadCloud2Line, RiUserLine, RiCheckLine, RiLoader4Line } from 'react-icons/ri';

export default function EditProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [name,          setName]          = useState(session?.user?.name || '');
  const [previewImage,  setPreviewImage]  = useState(session?.user?.image || null);
  const [uploadedUrl,   setUploadedUrl]   = useState(null);
  const [uploading,     setUploading]     = useState(false);
  const [saving,        setSaving]        = useState(false);
  const [success,       setSuccess]       = useState(false);
  const [error,         setError]         = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'domus_profiles');

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );

      const data = await res.json();

      if (data.secure_url) {
        setUploadedUrl(data.secure_url);
      } else {
        setError('Image upload failed. Please try again.');
        setPreviewImage(session?.user?.image || null);
      }
    } catch {
      setError('Image upload failed. Please try again.');
      setPreviewImage(session?.user?.image || null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name cannot be empty');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const res = await fetch('/api/profile/update', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name:  name.trim(),
          image: uploadedUrl || session?.user?.image,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      // Update the session so Navbar reflects new name/image
      await update({
        name:  name.trim(),
        image: uploadedUrl || session?.user?.image,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push('/profile');
        router.refresh();
      }, 1500);

    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const initials = session?.user?.name
    ?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="max-w-xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">
          Dashboard
        </p>
        <h1 className="text-3xl font-black text-secondary">Edit Profile</h1>
        <p className="text-gray-400 text-sm mt-1">Update your name and profile photo</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Avatar upload */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-5">
            Profile Photo
          </p>

          <div className="flex items-center gap-6">
            {/* Preview */}
            <div className="relative shrink-0">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Profile preview"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-100"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center
                                border-2 border-gray-100">
                  <span className="text-white text-xl font-black">{initials}</span>
                </div>
              )}
              {/* Uploading spinner overlay */}
              {uploading && (
                <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center">
                  <RiLoader4Line className="text-white text-xl animate-spin" />
                </div>
              )}
            </div>

            {/* Upload button */}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-primary/40
                           text-primary text-xs font-bold uppercase tracking-widest rounded-xl
                           hover:bg-primary/5 hover:border-primary transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RiUploadCloud2Line className="text-base" />
                {uploading ? 'Uploading...' : 'Upload Photo'}
              </button>
              <p className="text-[11px] text-gray-400 mt-2">JPG, PNG or WEBP. Max 5MB.</p>
              {uploadedUrl && (
                <p className="text-[11px] text-emerald-500 font-semibold mt-1 flex items-center gap-1">
                  <RiCheckLine /> Photo uploaded successfully
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Name field */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-5">
            Personal Info
          </p>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">
              Full Name
            </label>
            <div className="relative">
              <RiUserLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                required
                placeholder="Your full name"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm
                           text-secondary focus:outline-none focus:border-primary
                           focus:ring-1 focus:ring-primary transition-colors duration-200"
              />
            </div>
          </div>

          {/* Email — read only */}
          <div className="mt-4">
            <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">
              Email <span className="text-gray-400 normal-case font-normal">(cannot be changed)</span>
            </label>
            <input
              type="email"
              value={session?.user?.email || ''}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-gray-100 text-sm
                         text-gray-400 bg-gray-50 cursor-not-allowed"
            />
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
            <RiCheckLine className="text-emerald-500 text-base shrink-0" />
            <p className="text-emerald-600 text-sm font-medium">Profile updated! Redirecting...</p>
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving || uploading || success}
            className="flex-1 py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest
                       rounded-lg hover:bg-primary/90 transition-colors duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <><RiLoader4Line className="animate-spin" /> Saving...</>
            ) : success ? (
              <><RiCheckLine /> Saved!</>
            ) : (
              'Save Changes'
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-3 border border-gray-200 text-secondary text-xs font-bold uppercase
                       tracking-widest rounded-lg hover:border-secondary transition-colors duration-200"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}