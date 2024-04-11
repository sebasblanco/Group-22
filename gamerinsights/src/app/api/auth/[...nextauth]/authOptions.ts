import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate'
import NextAuth, { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/data";




export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/login'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    },
                })

                if (!user) {
                    throw new Error("No user found");
                }

                const passwordCorrect = await compare(credentials?.password || "", user.password);

                if (passwordCorrect) {
                    return {
                        id: user.id + '',
                        email: user.email,
                        name: user.firstName + ' ' + user.lastName,
                    };
                }
                return null;

            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.sub;
            return session;
        },
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.id = user.id;
                // token.username = (user as User).username;
                console.log({ user });
            }
            return token;
        },
    },

}

export default NextAuth(authOptions);


