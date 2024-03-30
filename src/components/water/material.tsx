import {MeshReflectorMaterial, MeshReflectorMaterialProps} from "@react-three/drei/materials/MeshReflectorMaterial";


import vertexShader from "./vertex-shader.glsl";

class WaterMaterial extends MeshReflectorMaterial {
    constructor(parameters?: {}) {
        super(parameters);

        this.setValues({
            // @ts-ignore
            vertexShader: vertexShader, // Your custom vertex shader code
        });
    }
}

export default WaterMaterial;