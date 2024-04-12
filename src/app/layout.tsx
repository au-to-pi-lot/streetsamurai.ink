import type {Metadata, Viewport} from "next";
import "./globals.css";
import React from "react";
import Content from "@/src/components/content";

type Props = {} & React.PropsWithChildren;
export const metadata: Metadata = {
    title: "Street Samurai Aug Clinic",
    description: "Upgrade your cyberware today!",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
}


const RootLayout = ({children}: Props) => {
    return (
        <html lang="en" className="overflow-hidden [backface-visibility:hidden]">
        <body className="w-screen h-screen [perspective:1000px]">
        <Content>
            {children}
        </Content>
        </body>
        </html>
    );
}

export default RootLayout;
