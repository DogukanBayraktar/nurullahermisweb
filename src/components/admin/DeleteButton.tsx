// src/components/admin/DeleteButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';

export default function DeleteButton({ id, endpoint }: { id: number; endpoint: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm('Silmek istediğinize emin misiniz?')) return;
    setLoading(true);
    await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
