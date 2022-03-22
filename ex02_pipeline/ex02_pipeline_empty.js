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
        1.0,0.0,0.0,1.0,
        0.0,1.0,0.0,1.0,
        0.0,0.0,1.0,1.0,
        //back triangle
        1.0,1.0,0.0,1.0,
        1.0,.0,0.5,1.0,
        1.0,0.53,0.75,1.0   
    ]

    /*====== Define color buffer ======*/
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(twoTrianglesColors), gl.STATIC_DRAW);
    /*========== Shaders ==========*/

    /*====== Define shader sources ======*/
    const vsSource = `
            
    `;

    const fsSource = `
        precision mediump float;
        
            
    `;

    /* TODO ====== Create shaders ======*/

    /* TODO ====== Compile shaders ======*/

    /* TODO ====== Create and link shader programs ======*/

    /*========== Connect the attributes with the vertex shader ===================*/

    /*========== Connect the uniforms with the vertex shader ===================*/

    // define projection matrix

    // define modelview matrix

    /*========== Drawing ======================== */

} // be sure to close the main function with a curly brace.