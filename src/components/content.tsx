'use client'

import React from "react";
import Projection from "@/components/projection";
import Header from "@/components/header";
import {Canvas} from "@react-three/fiber";
import Footer from "@/components/footer";
import Water from "./water/water";
import { OrbitControls } from "@react-three/drei";

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