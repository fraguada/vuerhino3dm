/* eslint-disable */

var scene, camera, renderer, controls;

function init () {
    console.log('hello from utils');

    scene = new THREE.Scene();
    scene.background = new THREE.Color(1,1,1);
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.x = 20;
    camera.position.y = 20;
    camera.position.z = 20;

    controls = new THREE.OrbitControls(camera);

    var canvas = document.getElementById('canvas');

    renderer = new THREE.WebGLRenderer({antialias:true, canvas: canvas });
    renderer.setSize( window.innerWidth, window.innerHeight );
    //document.body.appendChild( renderer.domElement );

    var aLight = new THREE.AmbientLight();
    scene.add(aLight);

    var dLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(dLight);

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    var animate = function () {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render( scene, camera );
    };

    animate();
    console.log(scene);
}

function meshToThreejs(mesh, material) {
    var geometry = new THREE.BufferGeometry();
    var vertices = mesh.vertices();
    var vertexbuffer = new Float32Array(3 * vertices.count);
    for( var i=0; i<vertices.count; i++) {
        pt = vertices.get(i);
        vertexbuffer[i*3] = pt[0];
        vertexbuffer[i*3+1] = pt[1];
        vertexbuffer[i*3+2] = pt[2];
    }
    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.addAttribute( 'position', new THREE.BufferAttribute( vertexbuffer, 3 ) );

    indices = [];
    var faces = mesh.faces();
    for( var i=0; i<faces.count; i++) {
        face = faces.get(i);
        indices.push(face[0], face[1], face[2]);
        if( face[2] != face[3] ) {
            indices.push(face[2], face[3], face[0]);
        }
    }
    geometry.setIndex(indices);

    var normals = mesh.normals();
    var normalBuffer = new Float32Array(3*normals.count);
    for( var i=0; i<normals.count; i++) {
        pt = normals.get(i);
        normalBuffer[i*3] = pt[0];
        normalBuffer[i*3+1] = pt[1];
        normalBuffer[i*3+2] = pt[1];
    }
    geometry.addAttribute( 'normal', new THREE.BufferAttribute( normalBuffer, 3 ) );
    return new THREE.Mesh( geometry, material );
}
