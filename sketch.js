let root;
let w = 600;
let h = 600;
let MIN_LEAF_SIZE = 75;
let p;
let keysPressed = [];

function setup() {
	createCanvas(w+1, h+1);
	p = new character("Gabriel", 200, 200);
	root = new leaf(0, 0, w, h, 1, 5);
	root.splitLeaf();
	root.createRooms();

}

function draw() {
	background(255);
	//root.showAll();
	root.drawAllRooms();
	p.move();
	p.show();

}

function keyPressed() {
  p.setMove(keyCode, true);
}

function keyReleased() {
  p.setMove(keyCode, false);
}
