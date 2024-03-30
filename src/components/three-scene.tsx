'use client'

import React from "react";
import {Canvas, useThree} from "@react-three/fiber";
import {
    CameraControls,
    ContactShadows, DragControls,
    Environment,
    Html,
    PerspectiveCamera
} from "@react-three/drei";
import Water from "@/src/components/water/water";

export type ThreeSceneProps = {} & React.PropsWithChildren;

export type TextProps = {
    z: number;
    opacity: number
} & React.PropsWithChildren;

const ThreeScene = ({children}: ThreeSceneProps): React.JSX.Element => {
    const Text = ({z, opacity}: TextProps) => (
        <Html
            style={{userSelect: 'none', opacity}}
            transform
            position={[0, 0, z]}
        >
            {children}
        </Html>
    )

    return (
        <Canvas>
            <PerspectiveCamera fov={55} position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <CameraControls></CameraControls>
                <hemisphereLight groundColor="red"/>
                {/*<Text z={0} opacity={1}></Text>*/}
                {/*{range(4).map((index) => (*/}
                {/*    <Text key={index} z={-index * 0.2} opacity={1 / (2 * index + 3)}></Text>*/}
                {/*))}*/}

                <Environment background preset="forest" blur={0.8}/>
                <ContactShadows position={[0, -9, 0]} opacity={0.7} scale={40} blur={1}/>

            </PerspectiveCamera>


        </Canvas>
    )
}

export default ThreeScene;