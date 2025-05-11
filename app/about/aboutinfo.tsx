export default function AboutInfo() {
    return (
        <div className="ml-[7rem] mr-[7rem]">
            <h1 id="3d-scene-how-">3D Scene: How?</h1>
            <p><a href="/scene"><button className="bg-teal-500 p-[0.3rem] mt-[1rem] rounded-md hover:bg-teal-400">
            See the 3D Scene!
            </button></a></p>
            <h2 id="1-3d-modelling">1. 3D Modelling</h2>
            <p>For creating the scene, modelling the objects and animating them, I used Blender. The models were created using the tooling that blender provides, taking the base shapes provided and morphing them and combining them to represent real-world objects. </p>
            <p>For texturing the models, I used Blender&#39;s shader editor. The images used for texturing are provided by <a href="https://texturelabs.org/">https://texturelabs.org/</a>. Normal maps were generated using <a href="https://cpetry.github.io/NormalMap-Online/">https://cpetry.github.io/NormalMap-Online/</a> -- this provides more detail for the textures.</p>
            <p>The animations were also created in Blender. The lamp animation is assigned an armature that morphs the geometry based on the position and rotation of it&#39;s &quot;bones&quot;. The windmill uses a simple rotation animation, while the turntable player uses a linear rotation of the vinyl disk, with a &quot;noise modifier&quot; used to give the playhead some realistic bounce.</p>
            <h2 id="2-web-development">2. Web Development</h2>
            <p>The <a href="threejs.org">three.js</a> library is used to render the scene inside of a browser window. The scene is exported from blender with the GLTF file format, which allows users to import the models with their textures and animations included.</p>
            <p>Lights are not imported, however -- this means that the scene must be lit inside of the code. </p>
            <p>You may have noticed (...<em>I hope</em>) that the lamp animation also animated the light source. This is done using a three.js &quot;PointLight&quot;, which is tracked to the location of the top bone on the lamp&#39;s armature. On each animation loop, the position of the light is set to the position of the bone.</p>
            <h3 id="what-about-the-buttons-">What about the buttons?</h3>
            <p>To track the buttons to their 3D objects, the 3D coordinates of object must be converted to 2D coordinates on the page. This is done using the following method:</p> <br />
            <pre><code>function ObjCoords(obj, camera, canvas) {'{'}
                <span className="hljs-built_in">let</span> <span className="hljs-built_in">vector</span> = <span className="hljs-built_in">new</span> THREE.Vector3(); <br />
                <span className="hljs-keyword">if</span> (obj) {'{'}<br />
                    <span className="hljs-built_in">vector</span>.set(obj.<span className="hljs-built_in">position</span>.x, obj.<span className="hljs-built_in">position</span>.y, obj.<span className="hljs-built_in">position</span>.z)<br />
                    <span className="hljs-built_in">vector</span>.project(camera)

                    <span className="hljs-built_in">vector</span>.x = Math.<span className="hljs-built_in">round</span>( (   <span className="hljs-built_in">vector</span>.x + <span className="hljs-number">1</span> ) * canvas.<span className="hljs-built_in">width</span>  / <span className="hljs-number">2</span> );<br />
                    <span className="hljs-built_in">vector</span>.y = Math.<span className="hljs-built_in">round</span>( ( - <span className="hljs-built_in">vector</span>.y + <span className="hljs-number">1</span> ) * canvas.<span className="hljs-built_in">height</span> / <span className="hljs-number">2</span> );<br />
                {'}'}<br />

                <span className="hljs-built_in">return</span> <span className="hljs-built_in">vector</span><br />
            {'}'} <br /> <br />
            </code></pre><p>Each <code>Vector3</code> in three.js has a <code>project()</code> method, which maps 3D coordinates to their respective 2D coordinates on the camera&#39;s image plane. The following code adjusts these coordinates to the size of the canvas displaying the scene. </p>
            <p>This is called inside of the animation loop for each object. The absolute locations of the relevant buttons are then assigned to the output of this function.</p>
            <h3 id="and-why-is-it-in-a-weird-box-">And why is it in a weird box?</h3>
            <p>This website was developed with React and React-Router and TypeScript, yet the 3D scene was designed for a regular JavaScript/HTML page. To save some time (and anguish), the page is simply rendered inside of a HTML <code>&lt;iframe&gt;</code> -- No need to covert it to a React project!</p>
        </div>
    )
}