let root;
let w = 800;
let h = 800;
let MIN_LEAF_SIZE = 75;
let HALLWAY_WIDTH = 15;
let player;
let keysPressed = [];
let playerInfo;


function setup() {
	createCanvas(w+1, h+1);
	player = new character("Gabriel");

	root = new leaf(0, 0, w, h, 1, 5);
	root.splitLeaf();
	root.createRooms();
	player.setStartingPosition(root);
	playerInfo = select('#characterStats');

}

function draw() {
	background(255);

	playerInfo.html(player.showStats());
	player.takeDamage(1);
	//root.showAll();
	root.drawAllRooms();
	if(player.wallCollision()){
		player.move();
	}

	player.show();


}

function keyPressed() {
  player.setMove(keyCode, true);
}

function keyReleased() {
  player.setMove(keyCode, false);
}
