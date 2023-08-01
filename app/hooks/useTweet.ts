import { useState } from "react";

const useTweet = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleNewTweet = async (content: string) => {
        setLoading(true);

        const response = await fetch("/api/tweets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content }),
        });

        if (response.ok) {
            const data = await response.json();
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
