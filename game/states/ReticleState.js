/**
 * Test state for demostration purposes.
 */
function ReticleState() {}

/**
 * Sets the state's basic configurations.
 */
ReticleState.prototype.init = function() {
	this.game.renderer.renderSession.roundPixels = true;
	this.physics.startSystem(Phaser.Physics.ARCADE);
};

/**
 * Initializes the stage objects.
 */
ReticleState.prototype.create = function() {
	// Sets the world bounds.
	this.game.background = this.game.add.sprite(0, 0, 'background');

	// Sets the world bounds.
	this.game.world.setBounds(0, 0, 800, 600);


	// Creates and loads a Player object.
	this.game.reticle = new Reticle(window.game);
	this.game.reticle.load();

	// Sets the camera to follow the player.
	//this.game.camera.follow(this.game.player.colliderSprite);

	// Initialiazes the cursor keys.
	//this.game.cursors = game.input.keyboard.createCursorKeys();
}	

/**
 * Updates all the stages's objects.
 */
ReticleState.prototype.update = function(){
	// Updates the player.
	game.reticle.update(game.player);
	
}

// Adds this stage to the game's states.
States.ReticleState = new ReticleState();
