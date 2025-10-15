// WebGL Background com cores do design
const fragmentShaderSource = `#version 300 es
precision highp float;

uniform float time;
uniform vec2 vp;

in vec2 uv;
out vec4 fragColor;

float rand(vec2 p) {
    return fract(sin(dot(p.xy, vec2(1., 300.))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 5
float fbm(vec2 p) {
    float value = 0.;
    float amplitude = .4;
    float frequency = 0.;

    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(p);
        p *= 2.;
        amplitude *= .4;
    }
    return value;
}

void main() {
    vec2 p = uv.xy;
    p.x *= vp.x / vp.y; 

    // Centralizar o efeito
    vec2 centered = p - vec2(0.5, 0.3);
    float distance = length(centered);
    
    // Gradiente mais central e orgânico
    float gradient = mix(distance * 0.8 + 0.2, distance * 1.5 + 0.8, fbm(p));
    float speed = 0.15;
    float details = 5.;
    float force = 0.7;
    float shift = 0.3;
   
    vec2 fast = vec2(p.x, p.y - time*speed) * details;
    float ns_a = fbm(fast);
    float ns_b = force * fbm(fast + ns_a + time) - shift;    
    float nns = force * fbm(vec2(ns_a, ns_b));
    float ins = fbm(vec2(ns_b, ns_a));

    // Cores do design: roxo escuro e roxo claro
    vec3 c1 = mix(vec3(0.3, 0.1, 0.4), vec3(0.1, 0.0, 0.2), ins + shift);
    
    // Adicionar toque de verde accent
    vec3 accent = vec3(0.1, 0.4, 0.2) * (1.0 - distance);
    
    fragColor = vec4(c1 + accent + vec3(ins - gradient) * 0.3, 1.0);
}`;

class WebGLHandler {
    vertexShaderSource = `#version 300 es
        precision mediump float;
        const vec2 positions[6] = vec2[6](vec2(-1.0, -1.0), vec2(1.0, -1.0), vec2(-1.0, 1.0), vec2(-1.0, 1.0), vec2(1.0, -1.0), vec2(1.0, 1.0));
        out vec2 uv;
        void main() {
            uv = positions[gl_VertexID];
            gl_Position = vec4(positions[gl_VertexID], 0.0, 1.0);
        }`;

    constructor(canvas, fragmentShaderSource) {
        this.cn = canvas;
        this.gl = canvas.getContext('webgl2');
        if (!this.gl) return; // Fallback se WebGL2 não estiver disponível
        
        this.startTime = Date.now();

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.program = this.gl.createProgram();
        this.compileShader(this.vertexShaderSource, this.gl.VERTEX_SHADER);
        this.compileShader(fragmentShaderSource, this.gl.FRAGMENT_SHADER);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);

        this.timeLocation = this.gl.getUniformLocation(this.program, 'time');
        this.resolutionLocation = this.gl.getUniformLocation(this.program, 'vp'); 
        
        this.render();
    }

    resize() {
        this.cn.width = this.cn.offsetWidth;
        this.cn.height = this.cn.offsetHeight;
        this.gl.viewport(0, 0, this.cn.width, this.cn.height);
    }

    compileShader(source, type) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error(this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }
        return this.gl.attachShader(this.program, shader);
    }

    render = () => {    
        this.gl.uniform1f(this.timeLocation, (Date.now() - this.startTime) / 1000);
        this.gl.uniform2fv(this.resolutionLocation, [this.cn.width, this.cn.height]);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        window.requestAnimationFrame(this.render);
    }      
}

function initWebGLBackground() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;
    
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    const webGL = new WebGLHandler(canvas, fragmentShaderSource);
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initWebGLBackground();
});
