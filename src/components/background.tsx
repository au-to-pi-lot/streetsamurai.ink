'use client'

import React from "react";
import {Canvas} from "@react-three/fiber";
import Water from "@/src/components/water/water";

export type BackgroundProps = {}

const Background = ({...props}: BackgroundProps): React.JSX.Element => (
    <div className="fixed inset-0 -z-10 motion-reduce:hidden">
        <Canvas>
            <Water/>
        </Canvas>
    </div>
)

export default Background;