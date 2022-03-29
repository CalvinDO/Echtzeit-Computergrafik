/**
 * Example Code #02 for ECG course
 * Render two triangles (empty code)
 *
 * @summary WebGL implementation of two triangles
 * @author Uwe Hahne, uwe.hahne (ät) hs-furtwangen.de
 *
 * Created at     : 2021-11-03 15:28:31 
 * Last modified  : 2022-02-28 16:57:49
 */


main();
function main() {
    /*========== Create a WebGL Context ==========*/
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector("#c");
    /** @type {WebGLRenderingContext} */
    const gl = canvas.getContext('webgl');
    if (!gl) {
        console.log('WebGL unavailable');
    } else {
        console.log('WebGL is good to go');
    }


    console.log("calvin sagt hallo")
    /*========== Define and Store the Geometry ==========*/

    /*====== Define front-face vertices ======*/

    const twoTrianglesVertices = [
        //front triangle
        -1.0, -0.5, -2.0,
        0.0, -0.5, -2.0,
        -0.5, 0.5, -2.0,

        //back triangle
        -0, 8, -0.6, -3.0,
        0.2, -0.6, -3.0,
        -0.3, 0.4, -3.0,
    ]


    /*====== Define triangle-face buffer ======*/
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(twoTrianglesVertices), gl.STATIC_DRAW);
    /*====== Define colors ======*/

    const twoTrianglesColors = [
        //front triangle
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        //back triangle
        1.0, 1.0, 0.0, 1.0,
        1.0, .0, 0.5, 1.0,
        1.0, 0.53, 0.75, 1.0
    ]

    /*====== Define color buffer ======*/
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(twoTrianglesColors), gl.STATIC_DRAW);
    /*========== Shaders ==========*/

    /*====== Define shader sources ======*/
    const vsSource = `
            attribute vec4 aPosition;
            attribute vec4 aColor;
            uniform mat4 uModelViewMatrix;
            uniform mat4 uProjectionMatrix;
            varying vec4 vFragColor;

            void main(){
                gl_Position = uProjectionMatrix * uModelViewMatrix * aPosition;
                vFragColor = aColor;
            }
    `;

    const fsSource = `
        precision mediump float;
        
        varying vec4 vFragColor;

        void main(){
            gl_FragColor = vFragColor;
        }
            
    `;

    /* TODO ====== Create shaders ======*/

    /* TODO ====== Compile shaders ======*/

    /* TODO ====== Create and link shader programs ======*/

    /*========== Connect the attributes with the vertex shader ===================*/
    const posAttribLocation = gl.getAttribLocation(program, "aPosition");
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(posAttribLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttribLocation);


    const colorAttribLocation = gl.getAttribLocation(program, "aColor");
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorAttribLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttribLocation);

    /*========== Connect the uniforms with the vertex shader ===================*/


    const projMatrixLocation = gl.getUniform(program, "uProjectionMatrix");
    
    // define projection matrix
    
    const projectionMatrix = mat4.create();
    const fieldOfView = 45 * Math.PI / 180
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
    mat4.translate(projectionMatrix, projectionMatrix, [1.0, 0.0, 0.0]);
    console.log("Projection matrix: %s", mat4.str(projectionMatrix));

    gl.uniformMatrix4fv(projMatrixLocation, false, projectionMatrix);
    
    // define modelview matrix
    
    /*========== Drawing ======================== */

    gl.clearColor(1, 1, 1, 1);
    // TODO
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const mode = gl.TRIANGLES;
    const first = 0;
    const count = 6;
    gl.drawArrays(mode, first, count)

} // be sure to close the main function with a curly brace.