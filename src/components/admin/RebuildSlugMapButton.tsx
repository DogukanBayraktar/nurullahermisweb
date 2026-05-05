'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export function RebuildSlugMapButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleRebuild() {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/saglik-rehberi/rebuild-slug-map', {
        method: 'POST',
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(`✓ ${data.message || 'Slug map başarıyla güncellendi'}`);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`✗ Hata: ${data.error}`);
      }
    } catch (err) {
      setMessage(`✗ İstek başarısız: ${err instanceof Error ? err.message : 'Bilinmeyen hata'}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleRebuild}
        disabled={loading}
        className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Güncelleniyor...' : 'Slug Map Yenile'}
      </button>
      {message && (
        <span className={`text-xs ${message.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </span>
      )}
    </div>
  );
}
