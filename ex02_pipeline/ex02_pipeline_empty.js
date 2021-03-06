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
        -.5, -0.5, -2.0,
        0.6, -0.6, -2.0,
        -0, 0.65, -2.0,

        /*
        -.5, -0.5, -3,
        0.6, -0.6, -3,
        -0, 0.65, -3,
        */

        //back triangle
        -0.5, -0.6, -3.0,
        1.8, -0.3, -3.0,
        0.1, 0.6, -3.0,
/*
        -0.5, -0.6, -5.0,
        1.8, -0.3, -5.0,
        0.1, 0.6, -5.0,
  
    */    ]


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
        /*
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                */
        //back triangle
        1.0, 1.0, 0.0, 1.0,
        1.0, 0.0, 0.5, 1.0,
        1.0, 0.53, 0.75, 1.0,
        /*
                1.0, 1.0, 0.0, 1.0,
                1.0, 0.0, 0.5, 1.0,
                1.0, 0.53, 0.75, 1.0
                */
    ]

    /*====== Define color buffer ======*/
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(twoTrianglesColors), gl.STATIC_DRAW);


    /* ======= Texture Coordinate ====== */
    const textureCoordinates = [
        //front triangle
        0.0, 0.0,
        0.0, 1.0,
        1.0, 0.0,

        //back triangle
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0
    ]

    /*====== Define texture buffer ======*/
    const textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);



    /*========== Shaders ==========*/

    /*====== Define shader sources ======*/
    const vsSource = `
            attribute vec4 aPosition;
            attribute vec4 aColor;
            attribute vec2 aTexCoord;
            uniform mat4 uModelViewMatrix;
            uniform mat4 uProjectionMatrix;
            varying vec4 vFragColor;
            varying vec2 vTexCoords;

            void main(){
                vec4 pos = aPosition;
                pos.x = pos.x/1.0;
                gl_Position = uProjectionMatrix * uModelViewMatrix * pos;
                vFragColor = aColor;

                vTexCoords = aTexCoord;
            }
    `;

    const fsSource = `

        precision mediump float;
        

        varying vec4 vFragColor;
        varying vec2 vTexCoords;
        
        const vec4 c_color1 = vec4(1, 0, 0, 1);
        const vec4 c_color2 = vec4(0, 1, 0, 1);

        vec4 color;

        void main(){

            if (mod(vTexCoords.x, 0.05) > 0.025){
                color = vFragColor;
            } else{
                discard;

            }

            gl_FragColor = color;
        }
            
    `;

    /* TODO ====== Create shaders ======*/
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShader, vsSource);
    gl.shaderSource(fragmentShader, fsSource);

    /* TODO ====== Compile shaders ======*/
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        alert("An error occured while compiling the vertex shader occured:" + gl.getShaderInfoLog(vertexShader));
        gl.deleteShader(vertexShader);
        return null;
    } else {
        console.log("Vertex shader successfully compiled.");
    }


    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        alert("An error occured while compiling the fragment shader occured:" + gl.getShaderInfoLog(fragmentShader));
        gl.deleteShader(fragmentShader);
        return null;
    } else {
        console.log("Fragment shader successfully compiled.");
    }

    /* TODO ====== Create and link shader programs ======*/
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    gl.useProgram(program);


    /*========== Connect the attributes with the vertex shader ===================*/
    const posAttribLocation = gl.getAttribLocation(program, "aPosition");
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(posAttribLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttribLocation);


    const colorAttribLocation = gl.getAttribLocation(program, "aColor");
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorAttribLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttribLocation);


    const textureAttribLocation = gl.getAttribLocation(program, "aTexCoord");
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.vertexAttribPointer(textureAttribLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(textureAttribLocation);

    /*========== Connect the uniforms with the vertex shader ===================*/
    const projMatrixLocation = gl.getUniformLocation(program, "uProjectionMatrix");
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

    const modelviewMatrixLocation = gl.getUniformLocation(program, "uModelViewMatrix");

    // define modelview matrix

    const modelviewMatrix = mat4.create();
    const angle = 0.52;
    const axis = [0, 1, 0]
    mat4.rotate(modelviewMatrix, modelviewMatrix, angle, axis);
    console.log("Modelview matrix: %s", mat4.str(modelviewMatrix));

    gl.uniformMatrix4fv(modelviewMatrixLocation, false, modelviewMatrix);

    /*========== Drawing ======================== */

    gl.clearColor(1, 1, 1, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    // TODO
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const mode = gl.TRIANGLES;
    const first = 0;
    const count = 6;
    gl.drawArrays(mode, first, count)

} // be sure to close the main function with a curly brace.