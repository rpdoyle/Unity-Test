#pragma strict

static var hasBlock : int = 0;
static var block : GameObject;
static var stop : int = 0;

function Update () {
	if (Input.GetKeyDown(KeyCode.LeftShift)) {
		stop = 1;
	}
	
	if (Input.GetKeyUp(KeyCode.LeftShift)) {
		stop = 0;
	}

	if (stop) {
		return;
	}

    if (Input.GetKeyDown("left")) {
    	MoveLeft();
    }
  
    if (Input.GetKeyDown("right")) {
    	MoveRight();
    }
    
    if (Input.GetKeyDown("up")) {
   		Jump();
   	}
   	
   	if (Input.GetKeyDown("down")) {
   		if (hasBlock) {
   			DropBlock();
   		} else {
   			PickUpBlock();
   		}
   	}
   	
   	if (Input.GetKeyDown("r")) {
   		hasBlock = 0;
   		block = null;
   		Application.LoadLevel(Application.loadedLevel);
   	}
}

function MoveLeft() {
	transform.localRotation.y = 0;

	var x = transform.parent.position.x-1;
	var y = transform.parent.position.y;
	
	if (getObjectAt(x,y) == null) {
		transform.parent.position.x--;
	
		if (hasBlock) {
			MoveBlock();
		}
	
		Gravity();
		
		if (hasBlock) {
			print("Calling block gravity");
			BlockGravity();
		}
	}
	
}

function MoveRight() {
	transform.localRotation.y = 180;
	
	var x = transform.parent.position.x+1;
	var y = transform.parent.position.y;
	
	if (getObjectAt(x,y) == null) {
		transform.parent.position.x++;
	
		if (hasBlock) {
			MoveBlock();
		}
	
		Gravity();
		
		if (hasBlock) {
			BlockGravity();
		}
	}
}

function MoveBlock() {
	var x = transform.parent.position.x;
	var y = transform.parent.position.y+1;
	
	if (getObjectAt(x, y) == null) {
		block.transform.position.x = x;
		block.transform.position.y = y;
	} else {
		BlockGravity();
		block = null;
		hasBlock = 0;
	}
}

function Gravity() {
	var x = transform.parent.position.x;
	var y = transform.parent.position.y;

	while (getObjectAt(x,y-1) == null) {
		transform.parent.position.y--;
		y = transform.parent.position.y;
	}
}

function Jump() {
	var oldX = transform.parent.position.x;
	var oldY = transform.parent.position.y;
	var x = transform.parent.position.x;
	
	if (transform.localRotation.y  == 0) {
		x = transform.parent.position.x - 1;
	} else {
		x = transform.parent.position.x + 1;
	}
	
	var y = transform.parent.position.y+1;
	
	//if there is a block next to you but not above that one and not a block above you now
	if (getObjectAt(x,y) == null && getObjectAt(x, y-1) != null && getObjectAt(transform.parent.position.x, transform.parent.position.y++) == null) {
		transform.parent.position.x = x;
		transform.parent.position.y = y;
		
		if (hasBlock) {
			//if there is a block two above you, the block can't make it
			if (getObjectAt(oldX, oldY+2) != null) {
				BlockGravity();
				block = null;
				hasBlock = 0;
			} else {
				MoveBlock();
			}
		}
	}
}

function DropBlock() {
	
	var x = transform.parent.position.x;
	
	if (transform.localRotation.y  == 0) {
		x = transform.parent.position.x - 1;
	} else {
		x = transform.parent.position.x + 1;
	}
	
	var y = transform.parent.position.y;

	if (getObjectAt(x,y) == null && getObjectAt(x,y+1) == null) {
		block.transform.position.x = x;
		block.transform.position.y = y;
		BlockGravity();
		block = null;
		hasBlock = 0;
	} else if (getObjectAt(x,y+1) == null) {
		block.transform.position.x = x;
		block.transform.position.y = y+1;
		BlockGravity();
		block = null;
		hasBlock = 0;
	}
	
}

function PickUpBlock() {

	var x;

	if (transform.localRotation.y  == 0) {
		x = transform.parent.position.x - 1;
	} else {
		x = transform.parent.position.x + 1;
	}

	var y = transform.parent.position.y;

	var blocks = GameObject.FindGameObjectsWithTag("MovableObject");
	var foundBlock = 0;
	
	for (var i = 0; i < blocks.Length; i++) {
		if (blocks[i].transform.position.x == x && blocks[i].transform.position.y == y) {
			foundBlock = 1;
			break;
		}
	}
	
	//there is a block where you would pick one up
	if (foundBlock && !hasBlock) {
		//is there a block on top of that one?
		if (getObjectAt(blocks[i].transform.position.x, blocks[i].transform.position.y+1) == null) {
			//is there a block above you block dude?
			if (getObjectAt(transform.parent.position.x, transform.parent.position.y+1) == null) {
				blocks[i].transform.position.x = transform.parent.position.x;
				blocks[i].transform.position.y = transform.parent.position.y+1;
				block = blocks[i];
				hasBlock = 1;
			}
		}
	}
}

function BlockGravity() {
	var x = block.transform.position.x;
	var y = block.transform.position.y;
	
	while(getObjectAt(x,y-1) == null) {
		print("falling 1 block");
		block.transform.position.y--;
		y--;
	}
	var object = getObjectAt(x, y-1);
	print("Object that made me stop: " + object.transform.position.x + ", " + object.transform.position.y + " " + object.tag);
}

function getObjectAt(x, y) {
	var objects = GameObject.FindObjectsOfType(typeof (GameObject));

	for (var i = 0; i < objects.Length; i++) {
		if (objects[i].transform.position.x == x && objects[i].transform.position.y == y && objects[i].tag != "Door") {
				return objects[i];
		}
	}

	return null;
}