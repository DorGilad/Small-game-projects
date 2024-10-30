function Cell(i,j){
  this.i=i;
  this.j=j;
  this.walls=[true,true,true,true];
  this.visited = false;
  this.visitedRoute=false;
  this.show = function(){
    var x=this.i*w;
    var y=this.j*w;
    if(this.visited){
      stroke('silver');
      fill('silver');
      rect(x,y+space,w,w);
    }
    stroke(0);
    strokeWeight(2);
    if(this.walls[0]){
      line(x,y+space,x+w,y+space);
    }
    if(this.walls[1]){
      line(x+w,y+space,x+w,y+w+space);
    }
    if(this.walls[2]){
      line(x+w,y+w+space,x,y+w+space);
    }
    if(this.walls[3]){
      line(x,y+w+space,x,y+space);
    }
  }
  this.checkNeighbors = function(){
    var neighbors=[];
    var top=grid[index(i,j-1)];
    var right=grid[index(i+1,j)];
    var bottom=grid[index(i,j+1)];
    var left=grid[index(i-1,j)];
    
    if(top &&!top.visited){
      neighbors.push(top);
    }
    if(right&&!right.visited){
      neighbors.push(right);
    }
    if(bottom &&!bottom.visited){
      neighbors.push(bottom);
    }
    if(left &&!left.visited){
      neighbors.push(left);
    }
    
    if(neighbors.length>0){
      var r = floor(random(0,neighbors.length));
      return neighbors[r];
    }
    else{
      return undefined;
    }
  }
  this.checkRoute=function(){
    var neighbors=[];
    var top=grid[index(i,j-1)];
    var right=grid[index(i+1,j)];
    var bottom=grid[index(i,j+1)];
    var left=grid[index(i-1,j)];
    
    if(top &&!this.walls[0]&&!top.visitedRoute){
      neighbors.push(top);
    }
    if(right&&!this.walls[1]&&!right.visitedRoute){
      neighbors.push(right);
    }
    if(bottom &&!this.walls[2]&&!bottom.visitedRoute){
      neighbors.push(bottom);
    }
    if(left &&!this.walls[3]&&!left.visitedRoute){
      neighbors.push(left);
    }
    if(neighbors.length>0){
      var r = floor(random(0,neighbors.length));
      return neighbors[r];
      
    }
    else{
      return undefined;
    }
  }
}