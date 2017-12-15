let root;
let w = 600;
let h = 600;
let MIN_LEAF_SIZE = 75;
let player;
let keysPressed = [];

function setup() {
	createCanvas(w+1, h+1);
	player = new character("Gabriel");

	root = new leaf(0, 0, w, h, 1, 5);
	root.splitLeaf();
	root.createRooms();
	player.setStartingPosition(root);

}

function draw() {
	background(255);
	//root.showAll();
	root.drawAllRooms();
	player.move();
	player.show();

}

function keyPressed() {
  player.setMove(keyCode, true);
}

function keyReleased() {
  player.setMove(keyCode, false);
}
