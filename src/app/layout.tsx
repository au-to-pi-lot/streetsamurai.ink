import type {Metadata, Viewport} from "next";
import "./globals.css";
import React from "react";
import Content from "@/src/components/content";
import Background from "@/src/components/background";
import StoreProvider from "@/src/components/store-provider";

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
        <html lang="en" className="">
        <body className="w-screen h-screen ">
        <StoreProvider>
            <Content>
                {children}
            </Content>
            <Background/>
        </StoreProvider>
        </body>
        </html>
    );
}

export default RootLayout;
