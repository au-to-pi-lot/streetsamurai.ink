'use client'

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export type ContentProps = {} & React.PropsWithChildren

const Content = ({children}: ContentProps): React.JSX.Element => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex justify-center">
            <div className="w-full max-w-prose my-4 px-4 sm:px-6 md:px-8 py-8 relative">
                <div className="absolute inset-2 bg-black bg-opacity-50 backdrop-blur-md z-0"></div>
                <div className="absolute inset-0 border-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10"></div>
                <div className="relative z-20 p-2">
                    {children}
                </div>
            </div>
        </main>
        <Footer />
    </div>
)

export default Content;
