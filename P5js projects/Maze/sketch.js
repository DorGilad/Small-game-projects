var cols,rows,//כמות עמודות וטורים
    w,//גודל כל תא
    grid,//מערך כל התאים//המבוך
    current,//התא הנוכחי
    stack,//מחסנית להכנת המבוך
    ended=false,//האם הכנת המבוך הסתיימה
    loopp=0,//כמות הדקות מתחילת התוכנית
    last,//כמות השניות האחרונה
    sec,//כמות השניות מלפני תחילת התוכנית
    player,//השחקן
    endPlace,//מיקום המטרה
    space,//אורך גודל החלונית
    help,target,//תמונה של סימן עזרה ותמונה של מטרה
    difficulty,diff,//מערך של קשיים ומיקומו
    time,//הזמן שיש לשלב
    roundTime=25,//זמן שנוסף בכל שלב
    wins=0,loses=0,//כמות הניצחונות וההפסדים
    winSound,failSound,backGroundNoise,//סאונד של ניצחון,הפסד,רקע
    helpPressedShow=false,//בכדי שהלחיצה לעזרה תקרה רק פעם אחת
    routeShow=[],//מסלול העזרה
    routeEnded=false,//האם צריך להראות את מסלול העזרה
    rowsAmount;
function preload(){
  help = loadImage("help.png");
  target = loadImage("target.png");
  winSound=loadSound("winSound.mp3");
  failSound=loadSound("failSound.mp3");
  backGroundNoise=loadSound("backGroundNoise.mp3");
}//הורדת תמונות

function setup() {
  createCanvas(windowWidth,windowHeight);
  diff=0;
  difficulty=[width/7,width/9,width/11,width/13,width/15];
  time=roundTime*(diff+1);
  space=60;
  initialize();
  backGroundNoise.play();
}//מבנה המשחק// הכנות ראשונות

function draw() { 
  background(255);
  for(let i=0;i<grid.length;i++){//מצייר את המבוך
    grid[i].show();
  }
  if(helpPressed()&&helpPressedShow==false){//אם נלחץ בקשה לעזרה
    routeShow=route();
    time-=(diff+1)*10;
    helpPressedShow=true;
    routeEnded=false;
  }
  else if(!helpPressed()&&helpPressedShow==true){//אם כבר נלחץ בקשה לעזרה
    helpPressedShow=false;
  }
  if(routeEnded==false){//האם המסלול עזרה לא הסתיים
    drawRoute(routeShow);
  }
  if(endOfRoute()){//אם השחקן הגיע לסוף מסלול העזרה
    routeEnded=true;
  }
  player.show();//ציור השחקן
  drawPanel();//מצייר את החלונית
  drawTime();//מצייר את הזמן
  if(frameCount%abs(diff-10)==0){//מזיז את השחקן לי המקלדת
    keybordPlay();
  }
  if((touches.length===1||mouseIsPressed)&&mouseY>space){//מזיז את השחקן לפי הטאצ
    touchPlay();
  }
  if(won()){//אם המשתמש ניצח
    winSound.play();//משמיע צליל ניצחון
    wins++;
    if(diff<difficulty.length-1){//מעלה את רמת הקושי
      diff++;
    }
    time=roundTime*(diff+1);//מגדיר זמן חדש
    initialize();//יוצר מבוך חדש ומאפס משתנים
  }
  if(lose()){//אם המשתמש הפסיד
    failSound.play();//משמיע צליל הפסד
    loses++;
    if(diff>0){//מוריד את רמת הקושי
      diff--;
    }
    time=roundTime*(diff+1);//מגדיר זמן חדש
    initialize();//יוצר מבוך חדש ומאפס משתנים
  }
}//הפעולה הראשית

function endOfRoute(){
  let maxsimom=round(routeShow.length/10);
  if(maxsimom<=2){
    maxsimom=3;
  }
  if(maxsimom>routeShow.length){
    maxsimom=routeShow.length;
  }
  if(routeShow.length>0&&player.i==routeShow[maxsimom-1].i&&player.j==routeShow[maxsimom-1].j)
    return true;
  return false;
}//בודק האם השחקן הגיע לסוף המסלול עזרה

function drawPanel(){
  image(help,width-space+10,0,space-20,space-20);
  image(target,floor(endPlace%cols)*w+2,int(endPlace/int(cols)) *w+2+space,w-4,w-4);
  textSize(space/4);
  fill('green');
  text("wins : "+wins,width/2+50,space/15*6);
  fill('red');
  text("loses : "+loses,width/2+50,space/15*12);
}//מצייר את הדברים שבחלונית//חוץ מהזמן

function keybordPlay(){
  let thisCell=grid[index(player.i,player.j)];
  if(!thisCell.walls[3]&&keyIsDown(LEFT_ARROW)){
        player.i--;
    }
    else if(!thisCell.walls[2]&&(keyIsDown(DOWN_ARROW))){
        player.j++;
    }
    else if(!thisCell.walls[1]&&keyIsDown(RIGHT_ARROW)){
        player.i++;
    }
    else if(!thisCell.walls[0]&&keyIsDown(UP_ARROW)){
        player.j--;
    }
}//הפעולה מזיזה את השחקן לפי המקלדת של המשתמש

function drawTime(){
  if(second()!=last){
    if(second()<last){
      loopp++;
      last=second();
    }
    else{
      last=second();
    }
  }
  let min=floor((time-(loopp*60+last-sec))/60);
  let secends=int(time-(loopp*60+last-sec))%60;
  textSize(space/2);
  fill(0);
  text("Time left : "+min+":"+secends,10,space-20);
  textSize(space/4);
  text("FPS: "+round(frameRate()),width-space,space-5);
}//הפעולה מציירת את הזמן שנותר 

function touchPlay(){
  var x=round((mouseX+w/2)/w)-1;
  var y=round((mouseY+w/2-space)/w)-1;
  if(x==player.i){
    if(y>player.j&&!grid[index(player.i,player.j)].walls[2]){
      player.j++;
    }
    if(y<player.j&&!grid[index(player.i,player.j)].walls[0]){
      player.j--;
    }
  }
  if(y==player.j){
    if(x>player.i&&!grid[index(player.i,player.j)].walls[1]){
      player.i++;
    }
    if(x<player.i&&!grid[index(player.i,player.j)].walls[3]){
      player.i--;
    }
  }
}//פעולה מזיזה את השחקן לפי הטאצ' של המשתמש

function lose(){
  if(time-(loopp*60+last-sec)<=0)
    return true;
  return false;
}//פעולה הבודקת האם המשתמש הפסיד

function helpPressed(){
  if(mouseX>width-space&&mouseX<width&&mouseY>0&&mouseY<space-20&&(touches.length==1||mouseIsPressed))
    return true;
  return false;
}//פעולה הבודקת האם המשתמש ביקש עזרה

function index(i,j){
  if(i<0||j<0||i>cols-1||j>rows-1){
    return -1;
  }
  return i+j*cols;
}//פעולה המחזירה את המיקום של שתי אינדקסים במבוך

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
}//פעולה העוזרת לבנות את המבוך אשר מורידה קירות מהתאים איי ו ביי

function startPlace(){
  let count=0;
  let max=rows*cols;
  let maxCell=0;
  let middle=round((rows/2*cols)+cols/2);
  for(let i=0;i<grid.length;i++){
    for(let j=0;j<4;j++){
      if(grid[i].walls[j])
        count++;
    }
    if(count==3){
      if(abs(distance(middle,i))<max){
        max=abs(distance(middle,i));
        maxCell=i;
      }
    }
    count=0; 
  }
  return maxCell; 
}//פעולה המוצאת את המיקום ההתחלתי של השחקן

function end(){
  let count=0;
  let max=0;
  let maxCell=0;
  let middle=startPlace();
  for(let i=0;i<grid.length;i++){
    for(let j=0;j<4;j++){
      if(grid[i].walls[j])
        count++;
    }
    if(count==3){
      if(abs(distance(middle,i))>max){
        max=abs(distance(middle,i));
        maxCell=i;
      }
    }
    count=0; 
  }
  return maxCell; 
}//פעולה המוצאת את המיקום של המטרה

function won(){
  if(index(player.i,player.j)==endPlace)
    return true;
  return false;
}//פעולה הבודקת האם המשתמש ניצח

function initialize(){
  ended=false;
  loopp=0;
  w=difficulty[diff];
  stack=[]; 
  grid=[];
  routeShow=[];
  last=second();
  cols=round(width/w);
  rows=floor((height-space)/w);
  for(let j=0;j<rows;j++){
    for(let i=0;i<cols;i++){
      var cell=new Cell(i,j);
      grid.push(cell);
    }
  }
  current=grid[0];
  while(!ended){
    current.visited=true;
    let next = current.checkNeighbors();
    if(next){
      next.visited =true;
      stack.push(current);
      removeWalls(current,next);
      current=next;
    }
    else if(stack.length>0){
      current = stack.pop();
    }
    else{
      ended=true;
    }
  }
  sec=second();
  player=new Player(floor(startPlace()%cols),int(startPlace()/int(cols)));
  endPlace=end();
}//פעולת הכנה שמאפסת את המבוך

function distance(num1,num2){
  let y1=num1%cols;
  let count=0;
  while(num1>=cols){
    num1-=cols;
    count++;
  }
  let x1=count;
  let y2=num2%cols;
  count=0;
  while(num2>=cols){
    num2-=cols;
    count++;
  }
  let x2=count;
  let h=abs(y1-y2);
  let x=abs(x1-x2);
  return sqrt(h*h+x*x);
}//פעולה המוצאת את המרחק בין שתי מספרים אשר נמצאים במערך

function route(){
  let stack=[];
  let x=player.i;
  let y=player.j;
  let current=grid[index(x,y)];
  while(index(x,y)!=endPlace){
    current.visitedRoute=true;
    let next=current.checkRoute();
    if(next){
      next.visitedRoute =true;
      stack.push(current);
      current=next;
      x=current.i;
      y=current.j;
    }
    else if(stack.length>0){
      current=stack.pop();
      x=current.i;
      y=current.j;
    }
  }
  for(let i=0;i<grid.length;i++){
    grid[i].visitedRoute=false;
  }
  return stack;
}//פעולה המוצאת את המסלול שמוביל למטרה

function drawRoute(route){
  let r=route;
  maxsimom=round(r.length/10);
  if(maxsimom<=2){
    maxsimom=3;
  }
  if(maxsimom>r.length){
    maxsimom=r.length;
  }
  for(let x=0;x<maxsimom;x++){
    noStroke();
    fill(0,0,255,30);
    rect(r[x].i*w,r[x].j*w+space,w,w);
  }
}//פעולה המציירת את המסלול שמוביל למטרה