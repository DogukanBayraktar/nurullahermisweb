import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AdminSessionProvider from '@/components/admin/AdminSessionProvider';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin Paneli | nurullahermis.com',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <AdminSessionProvider session={session}>
      {children}
    </AdminSessionProvider>
  );
}