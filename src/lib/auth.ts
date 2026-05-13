import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Girişi',
      credentials: {
        username: { label: 'Kullanıcı Adı', type: 'text' },
        password: { label: 'Şifre', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          // Veritabanından kullanıcıyı sorgula
          const user = await prisma.user.findUnique({
            where: { username: credentials.username },
          });

          if (!user) {
            console.warn('[Auth] Kullanıcı bulunamadı:', credentials.username);
            return null;
          }

          // Şifre doğrulaması
          const isPasswordCorrect = await compare(credentials.password, user.password);

          if (!isPasswordCorrect) {
            console.warn('[Auth] Hatalı şifre denemesi:', credentials.username);
            return null;
          }

          return {
            id: user.id.toString(),
            name: user.username,
            email: `${user.username}@nurullahermis.com`,
            role: user.role,
          };
        } catch (error) {
          console.error('[Auth] Veritabanı hatası:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 8, // 8 saat
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};