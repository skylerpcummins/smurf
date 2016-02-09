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

function handleMouseMove(e) {
  mousePos = { x: e.clientX, y: e.clientY };
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

Smurf.prototype.look = function(xTarget, yTarget) {
  //use 'rule 3' to get tHeadRotY and tHeadRotX
  //(figure out how 'rule 3' actually works, ha)
};

Smurf.prototype.updateBody = function(speed) {
  //wtf is speed?
  //smurf.face.rotation.x += (this.tHeadRotX - this.head.rotation.x) / speed;
  //smurf.face.rotation.y += (this.tHeadRotY - this.head.rotation.y) / speed;
};

function loop() {
  render();
  var xTarget = (mousePos.x - windowHalfX);
  var yTarget = (mousePos.y - windowHalfY);

  // smurf.face.rotation.x += xTarget;
  // smurf.face.rotation.y += yTarget;

  requestAnimationFrame(loop);
};

function render() {
  renderer.render(scene, camera);
};

this.initialize();
this.loop();
