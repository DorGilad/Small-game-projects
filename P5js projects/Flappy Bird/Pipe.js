function Pipe(){
  this.x=width;//מיקום ה X
  this.w=90;//רוחב הצינור
  this.speed=3;//מהירות הצינור
  this.spp=height-(count)*(height/60);//המרחב המקסימלי בין שני הצינורות 
  if(this.spp<160){//המרחב המקסימלי לא יכול להיות קטן מ 170
    this.spp=160;
  }
  this.sp=random(this.spp,140);//המרחב בין שני הצינורות
  this.top=random(height-this.sp-50,50);//מיקום הצינור שמסתכל למעלה
  this.bottom=height-this.sp-this.top;//מיקום הצינור שמסתכל למטה
  this.highlight=false;
  this.hits= function(){//אם הציפור פגעה בצינורות
    if((bird.y/2)<this.top+bird.m/2||(bird.y/2)>this.sp+this.top-bird.m/2){
      if(bird.x/2-10>this.x-bird.r/2&&bird.x/2+10<this.x+this.w+bird.r/2){
        return true;
      }
    }
    return false; 
  }
  this.show=function(){//ציור הצינורות
    image(pipedown,this.x,0,this.w,this.top);
    image(pipeup,this.x,height-this.bottom,this.w,this.bottom);
  }
  this.update=function(){//הזזת הצינורות במהירות
    this.x-=this.speed;
  }
  this.offscreen =function(){//אם הצינור יצאה מהמסך
    if(this.x<-this.w) {
      return true;
    }
    else {
      return false;
    }
  } 
}