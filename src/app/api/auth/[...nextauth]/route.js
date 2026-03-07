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
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Credentials Provider
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const collection = dbConnect('users');
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
          role:  user.role,
        };
      },
    }),
  ],

  callbacks: {
    // Add role and id to the JWT token
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id   = user.id;
        token.role = user.role || 'user';
      }

      // If Google login — save user to DB if not exists
      if (account?.provider === 'google') {
        const collection = dbConnect('users');
        const existing = await collection.findOne({ email: token.email });

        if (!existing) {
          await collection.insertOne({
            name:      token.name,
            email:     token.email,
            image:     token.picture,
            provider:  'google',
            role:      'user',
            createdAt: new Date(),
          });
        }

        token.role = existing?.role || 'user';
      }

      return token;
    },

    // Expose id and role in the session
    async session({ session, token }) {
      session.user.id   = token.id;
      session.user.role = token.role;
      return session;
    },
  },

  pages: {
    signIn: '/login',   // redirect to your custom login page
    error:  '/login',   // auth errors redirect back to login
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };