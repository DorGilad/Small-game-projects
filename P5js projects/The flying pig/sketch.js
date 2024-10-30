var leftPig,//תמונה של חזיר עף שמאלה
    rightPig,//תמוה של חזיר עף ימינה
    pig,//החזיר
    spikes,//מיקום ה -y של הקוצים בצדדים
    amountOfSpikes,//לפי מספר הנקודות - כמות הקוצים בכל שלב
    bestScore,//התוצאה הכי טובה
    gamesPlayed,//כמות המשחקים ששוחקו
    lastScore,//התוצאה במשחק האחרון
    game=true,//האם המשק פועל או לא
    lastX,//מיקום ה X האחרון של החזיר
    lastY,//מיקום ה Y האחרון של החזיר
    dedPig,//תמונה של חזיר מת
    colors,//מערך ששומר את הצבעים של הרקע בכל רמה 
    colorPlace=0,//מיקום הצבע במערך הצבעים - לפי מספר הנקודות
    backTrak,//שלושת המקומות האחרונים שבהן היה החזיר
    snort,//צליל של נחירה של חזיר
    backGround,//מוזיקת רקע
    died,//צליל של חזיר מת
    points;//צליל של הרווחת נקודה
//מוריד את כל התמונות והצלילים
function preload(){
  leftPig=loadImage("leftPig.png");
  rightPig=loadImage("rightPig.png");
  dedPig=loadImage("dedPig.png");
  snort=loadSound("Snort2.mp3");
  backGround=loadSound("backGround.mp3");
  died=loadSound("died.mp3");
  points=loadSound("point2.mp4");
}

//פעולת הכנה למשחק
function setup() {
  textAlign(CENTER,CENTER);//מסדר את הטקסט באמצע
  createCanvas(400, 600);//יוצר קנווס
  pig = new Pig();//יוצר את החזיר
  spikes=[];//יוצר את המערך של הקוצים
  backTrak=[[-100,-100],[-100,-100],[-100,-100]];//יוצר שלושה מקומות של החזיר
  colors=[[110,110,110,170,170,170],[0,204,204,204,255,255],[255,51,153,255,204,229],[153,51,255,204,204,255],[255,128,0,255,229,204],[0,204,0,204,255,204],[255,0,0,255,204,204]];//מערך הצבעים , קהים הם השלושה הראשונים בכל מערך פנימי והבהירים הם השלושה האחרונים
  amountOfSpikes=[1,2,3,4,5,6,7,8,9,10];//כמות הקוצים בכל שלב
  bestScore=0;// מאתחל את התוצאה הכי טובה
  gamesPlayed=0;//מאתחל את כמה משחקים שוחקו
  lastScore=0;//מאתחל את התוצאה האחרונה
  lastX=pig.x;//מאתחל את המיקום האחרון של החזיר 
  lastY=pig.y;//מאתחל את המיקום האחרון של החזיר
  //מסדר את הוליום של כל אחד מהצלילים
  backGround.setVolume(0.7);
  snort.setVolume(1);
  points.setVolume(0.5);
  died.setVolume(0.5);
  //ניגון מוזיקת הרקע
  //backGround.play();
  noLoop();
}

//מצייר את שלושת המקומות האחרונים שהחזיר היה בהם
function showBackTrak(){
  for(let i=0;i<backTrak.length;i++){
    noFill();
    stroke(colors[colorPlace][0],colors[colorPlace][1],colors[colorPlace][2],(i+1)*30);
    if(pig.derection=='left'){
      circle(backTrak[i][0]+60,backTrak[i][1]+60,15-(i*5));
    }
    else{
      circle(backTrak[i][0],backTrak[i][1]+60,15-(i*5));
    }
  }
}

//פעולה הרצה 60 פעמים בשנייה ותמיד מופעלת זוהי בעצם הפונקציה העיקרית
function draw() {
  // if(!backGround.isPlaying()){//אם מוזיקת הרקע לא מתנגנת אז נגן אותה
  //   backGround.play();
  // }
  colorPlace=floor(lastScore/6);//מיקום הצבע במערך הצבעים לפי מספר הנקודות
  back();//מצייר את הרקע
  pig.show();//מצייר את החזיר לפי מיקומו ומצבו
  textSize(20);
  fill(0);
  text("FPS: "+round(frameRate()),40,18);//מראה את ה FPS
  if(game){//אם המשחק בהתממשות
    if(frameCount%4==0){//כל 4 פריימים מעדכן את שלושת המיקומים האחרונים של החזיר
      backTrak.splice(0,1);
      backTrak.push([lastX,lastY]);
    }  
    showBackTrak();//מצייר את שלושת המיקומים האחרונים של החזיר
    if(!failed()){//אם החזיר לא נפסל
      pig.update();//מעדכן את מיקומו
    }
    else{//אם החזיר נפסל
      gamesPlayed++;//מעדכן את כמות המשחקים ששחקו
      died.play();//משמיע את הסאונד של חזיר מת
      endGame();//מצייר מסך סיום המשחק 
    }
    if(pig.x>340){//אם החזיר פגע בקיר הימני
      pig.point++;//נוספת נקודה
      points.play();// משמיע צליל של הרווחת נקודה
      lastScore=pig.point;//מערכן את התוצאה האחרונה של החזיר
      pig.derection='left';//משנה את כיוון החזיר
      createSpikes();//יוצר קוצים חדשים
      backTrak=[[-100,-100],[-100,-100],[-100,-100]];//מאתחל את שלושת המיקומים האחרונים של החזיר
    }
    if(pig.x<0){//אם החזיר פגע בקיר השמאלי
      pig.point++;//נוספת נקודה
      points.play();// משמיע צליל של הרווחת נקודה
      lastScore=pig.point;//מערכן את התוצאה האחרונה של החזיר
      pig.derection='right';//משנה את כיוון החזיר
      createSpikes();//יוצר קוצים חדשים
      backTrak=[[-100,-100],[-100,-100],[-100,-100]];//מאתחל את שלושת המיקומים האחרונים של החזיר
    }
  }
  else{//אם המשחק לא משוחק
    endGame();//מצייר את מסך סיום המשחק
  }
}

//אם המשתמש לחץ על המסך אז הפונקציה הזאת תרוץ פעם אחת כל לחיצה
function touchStarted(){
  game=true;//המשחק התחיל
  loop();
  if(touches.length===1){//אם יש לחיצה על המשחק עם אצבע אחת
    pig.up();//חזיר עף
    if(!snort.isPlaying()){
      snort.stop();
      snort.play();//משמיע את צליל הנחירה
    }
  }
}

//מסך סיום המשחק
function endGame(){
  game=false;//המשחק הסתיים
  fill(colors[colorPlace][0],colors[colorPlace][1],colors[colorPlace][2]);
  noStroke();
  textSize(32);
  if(lastScore>bestScore)//מעדכן את הצותאה הכי טובה
    bestScore=lastScore;
  text("Best score : "+bestScore,200,485);//מצייר את התוצאה הכי טובה
  text("Games played : "+gamesPlayed,200,525);//מצייר את כמות המשחקים ששוחקו
  pig=new Pig();//יוצר חזיר חדש
  spikes=[];//מאפס את מערך הקוצים
  fill('green');
  textSize(24);
  text("Tap the screen to \nSTART",200,100);//מצייר הוראות
}

//האם החזיר נפסל
function failed(){
  if(pig.y>=500||pig.y<=23)//אם החזיר פגע בקוצים למעלה או למטה
    return true;
  if(pig.derection=='right'){//אם הכיוון של החזיר הוא ימינה
    for(let i=0;i<spikes.length;i++){//לכל מערך הקוצים
      if(((pig.y+30>spikes[i]&&pig.y+30<spikes[i]+30)&&(pig.x+60>380&&pig.x+60<400))||((pig.y+37.5>spikes[i]&&pig.y+37.5<spikes[i]+30)&&(pig.x+60>380&&pig.x+60<400)))//אם החזיר פגע באחד בקוץ
          return true;  
    }
  }
  else{
    for(let i=0;i<spikes.length;i++){//לכל מערך הקוצים
      if(((pig.y+30>spikes[i]&&pig.y+30<spikes[i]+30)&&(pig.x>0&&pig.x<10))||((pig.y+37.5>spikes[i]&&pig.y+37.5<spikes[i]+30)&&(pig.x>0&&pig.x<20)))//אם החזיר פגע באחד בקוץ
          return true;  
    }
  }
  return false;
}

//ציור הרקע של המשחק
function back(){
  background(colors[colorPlace][3],colors[colorPlace][4],colors[colorPlace][5]);//מצייר את הרקע
  //מצייר את העיגול באמצע
  noStroke();
  fill(255);
  circle(200,300,300);
  //מצייר את הקוצים למעלה ולמטה
  fill(colors[colorPlace][0],colors[colorPlace][1],colors[colorPlace][2]);
  rect(0,570,400);
  rect(0,0,400,30);
  for(let i=30;i<=330;i+=60){
    triangle (i,30,i+20,45,i+40,30);
    triangle (i,570,i+20,555,i+40,570);
  } 
  //מצייר את התוצאה באמצע העיגול
  textSize(192);
  fill(colors[colorPlace][3],colors[colorPlace][4],colors[colorPlace][5]);
  if(lastScore<10)
    text(lastScore,200,310);
  else
    text(lastScore,200,310);
  //מצייר את הקוצים בצדדים
  showSpikes();
}

//אם המשתמש לחץ על איזשהו מקש אז הפעולה הזאת תעבוד פעם אחת לכל לחיצה
function keyPressed(){
  game=true;//המשחק מתחיל
  loop();
  if(keyIsPressed){//אם מקש נלחץ
    if(!snort.isPlaying()){
      snort.stop();
      snort.play();//משמיע את צליל הנחירה
    }
      pig.up();//חזיר עף
  }
}

//יוצר את מערך הקוצים
function createSpikes(){
  spikes=[];//מאפס את מערך הקוצים
  let y;//משתנה אשר מקבל מיקום Y ראנדומלי של הקוץ
  let amount=floor(pig.point/4);//כמות הקוצים לפי מספר הנקודות
  if(amount>9)//אם כמות הקוצים גדולה מ 9 אז היא תהיה 9
    amount=9;
  for(let i=0;i<amountOfSpikes[amount];i++){//לכל כמות הקוצים
    y=random(67.5,532.5);//בוחר מיקום Y ראנדומלי
    while(onTop(y)){//כל עוד יש במיקום הזה כבר קוץ
      y=random(67.5,532.5);//בוחר מיקום חדש אחר
    }
    spikes.push(y);//מוסיף את המיקום למערך הקוצים
  }
}

//מצייר את הקוצים
function showSpikes(){
  fill(colors[colorPlace][0],colors[colorPlace][1],colors[colorPlace][2]);
  let amount=floor(pig.point/4);//כמות הקוצים לפי מספר הנקודות
  if(amount>9)//אם כמות הקוצים גדולה מ 9 אז היא תהיה 9
    amount=9;
  if(spikes.length>0)//אם אורך המערך גדול מ 0
    if(pig.derection=='right'){//אם כיוון החזיר הוא ימינה
      for(let i=0;i<amountOfSpikes[amount];i++){//לכל כמות הקוצים
        triangle (400,spikes[i],380,spikes[i]+15,400,spikes[i]+30);//מצייר את הקוץ
      }
    }
    else{//אם כיוון החזיר הוא שמאלה
      for(let i=0;i<amountOfSpikes[amount];i++){//לכל כמות הקוצים
        triangle (0,spikes[i],20,spikes[i]+15,0,spikes[i]+30);//מצייר את הקוצים
      }
    }  
}

//בודק האם המיקום של הקוץ נמצא במיקום של קוץ אחר
function onTop(y){
  for(let i=0;i<spikes.length;i++){//לכל מערך הקוצים
    if(y>=spikes[i]-30&&y<=spikes[i]+30)//האם הקוץ נמצא על קוץ שכבר במערך
      return true;
  }
  return false;
}