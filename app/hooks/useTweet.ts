import { useState } from "react";
import { useUploadThing } from "../utils/uploadthing";

const useTweet = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageKeys, setImageKeys] = useState<string[]>([]);

    const { startUpload } = useUploadThing("tweetImagesUploadEndpoint", {
        onClientUploadComplete: (file) => {
            const newImageKeys = file?.map((f) => f.fileKey);
            if (newImageKeys) {
                setImageKeys(newImageKeys);
            }
        },
        onUploadError: (error: any) => {
            console.log(error);
        },
    });

    const handleNewTweet = async (content: string, files?: File[]) => {
        setLoading(true);

        if (files) {
            await startUpload(files);
            console.log("upload complete");
        }

        console.log("posting started", imageKeys);

        const response = await fetch("/api/tweets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content, imageKeys }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            const data = await response.json();
            setError(data);
        }

        setLoading(false);
    };

    const resetError = () => {
        setError(null);
    };

    return { handleNewTweet, loading, error, resetError };
};

export default useTweet;
