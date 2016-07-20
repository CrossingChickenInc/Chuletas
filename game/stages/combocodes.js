function ComboCodes() {}
//#yolo
/**
 * Sets the state's basic configurations.
 */
ComboCodes.prototype.init = function() {
	this.game.renderer.renderSession.roundPixels = true;
	this.physics.startSystem(Phaser.Physics.ARCADE);
};

/**
 * Initializes the stage objects.
 */

ComboCodes.prototype.create = function() {

	// Sets the world bounds.
	this.game.world.setBounds(0, 0, 800, 600);

	// Creates and loads a Key object.
	
	this.game.Key = new Key(window.game);
	this.game.Key.render();

}	

/**
 * Updates all the stages's objects.
 */
ComboCodes.prototype.update = function(){

	this.game.Key.update();
}

// Adds this stage to the game's states.
States.ComboCodes = new ComboCodes();

