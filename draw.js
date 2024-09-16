'use strict';

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

