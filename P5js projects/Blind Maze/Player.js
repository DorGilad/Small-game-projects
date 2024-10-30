function Player(i,j){
  this.i=i;
  this.j=j;
  this.r=w/2
  this.show=function(){
    noStroke();
    fill('red');
    rect(this.i*w+this.r/2,this.j*w+this.r/2+space,this.r,this.r,30);
    
  }
}