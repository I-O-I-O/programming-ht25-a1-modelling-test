/*
 * IDB Programming: Code Playground
 *
 */


import * as Util from "../util.js";

// State variables are the parts of your program that change over time.

let grabKeyHole = false
let keyInHole = true
let keyTurn = false

let posX = 0;
let posY = 0;
let posX2 = 0;
let posY2 = 0;

let rotation = 0;

const keyOneObj = {
  //position
  x: 0.5,
  y: 0.5,
  //size
  width: 100,
  height: 190,
  //roundedness
  r: 0,
  //colour
  h: 0,
  s: 100,
  l: 50,
  a: 1,
  //this is the object for the key (pink circle for now)
}

const boxOne = {
  //position
  x: 300,
  y: 400,
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

let boxTwo = {
  //position
  x: 300,
  y: 400,
  //size
  width: 100,
  height: 190,
  //roundedness
  r: 0,
  //colour
  h: 280,
  s: 50,
  l: 50,
  a: 1,
  //Purple Square
}

// Settings variables should contain all of the "fixed" parts of your programs


/* setAppearanceProperties - the function links Objects properties with their respective div HTML elements
it also sets the appeareance based on the OBJ properties.
parameters: 
obj - put the Object name here
div - put the HTML div name here
*/
function setAppearanceProperties (obj,div) {
  const {x,y,width,height,r,h,s,l,a} = obj
  Util.setPositionPixels(x-width/2, y-height/2, div)
  Util.setSize(width, height, div)
  Util.setRoundedness(r,div)
  Util.setColour(h,s,l,a,div)
}

// Code that runs over and over again
function loop() {
  
  if (grabKeyHole && keyInHole) {
    keyTurn = true
  } if(!grabKeyHole ||! keyInHole) {
    keyTurn = false }; 
  //logs mouse x only when both statements are true
  
  console.log(keyTurn) 
  if (keyTurn) {
    fuckMe();
     
    console.log('pos '+posY/posX);
    console.log('rotation '+rotation);
  }

  window.requestAnimationFrame(loop);
}

/* function fuckMe () {
  Util.setRotation(rotation = 90+((Math.atan2(400-posY,300-posX))*(180/Math.PI)),keyHoleTwo)
  //((Math.atan2(400-posY2,300-posX2))*(180/Math.PI))
  // (posY-posY2)+posY
}
 */

function fuckMe () {
 let initialAngle = ((Math.atan2(400-posY2,300-posX2))*(180/Math.PI));
 let currentAngle = ((Math.atan2(400-posY,300-posX))*(180/Math.PI));
 let diffAngles = currentAngle - Math.abs(initialAngle) ;
  Util.setRotation(90+((Math.atan2(400-posY,300-posX))*(180/Math.PI)),keyHoleTwo) 
  console.log('diff '+diffAngles)
  console.log('Init '+initialAngle)
  console.log('Curr '+currentAngle)
  //((Math.atan2(400-posY2,300-posX2))*(180/Math.PI))
  // (posY-posY2)+posY
}

function pointerMoveXY (event) {
  posX = event.x
  posY = event.y  
  
 //logs mouse xy current
}
function pointerDownXY (event) {
  posX2 = event.x
  posY2 = event.y  
   
 //logs mouse xy start
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  Util.createThing("keyHoleOne","thing");
  Util.createThing("keyHoleTwo","thing");
  Util.createThing("keyOne","thing")
  setAppearanceProperties(keyOneObj,keyOne); //"keyOne" = pink square appeareance
  setAppearanceProperties(boxOne,keyHoleOne);
  setAppearanceProperties(boxTwo,keyHoleTwo); 

  keyHoleTwo.addEventListener ('pointerdown', (event) => {
     grabKeyHole = true;
    pointerDownXY(event)}) 
  
  document.addEventListener('pointerup', (event) => 
    grabKeyHole = false) 

  document.addEventListener('pointermove',pointerMoveXY)
   

  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!



