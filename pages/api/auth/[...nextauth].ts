import { client } from '@/lib/sanity';
import NextAuth, { NextAuthOptions, SessionStrategy } from 'next-auth';
import { SanityAdapter } from 'next-auth-sanity';
import GoogleProvider from 'next-auth/providers/google';

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
};

export default NextAuth(authOptions);
