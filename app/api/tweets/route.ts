import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
    const { content }: { content: string } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
        console.log(session);
        return new Response(JSON.stringify("Sign In first"), {
            status: 403,
        });
    }

    const tweet = await prisma.tweet.create({
        data: {
            userId: session.user.id,
            content: content,
        },
    });

    return new Response(JSON.stringify(tweet), {
        status: 200,
    });
};
