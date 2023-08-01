"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import AuthButton from "./FunctionComp/AuthButton";

const Navbar = () => {
    const { data: session, status } = useSession();

    return (
        <div className="border-r-2 border-gray-800 h-full py-4 px-6 flex flex-col gap-y-3">
            <Link className="button_hover_default" href={"/home"}>
                Home
            </Link>
            <Link className="button_hover_default" href={"/profile"}>
                Profile
            </Link>
            <AuthButton />
        </div>
    );
};

export default Navbar;
