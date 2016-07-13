"use strict";

// Declaration of player data.
function Reticle(game) {
	this.game = game;
	this.sprite = null;
	this.colliderSprite = null
	this.animation = 'onTarget';
	this.enableBody = true;
	this.onTarget  = null;

	this.targetPosition = {    // Target position
		x: null, 
		y: null 
	};

	this.reticlePosition = {    // Reticle position
		x: 200, 
		y: 300 
	};
}
