class character {
  constructor(n) {
    this.name = n;
    this.vx = 0;
    this.vy = 0;
    this.health = 100;
    this.attack = 1;
    this.defence = 0;

  }

  show() {
    push();
    strokeWeight(8);
    stroke(255,0,0);
    rectMode(CENTER)
    rect(this.x, this.y, 2, 2);
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
        this.vy = -4
      }
      else{
        this.vy = 0
      }
      break;
    case DOWN_ARROW:
      if(b){
        this.vy = 4
      }
      else{
        this.vy = 0
      }
      break;
    case LEFT_ARROW:
      if(b){
        this.vx = -4
      }
      else{
        this.vx = 0
      }
      break;
    case RIGHT_ARROW:
      if(b){
        this.vx = 4
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

  wallCollision(){
    let c = get(this.x+this.vx, this.y+this.vy);
    return (c[0] === 155 && c[1] === 155 && c[2] === 155);
  }

  showStats(){
    return (this.name + "<br />Heath: " + this.health + "<br />Attack: " + this.attack + "<br />Defence: " + this.defence);
  }

  takeDamage(d){
    if(this.health > 0){
      this.health -= d;
    }
    
  }

}
