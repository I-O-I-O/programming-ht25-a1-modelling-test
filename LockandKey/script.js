/*
 * IDB Programming: Code Playground
 *
 */


import * as Util from "../util.js";

// State variables are the parts of your program that change over time.

let grabKeyHole = false
let keyInHole = false
let keyTurn = false
let unlocked = false;
let grabKeyOne = false

let pointerMoveX = 0;
let pointerMoveY = 0;
let pointerDownX = 0;
let pointerDownY = 0;
let d = 0;
let dNormalizer = 1;

// Object

const lockOneObj = {
  //position (px)
  x:300,
  y:420,
  //size
  width:450,
  height:300,
  r:0.05, //roundness
  rot: 0, //rotation
  //colour
  h: 240,
  s: 0,
  l: 50,
  a: 1,
}; //padlock rectangle

const lockTwoObj = {
  //position (px)
  x:300,
  y:300,
  //size
  width:350,
  height:400,
  r:1, //roundness
  rot: 0, //rotation
  //colour
  h: 0,
  s: 0,
  l: 10,
  a: 1,
}; //padlock shackle

const invisibleOneObj = {
  //position (px)
  x:300,
  y:400,
  //size
  width:450,
  height:250,
  r:0, //roundness
  rot: 0, //rotation
  //colour
  h: 340,
  s: 0,
  l: 100,
  a: 1,
}; // invisible rectangle (white rectangle)

const invisibleTwoObj= {
  //position (px)
  x:300,
  y:300,
  //size
  width:250,
  height:300,
  r:1, //roundness
  rot: 0, //rotation
  //colour
  h: 340,
  s: 0,
  l: 100,
  a: 1,
} // invisible circle (white circle)

const keyOneObj = {
  //position (px)
  x: 800,
  y: 250,
  //size
  width: 75,
  height: 170,
  //roundedness
  r: 0,
  //colour
  h: 280,
  s: 50,
  l: 50,
  a: 1,
  //this is the object for the key (pink circle for now)
}

const keyHoleOneObj = {
  //position (px)
  x: 300,
  y: 420,
  //size
  width: 240,
  height: 240,
  //roundedness
  r: 1,
  //colour
  h: 240,
  s: 30,
  l: 90,
  a: 1,
  //Gray Circle
}

const keyHoleTwoObj = {
  //position (px)
  x: 300,
  y: 420,
  //size
  width: 100,
  height: 190,
  //roundedness
  r: 0.07,
  //rotation
  rot: 0,
  //colour
  h: 280,
  s: 50,
  l: 50,
  a: 1,
  //Purple Square
}

const keyHoleThreeObj = {
  //position (px)
  x: 300,
  y: 420,
  //size
  width: 72,
  height: 166,
  //roundedness
  r: 0,
  //rotation
  rot: 0,
  //colour
  h: 300,
  s: 30,
  l: 70,
  a: 1,
  //Smaller Purple Square
}

/* setAppearanceProperties - the function links Objects properties with their respective div HTML elements
*  it also sets the appeareance based on the OBJ properties.
*  parameters: 
*  obj - put the Object name here
*  div - put the HTML div name here 
*/
function setAppearanceProperties (obj,div) {
  const {x,y,width,height,r,h,s,l,a} = obj
  Util.setPositionPixels(x-width/2, y-height/2, div)
  Util.setSize(width, height, div)
  Util.setRoundedness(r,div)
  Util.setColour(h,s,l,a,div)
}

//rotates the key in the keyhole
function keyRotation () {
 let initialAngle = ((Math.atan2(400-pointerDownY,300-pointerDownX))*(180/Math.PI));
 let currentAngle = ((Math.atan2(400-pointerMoveY,300-pointerMoveX))*(180/Math.PI));
 let diffAngles = currentAngle - initialAngle;

 //clamps diffAngles between -180 and 180, by jumping to -180 when we reach 180 and vice-versa
  if(diffAngles > 180) {
  diffAngles = diffAngles - 360;
  } else if(diffAngles < -180) {
  diffAngles = diffAngles + 360
  }

  // we store the sum of diffAngles to the .rot property and clamp it between 0 and 90
  const clampedAngle = clampRotation(keyHoleTwoObj.rot+diffAngles);
  console.log('curr '+currentAngle);
  console.log('init '+initialAngle);
  console.log('clamp '+clampedAngle);

  Util.setRotation(clampedAngle,keyHoleTwo);
  Util.setRotation(clampedAngle,keyOne);
  Util.setRotation(clampedAngle,keyHoleThree);

  //update objects .rot properties
  keyHoleTwoObj.rot = clampedAngle;
  keyOneObj.rot = clampedAngle;
  keyHoleThreeObj.rot = clampedAngle;

  //resetting pointerDown XY values
  pointerDownX = pointerMoveX;
  pointerDownY = pointerMoveY;
}

 //clamps between 0 and 90
function clampRotation(angle){
 if(angle>90){
  angle = 90;
  unlocked = true;
 } else if(angle<0){
  angle = 0;
 }
 return(angle)
}

function pointerMoveXY (event) {
  pointerMoveX = event.x;
  pointerMoveY = event.y;  
 //logs mouse xy current
}

function pointerDownXY (event) {
  pointerDownX = event.x;
  pointerDownY = event.y;    
 //logs mouse xy start
}


function handleKeyOneMovement (event){
  keyOneObj.x = event.x-keyOneObj.width/2;
  keyOneObj.y = event.y-keyOneObj.height/2;
}

function moveKeyOne (){
  Util.setPositionPixels(keyOneObj.x,keyOneObj.y,keyOne)
}

function calcDistance (elementOne, elementTwo){
  let a = elementOne.x-elementTwo.x;
  let b = elementOne.y-elementTwo.y;
  let d = Math.sqrt(a*a+b*b);
  return(d);
} 

function keyInHoleDetector () {
  let detector = d/dNormalizer;
  if(detector <= 0.15){ 
    keyInHole = true;
    keyOne.style.pointerEvents = "none"; // making the key intangible
  }if(detector>0.1){
    keyInHole = false;
    keyOne.style.pointerEvents = "auto"; // making the key tangible
  }
}

function lockOneRotation() {
  lockOne.style.transformOrigin = "top left"; // to make the lock rotate around it top-left corner
  lockOne.style.transform = `rotate(${lockOneObj.rot}deg)`;
}

function openLock(event) {
  if (lockOneObj.rot < 45) {
    lockOneObj.rot += 0.31;
  } //degree till what the lock rotates
  lockOne.style.transform = `rotate(${lockOneObj.rot}deg)`;
} 

// Fadeout function
function fadeOut(obj,div){
  const {h,s,l} = obj
  obj.a -= 0.03
  Util.setColour(h,s,l,obj.a,div)
}


// THE LOOP FUNCTION
  
function loop() {

  //logs rotation when both statements are true
  if (grabKeyOne) {
    moveKeyOne(); 
    keyInHoleDetector ();   
  }

  if(keyInHole){
    Util.setPositionPixels(keyHoleTwoObj.x-keyOneObj.width/2, keyHoleTwoObj.y-keyOneObj.height/2, keyOne)
  }
  
  //determens if you can turn the lock and key
  if (grabKeyHole && keyInHole) {
    keyTurn = true
  } if(!grabKeyHole ||! keyInHole) {
    keyTurn = false }; 
  
  if (keyTurn) {
    keyRotation();  
  }
    
  //check if key is in hole and if yes then the lock opens 
   if (unlocked){
     
    fadeOut(keyHoleTwoObj,keyHoleTwo);
    fadeOut(keyHoleOneObj,keyHoleOne);
    fadeOut(keyHoleThreeObj,keyHoleThree);
    fadeOut(keyOneObj,keyOne);   
    Util.setRotation(91,keyHoleTwo)
    Util.setRotation(91,keyHoleThree)
    Util.setRotation(91,keyOne)
    setTimeout(openLock,1000)
  } 

  
  window.requestAnimationFrame(loop);
}

// THE SETUP FUNCTION
// Setup is run once, at the start of the program. It sets everything up for us!

function setup() {
  Util.createThing("lockTwo", "thing"); //scackle
  Util.createThing("invisibleTwo", "thing"); //white circle
  Util.createThing("invisibleOne", "thing"); //white rectangle
  
  Util.createThing("lockOne", "thing");
  Util.createThing("keyHoleOne","thing");
  Util.createThing("keyHoleTwo","thing");
  Util.createThing('keyHoleThree','thing')
  Util.createThing("keyOne","thing");

  setAppearanceProperties (lockOneObj,lockOne);
  lockOneRotation();
  setAppearanceProperties (lockTwoObj,lockTwo);
  setAppearanceProperties (invisibleOneObj,invisibleOne);
  setAppearanceProperties (invisibleTwoObj,invisibleTwo);
  
  setAppearanceProperties (keyOneObj,keyOne); //"keyOne" = pink square appeareance
  setAppearanceProperties (keyHoleOneObj,keyHoleOne);
  setAppearanceProperties (keyHoleTwoObj,keyHoleTwo); 
  setAppearanceProperties (keyHoleThreeObj,keyHoleThree);
  //keyHoleThree - makes intangable
  keyHoleThree.style.pointerEvents = "none";

  //drag n drop functionality for keyOne
  keyOne.addEventListener('pointerdown', (event) =>{
  grabKeyOne = true;
  dNormalizer = calcDistance(keyHoleTwoObj,event);
  })  

  document.addEventListener('pointermove',(event) =>{
  handleKeyOneMovement(event);
  d = calcDistance(keyHoleTwoObj,event);
  })

  document.addEventListener('pointerup', (event) =>{
  grabKeyOne = false;
  }) 

  //activating rotation
  keyHoleTwo.addEventListener ('pointerdown', (event) => {
     grabKeyHole = true;
    pointerDownXY(event)}) 

  document.addEventListener('pointermove',pointerMoveXY)

  document.addEventListener('pointerup', (event) => 
    grabKeyHole = false)

  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!



