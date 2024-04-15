#define PI 3.1415926535897932384626433832795

#define WATER_DEPTH 1.0
#define DRAG_MULT 0.38
#define ATMOSPHERE_INTENSITY 0.3

uniform float time;

varying vec2 vUv;
varying vec3 vViewDirection;
varying vec3 vModelPosition;
varying vec3 vNormal;

// Some very barebones but fast atmosphere approximation
vec3 atmosphere(vec3 raydir) {
    float scalingRatio = 1.0 / (PI * 0.5);
    float altitude = abs(asin(raydir.z) * scalingRatio);
    vec3 horizonColor = vec3(1.0, 0.0, 0.0) * smoothstep(0.0, altitude, 0.1);
    vec3 skyColor = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 0.1), smoothstep(0.1, altitude, 0.5));
    vec3 sunColor = vec3(0.929, 0.824, 0.829) * smoothstep(0.5, altitude, 0.8);
    return (skyColor + horizonColor + sunColor) * ATMOSPHERE_INTENSITY;
}

vec3 aces_tonemap(vec3 color) {
    mat3 m1 = mat3(
        0.89719, 0.07600, 0.02840,
        0.25458, 0.90834, 0.13383,
        0.24823, 0.01566, 0.83777
    );
    mat3 m2 = mat3(
        0.80475, -0.10208, -0.05327,
        -0.23108, 1.10813, -0.07276,
        -0.07367, -0.00605, 1.07602
    );
    vec3 v = m1 * color;
    vec3 a = v * (v + 0.0245786) - 0.000090537;
    vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
    return pow(clamp(m2 * (a / b), 0.0, 1.0), vec3(1.0 / 2.2));
}

void main() {
    vec3 normalDirection = normalize(vNormal);
    vec3 viewDirection = vViewDirection;

    // https://lettier.github.io/3d-game-shaders-for-beginners/fresnel-factor.html
    float fresnel = dot(normalDirection, viewDirection);
    fresnel = max(fresnel, 0.0);
    fresnel = pow(fresnel, 1.0/5.0);
    fresnel = 1.0 - (0.04 + (1.0 - 0.04) * fresnel); // never exactly zero

    vec3 reflection = normalize(reflect(viewDirection, normalDirection));

    // calculate the reflection and approximate subsurface scattering
    vec3 reflected_atmosphere = atmosphere(reflection);
    vec3 scattering = vec3(0.0293, 0.0698, 0.1717) * 0.1 * (0.2 + (vModelPosition.z + WATER_DEPTH) / WATER_DEPTH);

    // return the combined result
    vec3 C = fresnel * reflected_atmosphere + scattering;
    gl_FragColor = vec4(aces_tonemap(C * 2.0), 1.0);
}