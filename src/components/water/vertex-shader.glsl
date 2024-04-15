#define DRAG_MULT 0.38
#define WATER_DEPTH 1.0

uniform float time;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDirection;
varying vec3 vModelPosition;

// Calculate the value and slope of a sine wave at x
vec2 wave_at(vec2 position, vec2 direction, float frequency, float phase) {
    float rotation = dot(direction, position) * frequency + phase;
    float value = exp(sin(rotation) - 1.0);
    float slope = -value * cos(rotation);
    return vec2(value, slope);
}

// Calculate the height of the compound wave at the given vertex
float height(vec2 planePos, float amplitudeMultiplier, int iterations) {
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
        angle += 1232.399963;
    }

    // Normalize
    float result = sumHeight / sumAmplitude;

    return result * amplitudeMultiplier;
}

vec4 transform_vertex(vec4 vertex, float amplitude) {
    const float frequency = 3.0;
    const int iterations = 20;

    float h = height(vertex.xy, amplitude, iterations);
    return vec4(
        vertex.x,
        vertex.y,
        vertex.z + h,
        vertex.w
    );
}

// Calculate normal at point by calculating the height at the vertex and 2 additional points very close to vertex
vec3 normal_vec(vec4 vertex, float epsilon, float amplitude) {
    vec4 position = transform_vertex(vertex, amplitude);
    vec4 xnudge = transform_vertex(vertex + vec4(epsilon, 0, 0, 0), amplitude);
    vec4 ynudge = transform_vertex(vertex + vec4(0, epsilon, 0, 0), amplitude);

    return normalize(
        cross(
            position.xyz - xnudge.xyz,
            position.xyz - ynudge.xyz
        )
    );
}

void main() {

    vUv = uv;

    vec4 localVertex = vec4(position, 1.0);

    vec4 modelVertex = modelMatrix * localVertex;

    modelVertex = transform_vertex(modelVertex, WATER_DEPTH);
    vModelPosition = modelVertex.xyz;
    vNormal = normal_vec(modelVertex, 0.001, WATER_DEPTH);

    vec4 viewVertex = viewMatrix * modelVertex;

    // Calculate the view direction in camera space
    vec3 viewDirection = normalize(-viewVertex.xyz);

    // Transform the view direction to world space using the inverse view matrix
    vViewDirection = mat3(inverse(viewMatrix)) * viewDirection;

    vec4 projectionVertex = projectionMatrix * viewVertex;

    gl_Position = projectionVertex;
}
