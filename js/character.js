function characterClass() {
  // variables to keep track of position
  this.x;
  this.y;
  this.tilePath = [];
  this.pathfindingNow = false;
  this.movingSpeed = 20; // should be overwritten by specific class.
  // move states
  this.move_North = false;
  this.move_East = false;
  this.move_South = false;
  this.move_West = false;

  //collisions
  this.colHeight = 40;
  this.colWidth = 20;
  this.colTopLeftX;
  this.colTopLeftY;
  this.myCollisionColor = "green";
  
  this.init = function(whichGraphic,whichName) {
    this.myBitmap = whichGraphic;
    this.myName = whichName;
    this.reset();
  }
  
  this.reset = function() {
	  console.log("Character Reset Reached");
    if(this.homeX == undefined) {
      for(var i=0; i<roomGrid.length; i++) {
        if( roomGrid[i] == TILE_ENEMY) {
          var tileRow = Math.floor(i/ROOM_COLS);
          var tileCol = i%ROOM_COLS;
          this.homeX = tileCol * TILE_W + 0.5*TILE_W;
          this.homeY = tileRow * TILE_H + 0.5*TILE_H;
          roomGrid[i] = TILE_GROUND;
          break; // found it, so no need to keep searching 
        } // end of if
      } // end of for
    } // end of if position not saved yet
    
    this.x = this.homeX;
    this.y = this.homeY;

  } // end of reset
  
  this.move = function() {
	
    var nextX = this.x;
    var nextY = this.y;
	
	var enemyCol = Math.floor(this.x/TILE_W);
	var enemyRow = Math.floor(this.y/TILE_H);

	var enemyCurrentTileIndex = roomTileToIndex(enemyCol, enemyRow);
		
	if(this.tilePath.length > 0){
		var targetIndex = this.tilePath[0];
		var targetC = targetIndex % ROOM_COLS;
		var targetR = Math.floor(targetIndex / ROOM_COLS);
		var targetX = targetC * TILE_W + (TILE_W * 0.5);
		var targetY = targetR * TILE_H + (TILE_H * 0.5);
		var deltaX = Math.abs(targetX - this.x);
		var deltaY = Math.abs(targetY - this.y);
		
		this.move_East = this.move_West = this.move_North = this.move_South = false;
		
		if(deltaX <= this.movingSpeed){
			this.x = targetX;
			if(deltaY <= this.movingSpeed){
				this.y = targetY;
				this.tilePath.shift();
			} else if(targetY < this.y){
				this.move_North = true;
			} else {
				this.move_South = true;
			}
		} else if(deltaY <= this.movingSpeed){
			this.y = targetY;
			if(deltaX <= this.movingSpeed){
				this.x = targetX;
				this.tilePath.shift();
			} else if(targetX < this.x){
				this.move_West = true;
			} else {
				this.move_East = true;
			}
		} else { // move towards center of closest tile
			targetX = enemyCol * TILE_W + (TILE_W * 0.5);
			targetY = enemyRow * TILE_H + (TILE_H * 0.5);
			if(targetY < this.y - this.movingSpeed){
				this.move_North = true;
			} else if (targetY > this.y + this.movingSpeed) {
				this.move_South = true;
			} else if(targetX < this.x){
				this.move_West = true;
			} else {
				this.move_East = true;
			}
		}
	} 
	
	if(this.move_North || this.move_East || this.move_South || this.move_West){
		this.moving = true;
	} else {
		this.moving = false;
	}
	
    if(this.move_North) {
      nextY -= this.movingSpeed;
    }
    if(this.move_East) {
      nextX += this.movingSpeed;
    }
    if(this.move_South) {
      nextY += this.movingSpeed;
    }
    if(this.move_West) {
      nextX -= this.movingSpeed;
    }
        
    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
    var walkIntoTileType = TILE_WALL_7;
    
    if( walkIntoTileIndex != undefined) {
      walkIntoTileType = roomGrid[walkIntoTileIndex];
    }
	
    switch( walkIntoTileType ) {
      case TILE_GROUND:
	  case TILE_GOAL:
	  case TILE_FLOOR_FIRE_RUNE:
      case TILE_FLOOR_WATER_RUNE:
	  case TILE_FLOOR_WIND_RUNE:
	  case TILE_FLOOR_EARTH_RUNE:
	  case TILE_KEY:
        this.x = nextX;
        this.y = nextY;
		break;
      case TILE_DOOR:
	  case TILE_DOOR_YELLOW_FRONT:
	  case TILE_WALL_1:
	  case TILE_WALL_2:
	  case TILE_WALL_3:
	  case TILE_WALL_4:
	  case TILE_WALL_5:
	  case TILE_WALL_6:
	  case TILE_WALL_7:	
      case TILE_WALL_8:
	  case TILE_WALL_9:
	  case TILE_WALL_10:
	  case TILE_WALL_11:
	  case TILE_WALL_12:
	  case TILE_WALL_13:
      default:
        // any other tile type number was found... do nothing, for now
        break;
    }
	//updates to collision boxes
	this.colTopLeftX = this.x - this.colWidth/2;
	this.colTopLeftY = this.y - this.colHeight/2;
  }
  
  	this.isOverLapping = function(testX, testY){
		if(	testX > this.colTopLeftX && testX < this.colTopLeftX + this.colWidth &&
			testY > this.colTopLeftY && testY < this.colTopLeftY + this.colHeight){
			return true;
		} else {
			return false;
		}			
	}
	
	this.checkCollisionAgainst = function(thisEntity){
		if(this.isOverLapping(thisEntity.x,thisEntity.y)){
			this.collisionColor = "red"; 
		} else {
			this.collisionColor = this.myCollisionColor;
		}
	}
  
  this.draw = function() {
    drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, 0.0 );
  	if(showCollisions){
		colorRect(this.colTopLeftX, this.colTopLeftY, this.colWidth, this.colHeight, this.collisionColor);
	}
  }
  

} // end of class