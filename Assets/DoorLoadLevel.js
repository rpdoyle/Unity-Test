#pragma strict

function Update () {
	var blocks = GameObject.FindGameObjectsWithTag("BlockDude");
	
	if (blocks[0].transform.position.x == transform.position.x && blocks[0].transform.position.y == transform.position.y) {
		if(Application.loadedLevel + 1 < Application.levelCount) {
			Application.LoadLevel(Application.loadedLevel + 1);
		}
	}
	
	if (Input.GetKeyUp(KeyCode.Minus)) {
		if (Application.loadedLevel != 0) {
			Application.LoadLevel(Application.loadedLevel - 1);
		}
	}
	
	if (Input.GetKeyUp(KeyCode.Equals)) {
		if (Application.loadedLevel != Application.levelCount-1) {
			Application.LoadLevel(Application.loadedLevel + 1);
		}
	}
	
	if (Input.GetKeyUp(KeyCode.Q)) {
		Application.Quit();
	}
}