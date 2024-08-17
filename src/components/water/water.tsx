'use client'

import React, {Ref, useEffect, useMemo, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {Mesh} from "three";

import fragmentShader from "./frag-shader.glsl";
import vertexShader from "./vertex-shader.glsl";
import {prefersReducedMotion} from "@/lib/accessibility";

export type WaterProps = {}

const Water = ({...props}: WaterProps): React.JSX.Element => {
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

        if (!prefersReducedMotion()) {
            uniforms.time.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={mesh as Ref<Mesh>} position={[0, 0, 0]} rotation={[0, 0, Math.PI/4]} scale={20}>
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