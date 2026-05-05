import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!username || !passwordHash) {
    console.error('Admin login is not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD_HASH.');
    return null;
  }

  if (!/^\$2[aby]\$\d{2}\$/.test(passwordHash)) {
    console.error('ADMIN_PASSWORD_HASH is not a valid bcrypt hash. Escape $ characters as \\$ in .env.local.');
    return null;
  }

  return { username, passwordHash };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Girisi',
      credentials: {
        username: { label: 'Kullanici Adi', type: 'text' },
        password: { label: 'Sifre', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const adminCredentials = getAdminCredentials();
        if (!adminCredentials) return null;

        if (credentials.username !== adminCredentials.username) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, adminCredentials.passwordHash);
        if (!isPasswordValid) return null;

        return { id: '1', name: 'Admin', email: 'admin@nurullahermis.com' };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 8,
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { id?: string }).id = token.id as string;
      return session;
    },
  },
};
