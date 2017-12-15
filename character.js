class character {
  constructor(n, x, y) {
    this.name = n;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;

  }

  show() {
    push();
    strokeWeight(9);
    stroke(255,0,0);
    point(this.x, this.y);
    pop();
  }

  move(x,y){
    this.x += this.vx;
    this.y += this.vy;

  }

  setMove(k, b) {

    switch (k) {
    case UP_ARROW:
      if(b){
        this.vy = -1
      }
      else{
        this.vy = 0
      }
      break;
    case DOWN_ARROW:
      if(b){
        this.vy = 1
      }
      else{
        this.vy = 0
      }
      break;
    case LEFT_ARROW:
      if(b){
        this.vx = -1
      }
      else{
        this.vx = 0
      }
      break;
    case RIGHT_ARROW:
      if(b){
        this.vx = 1
      }
      else{
        this.vx = 0
      }
      break;
    default:
      return b;
    }
  }

}
