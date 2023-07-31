import { Metadata } from "next";
import { ReactNode } from "react";
import "./styles/globals.css";

export const metadata: Metadata = {
    title: "Twitter Clone",
    description: "Twitter Clone (ofc)",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
};

export default RootLayout;
