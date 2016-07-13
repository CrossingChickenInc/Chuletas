"use strict";

// Declaration of player data.
function Reticle(game) {
	this.game = game;
	this.targetSprite = null;
	this.reticleSprite = null;
	this.colliderSprite = null
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
}

Player.prototype.render = function() {
	// loads sprites
	this.targetSprite = this.game.add.sprite(this.targetPosition.x , this.targetPosition.y, 'neutral');
	this.reticleSprite = this.game.add.sprite(this.positionData.initial.x, this.positionData.initial.y, 'duke');

	// sets sprite properties
	this.game.physics.arcade.enable(this.targetSprite); 
	this.game.physics.arcade.enable(this.reticleSprite);

	this.colliderSprite.immovable = true; // makes it immovable when a collision occurs
	this.colliderSprite.body.collideWorldBounds = true; // colliderSprite cannot exceed the world bounds

	this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
};

// Defines the player's animations with their respective frames.
Player.prototype.addAnimations = function () {
	this.sprite.animations.add(this.animation + 'true', [0], 10, true);
	this.sprite.animations.add(this.animation + 'false', [1], 10, true);
	this.sprite.animations.add('neutral', [2], 10, true);
}