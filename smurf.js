var scene,
    camera,
    renderer,
    geometry,
    material,
    cube,
    windowHalfX,
    windowHalfY;

var smurf;

var mousePos = {x:0,y:0};

function initialize() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000);

  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
  document.body.appendChild(renderer.domElement);

  windowHalfX = window.innerWidth/2;
  windowHalfY = window.innerHeight/2;

  document.addEventListener('mousemove', handleMouseMove, false);

  this.createSmurf();
};

function createSmurf() {
  smurf = new Smurf();
  scene.add(smurf.face);
};

Smurf = function() {
  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshBasicMaterial({ color: 22132217 });
  this.face = new THREE.Mesh(geometry, material);
};

function handleMouseMove(e) {
  mousePos = { x: e.clientX, y: e.clientY };
};

function loop() {
  render();
  var xTarget = (mousePos.x - windowHalfX);
  var yTarget = (mousePos.y - windowHalfY);

  smurf.face.rotation.x += xTarget;
  smurf.face.rotation.y += yTarget;

  requestAnimationFrame(loop);
};

function render() {
  // requestAnimationFrame(render);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};

this.initialize();
this.loop();
