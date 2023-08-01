import { Metadata } from "next";
import { ReactNode } from "react";
import "./styles/globals.css";
import GeneralProvider from "./components/GeneralProvider";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
    title: "Twitter Clone",
    description: "Twitter Clone (ofc)",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <GeneralProvider>
                    <div className="container">
                        <Navbar />
                        {children}
                    </div>
                </GeneralProvider>
            </body>
        </html>
    );
};

export default RootLayout;
