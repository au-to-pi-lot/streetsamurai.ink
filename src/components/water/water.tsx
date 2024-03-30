import React, {Ref, useMemo, useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {Matrix4, Mesh, Vector2} from "three";
import WaterMaterial from "@/src/components/water/material";

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
            viewport: {
                value: new Vector2(1, 1)
            },
            viewMatrixInverse: {
                value: camera.matrixWorldInverse,
            },
            projectionMatrixInverse: {
                value: camera.projectionMatrixInverse,
            }

        }), []
    );

    useFrame((state) => {
        // @ts-ignore
        const uniforms = mesh.current?.material?.uniforms;

        if (uniforms === undefined) {
            return;
        }

        uniforms.time.value = state.clock.getElapsedTime()

        const rect = gl.domElement.getBoundingClientRect();
        uniforms.viewport.value = new Vector2(rect.width, rect.height);

        uniforms.viewMatrixInverse.value.copy(camera.matrixWorldInverse);
        uniforms.projectionMatrixInverse.value.copy(camera.projectionMatrixInverse);
    });

    return (
        <mesh ref={mesh as Ref<Mesh>} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={10}>
            <planeGeometry args={[1, 1, 128, 128]}/>
            <WaterMaterial
                vertexShader={vertexShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

export default Water;