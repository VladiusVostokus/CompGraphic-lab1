'use strict';

const vsSource = `#version 300 es
in float aPointSize;
in vec2 aPosition;
in vec3 aColor;
out vec3 vColor;

void main() {
    gl_PointSize = aPointSize;
    gl_Position = vec4(aPosition, 0.0, 1.0);
    vColor = aColor;
}`;

const fsSource = `#version 300 es
precision mediump float;

in vec3 vColor;
out vec4 fragColor;

void main() {
    fragColor = vec4(vColor, 1.0);
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

    gl.clearColor(0.5, 0.2, 0.6, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(program);

    const aPointSize = gl.getAttribLocation(program, 'aPointSize');
    const aPosition = gl.getAttribLocation(program, 'aPosition');
    const aColor = gl.getAttribLocation(program,'aColor');
    gl.enableVertexAttribArray(aPointSize);
    gl.enableVertexAttribArray(aPosition);
    gl.enableVertexAttribArray(aColor);

    const bufferData = new Float32Array([
        0.0, 0.4,       100,    1,0,0,
        -0.5, -0.5, 50,     0,1,0,
        0.6 , -0.5,  30,     0,0,1,
    ]);
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);

    gl.vertexAttribPointer(aPosition, 2 , gl.FLOAT, false, 6 * 4, 0);
    gl.vertexAttribPointer(aPointSize, 1 , gl.FLOAT, false, 6 * 4, 2 * 4);
    gl.vertexAttribPointer(aColor, 3 , gl.FLOAT, false, 6 * 4, 3 * 4);

    gl.drawArrays(gl.POINTS, 0, 3);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
