function Bird() {
  this.y=height;//מיקום ה Y של הציפור
  this.gravity= 2 ;//כוח המשיכה על הציפור
  this.velocity=0;//מהירות הציפור
  this.lift=-55;////כמה הציפור עולה בכל לחיצה
  this.r=43.75;//רוחב הציפור
  this.m=32;//אורך הציפור
  this.x=width-this.r/2;//מיקום ה X של הציפור
  this.show=function(){
    if(this.velocity<7){//אם המהירות קטנה מ 7 אז הציפור מסתכלת למעלה
      push();
      translate(this.x/2,this.y/2);//מתרגם לאמצע הציפור
      rotate(-45);
      imageMode(CENTER);
      image(gif,0,0,this.r,this.m)
      pop();
    }
    else {//הציפור מתחילה להסתכל למטה
      push();
      translate(this.x/2,this.y/2)//מתרגם לאמצע הציפור
      rotate(-144+this.velocity*12);//סיבוב הציפור כלפי מטה
      imageMode(CENTER);
      image(gif,0,0,this.r,this.m);
      pop();    
    }
  }
  this.update = function(){
    this.velocity+=this.gravity;//מהירות הציפור פלוס כוח הכבידה שמופעל עליה 
    this.velocity*=0.91;//הקטנת המהירות
    this.y+=this.velocity;//שינוי מיקום ה Y של הציפור
  }
  this.up=function(){
    this.velocity+=this.lift;
  }
}