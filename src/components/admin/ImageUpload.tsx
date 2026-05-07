'use client';

import { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Lütfen sadece resim dosyası yükleyin.');
      return;
    }

    // Check file size (e.g., 4MB limit)
    if (file.size > 4 * 1024 * 1024) {
      setError('Dosya boyutu 4MB\'dan küçük olmalıdır.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/admin/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: 'POST',
          body: file,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const blob = await response.json();
      onChange(blob.url);
    } catch (err) {
      console.error(err);
      setError('Yükleme sırasında bir hata oluştu.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
          {label}
        </label>
      )}

      <div className="relative group">
        {value ? (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
            <img 
              src={value} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={removeImage}
                className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all transform hover:scale-110 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className={`
              w-full aspect-video flex flex-col items-center justify-center gap-3 
              border-2 border-dashed border-slate-200 rounded-2xl bg-white
              hover:border-blue-400 hover:bg-blue-50 transition-all group
              ${uploading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="text-sm font-bold text-blue-600">Yükleniyor...</span>
              </>
            ) : (
              <>
                <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-white group-hover:text-blue-600 transition-all">
                  <Upload className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <span className="block text-sm font-bold text-slate-900">Görsel Yükle</span>
                  <span className="block text-xs text-slate-500 mt-1">PNG, JPG veya WebP (Maks. 4MB)</span>
                </div>
              </>
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs font-bold text-red-600 ml-1">{error}</p>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
