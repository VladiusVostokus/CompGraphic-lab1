'use strict';

const vsSource = `#version 300 es

void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
}`;

const fsSource = `#version 300 es
precision mediump float;

out vec4 fragColor

void main() {
    fragColor = vec4(1.0, 1.0, 1.0, 1.0);
}`;

function main() {
    const canvas = document.querySelector("#glcanvas");
    const gl = canvas.getContext("webgl");
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
    gl.useProgram(program);
    gl.drawArrays(gl.POINTS, 0, 1);
}

