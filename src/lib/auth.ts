import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Giriş bilgileri — değiştirmek istersen buradan değiştir
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'nurullah2025';

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

        if (
          credentials.username === ADMIN_USERNAME &&
          credentials.password === ADMIN_PASSWORD
        ) {
          return { id: '1', name: 'Admin', email: 'admin@nurullahermis.com' };
        }

        return null;
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
  secret: process.env.NEXTAUTH_SECRET ?? 'fallback-secret-change-in-production',
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