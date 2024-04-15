'use client'

import React from "react";
import {Canvas} from "@react-three/fiber";
import Water from "@/src/components/water/water";

export type BackgroundProps = {}

const Background = ({...props}: BackgroundProps): React.JSX.Element => (
    <div className="absolute inset-0 -z-10">
        <Canvas>
            <Water/>
        </Canvas>
    </div>
)

export default Background;