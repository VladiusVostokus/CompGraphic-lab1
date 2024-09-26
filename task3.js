'use strict';

const vsSource = `#version 300 es
in vec2 aPosition;
uniform float uMove;
in vec3 aColor;
out vec3 vColor;

void main() {
    vec2 finalPosition = aPosition + vec2(0.0, uMove);
    gl_Position = vec4(finalPosition, 0.0, 1.0);

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

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    const aColor = gl.getAttribLocation(program,'aColor');
    const uMove = gl.getUniformLocation(program,'uMove');
    
    const bufferData = new Float32Array([
        0,0,				0,1,0,
        0.0, 0.5,     	    0,1,0,
        0.5,0.25,	        0,1,0,
        0.25,-0.3,	        0,1,0,
        -0.25,-0.3,	        0,1,0,
        -0.5,0.25,	        0,1,0, 
        0.0,0.5,            0,1,0,
    ]);
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);

    gl.vertexAttribPointer(aPosition, 2 , gl.FLOAT, false, 5 * 4, 0);
    gl.vertexAttribPointer(aColor, 3 , gl.FLOAT, false, 5 * 4, 2 * 4);

    gl.enableVertexAttribArray(aPosition);
    gl.enableVertexAttribArray(aColor);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 7);
    
    let angle = 0.0;

    const draw = () => {
        gl.clearColor(0.5, 0.2, 0.6, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        if (angle === 360.0) angle = 0.0;
        angle++;
        const radian = Math.PI * angle / 180;
        const y = Math.sin(radian) * 0.5;
        gl.uniform1f(uMove, y);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 7);
        requestAnimationFrame(draw);
    };
    draw();
}
