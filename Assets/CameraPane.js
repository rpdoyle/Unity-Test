#pragma strict

static var speed : int = 10;
static var x : float;
static var y : float;
static var z : float;

function Update () {

	if (Input.GetKeyDown(KeyCode.LeftShift)) {
		x = Camera.main.transform.position.x;
		y = Camera.main.transform.position.y;
		z = Camera.main.transform.position.z;
		
	}
	
	if (Input.GetKeyUp(KeyCode.LeftShift)) {
		Camera.main.transform.position.x = x;
		Camera.main.transform.position.y = y;
		Camera.main.transform.position.z = z;
	}

	if (Input.GetKey(KeyCode.LeftShift))
    {
    	if (Input.GetKey("up")) {
	   		transform.Translate (Vector3(0,1,0) * Time.deltaTime*speed);
	   	}
	   	
	   	if (Input.GetKey("down")) {
	   		transform.Translate (Vector3(0,-1,0) * Time.deltaTime*speed);
	   	}
	   	
	    if (Input.GetKey("left")) {
	    	transform.Translate (Vector3(-1,0,0) * Time.deltaTime*speed);
	    }
	    
	    if (Input.GetKey("right")) {
	    	transform.Translate (Vector3(1,0,0) * Time.deltaTime*speed);
	    }
    }
}