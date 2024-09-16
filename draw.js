'use strict';

const vsSource = `
#version 300 es

void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
}`;

const fsSource = `
#version 300 es

void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}`;

function main() {
    const canvas = document.querySelector("#glcanvas");
    const gl = canvas.getContext("webgl");
    if (!gl) {
        console.log("Failde to get context for WebGL");
        return;
    }
    const program = gl.createProgram();
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.drawArrays(gl.POINTS, 0, 1);
}

