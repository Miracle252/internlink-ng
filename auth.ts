import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma";

export const authOptions: NextAuthOptions = {
  debug: true,

  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),

    CredentialsProvider({
      name: "Email",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.toLowerCase().trim();

        const profile = await prisma.profile.findUnique({
          where: {
            email,
          },
        });

        if (!profile || !profile.passwordHash) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          credentials.password,
          profile.passwordHash
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: profile.id,
          email: profile.email,
          name: profile.name,
        };
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email;
      }

      return session;
    },
  },
};
