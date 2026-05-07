import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';
import Link from 'next/link';
import {
  FileText, Stethoscope, User, Home,
  Newspaper, PresentationIcon, ArrowRight, Image as ImageIcon,
} from 'lucide-react';

const sections = [
  {
    label: 'Sağlık Rehberi',
    desc: 'Makale ekle, düzenle, sil',
    href: '/admin/saglik-rehberi',
    icon: FileText,
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    iconColor: 'text-teal-600',
  },
  {
    label: 'Tedaviler',
    desc: 'Tedavi sayfalarını yönet',
    href: '/admin/tedaviler',
    icon: Stethoscope,
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    iconColor: 'text-blue-600',
  },
  {
    label: 'Hakkımda',
    desc: 'Eğitim, deneyim, yayınlar',
    href: '/admin/hakkimda',
    icon: User,
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    iconColor: 'text-amber-600',
  },
  {
    label: 'Ana Sayfa',
    desc: 'Hero metin, istatistikler, videolar',
    href: '/admin/anasayfa',
    icon: Home,
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    iconColor: 'text-rose-600',
  },
  {
    label: 'Galeri',
    desc: 'Vaka fotoğrafları, Galeri yönetimi',
    href: '/admin/galeri',
    icon: ImageIcon,
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    iconColor: 'text-indigo-600',
  },
];

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  return (
    <AdminShell>
      <div className="px-4 py-6 md:p-8 max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Hoş geldiniz 👋</h1>
          <p className="text-slate-500 mt-1 text-sm">Yönetmek istediğiniz bölümü seçin.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map(({ href, label, desc, icon: Icon, bg, text, iconColor }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white border border-slate-100 rounded-2xl p-6
                         hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg} ${text}`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h2 className="mt-4 font-semibold text-slate-900 text-sm">{label}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
            </Link>
          ))}
        </div>

      </div>
    </AdminShell>
  );
}
