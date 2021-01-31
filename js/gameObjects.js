// tuning constants
var gameObjectList = [];

function addObject(whichObject) {
    var tempObject = new gameObjectClass(whichObject);
    gameObjectList.push(tempObject);
}

function gameObjectClass(whichObject) {
    // variables to keep track of position
    this.x;
    this.y;

    //collisions
    this.colHeight = 50;
    this.colWidth = 50;
    this.colTopLeftX;
    this.colTopLeftY;
    this.myCollisionColor = "orange";
	this.myIdentity = whichObject
	this.grabbedByPlayer = false;

    this.init = function(name) {
        if(name == 'fireRune'){
			this.myBitmap = fireRunePic;
			this.myName = "Fire Rune";
		} else if (name == 'windRune'){
			this.myBitmap = windRunePic;
			this.myName = 'Wind Rune';
        } else if (name == 'waterRune'){
			this.myBitmap = waterRunePic;
			this.myName = 'Water Rune';
        } else if (name == 'earthRune'){
			this.myBitmap = earthRunePic;
			this.myName = 'Earth Rune';
        }
		
		this.reset();
    }

    this.reset = function() {
        if (this.homeX == undefined) {
            for (var i = 0; i < roomGrid.length; i++) {
                if (roomGrid[i] == TILE_FIRE_RUNE || 
					roomGrid[i] == TILE_WIND_RUNE || 
					roomGrid[i] == TILE_WATER_RUNE ||
					roomGrid[i] == TILE_EARTH_RUNE) {
                    var tileRow = Math.floor(i / ROOM_COLS);
                    var tileCol = i % ROOM_COLS;
                    this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
                    this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
                    roomGrid[i] = TILE_GROUND;
                    break; // found it, so no need to keep searching 
                } // end of if
            } // end of for
        } // end of if position not saved yet

        this.x = this.homeX;
        this.y = this.homeY;
    } // end of reset

	this.isOverLapping = function(testX, testY) {
		if (testX > this.colTopLeftX && testX < this.colTopLeftX + this.colWidth &&
			testY > this.colTopLeftY && testY < this.colTopLeftY + this.colHeight) {
			return true;
		} else {
			return false;
		}
	}

	this.checkCollisionAgainst = function(thisEntity) {
		if (this.isOverLapping(thisEntity.x, thisEntity.y)) {
			this.myCollisionColor = "yellow";
			if(p1.interactWithObject){
				this.grabbedByPlayer = true;
				this.myCollisionColor = "green";
			}
		} else {
			
			this.myCollisionColor = "orange";
			if(this.grabbedByPlayer){
				this.myCollisionColor = "green";
			}
		}
	}
	
	this.move = function(){	
        //updates to collision boxes
        this.colTopLeftX = this.x - this.colWidth / 2;
        this.colTopLeftY = this.y - this.colHeight / 2;
		//player to move this object
		//player should grab this object, then the player can either pull or push the object.
		if(this.grabbedByPlayer){
			if (p1.move_North) {
				this.y = p1.movingSpeed;
			}
			if (p1.move_East) {
				this.x += p1.movingSpeed;
			}
			if (p1.move_South) {
				this.y += p1.movingSpeed;
			}
			if (p1.move_West) {
				this.x -= p1.movingSpeed;
			}
		}
	}

	this.draw = function() {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, 0.0);
		if (showCollisions) {
			 colorRect(this.colTopLeftX, this.colTopLeftY, this.colWidth, this.colHeight, this.myCollisionColor);
		}
	} //end of draw
} // end of class