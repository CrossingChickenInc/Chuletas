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


	this.targetPosition = {    // Target position
		x: 400, 
		y: 500 
	};

	this.reticlePosition = {    // Reticle position
		x: 100, 
		y: 100 
	};

	this.colliderDifference = {
		x:39,
		y:34
	};

	
}

Reticle.prototype.render = function() {
	// loads sprites
	this.targetSprite = this.game.add.sprite(this.targetPosition.x , this.targetPosition.y, 'target');
	this.reticleSprite = this.game.add.sprite(this.reticlePosition.x, this.reticlePosition.y, 'reticle');
	this.reticleCollider = this.game.add.sprite(this.reticlePosition.x + this.colliderDifference.x, this.reticlePosition.y + this.colliderDifference.y, 'reticleCollider');
	this.targetCollider = this.game.add.sprite(this.targetPosition.x + this.colliderDifference.x, this.targetPosition.y + this.colliderDifference.y, 'reticleCollider');
	// sets sprite properties
	this.game.physics.arcade.enable(this.targetSprite); 
	this.game.physics.arcade.enable(this.reticleSprite);
	this.game.physics.arcade.enable(this.reticleCollider); 
	this.game.physics.arcade.enable(this.targetCollider);

	this.targetCollider.alpha = 0;
	this.reticleCollider.alpha = 0;

	this.targetSprite.immovable = true; 
	this.reticleSprite.body.collideWorldBounds = true; 

	this.game.physics.enable(this.targetSprite, Phaser.Physics.ARCADE);

	this.game.physics.enable(this.reticleSprite, Phaser.Physics.ARCADE);

	//Adding the timer
	this.timer = game.time.create(false);
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

Reticle.prototype.moveWithLag = function(speed) {
	
	game.physics.arcade.moveToPointer(this.reticleCollider, speed);

        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(this.reticleCollider.body, game.input.x, game.input.y)) {
            this.reticleCollider.body.velocity.setTo(0, 0);
        }
}

Reticle.prototype.move = function() {

	this.reticleCollider.x = game.input.mousePointer.x;
	this.reticleCollider.y = game.input.mousePointer.y;

    this.setReticlePosition(this.reticleCollider.x - this.colliderDifference.x, this.reticleCollider.y - this.colliderDifference.y);
}

Reticle.prototype.setReticlePosition = function(x, y) {
	this.reticleSprite.x = x;
	this.reticleSprite.y = y;
}

Reticle.prototype.setTargetPosition = function(x, y) {
	this.targetCollider.x = x;
	this.targetCollider.y = y;

	this.targetSprite.x = x - this.colliderDifference.x;
	this.targetSprite.y = y - this.colliderDifference.y;
}

Reticle.prototype.checkOverlap = function (spriteA, spriteB){

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

//Reticle.prototype.moveTargetPosition = function(x, y) {
//	this.reticleSprite.x = x;
//	this.reticleSprite.y = y;
//}



Reticle.prototype.handleTimer = function (timeStart) {
	if(this.timer==null) {
		//Adding the timer
		this.timer = game.time.create(false);
	}
	if(timeStart && !this.timer.running) {
		this.timer.start();
	}	
	else if(!timeStart) {
		this.timer.destroy();
	}
}

Reticle.prototype.update = function() {
	
	this.move();
	this.isOnTarget();
	this.calculateMultiplier();
	if(this.checkTimerVar() && this.onTarget) {
		this.scorePoints();
	}
	if(this.score > 10) {

		this.setTargetPosition(this.game.rnd.integerInRange(44, 756), this.game.rnd.integerInRange(44, 556));
		this.score = 0;
	}
	console.log(this.score);

}