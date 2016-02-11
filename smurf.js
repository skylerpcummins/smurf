var scene,
    camera,
    renderer,
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
  // need shadows for MeshLambertMaterials
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
  scene.add(smurf.head);
};

Smurf = function() {
  // make face
  var faceGeometry = new THREE.BoxGeometry(80, 80, 80);
  var faceMaterial = new THREE.MeshLambertMaterial({
    color: 22132217
  });
  this.face = new THREE.Mesh(faceGeometry, faceMaterial);
  this.face.position.z = 135;

  // make eyes
  var eyeGeometry = new THREE.BoxGeometry(5, 30, 30);
  var eyeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
  });

  this.leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  this.leftEye.position.x = 38;
  this.leftEye.position.y = 25;
  this.leftEye.position.z = 140;

  this.rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  this.rightEye.position.x = -38;
  this.rightEye.position.y = 25;
  this.rightEye.position.z = 140;

  // iris for eyes
  var irisGeometry = new THREE.BoxGeometry(4, 10, 10);
  var irisMaterial = new THREE.MeshLambertMaterial({
    color: 0x302925
  });

  this.leftIris = new THREE.Mesh(irisGeometry, irisMaterial);
  this.leftIris.position.x = 40;
  this.leftIris.position.y = 25;
  this.leftIris.position.z = 140;

  this.rightIris = new THREE.Mesh(irisGeometry, irisMaterial);
  this.rightIris.position.x = -40;
  this.rightIris.position.y = 25;
  this.rightIris.position.z = 140;

  this.head = new THREE.Group();
  this.head.add(this.face);
  this.head.add(this.leftEye);
  this.head.add(this.rightEye);
  this.head.add(this.leftIris);
  this.head.add(this.rightIris);
  this.head.position.y = 60;

  this.threegroup = new THREE.Group();
  this.threegroup.add(this.head);
  this.threegroup.traverse(function(object) {
    if (object instanceof THREE.Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
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
  // wtf is speed?
  // debugger;
  smurf.head.rotation.x += (this.tHeadRotX - smurf.head.rotation.x) / speed;
  smurf.head.rotation.y += (this.tHeadRotY - smurf.head.rotation.y) / speed;
  smurf.head.position.x += (this.tHeadPosX - smurf.head.position.x) / speed;
  smurf.head.position.y += (this.tHeadPosY - smurf.head.position.y) / speed;
  smurf.head.position.z += (this.tHeadPosZ - smurf.head.position.z) / speed;
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
