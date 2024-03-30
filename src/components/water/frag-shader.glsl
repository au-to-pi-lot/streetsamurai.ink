#define ITERATIONS_NORMAL 20
#define WATER_DEPTH 1.0
#define DRAG_MULT 0.38

uniform float time;
uniform vec2 viewport;
uniform vec4 viewMatrixInverse;
uniform vec4 projectionMatrixInverse;

varying vec2 vUv;
varying vec4 modelVertex;

vec3 colorA = vec3(0.912, 0.191, 0.652);
vec3 colorB = vec3(1.000, 0.777, 0.052);


// Calculate the value and slope of a sine wave at x
vec2 wave_at(vec2 position, vec2 direction, float frequency, float phase) {
    float rotation = dot(direction, position) * frequency + phase;
    float value = exp(sin(rotation) - 1.0);
    float slope = -value * cos(rotation);
    return vec2(value, slope);
}

// Calculate the height of the compound wave at the given vertex
float height(vec2 planePos, int iterations) {
    float angle = 0.0; // radians
    float frequency = 1.0;
    float phaseCoefficient = 2.0;
    float amplitude = 2.0;
    float sumHeight = 0.0;
    float sumAmplitude = 0.0;

    for (int i = 0; i < iterations; i++) {
        vec2 direction = vec2(sin(angle), cos(angle));
        vec2 heightData = wave_at(planePos, direction, frequency, time * phaseCoefficient);
        float sine_height = heightData.x;
        float sine_slope = heightData.y;

        // Waves in fluid have some "drag" to them
        // simulate that with the derivative
        planePos += direction * sine_slope * amplitude * DRAG_MULT;

        sumHeight += sine_height * amplitude;
        sumAmplitude += amplitude;

        // Arbitrary constants, tune them until they look good
        amplitude = mix(amplitude, 0.0, 0.2);
        frequency *= 1.18;
        phaseCoefficient *= 1.07;

        // add some kind of random value to make next wave look random too
        angle += 0.5;
    }

    // Normalize
    float result = sumHeight / sumAmplitude;

    return result;
}

// Calculate normal at point by calculating the height at the pos and 2 additional points very close to pos
vec3 normal(float epsilon, float amplitude) {
    vec2 epsilon_zero = vec2(epsilon, 0);
    vec3 pos = modelVertex.xzy;
    return normalize(
        cross(
            pos - vec3(pos.x - epsilon, height(pos.xy - epsilon_zero.xy, ITERATIONS_NORMAL) * amplitude, pos.z),
            pos - vec3(pos.x, height(pos.xy + epsilon_zero.yx, ITERATIONS_NORMAL) * amplitude, pos.z + epsilon)
        )
    );
}

vec3 getRay() {
    vec2 uv = gl_FragCoord.xy * 2.0 / viewport - 1.0;
    vec4 viewPos = projectionMatrixInverse * vec4(uv, -1.0, 1.0);
    viewPos /= viewPos.w;
    vec4 modelPos = viewMatrixInverse * viewPos;
    return normalize(modelPos.xyz);
}

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


void main() {
    vec3 n = normal(0.01, WATER_DEPTH);

    vec3 ray = getRay();
    // https://lettier.github.io/3d-game-shaders-for-beginners/fresnel-factor.html
    float fresnel = pow(1.0 - max(0.0, dot(n, ray)), 5.0);
    fresnel = 0.04 + (1.0 - 0.04) * fresnel; // never exactly zero


    vec3 reflection = normalize(reflect(ray, n));



    // calculate the reflection and approximate subsurface scattering
    vec3 reflected_atmosphere = atmosphere(reflection);
    vec3 scattering = vec3(0.0293, 0.0698, 0.1717) * 0.1 * (0.2 + (modelVertex.z + WATER_DEPTH) / WATER_DEPTH);

    // return the combined result
    vec3 C = fresnel * reflected_atmosphere + scattering;
    gl_FragColor = vec4(aces_tonemap(C * 2.0), 1.0);


//    // "Normalizing" with an arbitrary value
//    // We'll see a cleaner technique later :)
//    vec2 normalizedPixel = vUv;
//    vec3 color = mix(colorA, colorB, normalizedPixel.x);
//
//    gl_FragColor = vec4(color, 1.0);
}