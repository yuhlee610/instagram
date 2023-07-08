import { client } from '@/services/sanity';
import { SanityAdapter } from '@/adapter';
import NextAuth, { NextAuthOptions, SessionStrategy } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import sanitySdk from '@/services';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  adapter: SanityAdapter(client),
  secret: process.env.SECRET_KEY,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, user, token }) {
      if (session?.user?.email) {
        const dbUser = await sanitySdk.getUserByEmail(session?.user?.email);
        session.user = dbUser
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
