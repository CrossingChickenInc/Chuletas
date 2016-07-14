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

	this.targetPosition = {    // Target position
		x: 400, 
		y: 500 
	};

	this.reticlePosition = {    // Reticle position
		x: 100, 
		y: 100 
	};

	this.colliderDifference = {
		x:44,
		y:44
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
};


Reticle.prototype.addAnimations = function () {
	this.reticleSprite.animations.add(this.animation + 'true', [0], 10, true);
	this.reticleSprite.animations.add(this.animation + 'false', [1], 10, true);
}

Reticle.prototype.playAnimation = function() {
	this.reticleSprite.play(this.animation + this.onTarget);
}

Reticle.prototype.load = function() {
	this.render();
	this.addAnimations();
}

Reticle.prototype.isOnTarget = function() {
	if (this.checkOverlap(this.reticleCollider, this.targetCollider))
    {
        this.onTarget = true;

    }
    else
    {
       this.onTarget = false;
    }

    this.playAnimation();
};

Reticle.prototype.moveWithLag = function(speed) {
	
	game.physics.arcade.moveToPointer(this.reticleCollider, speed);

        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(this.reticleCollider.body, game.input.x, game.input.y))
        {
            this.reticleCollider.body.velocity.setTo(0, 0);
        }
};

Reticle.prototype.move = function() {

	this.reticleCollider.x = game.input.mousePointer.x;
	this.reticleCollider.y = game.input.mousePointer.y;

    this.setReticlePosition(this.reticleCollider.x - this.colliderDifference.x, this.reticleCollider.y - this.colliderDifference.y);
}

Reticle.prototype.setReticlePosition = function(x, y) {
	this.reticleSprite.x = x;
	this.reticleSprite.y = y;
}

Reticle.prototype.checkOverlap = function (spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

Reticle.prototype.update = function(){
	this.isOnTarget();
	this.move();

}
