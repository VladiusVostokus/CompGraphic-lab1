'use strict';

const vsSource = `#version 300 es
uniform float uPointSize;
uniform vec2 uPosition;

void main() {
    gl_Position = vec4(uPosition, 0.0, 1.0);
    gl_PointSize = uPointSize;
}`;

const fsSource = `#version 300 es
precision mediump float;

out vec4 fragColor;

void main() {
    fragColor = vec4(0.0, 1.0, 1.0, 1.0);
}`;

function main() {
    const canvas = document.querySelector("#glcanvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        console.log("Failde to get context for WebGL");
        return;
    }

    const program = gl.createProgram();
    const vsShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vsShader, vsSource);
    gl.compileShader(vsShader);
    gl.attachShader(program, vsShader);

    const fsShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fsShader, fsSource);
    gl.compileShader(fsShader);
    gl.attachShader(program, fsShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log(gl.getShaderInfoLog(vsShader));
        console.log(gl.getShaderInfoLog(fsShader));
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(program);

    const uPointSize = gl.getUniformLocation(program, 'uPointSize');
    const uPosition = gl.getUniformLocation(program, 'uPositon');
    gl.uniform1f(uPointSize, 150.0);
    gl.uniform2f(uPosition, 0, 1.0);

    gl.drawArrays(gl.POINTS, 0, 1);

    gl.uniform1f(uPointSize, 30.0);
    gl.uniform2f(uPosition, 0.8, -0.6);

    gl.drawArrays(gl.POINTS, 0, 1);
}

