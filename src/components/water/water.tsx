'use client'

import React, {Ref, useMemo, useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Mesh, Vector2, Matrix4} from "three";

import fragmentShader from "./frag-shader.glsl";
import vertexShader from "./vertex-shader.glsl";

export type WaterProps = {}

const Water = ({...props}: WaterProps): React.JSX.Element => {
    const {gl, camera} = useThree();
    const mesh = useRef<Mesh | null>();

    const uniforms = useMemo(
        () => ({
            time: {
                value: 0.0,
            },
        }), []
    );

    useFrame((state) => {
        // @ts-ignore
        const uniforms = mesh.current?.material?.uniforms;

        if (uniforms === undefined) {
            return;
        }

        uniforms.time.value = state.clock.getElapsedTime();
    });

    return (
        <mesh ref={mesh as Ref<Mesh>} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={10}>
            <OrbitControls></OrbitControls>
            <planeGeometry args={[1, 1, 256, 256]}/>
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

export default Water;