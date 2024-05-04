'use client'

import React from "react";
import {Canvas} from "@react-three/fiber";
import Water from "@/src/components/water/water";
import {PerspectiveCamera} from "@react-three/drei";

export type BackgroundProps = {}

const Background = ({...props}: BackgroundProps): React.JSX.Element => {
    return (
        <div className="fixed inset-0 -z-10 motion-reduce:hidden">
            <Canvas>
                <PerspectiveCamera
                    makeDefault
                    fov={45}
                    position={[0, -10, 4]}
                    rotation={[Math.PI/3, 0, 0]}
                />
                <Water/>
            </Canvas>
        </div>
    );
}

export default Background;