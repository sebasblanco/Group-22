import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt';
import { PrismaClient } from '@prisma/client/edge'
import authOptions from "./authOptions";
// import { withAccelerate } from '@prisma/extension-accelerate'


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST};

