'use client';

import { useState, useRef } from 'react';
import { upload } from '@vercel/blob/client';
import { Upload, X, Loader2, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

type MediaType = 'image' | 'video';

interface MediaUploadProps {
  value: string;
  mediaType: MediaType;
  onChange: (url: string) => void;
  onMediaTypeChange: (type: MediaType) => void;
  label?: string;
}

const IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp,image/avif,image/gif';
const VIDEO_ACCEPT = 'video/mp4,video/webm,video/quicktime';
const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB
const MAX_VIDEO_SIZE = 200 * 1024 * 1024; // 200MB

export default function MediaUpload({ value, mediaType, onChange, onMediaTypeChange, label }: MediaUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (mediaType === 'image' && !isImage) {
      setError('Lütfen sadece resim dosyası yükleyin.');
      return;
    }
    if (mediaType === 'video' && !isVideo) {
      setError('Lütfen sadece video dosyası yükleyin.');
      return;
    }

    const maxSize = mediaType === 'video' ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    if (file.size > maxSize) {
      setError(
        mediaType === 'video'
          ? "Video boyutu 200MB'dan küçük olmalıdır."
          : "Dosya boyutu 4MB'dan küçük olmalıdır."
      );
      return;
    }

    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/gallery-media',
        onUploadProgress: (event) => setProgress(Math.round(event.percentage)),
      });
      onChange(blob.url);
    } catch (err) {
      console.error(err);
      setError('Yükleme sırasında bir hata oluştu.');
    } finally {
      setUploading(false);
    }
  };

  const removeMedia = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const switchType = (type: MediaType) => {
    if (type === mediaType) return;
    onMediaTypeChange(type);
    removeMedia();
    setError(null);
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
          {label}
        </label>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => switchType('image')}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
            mediaType === 'image'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Görsel
        </button>
        <button
          type="button"
          onClick={() => switchType('video')}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
            mediaType === 'video'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
          }`}
        >
          <VideoIcon className="w-4 h-4" /> Video
        </button>
      </div>

      <div className="relative group">
        {value ? (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
            {mediaType === 'video' ? (
              <video src={value} controls className="w-full h-full object-cover" />
            ) : (
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
              <button
                type="button"
                onClick={removeMedia}
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
                <span className="text-sm font-bold text-blue-600">Yükleniyor... {progress > 0 ? `${progress}%` : ''}</span>
              </>
            ) : (
              <>
                <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-white group-hover:text-blue-600 transition-all">
                  <Upload className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <span className="block text-sm font-bold text-slate-900">
                    {mediaType === 'video' ? 'Video Yükle' : 'Görsel Yükle'}
                  </span>
                  <span className="block text-xs text-slate-500 mt-1">
                    {mediaType === 'video' ? 'MP4, WebM veya MOV (Maks. 200MB)' : 'PNG, JPG veya WebP (Maks. 4MB)'}
                  </span>
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
        accept={mediaType === 'video' ? VIDEO_ACCEPT : IMAGE_ACCEPT}
        className="hidden"
      />
    </div>
  );
}
