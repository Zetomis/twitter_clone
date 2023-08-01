"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
    const { status } = useSession();

    switch (status) {
        case "authenticated":
            return (
                <button className="button_default" onClick={() => signOut()}>
                    Sign Out
                </button>
            );
        case "unauthenticated":
            return (
                <>
                    <button
                        className="button_default"
                        onClick={() => signIn("google")}
                    >
                        Sign In with Google
                    </button>
                    <button
                        className="button_default"
                        onClick={() => signIn("discord")}
                    >
                        Sign In with Discord
                    </button>
                </>
            );
        case "loading":
            return <button className="button_default">Loading...</button>;
        default:
            return <button>Error</button>;
    }
};

export default AuthButton;
