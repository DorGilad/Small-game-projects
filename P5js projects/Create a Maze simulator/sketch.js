var cols,rows;
var w=50;
var grid=[];
var current;
var stack=[];
function setup() {
  createCanvas(windowWidth,windowHeight);
  cols=floor(width/w);
  rows=floor(height/w);
  
  for(let j=0;j<rows;j++){
    for(let i=0;i<cols;i++){
      var cell=new Cell(i,j);
      grid.push(cell);
    }
  }
  current=grid[0];
}

function draw() {
  //frameRate(1);
  background('red');
  current.visited=true;
  var next = current.checkNeighbors();
  if(next){
    next.visited =true;
    stack.push(current);
    removeWalls(current,next);
    current=next;
  }
  else if(stack.length>0){
    current = stack.pop();
  }

  for(let i=0;i<grid.length;i++){
    grid[i].show();
  }
  current.highlight();
}
function index(i,j){
  if(i<0||j<0||i>cols-1||j>rows-1){
    return -1;
  }
  return i+j*cols;
}
function removeWalls(a,b){
  var x=a.i-b.i;
  var y =a.j-b.j;
  if(x===1){
    a.walls[3]=false;
    b.walls[1]=false;
  }
  else if(x===-1){
    a.walls[1]=false;
    b.walls[3]=false;
  }
  
  if(y===1){
    a.walls[0]=false;
    b.walls[2]=false;
  }
  else if(y===-1){
    a.walls[2]=false;
    b.walls[0]=false;
  }
}