import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/PrismaClient";
import { compare } from "bcrypt";

const handler = NextAuth({
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signOut: '/'
    },
    providers: [
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
)

export { handler as GET, handler as POST };

