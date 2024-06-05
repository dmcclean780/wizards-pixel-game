//Controller JavaScript file linking all others to the html page

//Code to import the required functions from other javaScript files
import { createArray } from "../utils/array.js";
import { startPainting, stopPainting, sketch, eraseMode } from "../utils/canvasInput.js";
import { renderArray } from "../utils/canvasOutput.js";
import { CanvasData } from "../utils/canvasData.js";
import { DrawingData } from "../utils/DrawingData.js";
import {step} from "./step.js";
import { createChunks } from "../utils/chunkList.js";

//Code to decalare the variables that must have a global scope
let elementSelector;
let currentChunks;
let value =0;
let stopSim=false;
let speed;
let canvasData;
let newChunks;
var genNoHTML;
var genNo=0;
var startTime=0;
var fpsList=new Array(10);
var frame=1;
var fpsHTML;
var sum=0;

//Block of code to create the array and listen for a mouse click
window.addEventListener("load", (event)=>{
  var audioElement = document.getElementById("MainMusic");
  audioElement.play();
  
  setCanvasObj();
  currentChunks=createChunks(canvasData);
  newChunks=createChunks(canvasData);
  genNoHTML =document.getElementById("genNo.");
  fpsHTML=document.getElementById("fpsMeter");
  elementSelector=document.getElementById("element-select");
  canvas.addEventListener('mousedown', (event)=>{
    event.stopPropagation()
    var mouseEvent=true;
    var drawingData= getDrawingData(event, mouseEvent);
    startPainting(drawingData, currentChunks, canvasData);
  } );

  canvas.addEventListener('mouseup', (event)=> {
    event.stopPropagation()
    stopPainting(currentChunks, canvasData)
  });

  canvas.addEventListener('mousemove', (event)=>{
    event.stopPropagation()
    var mouseEvent=true;
    var drawingData= getDrawingData(event, mouseEvent);
    sketch(drawingData, currentChunks, canvasData)
  } );

  canvas.addEventListener('touchstart', (event)=>{
    event.stopPropagation()
    var mouseEvent=false;
    var drawingData= getDrawingData(event, mouseEvent);
    startPainting(drawingData, currentChunks, canvasData)
  } );

  canvas.addEventListener('touchend', (event)=> {
    event.stopPropagation()
    stopPainting(currentChunks, canvasData)}
  );

  canvas.addEventListener('touchmove', (event)=>{
    event.stopPropagation()
    var mouseEvent=false;
    var drawingData= getDrawingData(event, mouseEvent);
    sketch(drawingData, currentChunks, canvasData)
  } );
  //canvasData.ctx.translate(100, 100);
  canvasData.ctx.fillStyle = "green";
  canvasData.ctx.fillRect(-100,-100,100,100)
  canvasData.ctx.translate(10, 10);

  //run();
})

window.addEventListener("resize", (event)=>{setCanvasObj();})

function getDrawingData(event, mouseEvent){
  var rect= event.target.getBoundingClientRect();
    if (mouseEvent){
      var clientY = event.clientY;
      var clientX = event.clientX
    }
    else{
      var clientY = event.touches[0].clientY;
      var clientX = event.touches[0].clientX;
    }
  var colour=elementSelector.value;
  var alpha = Math.floor(Math.random() * 15+206);
  colour=colour | (alpha<<24);
  colour&=0xf0ffffffff;
  var drawingData = new DrawingData(rect, clientX, clientY, colour);
  return drawingData;
}

function setCanvasObj(){
  const canvas=document.getElementById("canvas");
  const width=canvas.width;
  const height=canvas.height;
  const ctx = canvas.getContext("2d");
  const clientWidth=canvas.clientWidth;
  const clientHeight=canvas.clientHeight;
  canvasData = new CanvasData(width, height, ctx, clientWidth, clientHeight);
}

//Procedure to move the game on 1 generation
function stepGame(){
  var swap = step(currentChunks, canvasData, newChunks);
  newChunks=currentChunks;
  currentChunks=swap;
  genNo++
  genNoHTML.innerHTML=genNo;
  renderArray(canvasData, currentChunks);
}

//Procedure to reset the game
function reset(){
  stop();
  currentChunks=createArray(canvasData);
  renderArray(canvasData, currentChunks);
  genNo = 0;
  genNoHTML.innerHTML=genNo;
}

//Function to find the speed to run the simulation at
function findSpeed(){
  var n=speedSlider.value;
  var speed=60-n;
  return speed;
}

//Taken and adapted from https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
//Procedure to start running the simulation
function run(){
  value=0;
  stopSim=false;
  speed=findSpeed();
  requestAnimationFrame(animate);
};

function findFPS(t){
  var timeDiff=t-startTime;
  startTime=t;
  var fps=1000/timeDiff;
  sum += fps;
  if(frame==fpsList.length){
    var avg=sum/fpsList.length;
    fpsHTML.innerHTML=avg.toFixed(1);
    sum=0;
    frame=0;
  }
  frame++
}

//Recursive procedure to animate the simulation at the correct speed
function animate(t) {
  findFPS(t);
  var newSpeed=findSpeed();
  if(speed!=newSpeed){
    run();
    return
  }
  if (value == speed) {
    value=0;        
    if(stopSim==false){
      stepGame();
      requestAnimationFrame((t)=>animate(t));
    }
    return
  } 
  value++;
  requestAnimationFrame((t)=>animate(t));
}

//Procedure to clear the intreval and stop it
function stop() {
  stopSim=true
};

//Sections of code to retrive buttons what to do when they are clicked
var stepButton=document.getElementById("stepButton");
stepButton.addEventListener("click", (event)=>{
  var clickSound=document.getElementById("clickSound");
  clickSound.play();
  stepGame();
});

var resetButton=document.getElementById("resetButton");
resetButton.addEventListener("click", (event)=>{
  var clickSound=document.getElementById("clickSound");
  clickSound.play();
  reset()
});

var runButton=document.getElementById("runButton");
runButton.addEventListener("click", (event)=>{
  var clickSound=document.getElementById("clickSound");
  clickSound.play();
  run()
});

var stopButton=document.getElementById("stopButton");
stopButton.addEventListener("click", (event)=>{
  var clickSound=document.getElementById("clickSound");
  clickSound.play();
  stop()
});

var speedSlider=document.getElementById("speed");

var eraseButton=document.getElementById("eraseButton");
eraseButton.addEventListener("click", (event)=> {
  var clickSound=document.getElementById("clickSound");
  clickSound.play();
  eraseMode(eraseButton)
});





