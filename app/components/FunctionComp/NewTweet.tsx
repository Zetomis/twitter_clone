"use client";

import useTweet from "@/app/hooks/useTweet";
import { useState } from "react";

const NewTweet = () => {
    const [content, setContent] = useState("");
    const { handleNewTweet, loading, error, resetError } = useTweet();

    return (
        <div className="border-b-2 border-gray-800 py-4 grid gap-y-2">
            <textarea
                className="resize-none px-4 py-2 text-lg outline-none w-full border-2 border-gray-800 rounded-sm h-32"
                placeholder="What's happening?"
                onChange={(event) => {
                    setContent(event.target.value);
                    resetError();
                }}
            ></textarea>
            {error && <span className="error">{error}</span>}
            <button
                className="button_default w-full md:justify-self-end md:w-fit"
                disabled={loading}
                onClick={async () => {
                    await handleNewTweet(content);
                }}
            >
                {loading ? "Loading..." : "Tweet"}
            </button>
        </div>
    );
};

export default NewTweet;
