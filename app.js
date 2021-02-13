const canvas=document.querySelector('#js-canvas');
const ctx=canvas.getContext('2d'); //getContext()메소드로 canvas 그리기 함수 시작
const colors=document.getElementsByClassName('js-color');
const arrayColors=Array.from(colors);
const range=document.getElementById('js-range');
const mode=document.getElementById('js-mode');
const save=document.getElementById('js-save');
const INITIAL_COLOR="black";


// 캔버스의 너비, 높이 값을 가져와서 canvas width, height에 할당
canvas.width=ctx.canvas.offsetWidth;
canvas.height=ctx.canvas.offsetHeight;

ctx.fillStyle="white";
ctx.fillRect(0, 0, canvas.width, canvas.height); // 사각형 생성

ctx.lineWidth=3; // 기본 라인 너비값
ctx.strokeStyle=INITIAL_COLOR; // 기본 선 색깔
ctx.fillStyle=INITIAL_COLOR; // 기본 사각형 색깔


let painting=false;
let filling=false;

function startPainting(){
  painting=true;
}

function stopPainting(){
  painting=false;
}

function onMouseMove(event){
  const offsetX=event.offsetX; // canvas내에 x좌표값
  const offsetY=event.offsetY; // canvas내에 y좌표값
  
  if(!painting){ // 마우스를 움직이는 동안 발생
    // console.log("creating Path in", offsetX, offsetY);

    ctx.beginPath(); // Path(경로) 생성
    ctx.moveTo(offsetX, offsetY); // 현재 마우스가 위치한 x, y좌표로 Path 시작 좌표
  }else{ // 마우스를 클릭하고 마우스를 움직이는 동안 발생
    // console.log("creating line in", offsetX, offsetY);

    ctx.lineTo(offsetX, offsetY); // 현재 마우스가 위치한 x, y좌표로 Path 끝 좌표
    ctx.stroke(); //moveTo()와 lineTo()를 통해 만들어진 Path 경로에 선을 그리기
  }
}

function onMouseDown(event){
  painting=true;
}

function handleColor(event){
  const color=event.target.style.backgroundColor;
  ctx.strokeStyle=color;
  ctx.fillStyle=color;
}

function handleRange(event){
  const rangeValue=event.target.value;
  ctx.lineWidth=rangeValue;
}

function handleMode(event){
  if(filling===true){
    filling=false;
    mode.innerText="Fill";
  }else{
    filling=true;
    mode.innerText="Paint";
  }
}

function handleCanvas(){
  if(filling===true){
    ctx.fillRect(0, 0, canvas.width, canvas.height); // 사각형 생성
  }
}

function handleRightClick(event){
  event.preventDefault();
}

function handleSave(){
  const a=document.createElement('a');
  a.href=canvas.toDataURL();
  a.download="Painting";
  a.click();
  // console.log(a);
}

if(canvas){
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvas);
  canvas.addEventListener('contextmenu', handleRightClick);
}

arrayColors.forEach(function(element){
  element.addEventListener('click',handleColor);
});

if(range){
  range.addEventListener('input', handleRange);
}

if(mode){
  mode.addEventListener('click', handleMode);
}

if(save){
  save.addEventListener('click', handleSave);
}