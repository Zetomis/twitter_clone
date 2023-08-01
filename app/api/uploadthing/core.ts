import { createUploadthing, type FileRouter } from "uploadthing/next";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
    tweetImagesUploadEndpoint: f({
        image: { maxFileSize: "32MB", maxFileCount: 10 },
    })
        .middleware(async ({ req }) => {
            const session = await getServerSession(authOptions);

            if (!session) throw new Error("Unauthorized");

            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
