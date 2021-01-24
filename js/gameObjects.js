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
    this.colHeight = 40;
    this.colWidth = 20;
    this.colTopLeftX;
    this.colTopLeftY;
    this.myCollisionColor = "green";
	this.myIdentity = whichObject

    this.init = function() {
        if(this.myIdentity == 'fireRune'){
			this.myBitmap = fireRunePic;
			this.myName = "Fire Rune";
		}
        if (this.myIdentity == 'windRune'){
			this.myBitmap = windRunePic;
			this.myName = 'Wind Rune';
        }
		
		this.reset();
    }

    this.reset = function() {
        if (this.homeX == undefined) {
            for (var i = 0; i < roomGrid.length; i++) {
                if (roomGrid[i] == TILE_FIRE_RUNE || 
					roomGrid[i] == TILE_WIND_RUNE) {
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
			this.collisionColor = "red";
		} else {
			this.collisionColor = this.myCollisionColor;
		}
	}
	
	this.move = function(){
		//player to move this object
	}

	this.draw = function() {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, 0.0);
		if (showCollisions) {
			colorRect(this.colTopLeftX, this.colTopLeftY, this.colWidth, this.colHeight, this.collisionColor);
		}
	}


} // end of class