// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/dbConnect';

export const authOptions = {
  providers: [

    // Google Provider
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Credentials Provider
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const collection = await dbConnect('users');
        const user = await collection.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No account found with this email');
        }

        if (!user.password) {
          throw new Error('This account uses Google login');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Incorrect password');
        }

        return {
          id:    user._id.toString(),
          name:  user.name,
          email: user.email,
          image: user.image || null,
          role:  user.role  || 'user',
        };
      },
    }),
  ],

  callbacks: {

    async jwt({ token, user, account, trigger, session }) {

      // 1. On first login — attach user data to token
      if (user) {
        token.id    = user.id;
        token.role  = user.role  || 'user';
        token.image = user.image || token.picture || null;
      }

      // 2. Google login — upsert user in MongoDB
      if (account?.provider === 'google') {
        const collection = await dbConnect('users');
        const existing   = await collection.findOne({ email: token.email });

        if (!existing) {
          await collection.insertOne({
            name:      token.name,
            email:     token.email,
            image:     token.picture,
            provider:  'google',
            role:      'user',
            createdAt: new Date(),
          });
          token.role  = 'user';
          token.image = token.picture;
        } else {
          token.id    = existing._id.toString();
          token.role  = existing.role  || 'user';
          token.image = existing.image || token.picture || null;
        }
      }

      // 3. Session update (e.g. after editing profile)
      if (trigger === 'update' && session) {
        if (session.name)  token.name  = session.name;
        if (session.image) token.image = session.image;
      }

      return token;
    },

    async session({ session, token }) {
      // Expose all custom fields to the client session
      session.user.id    = token.id;
      session.user.role  = token.role;
      session.user.name  = token.name;
      session.user.image = token.image || null;
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error:  '/login',
  },

  session: {
    strategy:  'jwt',
    maxAge:    30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,      // refresh session every 24h
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };