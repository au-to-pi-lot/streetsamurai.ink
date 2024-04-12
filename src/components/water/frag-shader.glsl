#define ITERATIONS_NORMAL 20
#define WATER_DEPTH 1.0
#define DRAG_MULT 0.38

uniform float time;
uniform vec2 viewport;

varying vec2 vUv;
varying vec3 vViewPosition;
varying vec3 vNormal;

vec3 colorA = vec3(0.912, 0.191, 0.652);
vec3 colorB = vec3(1.000, 0.777, 0.052);

// Some very barebones but fast atmosphere approximation
vec3 atmosphere(vec3 raydir) {
    float special_trick = 1.0 / (raydir.z * 1.0 + 0.1);
    vec3 bluesky = vec3(5.5, 13.0, 22.4) / 22.4;
    vec3 bluesky2 = max(vec3(0.0), bluesky - vec3(5.5, 13.0, 22.4) * 0.002);
    bluesky2 *= special_trick * (0.24 + 1.0 * 0.24);
    return bluesky2 * (1.0 + 1.0 * pow(1.0 - raydir.z, 3.0));
}

vec3 extra_cheap_atmosphere(vec3 raydir, vec3 sundir) {
  sundir.y = max(sundir.y, -0.07);
  float special_trick = 1.0 / (raydir.y * 1.0 + 0.1);
  float special_trick2 = 1.0 / (sundir.y * 11.0 + 1.0);
  float raysundt = pow(abs(dot(sundir, raydir)), 2.0);
  float sundt = pow(max(0.0, dot(sundir, raydir)), 8.0);
  vec3 suncolor = mix(vec3(1.0), max(vec3(0.0), vec3(1.0) - vec3(5.5, 13.0, 22.4) / 22.4), special_trick2);
  vec3 bluesky= vec3(5.5, 13.0, 22.4) / 22.4 * suncolor;
  vec3 bluesky2 = max(vec3(0.0), bluesky - vec3(5.5, 13.0, 22.4) * 0.002 * (special_trick + -6.0 * sundir.y * sundir.y));
  bluesky2 *= special_trick * (0.24 + raysundt * 0.24);
  return bluesky2 * (1.0 + 1.0 * pow(1.0 - raydir.y, 3.0));
}

vec3 aces_tonemap(vec3 color) {
  mat3 m1 = mat3(
    0.59719, 0.07600, 0.02840,
    0.35458, 0.90834, 0.13383,
    0.04823, 0.01566, 0.83777
  );
  mat3 m2 = mat3(
    1.60475, -0.10208, -0.00327,
    -0.53108,  1.10813, -0.07276,
    -0.07367, -0.00605,  1.07602
  );
  vec3 v = m1 * color;
  vec3 a = v * (v + 0.0245786) - 0.000090537;
  vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return pow(clamp(m2 * (a / b), 0.0, 1.0), vec3(1.0 / 2.2));
}

vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
    return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}

void main() {
    vec3 normalDirection = normalize(vNormal);
    vec3 viewDirection = normalize(vViewPosition);

    // https://lettier.github.io/3d-game-shaders-for-beginners/fresnel-factor.html
    float fresnel = pow(1.0 - max(0.0, dot(normalDirection, -viewDirection)), 5.0);
    //fresnel = 0.04 + (1.0 - 0.04) * fresnel; // never exactly zero

    vec3 reflection = inverseTransformDirection( reflect( viewDirection, normalDirection ), viewMatrix );

    // calculate the reflection and approximate subsurface scattering
    vec3 reflected_atmosphere = atmosphere(reflection);
    vec3 scattering = vec3(0.0293, 0.0698, 0.1717) * 0.1 * (0.2 + (vViewPosition.z + WATER_DEPTH) / WATER_DEPTH);

    // return the combined result
    vec3 C = fresnel * reflected_atmosphere + scattering;
    gl_FragColor = vec4(aces_tonemap(C * 2.0), 1.0);
}