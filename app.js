/*
-canvas는 context를 갖는 HTML의 요소
-context: 이 요소 안에서 우리가 픽셀에 접근할 수 있음
 */

//canvas 가져오기
const canvas = document.getElementById("jsCanvas");
//pixel modifier에 실제 픽셀 사이즈 줘야 함
canvas.width=700;
canvas.height=700;

//2d context 가져오기
const ctx = canvas.getContext('2d');
/*context의 default 설정*/
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5; //index.html에서 control bar

//color 가져오기
const colors = document.getElementsByClassName("jsColor");
/*
<우리가 하려는 것> 
: 캔버스를 클릭하는 순간 painting 시작해야 함
*/
let painting=false;

/*마우스가 컨버스에서 나가면: painting false*/
function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

/*마우스 움직일 때*/
function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;
    //console.log(x,y);
    //clientX,Y: 윈도우 전체의 범위 내에서의 마우스 위치값
    //offsetX,y: 캔버스 내에서의 좌표로 설정 가능
    if(!painting){
        ctx.beginPath(); //경로 생성
        ctx.moveTo(x,y); //펜을 들어 (x,y)로 옮기는 과정이라 생각
                        //특정 시작점 설정 위함
    }else{
        ctx.lineTo(x,y); //현재 위치에서 (x,y)까지 선 그림
                        //현재 위치: 앞서 생성한 path의 마지막 점
        ctx.stroke();
    }
}

function handleColorClick(e){
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    //console.log(e.target.style.backgroundColor);
    //== console.log(color);
    //e.target ~> 이벤트 발생한 객체 얻기 
    //e.target.style ~> style에 대한 array 얻게 됨
}

/*마우스로 클릭했을 때
function onMouseDown(e){
    //console.log(e);
    painting=true;
}*/


/*마우스 뗐을 때  __딱히 좋은 방법 아니라 대체
function onMouseUp(e){
    stopPainting(); //painting을 멈춰야 함
}*/


//canvas가 존재하는지 확인
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    //canvas.addEventListener("mousedown", onMouseDown);
    //canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

//Array.from(): object로부터 array 만듦
//array안에서 forEach()로 color 가질 수 있음
//forEach(): 주어진 함수를 배열 요소 각각에 대해 실행
Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick));
//console.log(Array.from(colors));