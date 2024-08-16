'use client'

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export type ContentProps = {} & React.PropsWithChildren

const Content = ({children}: ContentProps): React.JSX.Element => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex justify-center">
            <div className="w-full max-w-prose px-4 sm:px-6 md:px-8 py-8">
                {children}
            </div>
        </main>
        <Footer />
    </div>
)

export default Content;
