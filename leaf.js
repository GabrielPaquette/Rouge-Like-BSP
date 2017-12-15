class leaf {
  constructor(x, y, w, h, generation, maxGen) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.gen = generation;
    this.maxGen = maxGen;
    this.left = null
    this.right = null;
    this.room = null;
    this.halls = [];
  }

  splitLeaf() {
    if(this.gen < this.maxGen){

      //0 for left to right
      //1 for top to bottom
      let splitDirection;
      // determine direction of split
      // if the width is >25% larger than height, we split vertically
      // if the height is >25% larger than the width, we split horizontally
      if (this.w > this.h && this.w / this.h >= 1.25){
        splitDirection = 1;
      }
      else if (this.h > this.w  && this.h / this.w  >= 1.25){
        splitDirection = 0;
      }
      else{
        splitDirection = floor(random(2));
      }

      let max = ceil((splitDirection ? this.w : this.h) - MIN_LEAF_SIZE);
      if(max >= MIN_LEAF_SIZE) {
        let split = random(MIN_LEAF_SIZE, max);
        if (splitDirection == 0) { //left to right

          this.left = new leaf(this.x, this.y, this.w, split, this.gen+1, this.maxGen);
          this.right = new leaf(this.x, this.y+split, this.w, this.h-split, this.gen+1, this.maxGen);

        }
        else { //top to bottom
          this.left = new leaf(this.x, this.y, split, this.h, this.gen + 1, this.maxGen);
          this.right = new leaf(this.x+split, this.y, this.w-split, this.h, this.gen + 1, this.maxGen);
        }
        this.left.splitLeaf();
        this.right.splitLeaf();
      }
    }
  }

  showAll(){
    //itterates through the tree and displays all the areas and their rooms
    if(this.left){
      this.left.show();
      this.left.drawRoom();
      this.left.showAll();
    }
    if(this.right){
      this.right.show();
      this.right.drawRoom();
      this.right.showAll();
    }
  }

  show() {
    noFill();
    rect(this.x, this.y, this.w, this.h, 0);
  }

  createRooms() {
    if(this.left){
      this.left.tryCreateRoom();
      this.left.createRooms();
    }
    if(this.right){
      this.right.tryCreateRoom();
      this.right.createRooms();
    }

    if(this.right && this.left){
      this.createHallway(this.left.getRoom(), this.right.getRoom());
    }

  }

  tryCreateRoom() {
    if(!this.left && !this.right){
      let count = 0
      do{
        var roomW = ceil(random(10, this.w - 15));
        var roomH = ceil(random(10, this.h - 15));
        var roomX = ceil(random(10, this.w - roomW - 10));
        var roomY = ceil(random(10, this.h - roomH - 10));
        //loop until a room is created that takes up more than 30% of the leaf's area
      }while((roomW*roomH)/(this.w*this.h) < 0.40);
      this.room = new room(this.x+roomX, this.y+roomY, roomW, roomH);
      return true;
    }
    else {
      return false;
    }
  }


  getRoom(){
    if(this.room){
      return this.room;
    }
    else {
      let lRoom = null;
      let rRoom = null;
      if(this.left) {
        lRoom = this.left.getRoom();
      }

      if(this.right) {
        rRoom = this.right.getRoom();
      }

      if (lRoom == null && rRoom == null) {
  			return null;
      }
  		else if (rRoom == null) {
  			return lRoom;
      }
  		else if (lRoom == null) {
  			return rRoom;
      }
  		else if (floor(random(2))) {
  			return lRoom;
      }
  		else {
  			return rRoom;
      }
    }
  }

  createHallway(left, right) {

    //choose one random point in each room, offset from its walls
    let point1 = createVector(random(left.x+5, left.x+left.w-10), random(left.y+5, left.y+left.h-10));
  	let point2 = createVector(random(right.x+5, right.x+right.w-10), random(right.y+5, right.y+right.h-10));
    let rw; //real width
    let rh; //real height
    let bottemLeftCorner = false;
    //figure out which way the paths need to go
  	if(point1.x < point2.x){
  		rw = abs(point2.x - point1.x);
  	}else{
  		rw = point2.x - point1.x;
  	}

  	if(point1.y < point2.y){
  		rh = abs(point2.y - point1.y);
  	}else{
  		rh = point2.y - point1.y;
      bottemLeftCorner = true;
  	}

    if(rw >= 0 && rw < 10){
      rw = 10
    }
    else if (rw < 0 && rw > -10){
      rw = -10;
    }

    if(rh >= 0 && rh < 10){
      rh = 10
    }
    else if (rh < 0 && rh > -10){
      rh = -10;
    }

    //create a path with a right angle between the two chosen points
    //this is to fix a gap when making a corner in the bottom left
    if(bottemLeftCorner){
      this.halls.push(new room(point1.x, point1.y, rw+10, 10));
    } else{
      this.halls.push(new room(point1.x, point1.y, rw, 10));
    }
    this.halls.push(new room(point1.x+rw, point1.y, 10, rh));

  }


  drawAllRooms() {
    this.drawHallways();
    if(this.left){
      this.left.drawRoom();
      this.left.drawAllRooms();
    }
    if(this.right){
      this.right.drawRoom();
      this.right.drawAllRooms();
    }
  }

  drawHallways(){
    if(this.halls.length > 0){
      for (let h of this.halls){
        h.show();
      }
    }
  }


  drawRoom(){
    if(!this.left && !this.right){
      this.room.show();
    }
  }

} // end of class
