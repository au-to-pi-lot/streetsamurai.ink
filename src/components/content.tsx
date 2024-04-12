'use client'

import React from "react";
import Projection from "@/src/components/projection";
import Header from "@/src/components/header";
import {Canvas} from "@react-three/fiber";
import Footer from "@/src/components/footer";
import Water from "./water/water";
import { OrbitControls } from "@react-three/drei";

export type ContentProps = {} & React.PropsWithChildren

const Content = ({children}: ContentProps): React.JSX.Element => (
        <div className="flex flex-col items-center w-full">
            <Header></Header>
            <Canvas className="w-full h-full"><Water/></Canvas>
            {/*<div className="w-80">*/}
            {/*    {children}*/}
            {/*</div>*/}
            <Footer></Footer>
        </div>
)

export default Content;