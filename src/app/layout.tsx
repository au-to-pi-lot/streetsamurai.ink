import type {Metadata, Viewport} from "next";
import "./globals.css";
import React from "react";
import ThreeScene from "@/src/components/three-scene";
import Header from "@/src/components/header";
import Projection from "@/src/components/projection";
import Footer from "@/src/components/footer";

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
        <Projection>
            <Header></Header>
            <div className={}>
                {children}
            </div>
            <Footer></Footer>
        </Projection>
        </body>
        </html>
    );
}

export default RootLayout;
