import * as THREE from 'three';
import { MeshReflectorMaterial, MeshReflectorMaterialProps } from '@react-three/drei/materials/MeshReflectorMaterial';
import vertexShader from "./vertex-shader.glsl"
import {ReactThreeFiber} from "@react-three/fiber";

class WaterMaterial extends MeshReflectorMaterial {
  constructor(parameters?: MeshReflectorMaterialProps) {
    super(parameters);
  }

  onBeforeCompile(shader: any) {
    shader.vertexShader = vertexShader;
    super.onBeforeCompile(shader);
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waterMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof WaterMaterial>;
    }
  }
}

export default WaterMaterial;