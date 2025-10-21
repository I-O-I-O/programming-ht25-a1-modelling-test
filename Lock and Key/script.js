/*
 * IDB Programming: Code Playground
 *
 */


import * as Util from "./util.js";


// State variables are the parts of your program that change over time.

let grabKeyHole = false
let keyInHole = true
let keyTurn = false

let posX = 0;
let posY = 0;
let rotation = 0;


const boxOne = {
  x: 300,
  y: 400,
  width: 240,
  hight: 240,
  roundness: 1,
  //Gray Circle
}

let boxTwo = {
  x: 300,
  y: 400,
  width: 100,
  hight: 190,
  roundness: 0,
  
  //Purple Square
}

// Settings variables should contain all of the "fixed" parts of your programs


// Apperance
function boxOneApp () {
  Util.setPositionPixels(boxOne.x-boxOne.width/2, boxOne.y-boxOne.hight/2, keyHoleOne)
  Util.setSize(boxOne.width, boxOne.hight, keyHoleOne)
  Util.setRoundedness(1,keyHoleOne)
  Util.setColour(240,30,90,1,keyHoleOne)
    // Gray circle
}
function boxTwoApp () {
  Util.setPositionPixels(boxTwo.x-boxTwo.width/2, boxTwo.y-boxTwo.hight/2, keyHoleTwo)
  Util.setSize(boxTwo.width, boxTwo.hight, keyHoleTwo)
  Util.setRoundedness(0,keyHoleTwo)
  Util.setColour(280,50,50,1,keyHoleTwo)
  
  //Purple Square
}

// Code that runs over and over again
function loop() {
  
  boxOneApp(); //grey circle
  boxTwoApp(); //purple square

  if (grabKeyHole && keyInHole) {
    keyTurn = true
  } if(!grabKeyHole |! keyInHole) {
    keyTurn = false }; 
  //logs mouse x only when both statements are true
  
  console.log(keyTurn) 
  if (keyTurn) {
    Util.setRotation(rotation = 90+((Math.atan2(400-posY,300-posX))*(180/Math.PI)),keyHoleTwo)
    console.log('posX '+posX) 
    console.log('posY '+posY) 
    console.log('pos '+posY/posX) 
    console.log('rotation '+rotation) 
  }
  

  window.requestAnimationFrame(loop);
}




 
function grab () {
  if ('pointerdown') {
      grabKeyHole = true}
}
function grabStop () {
  if ('pointerup') {
    grabKeyHole = false}
}//function to determen if you have grabbed the correct object


function pointerMoveX (event) {
  posX = event.x
  posY = event.y  
  
 //logs mouse x
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  Util.createThing("keyHoleOne","thing");
  Util.createThing("keyHoleTwo","thing");
  


  keyHoleTwo.addEventListener ('pointerdown', grab)
  
  document.addEventListener('pointerup', grabStop)
  document.addEventListener('pointermove',pointerMoveX)
   
  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
