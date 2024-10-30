var offsetX = 0,//הזזת הרקע
    keys,//כל התורות שהיו במשחק
    names,//השמות של הלידרבורד
    k1,//
    exit,//תמונה של יציאה להתחברות
    font,//צורת הכיתוב
    k2,//
    score1,//התוצאה של אחד השחקנים
    a,//
    score2,//התוצאה של אחד השחקנים
    saveUsername,//שומר את שם המשתמש של השחקן 
    highest,//התוצאה הכי גבוהה מבין השניים סקור1 וסקור2
    y,//מיקום הטבלה
    x,//מיקום הטבלה
    limit,//כמות המופעים בטבלת המובילים
    scores,//
    score,//
    bird,//הציפור
    points,//סאונד שכאשר המשצמש צובר נקודה
    bestscore=0,//
    hit,//ציליל כאשר הציפור מתה 
    wing,//צליל כאשר הציפור עפה
    pipes=[],//מערך של עצמים מסוג צינורות
    database,//
    login=true,//האם המשתמש רוצה להיכנס עם משתמש קיים
    create=false,//האם המשתמש רוצה ליצור משתמש
    code,//יצירת אינפוט
    username,//יצירת אינפוט
    sub,//כפתור הסאבמיט
    h,//שעה
    m,//דקות
    s,//שניות
    lestscoreinlid=0
    gameOn=false;//האם המשחק התחיל או שהמשתמש עדין בלוג אין או בכריאט יוזר
let pipeup,//תמונה של הצינור
    pipedoen,//תמונה של הצינור
    history=[],//המידע על היוזרים הקימים
    back,//רקע
    gif,//התמונה של הציפור
    userdata,//
    historysetup,//
    data,//
    count=0,//
    best=0,//
    sound=true,//האם המשתמש רוצה לשמוע את הסאונד או לא
    on,//תמונה של מוזיקה פועלת
    off,//תמונה של מוזיקה לא פועלת
    play,//תמונה של המשחק רץ
    pause,//תמונה של המשחק עצור
    stop=false,
    reff,
    hag;//תמונה של הגדרות
function preload(){
  back = loadImage("back.png");
  hag = loadImage("hag.png");
  pipedown = loadImage("pipeup.png");
  pipeup = loadImage("pipedown.png");
  points = loadSound("point.mp3");
  hit = loadSound("hit.mp3");
  wing = loadSound("wing.mp3");
  gif = loadImage("bird.gif");
  off = loadImage("nomusic.png");
  on = loadImage("music.png");
  play = loadImage("play.png");
  pause = loadImage("pause.png");
  font = loadFont("font.ttf");
  exit = loadImage("exit.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);//במקום מעלות הפאי -> מעלות במעלות
  datausers();
  textFont(font);//משנה את סוג הכתב לכבת שייבאתי
  code=createInput("Enter your password");//יוצר אינפוט לסיסמא
  code.style('background-color', 'silver');
  code.position(width/2-90, height/2+50);
  code.size(170);
  username=createInput("Enter your user name"); //יוצר אינפוט לשם משתמש
  username.style('background-color', 'silver');
  username.position(width/2-90, height/2+100);
  username.size(170);
  sub=createButton('Submite');//יוצר כפתור סאבמיט
  sub.style('background-color', 'gold');
  sub.position(width/2-90,height/2+150);
  sub.size(170);
  bird=new Bird();//יוצר ציפור חדשה
}
function draw() {
  if(gameOn){//אם התחיל המשחק
    if(sound){
       hit.setVolume(0.05);
       points.setVolume(0.05);
       wing.setVolume(0.05);
    }
    else{
       hit.setVolume(0);
       points.setVolume(0);
       wing.setVolume(0);
    }
    removeElements();//מוחק את כול הכפתורים והאינפותים
    image(back, offsetX, 0, width, height);//מצייר את הרקע
    image(back, offsetX+width, 0, width, height);//מצייר את הרקע
    offsetX--;//מזיז את הרקע
    if(offsetX <= -width){//אם הרקע יציא מהמסך מחזיר אותו למסך
 	  offsetX = 0;	
    }
    textSize(7);
    noStroke();
    fill(255);//צבע לבן
    text("\nTo see operating instructions double Click\n  on the mark of the settings OR prees \"I\"",2,0);
    bird.update();//מעדכן את מיקום הציפור
    bird.show();//מצייר את הציפור
    if((bird.y>height*2-bird.m)||(bird.y<0+bird.m)){//אם הציפור נגעה בקצבות המסך
      data={//המידע של השחקן
        name:saveUsername,//שם השחקן
        score:count//הציון שלו
      }
      if(count>lestscoreinlid){
         reff.push(data);//מוסיף את המידע לסקורז
      }
      bird.y=height;//מאפס את מיקום הציפור לאמצע המסך
      end();//מזמן את פעולת הסיום
      reff.on('value',getdata,errData);//מיבא את המידע על הציונים
      pipes=[];//מחיקת כל הצינורות
      hit.play();//צליל פגיעה
    }
    for(var i=pipes.length-1;i>=0;i--){//לכל הצינורות
      if(pipes[i]){
        pipes[i].show();//מצייר את הצינור
        pipes[i].update();//מעדכן את מיקום הצינורות
        if((pipes[i].hits(bird))){//בודק האם הציפור פגעה בצינור
          data={//המידע של השחקן
            name:saveUsername,//שם המשתמש של השחקן
            score:count//הציון שהשיג
          }
          if(count>lestscoreinlid){
            reff.push(data);//מוסיף את המידע לסקורז
          }
          bird.y=height;//מאפס את מיקום הציפור לאמצע המסך
          end();//מזמן את פעולת הסיום
          reff.on('value',getdata,errData);//מיבא את המידע על הציונים
          pipes=[];//מחיקת כל הצינורות
          hit.play();//צליל פגיעה
        }
        else{//אם הציפור לא פגעה בצינור
          if(pipes[i].x<=bird.x/2-pipes[i].w-bird.m&&pipes[i].x>=bird.x/2-pipes[i].w-bird.m-3){//אם הציפור עברה את הצינור
            count++;//מתבסף נקודה
            if(best<=count){//אם כמות הנדוקות גדולה יותר מהציון המקסימלי אז הציון המקסימלי שווה לנדוקות
              best=count;
            }
            points.play();//הסאונד של צבירת נקודה
          }
        }
        if(count>0&&pipes[i].offscreen())//אם הצינור מחוץ למסך
          pipes.splice(i,1);//מחוק את הצינור
        }
      }
      if(frameCount%105==0){//כל כמות פריימים מתבסף צינור
        pipes.push(new Pipe());
      }
      textSize(64);
      stroke(255);//צבע לבן
      strokeWeight(3);
      fill("purple");//צבע סגול
      text(count,width/2-55,64);//מצייר את כמות הנקודות
      textSize(6);
      strokeWeight(1);
      stroke("purple");//צבע סגול
      fill(255);//צבע לבן
      text("your best score is :"+best,width-100,22);//מצייר את הציון הכי גבוהה שלך
      image(exit,10,35,30,30);
      if(sound){//אם המשתמש רוצה לשמוע סאוד
        image(on,width-35,35,30,30);//מצייר את התמונה של הסאונד
      }
      else{
        image(off,width-35,35,30,30);//מצייר את התמונה של הלא סאונד
      }
      if(stop){//אם המשתמש עצר את המשחק
        noLoop();
        fill(250,255,150);
        stroke(250,240,150);
        strokeWeight(10);
        rect(width/2-200,height/2,400,200,15);//מצייר מלבן
        textSize(12);
        fill(250,200,0);
        stroke(0);
        strokeWeight(2);
        text("                                      Your score was: "+count+"\n                                 Your best score was:"+best+"\n  To continue press \"space\"/one finger tap",width/2-200,height/2+80);//מצייר את התוצאה שלך ,התוצאה הכי גדולה שלך,איך להמשיך לשחק
        textSize(36);
        fill(250,200,0);
        stroke(0);
        strokeWeight(2);
        mousePressed();
        image(pause,width-70,35,30,30);//מצייר את התמונה של המשחק עצור
        stop=false;//מחזיר את המשחק לפעולה
      }
      else{//אם המשחק לא עצור
        image(play,width-70,35,30,30);//מצייר את הסימון של המשחק בהתמששות
      }
        image(hag,width-105,35,30,30);//מצייר את הסימון של ההגדרות
  }
  else{//השחקן עוד לא התחבר למערכת
    background(back)//הרקע
    fill(0);//צבע שחור
    textSize(36);
    if(login){//אם השחקן רוצה להתחבר
      if(mouseX>width/2-300&&mouseX<width/2+300&&mouseY>height/2+150&&mouseY<height/2+170&&touches.length===1||(keyCode==ENTER)){
        if(chekLogin()){//אם יש משתמש כזה
          textSize(10);
          fill("purple");
          text("                                                Login confirmed\npress \"spece\"/\"w\"/\"up arrow\"/one finger tap to start",width/2-200,height/2-120);//מצייר את הכיתוב הכניסה אושרה       code.style('background-color', 'green');//צובע את הטקסט בירוק לאישור
          username.style('background-color', 'green');//צובע את הטקסט בירוק לאישור
          code.style('background-color', 'green');//צובע את הטקסט בירוק לאישור
          saveUsername=username.value();//שומר את השם משתמש של השחקן
          gameOn=true;//מתחיל את המשחק
          noLoop();
          textSize(10);
        }
        else{
          noLoop();
          textSize(6);
          fill("red");
          text("Your password or your user name are not corect",width/2-120,height/2+80);//מצייר את הכיתוב שמשהו לא בסדר
          code.style('background-color', 'red');//צובע את הטקסט באדום לטעות
          username.style('background-color', 'red');//צובע את הטקסט באדום לטעות
        }
      }
      fill('green')//צבע ירוק
    }
    else{
      fill('red');//צבע אדום
    }
    textSize(36);
    text("Login",width/2-80,height/2-50);//מצייר את הטקסט של הלוג אין
    if(login){
      fill('red');
    }
    else{
      if((mouseX>0&&mouseX<width/2+300&&mouseY>height/2+150&&mouseY<height/2+170&&touches.length===1)||(keyCode==ENTER)){      
        if(chek()){//אם אין כזה משתמש ואין כזו סיסמא
          if(username.value().length<7){//אם האורך של השם משתמש לא יותר מ 6 אותיות
            history.push(new User(code.value(),username.value()));//יוצר משתמש חדש ומכניס אותו להיסטוריה
            reff=database.ref('users');
            reff.push(history[history.length-1]);//מכניס אותו לזיכרון
            code.style('background-color', 'green');//צובע את הטקסט בירוק לאישור
            username.style('background-color', 'green');//צובע את הטקסט בירוק לאישור
            saveUsername=username.value();//שומר את השם משתמש של המשתמש
            gameOn=true;//מתחיל את המשחק
            datausers();
            noLoop();
            textSize(10);
            fill("purple")
            text("                                                     A new user add \npress \"spece\"/\"w\"/\"up arrow\"/one finger tap to start",width/2-200,height/2-120);//מצייר טקסט שאומר שהכול עבר כשורה ונוסף משתמש חדש
          }
          else{//אם האורך יותר מ 6 אותיות
            noLoop();
            code.style('background-color', 'red');//צובע את הטקסט באדום לשגיאה
            username.style('background-color', 'red');//צובע את הטקסט באדום לשגיאה
            textSize(6);
            fill("red");
            text("Make sure your user name no longer then 6 chars",width/2-120,height/2+80);//מציין את הטעות
          }
        }  
        else{//אם יש כבר משתמש כזה
          noLoop();
          code.style('background-color', 'red');//צובע את הטקסט באדום לשגיאה
          username.style('background-color', 'red');//צובע את הטקסט באדום לשגיאה
          textSize(6);
          fill("red");
          text("The password or The user name already been used",width/2-120,height/2+80);//מציין את הטעות
        }
      }
      fill('green');
    }
    frameRate(255);
    textSize(36);
    text("Create user",width/2-170,height/2+20);
  }
  h=hour();
  if(h<10){
    h='0'+h;
  }
  m=minute();
  if(m<10){
    m='0'+m;
  }
  s=second();
  if(s<10){
    s='0'+s;
  }
  textSize(12);
  fill('blue');
  noStroke(0);
  text(h+":"+m+":"+s,width-90,10);
}
function keyPressed(){
  if(gameOn){//אם המשחק התחיל
    if(key=='i'||key=='I'||key=='ן'){//אם השחקן לחץ לראות את ההוראות
      instructions();//ציור ההוראות
    }
    if(key==' '||key=='w'||key=='W'||keyCode==UP_ARROW){//אם השחקן לחץ להעלות את הציפור
      bird.up();//ציפור עולה
      loop();
      wing.play();
    }
    if(key== 's'||key=='ד'||key=='S'){//אם השחקן רוצה לעצור
      if(stop){//אם המשחק כבר עצור
        stop=false;//המשחק ממשיך
      }
      else{
        stop=true;//המשחק נעצר
      }
    }
    if(key=='m'||key=='צ'||key=='M'){//אם השחקן רוצה להשתיק
      if(sound){//אם המשחק עם סאונד
        sound=false;//משתיק משחק
      }
       else{
        sound=true;//מוסיף סאונד
      }
    }
    if(key=='e'||key=='E'||key=='ק'){
      gameOn=false;
      setup();
      loop();      
    }
  }
  else{
    if(keyIsPressed||mouseIsPressed){
      loop();
    }
  }
}
function mousePressed(){
  if(gameOn){//אם המשחק פועל
    if(touches.length==1){//אם יש נגיעה במסך
      if(mouseX>width-35&&mouseX<width-5&&mouseY>35&&mouseY<65){//אם הנגיעה באזור של הסאונד
        if(sound){//אם המשחק עם סאונד
          sound=false;//משתיק משחק
        }
        else{
          sound=true;//מוסיף סאונד
        }
      }
      else{
        if(mouseX>width-70&&mouseX-40&&mouseY>35&&mouseY<65){//אם הנגיעה באזור של הפאוז
          if(stop){//אם המשחק כבר עצור
            stop=false;//המשחק ממשיך
          }
          else{
            stop=true;//המשחק נעצר
          }
        }
        else{
          if(mouseX>width-105&&mouseX<width-75&&mouseY>35&&mouseY<65){//אם הנגיעה באזור של ההוראות
            instructions();//ציור ההוראות
          }
          else{
            if(mouseX>=width-95&&mouseX<=width&&mouseY>80&&mouseY<=110){
              noLoop();
            }
            else{
              if(mouseX>10&&mouseX<40&&mouseY>35&&mouseY<65){
                count=0;
                best=0;
                pipes=[];
                gameOn=false;
                bird=new Bird();
              }
              else{//אחרת
                loop();
                bird.up();//ציפור עולה
                wing.play();//סאונד של ציפור עפה
              }
            }
          }
        }
      }
    }
  }
  else{//אם המשחק לא מתממש
    if(touches.length==1){//אם המשתמש לוחץ על המשחק
      loop();//תריץ את הקוד
      code.style('background-color', 'silver');
      username.style('background-color', 'silver');
    }
    if(mouseX>width/2-80&&mouseX<width/2+50&&mouseY>height/2-100&&mouseY<height/2-50){//אם המשתמש לוחץ באזור של הלוג אין
      removeElements();//חוק את כול האלמנטים
      login=true;
      create=false;
      code=createInput("Enter your password");//יוצר אינפוט לסיסמא
      code.style('background-color', 'silver');
      code.position(width/2-90, height/2+50);
      code.size(170);
      username=createInput("Enter your user name");//יוצר אינפוט לשם משתמש
      username.style('background-color', 'silver');
      username.position(width/2-90, height/2+100);
      username.size(170);
      sub=createButton('Submite');//יוצר כפתור סאבמיט
      sub.style('background-color', 'gold');
      sub.position(width/2-90, height/2+150);
      sub.size(170); 
    }
    else{
      if(mouseX>width/2-135&&mouseX<width/2+165&&mouseY>height/2&&mouseY<height/2+30){//אם הלחיצה באזור של היצירת משתמש
        login=false;
        create=true;
        removeElements();//מוחק את כול האלמנטים
        code=createInput("Create password");//יוצר אינפוט לסיסמא
        code.style('background-color', 'silver');
        code.position(width/2-90, height/2+50);
        code.size(170);
        username=createInput("Create user name"); //יוצר אינפוט לשם משתמש
        username.style('background-color', 'silver');
        username.position(width/2-90, height/2+100);
        username.size(170);
        sub=createButton('Submite');//יוצר כפתור סאבמיט
        sub.style('background-color', 'gold');
        sub.position(width/2-90,height/2+150);
        sub.size(170);
      }
    }
  }
}
function end(){//פעולה כאשר השחקן נפסל
  noLoop();
  fill(250,255,150);
  stroke(250,240,150);
  strokeWeight(10);
  rect(width/2-200,height/2,400,200,15);
  textSize(9);
  fill(250,200,0);
  stroke(0);
  strokeWeight(1);
  text("                                                          Your score was: "+count+"\n                                                   Your best score was:"+best+"\n To continue press \"spece\"/\"w\"/\"up arrow\"/one finger tap",width/2-200,height/2+20);
  textSize(36);
  fill(250,200,0);
  stroke(0);
  strokeWeight(2);
  text("Game Over",width/2-135,height/2-75);
  count=0;//מאפס את הנקודות
}
function instructions(){//כאשר השחקן לוחץ על ההוראות
  noLoop();
  fill(120,210,255)
  rect(width/2-190,height/2-100,390,120)
  textSize(9);
  noStroke();
  fill(0);
  text("\n  To JAMP press \"spece\"/\"w\"/\"up arrow\"/one finger tap\n  To START press \"spece\"/\"w\"/\"up arrow\"/one finger tap\n  To STOP press double \"s\"/Press on the switch\n  To MUTE press \"m\"/Press on the switch\n  To UNMUTE press \"m\"/Press on the switch \n To go back to the login press \"E\"",width/2-180,height/2-60);
  textSize(18);
  fill(255,0,0);
  text("Operating Instructions:",width/2-170,height/2-70);
}
function getdata(data){//יבוא המידע
  scores=data.val();
  keys= Object.keys(scores);
  for(let i=0;i<keys.length;i++){//
    for(let j=0;j<keys.length-1-i;j++){//סידור המידע בסדר יורד
      k1=keys[j];
      k2=keys[j+1];
      score1=scores[k1].score
      score2=scores[k2].score
      if(score1>=score2){
        highest=keys[j];
        keys[j]=keys[j+1];
        keys[j+1]=highest;
      }
    }
  }
  y=height/2+100;
  x=width/2-190;
  limit=keys.length-20;
  if(limit<0){
    limit=0;
  }
  for(let i=keys.length-1;i>=limit;i--){
    k1=keys[i];
    if(y>height/2+100+90){
      x+=99;
      y=height/2+100;
    }
    names=scores[k1].name;
    score=scores[k1].score;
    noStroke();
    if(Math.abs(i-keys.length)==1){
      fill("gold");
    }
    else{
      if(Math.abs(i-keys.length)==2){
        fill("silver");
      }
      else{
        if(Math.abs(i-keys.length)==3){
          fill(176,141,87);
        }
        else{
          fill(0);
        }
      }
    }
    if(Math.abs(i-keys.length)==20){
      lestscoreinlid=score;
    }
    textSize(7);
    text(Math.abs(i-keys.length)+". "+names+" : "+score,x,y);
    y+=20;
  }
  fill("purple");
  textSize(20);
  text("Liderbord top 20",width/2-140,height/2+70)
}
function errData(err){
  console.log("!error");
  console.log(err);
}
function chek(){//בודק יצירת משתמש
  for(let i=0;i<history.length;i++){
    if(history[i].password==code.value()||history[i].username==username.value()){//אם יש שם משתמש כזה או סיסמא כזאת
      return false;
    }
  }
  return true;
}
function chekLogin(){//בודק כניסה בלוגאין
  for(let i=0;i<history.length;i++){
    if(history[i].password==code.value()&&history[i].username==username.value()){//אם יש גם סיסמא כזאת וגם שם משתמש כזה
      return true;
    }
  }
  return false;
}
function datausers(data){//האינפורמציה על היוזרים
  history=[];
  database=firebase.database();//
  reff=database.ref('scores');// משייך את המשתנה לכרטיסיה של סקורז
  var ref = firebase.database().ref('users');//מ יבא את כל המידע ששמור בFIREBASE 
  ref.once('value', gotData1, errData);//מיבא את כל המידע ששמור בFIREBASE
  function gotData1(data){//
    userdata = data.val();//כל היוזרים הקימים
    historysetup = Object.keys(userdata);//מסדר את כול היוזרים הקיימים במערך
    for(var i = 0; i< historysetup.length; i++){//שומר את המידע בהיסטוריה
      var k = historysetup[i];//
      var p = userdata[k].password;//הסיסמא של המשתמש
      var name = userdata[k].username;//השם משתמש של המשתמש
      history.push(new User(p,name));//יוצר יוזר חדש ומכניס אותו לתוך ההיסטוריה
    } 
  }
}