"use client";

import useTweet from "@/app/hooks/useTweet";
import { useUploadThing } from "@/app/utils/uploadthing";
import { useState } from "react";

const NewTweet = () => {
    const [content, setContent] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const { handleNewTweet, loading, error, resetError } = useTweet();

    return (
        <div className="border-b-2 border-gray-800 py-4">
            <form
                onSubmit={async (event) => {
                    event.preventDefault();
                    await handleNewTweet(content, files);
                }}
                className="grid gap-y-2"
            >
                <textarea
                    className="resize-none px-4 py-2 text-lg outline-none w-full border-2 border-gray-800 rounded-sm h-32"
                    placeholder="What's happening?"
                    onChange={(event) => {
                        setContent(event.target.value);
                        resetError();
                    }}
                ></textarea>
                {error && <span className="error">{error}</span>}
                <div>
                    <label htmlFor="files" className="block">
                        Upload image {"(Max 10)"}
                    </label>
                    <input
                        type="file"
                        multiple
                        id="files"
                        accept="image/png, image/jpeg"
                        className="w-full bg-gray-200 px-4 py-2 file:cursor-pointer"
                        onChange={(event) => {
                            if (event.target.files) {
                                if (event.target.files.length > 10) {
                                    alert("You can only upload 10 images");
                                    return;
                                }
                                setFiles(Array.from(event.target.files));
                            }
                        }}
                    />
                </div>
                <button
                    className="button_default w-full md:justify-self-end md:w-fit"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Tweet"}
                </button>
            </form>
        </div>
    );
};

export default NewTweet;
