"use strict";

// Declaration of player data.
function Reticle(game) {
	this.game = game;
	this.targetSprite = null;
	this.reticleSprite = null;
	this.reticleCollider = null;
	this.targetCollider = null;
	this.animation = 'onTarget';
	this.enableBody = true;
	this.onTarget  = false;
	this.timer = null;
	this.multiplier = 1;
	this.score = 0;
	this.currentTimer = 0;
	this.isOnNewPosition = true;
	this.timeOnTarget = 0;



	this.targetPosition = {    // Target position
		x: 400, 
		y: 500 
	};

	this.reticlePosition = {    // Reticle position
		x: 100, 
		y: 100 
	};

	this.reticleColliderDifference = {
		x:39,
		y:34
	};

	this.targetColliderDifference = {
		x:43,
		y:43
	};

	this.newTargetPosition = {
		x:0,
		y:0
	};

	this.targetSpeed = {
		x:0,
		y:0
	};	
}

//Graphics from the game
Reticle.prototype.render = function() {
	// loads sprites
	this.targetSprite = this.game.add.sprite(this.targetPosition.x - this.targetColliderDifference.x, this.targetPosition.y - this.targetColliderDifference.x, 'target');
	this.reticleSprite = this.game.add.sprite(this.reticlePosition.x - this. reticleColliderDifference.x, this.reticlePosition.y - this.reticleColliderDifference.y, 'reticle');
	
	this.reticleCollider = this.game.add.sprite(this.reticlePosition.x, this.reticlePosition.y, 'reticleCollider');
	this.targetCollider = this.game.add.sprite(this.targetPosition.x, this.targetPosition.y, 'reticleCollider');
	// sets sprite properties
	this.game.physics.arcade.enable(this.targetSprite); 
	this.game.physics.arcade.enable(this.reticleSprite);
	this.game.physics.arcade.enable(this.reticleCollider); 
	this.game.physics.arcade.enable(this.targetCollider);

	this.targetCollider.alpha = 0;
	this.reticleCollider.alpha = 0;

	this.targetSprite.immovable = true; 
	this.reticleSprite.body.collideWorldBounds = true; 

	this.game.physics.enable(this.targetCollider, Phaser.Physics.ARCADE);

	this.game.physics.enable(this.reticleCollider, Phaser.Physics.ARCADE);

	//Adding the timer
	this.timer = game.time.create(false);

	//this.game.time.events.loop(Phaser.Timer.SECOND, this.scorePoints, this);
};


Reticle.prototype.addAnimations = function () {
	this.reticleSprite.animations.add(this.animation + 'true', [0], 10, true);
	this.reticleSprite.animations.add(this.animation + 'false', [1], 10, true);
}

Reticle.prototype.playAnimation = function(){
	this.reticleSprite.play(this.animation + this.onTarget);
}

Reticle.prototype.load = function() {
	this.render();
	this.addAnimations();

}

//Reticle's methods
Reticle.prototype.move = function() {

	this.reticleCollider.x = game.input.mousePointer.x;
	this.reticleCollider.y = game.input.mousePointer.y;

    this.setReticlePosition(this.reticleCollider.x - this.reticleColliderDifference.x, this.reticleCollider.y - this.reticleColliderDifference.y);
}

Reticle.prototype.moveWithLag = function(speed) {
	
	game.physics.arcade.moveToPointer(this.reticleCollider, speed);

        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(this.reticleCollider.body, game.input.x, game.input.y)) {
            this.reticleCollider.body.velocity.setTo(0, 0);
        }
}

Reticle.prototype.setReticlePosition = function(x, y) {
	this.reticleSprite.x = x;
	this.reticleSprite.y = y;
}

Reticle.prototype.isOnTarget = function() {

	if (this.checkOverlap(this.reticleCollider, this.targetCollider)) {
        this.onTarget = true;
        
    }
    else {
       this.onTarget = false;
       this.multiplier = 1;
    }

    this.handleTimer(this.onTarget);
    this.playAnimation();
};

Reticle.prototype.checkOverlap = function (spriteA, spriteB){

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

Reticle.prototype.checkTimerVar = function() {

	var timerSeconds = Math.floor(this.timer.seconds);
	//console.log("*" + timerSeconds);
	if(this.currentTimer != timerSeconds) {
		this.currentTimer = timerSeconds;
		return true;
	}
	else {
		return false;
	}
}

Reticle.prototype.calculateMultiplier = function() {

	if(this.timer.seconds > 1 && this.timer.seconds < 30) {

		this.multiplier = Math.ceil(((this.timer.seconds - 1)/10));
		
	} 
	else if(this.timer.seconds>31){
		this.multiplier = 5;
	}
};

Reticle.prototype.scorePoints = function() {
	
	this.score += this.multiplier;
}

//Target's methods
Reticle.prototype.triggerTargetMovement = function() {
		if(this.timeOnTarget % 10 == 0 && this.timeOnTarget != 0){
			this.timeOnTarget = 0;
			return true;
		}
		else{
			return false;
		}
		//return true;
}

Reticle.prototype.moveTarget = function() {
	if(this.triggerTargetMovement()) {
		this.setNewTargetPosition(this.game.rnd.integerInRange(44, 700), this.game.rnd.integerInRange(44, 500));
	}

	this.checkIfTargetIsInNewPosition();

	if(!this.isOnNewPosition){
		this.targetCollider.scale.setTo(1.5);
		this.moveTargetToPosition();
	}
	else {
		this.targetCollider.scale.setTo(1);
		this.stopTarget();	
	}
}

Reticle.prototype.calculateTargetSpeed = function(difficulty) {
	this.targetSpeed.x = -((this.targetPosition.x - this.newTargetPosition.x)/5) /*difficulty*/;
	this.targetSpeed.y = -((this.targetPosition.y - this.newTargetPosition.y)/5) /*difficulty*/;
};

Reticle.prototype.setNewTargetPosition = function(x, y) {
	this.newTargetPosition.x = x;
	this.newTargetPosition.y = y;
	this.isOnNewPosition = false;
}

Reticle.prototype.moveTargetToPosition = function() {
	/*
	calcular distancia entre los centros
	dividir la distancia entre (5,4,3) segundos y asignar ese valor a la velocidad
	done.
	*/
	this.calculateTargetSpeed(5);
	this.targetCollider.body.velocity.x = this.targetSpeed.x;
	this.targetCollider.body.velocity.y = this.targetSpeed.y;

	this.targetSprite.x = this.targetCollider.x - this.targetColliderDifference.x;
	this.targetSprite.y = this.targetCollider.y - this.targetColliderDifference.y;
}

Reticle.prototype.checkIfTargetIsInNewPosition = function() {
	
	if(Math.abs(this.targetCollider.x - this.newTargetPosition.x) < 10 && Math.abs(this.targetCollider.y - this.newTargetPosition.y) < 10)
	{
		this.isOnNewPosition = true;
		this.targetPosition.x = this.targetCollider.x;
		this.targetPosition.y = this.targetCollider.y;
	}
}

Reticle.prototype.stopTarget = function() {
	this.targetCollider.body.velocity.x = 0;
	this.targetCollider.body.velocity.y = 0;
}



Reticle.prototype.handleTimer = function (timeStart) {
	if(this.timer==null) {
		//Adding the timer
		this.timer = game.time.create(false);
	}
	else {
		if(timeStart && !this.timer.running) {
			this.timer.start();
		}		
		else if(!timeStart) {
			this.timer.destroy();
		}
	}
}

Reticle.prototype.update = function() {
	
	this.move();
	this.isOnTarget();
	this.calculateMultiplier();

	if(this.checkTimerVar() && this.onTarget) {
		this.timeOnTarget++;
		this.scorePoints();
	}

	this.moveTarget();

	console.log(this.score);

}