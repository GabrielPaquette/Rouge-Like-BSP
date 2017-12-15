class character {
  constructor(n) {
    this.name = n;
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

  //finds a random room and sets the
  //player inside of it as starting location
  setStartingPosition(root){
    let startingRoom = root.getRoom();
    this.x = ceil(random(startingRoom.x + 10, startingRoom.x + startingRoom.w - 20));
    this.y = ceil(random(startingRoom.y + 10, startingRoom.y + startingRoom.h - 20));
  }

}
