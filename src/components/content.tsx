'use client'

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HazardTape from "@/components/hazard-tape";


export type ContentProps = {} & React.PropsWithChildren

const Content = ({children}: ContentProps): React.JSX.Element => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex justify-center">
            <div className="w-[88ch] my-4 px-4 relative flex">
                <HazardTape orientation="vertical" reverse={true} className="w-8 h-full absolute left-0 mr-4 md:mr-8 flex-shrink-0 hidden sm:block" />
                <div className="w-full relative">
                    <div className="absolute inset-2 bg-black bg-opacity-50 backdrop-blur-md z-0"></div>
                    <div className="absolute inset-0 border-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10">
                        <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]"></div>
                    </div>
                    <div className="relative p-8 filter drop-shadow-[0_1px_3px] prose prose-invert max-w-none">
                        {children}
                    </div>
                </div>
                <HazardTape orientation="vertical" className="w-8 h-full absolute right-0 ml-4 md:ml-8 flex-shrink-0 hidden sm:block" />
            </div>
        </main>
        <Footer />
    </div>
)

export default Content;
