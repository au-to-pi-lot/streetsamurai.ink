'use client'

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export type ContentProps = {} & React.PropsWithChildren

const Content = ({children}: ContentProps): React.JSX.Element => (
        <div className="flex flex-col items-center w-full">
            <Header></Header>
            <div className="w-80">
                {children}
            </div>
            <Footer></Footer>
        </div>
)

export default Content;
