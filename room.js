class room{
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show(s){
    if(s == false){
      push()
      strokeWeight(0);
      fill(155)
      rect(this.x, this.y, this.w, this.h);
      pop();
    }
    else{
      push()
      strokeWeight(2);
      fill(155)
      rect(this.x, this.y, this.w, this.h);
      pop();
    }

  }



}
