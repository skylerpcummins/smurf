var scene,
    camera,
    renderer,
    geometry,
    material,
    cube,
    windowHalfX,
    windowHalfY,
    light;

var smurf;

var mousePos = {x:0,y:0};

function initialize() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    2000);

  camera.position.z = 800;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );
  document.body.appendChild(renderer.domElement);

  windowHalfX = window.innerWidth/2;
  windowHalfY = window.innerHeight/2;

  document.addEventListener('mousemove', handleMouseMove, false);

  this.createLights();

  this.createSmurf();
};

function createLights() {
  light = new THREE.HemisphereLight(0xffffff, 0xffffff, .5)

  shadowLight = new THREE.DirectionalLight(0xffffff, .8);
  shadowLight.position.set(200, 200, 200);
  shadowLight.castShadow = true;

  backLight = new THREE.DirectionalLight(0xffffff, .4);
  backLight.position.set(-100, 200, 50);
  backLight.castShadow = true;

  scene.add(light);
  scene.add(shadowLight);
  scene.add(backLight);
};

function handleMouseMove(e) {
  mousePos = { x: e.clientX, y: e.clientY };
};

function createSmurf() {
  smurf = new Smurf();
  scene.add(smurf.face);
};

Smurf = function() {
  faceGeometry = new THREE.BoxGeometry(80, 80, 80);
  material = new THREE.MeshLambertMaterial({
    color: 22132217
  });
  this.face = new THREE.Mesh(faceGeometry, material);
};

Smurf.prototype.look = function(xTarget, yTarget) {
  //use 'rule 3' to get tHeadRotY and tHeadRotX
  this.tHeadRotY = rule3(xTarget, -200, 200, -Math.PI/4, Math.PI/4);
  this.tHeadRotX = rule3(yTarget, -200, 200, -Math.PI/4, Math.PI/4);
  this.tHeadPosX = rule3(xTarget, -200, 200, 70,-70);
  this.tHeadPosY = rule3(yTarget, -140, 260, 20, 100);
  this.tHeadPosZ = 0;
  //(figure out how 'rule 3' actually works, ha)

  this.updateBody(10);
};

Smurf.prototype.updateBody = function(speed) {
  //wtf is speed?
  smurf.face.rotation.x += (this.tHeadRotX - smurf.face.rotation.x) / speed;
  smurf.face.rotation.y += (this.tHeadRotY - smurf.face.rotation.y) / speed;
  smurf.face.position.x += (this.tHeadPosX - smurf.face.position.x) / speed;
  smurf.face.position.y += (this.tHeadPosY - smurf.face.position.y) / speed;
  smurf.face.position.z += (this.tHeadPosZ - smurf.face.position.z) / speed;
};

function rule3(v,vmin,vmax,tmin, tmax) {
  var nv = Math.max(Math.min(v,vmax), vmin);
  var dv = vmax-vmin;
  var pc = (nv-vmin)/dv;
  var dt = tmax-tmin;
  var tv = tmin + (pc*dt);
  return tv;
};

function loop() {
  render();
  var xTarget = (mousePos.x - windowHalfX);
  var yTarget = (mousePos.y - windowHalfY);

  smurf.look(xTarget, yTarget);

  // smurf.face.rotation.x += xTarget;
  // smurf.face.rotation.y += yTarget;

  requestAnimationFrame(loop);
};

function render() {
  renderer.render(scene, camera);
};

this.initialize();
this.loop();
