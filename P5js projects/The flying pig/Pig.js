
function Pig(){//יוצר עצם של חזיר
  this.x=200-32;//מיקום ה X ההתחלתי
  this.y=300-40;//מיקום ה Y ההתחלתי
  this.derection='right';//כיוון החזיר ההתחלתית
  this.gravity= 0.8 ;//כוח המשיכה על החזיר
  this.velocity=0;//מהירות החזיר
  this.lift=-23;////כמה הציפור עולה בכל לחיצה
  this.point=0;//כמות הנקודות של החזיר
  
  //פונקציה המציירת את החזיר לפי כיוונו ומצבו
  this.show=function(){
    if(game){//אם המשחק משוחק
      if(this.derection=='right'){//אם כיוון החזיר הוא ימינה
        image(rightPig,lastX,lastY,60,60);
      }
      else//אם כיוון החזיר הוא שמאלה
        image(leftPig,lastX,lastY,60,60);
    }
    else{//אם המשחק לא משוחק
      image(dedPig,lastX,lastY,60,60)
    }
  }
  
  // פונקציה המעדכנת את מיקומו של החזיר לפי כוח המשיכה ,מהירות והכיוון  
  this.update = function(){
    this.velocity+=this.gravity;//מהירות הציפור פלוס כוח הכבידה שמופעל עליה 
    this.velocity*=0.90;//הקטנת המהירות
    this.y+=this.velocity;//שינוי מיקום ה Y של הציפור
    if(this.derection=='right')//אם כיוון החזיר הוא ימינה
      this.x+=4;
    else//אם כיוון החזיר הוא שמאלה
      this.x-=4;
    lastX=this.x;//מעדכן את מיקומו האחרון
    lastY=this.y;//מעדכן את מיקומו האחרון
  }
  
  //מעיפה את החזיר למעלה
  this.up=function(){
    this.velocity+=this.lift;
  }
}