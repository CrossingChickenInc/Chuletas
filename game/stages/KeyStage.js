function KeyStage() {}

/**
 * Sets the state's basic configurations.
 */
KeyStage.prototype.init = function() {
	this.game.renderer.renderSession.roundPixels = true;
	this.physics.startSystem(Phaser.Physics.ARCADE);
};

/**
 * Initializes the stage objects.
 */
KeyStage.prototype.create = function() {

	this.game.background = this.game.add.sprite(0, 0, 'map');
	// Sets the world bounds.
	this.game.world.setBounds(0, 0, 800, 600);

}	

/**
 * Updates all the stages's objects.
 */
KeyStage.prototype.update = function(){
	// Updates the player.
	this.game.player.update();


}

// Adds this stage to the game's states.
States.KeyStage = new KeyStage();