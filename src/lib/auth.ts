import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Girişi',
      credentials: {
        username: { label: 'Kullanıcı Adı', type: 'text' },
        password: { label: 'Şifre', type: 'password' },
      },
      async authorize(credentials) {
        console.log('GELEN:', credentials?.username, credentials?.password);
        console.log('BEKLENEN:', process.env.ADMIN_USERNAME);
        console.log('HASH:', process.env.ADMIN_PASSWORD_HASH);

        if (!credentials?.username || !credentials?.password) return null;

        if (credentials.username !== process.env.ADMIN_USERNAME) {
          console.log('USERNAME YANLIŞ');
          return null;
        } // ← Eksik kapanış parantezi eklendi

        const adminPasswordHash = "$2b$12$vpubAnxGH3SAWcCOcRfbaOEL0OUqu3R5U9vQnrRDC/Lz0U3eiDiVa";
        const result = await bcrypt.compare(credentials.password, adminPasswordHash);
        console.log('BCRYPT SONUÇ:', result);

        if (!result) return null;
        return { id: '1', name: 'Admin', email: 'admin@nurullahermis.com' };
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