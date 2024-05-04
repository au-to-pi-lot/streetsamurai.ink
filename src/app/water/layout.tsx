import type {Metadata, Viewport} from "next";
import "../globals.css"
import React from "react";
import Background from "@/src/components/background";

type Props = {} & React.PropsWithChildren;
export const metadata: Metadata = {
    title: "look at the water",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
}


const RootLayout = ({children}: Props) => {
    return (
        <html lang="en" className="">
        <body className="w-screen h-screen">
        <Background/>
        </body>
        </html>
    );
}

export default RootLayout;
