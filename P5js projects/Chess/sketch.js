var bord=[];
let x=1,y=1;
let copyPlayer;
let pick=true;
let turn=true;
let CheesBord;
function preload(){
  CheesBord=loadImage("CheesBord-2.jpg");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  createPlayers();
}
function draw() {
  background(50,50,50,100);
  gameOn();
}
function drawBord(){
  noStroke();
  image(CheesBord,0,((height-width)/2),width,width);
}
function createPlayers(){
  for(let i=0;i<8;i++){
    bord[i]=[];
  }
  for(let i=0;i<8;i++){
    bord[6][i]=new Players(6,i,'WHITE','Soldier');
    bord[1][i]=new Players(1,i,'BLACK','Soldier');
  }
   bord[7][0]=new Players(7,0,'WHITE','Steeple');
   bord[7][7]=new Players(7,7,'WHITE','Steeple');

   bord[0][0]=new Players(0,0,'BLACK','Steeple');
   bord[0][7]=new Players(0,7,'BLACK','Steeple');
  
   bord[7][1]=new Players(7,1,'WHITE','Horse');
   bord[7][6]=new Players(7,6,'WHITE','Horse');
  
   bord[0][1]=new Players(0,1,'BLACK','Horse');
   bord[0][6]=new Players(0,6,'BLACK','Horse');
  
   bord[7][2]=new Players(7,2,'WHITE','Runer');
   bord[7][5]=new Players(7,5,'WHITE','Runer');
  
   bord[0][2]=new Players(0,2,'BLACK','Runer');
   bord[0][5]=new Players(0,5,'BLACK','Runer');
  
   bord[7][4]=new Players(7,4,'WHITE','King');
   bord[0][4]=new Players(0,4,'BLACK','King');

   bord[7][3]=new Players(7,3,'WHITE','Queen');
   bord[0][3]=new Players(0,3,'BLACK','Queen');

}
function drawPlayers(){
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(bord[i][j]!=null)
      bord[i][j].show();
    }
  }
}
function BlackWon(){
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(bord[i][j]!=null&&bord[i][j].kind=='WHITE'&&bord[i][j].type=='King'){
        w=i;
        q=j;
      } 
    }
  }
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(bord[i][j]!=null&&bord[i][j].kind=='BLACK'){
        for(let k=0;k<bord[i][j].movingOpsions().length;k++){
          if(w==bord[i][j].movingOpsions()[k][0]&&q==bord[i][j].movingOpsions()[k][1])
            return true;
        }
      }
    }
  }
  return false;
}
function WhiteWon(){
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(bord[i][j]!=null&&bord[i][j].kind=='BLACK'&&bord[i][j].type=='King'){
        w=i;
        q=j;
      } 
    }
  }
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(bord[i][j]!=null&&bord[i][j].kind=='WHITE'){
        for(let k=0;k<bord[i][j].movingOpsions().length;k++){
          if(w==bord[i][j].movingOpsions()[k][0]&&q==bord[i][j].movingOpsions()[k][1])
            return true;
        }
      }
    }
  }
  return false;
}
function gameOn(){
  drawBord();
  drawPlayers();
  if(bord[y][x]!=null&&bord[y][x].kind=='WHITE'&&turn){
    //console.log(bord[y][x].name);
    bord[y][x].showPosibalLocations();
  }
  if(bord[y][x]!=null&&bord[y][x].kind=='BLACK'&&(!turn)){
    //console.log(bord[y][x].name);
    bord[y][x].showPosibalLocations();
  }
  if(turn){//לבן משחק
     noStroke();
     if(WhiteWon()){//אם לבן ניצח
       // background(255);
       // drawBord();
      fill('red')
      textSize(32);
      text("White won the game",width/2-150,height/2);
    }
    else{
      textSize(width/12);
      fill(255);
      text("its white turn",width/2-100,height-width/4);
      textSize(width/30);
      text("press here to start your turn/reset yout choise",width/2-140,height-width/8);
      if(pick&&(touches.length==1||mouseIsPressed===true)&&(mouseY<(height-width)/2+width&&mouseY>(height-width)/2)){
        x=floor(mouseX*8/width);
        y=floor((mouseY-(height-width)/2)*8/width);
        if(bord[y][x]!=null&&bord[y][x].kind=='WHITE')
          pick=false; 
      }
      if((pick==false)&&(touches.length==1||mouseIsPressed===true)&&(mouseY<(height-width)/2+width&&mouseY>(height-width)/2)&&bord[y][x].kind=='WHITE'){
        for(let i=0;pick==false&&i<bord[y][x].movingOpsions().length;i++){
          if(bord[y][x].movingOpsions()[i][0]==floor((mouseY-(height-width)/2)*8/width)&&bord[y][x].movingOpsions()[i][1]==floor(mouseX*8/width)){
            pick=true;
            turn=false;
            bord[y][x].row=floor((mouseY-(height-width)/2)*8/width);
            bord[y][x].colom=floor(mouseX*8/width);
            copyPlayer=bord[y][x];
            bord[y][x]=null;
            bord[floor((mouseY-(height-width)/2)*8/width)][floor(mouseX*8/width)]=copyPlayer;
            if(bord[floor((mouseY-(height-width)/2)*8/width)][floor(mouseX*8/width)].type=='Soldier'&&bord[floor((mouseY-(height-width)/2)*8/width)][floor(mouseX*8/width)].row==0){
              bord[floor((mouseY-(height-width)/2)*8/width)][floor(mouseX*8/width)]= new Players(0,floor(mouseX*8/width),'WHITE','Queen');
            }
          }
        }
      }
      if((mouseY>(height-width)/2+width||mouseY<(height-width)/2))
        pick=true;
    }
  }
  else{//שחור משחק
    noStroke();
    if(BlackWon()){
      // background(0);
      // drawBord();
      fill('red');
      textSize(32);
      text("Black won the game",width/2-150,height/2);
    }
    else{
      fill(0);
      textSize(width/12);
      text("its black turn",width/2-100,(height-width)/2/4);
      textSize(width/30);
      text("press here to start your turn/reset yout choise",width/2-140,(height-width)/3);
      if(pick&&(touches.length==1||mouseIsPressed===true)&&(mouseY<(height-width)/2+width&&mouseY>(height-width)/2)){
        x=floor(mouseX*8/width);
        y=floor((mouseY-(height-width)/2)*8/width);
        if(bord[y][x]!=null&&bord[y][x].kind=='BLACK')
          pick=false;
      }
      if((!pick)&&(touches.length==1||mouseIsPressed===true)&&(mouseY<(height-width)/2+width&&mouseY>(height-width)/2)&&bord[y][x].kind=='BLACK'){
        for(let i=0;pick==false&&i<bord[y][x].movingOpsions().length;i++){
          if(bord[y][x].movingOpsions()[i][0]==floor((mouseY-(height-width)/2)*8/width)&&bord[y][x].movingOpsions()[i][1]==floor(mouseX*8/width)){
            bord[y][x].row=floor((mouseY-(height-width)/2)*8/width);
            bord[y][x].colom=floor(mouseX*8/width);
            copyPlayer=bord[y][x];
            bord[y][x]=null;
            bord[floor((mouseY-(height-width)/2)*8/width)][floor(mouseX*8/width)]=copyPlayer;
            pick=true;
            turn=true;
            if(bord[floor((mouseY-(height-width)/2)*8/width)][floor(mouseX*8/width)].type=='Soldier'&&bord[floor((mouseY-(height-width)/2)*8/width)][floor(mouseX*8/width)].row==7){
              bord[floor((mouseY-(height-width)/2)*8/width)][floor(mouseX*8/width)]= new Players(7,floor(mouseX*8/width),'BLACK','Queen');
            }
          }
        }
      }
      if((mouseY>(height-width)/2+width||mouseY<(height-width)/2))
        pick=true;
    }
  }
}
/*function WhiteMistak(){
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(bord[i][j]!=null&&bord[i][j].kind=='WHITE'&&bord[i][j].type=='King'){
        w=i;
        q=j;
      } 
    }
  }
  movingOpsions=bord[w][q].movingOpsions()
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(bord[i][j]!=null&&bord[i][j].kind=='BLACK'){
        for(let k=0;k<bord[i][j].movingOpsions().length();k++){
          for(let d=0;d<movingOpsions.length();d++){
            if(bord[i][j].movingOpsions()[k][0]==movingOpsions[d][0]&&bord[i][j].movingOpsions()[k][1]==movingOpsions[d][1])
              move[k].pop();
          }
        }
      }
    }
  }
  return movingOpsions;
}*/
/*function BlackMistak(){
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(bord[i][j]!=null&&bord[i][j].kind=='BLACK'&&bord[i][j].type=='King'){
        w=i;
        q=j;
      } 
    }
  }
  movingOpsions=bord[w][q].movingOpsions()
  for(let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      if(bord[i][j]!=null&&bord[i][j].kind=='WHITE'){
        for(let k=0;k<bord[i][j].movingOpsions().length();k++){
          for(let d=0;d<movingOpsions.length();d++){
            if(bord[i][j].movingOpsions()[k][0]==movingOpsions[d][0]&&bord[i][j].movingOpsions()[k][1]==movingOpsions[d][1])
              movingOpsions[k].pop();
          }
        }
      }
    }
  }
  return movingOpsions;
}*/