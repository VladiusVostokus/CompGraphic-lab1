'use strict';

const vsSource = `#version 300 es
in vec2 aPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
in vec3 aColor;
out vec3 vColor;

void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 0.0, 1.0);
    //gl_Position =  vec4(aPosition, 0.0, 1.0);
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

    const uModelViewMatrix = gl.getUniformLocation(program,'uModelViewMatrix');
    const uProjectionMatrix = gl.getUniformLocation(program,'uProjectionMatrix');


    const modelMatrix = new Float32Array([
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1,
    ]);

    gl.uniformMatrix4fv(uModelViewMatrix, false, modelMatrix);

    const bufferData = new Float32Array([
        -0.5,  0.5,         1,0,0,
       -0.5, -0.5,          0,1,0,
        0.5, -0.5,          0,0,1,
        -0.5,  0.5,         1,0,0,
        0.5, 0.5,           0,1,0,
        0.5, -0.5,          0,0,1,
        
    ]);
    const buffer = gl.createBuffer();

    /*
    const elemVertexData = new Float32Array([
        -0.5,  0.5,  1,0,0,   
        -0.5, -0.5,  0,1,0,
        0.5, -0.5,   0,0,1,
        0.5, 0.5,    0,1,0,
    ]);

    const elemVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, elemVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, elemVertexData, gl.STATIC_DRAW);


    const elemIndexData = new Uint8Array([
        0,1,2,
        0,3,2,
    ]);

    const elemIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elemIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, elemIndexData, gl.STATIC_DRAW);
    */

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);

    //gl.vertexAttribPointer(aPosition, 2 , gl.FLOAT, false, 5 * 4, 0);
    //gl.vertexAttribPointer(aColor, 3 , gl.FLOAT, false, 5 * 4, 2 * 4);
    gl.vertexAttribPointer(aPosition, 2 , gl.FLOAT, false, 5 * 4, 0);
    gl.vertexAttribPointer(aColor, 3 , gl.FLOAT, false, 5 * 4, 2 * 4);

    gl.enableVertexAttribArray(aPosition);
    gl.enableVertexAttribArray(aColor);
    let angle = 0.0;

    const draw = () => {
        gl.clearColor(0.5, 0.2, 0.6, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        angle++;
        const radian = Math.PI * angle / 180;
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);
    
        const projectionMatrix = new Float32Array([
            cos,sin,0,0,
            -sin,cos,0,0,
            0,0,1,0,
            0,0,0,1,
        ]);
    
        gl.uniformMatrix4fv(uProjectionMatrix, false, projectionMatrix);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(draw);
    };
    draw();
    //gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0);
}


