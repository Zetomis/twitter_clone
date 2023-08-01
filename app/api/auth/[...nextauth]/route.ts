import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const user = await prisma.user.findUnique({
                where: {
                    email: session.user?.email ?? "",
                },
            });

            if (user) {
                session.user.id = user.id;
                session.user.username = user.username;
                session.user.image = user.image;
            }

            return session;
        },
        async signIn({ user }) {
            const curUser = await prisma.user.findUnique({
                where: {
                    email: user.email ?? "",
                },
            });

            if (!curUser) {
                await prisma.user.create({
                    data: {
                        email: user.email ?? "",
                        username: user.name ?? "",
                    },
                });
            }

            return true;
        },
    },
    secret: process.env.SECRET,
    pages: {
        signIn: "/",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
