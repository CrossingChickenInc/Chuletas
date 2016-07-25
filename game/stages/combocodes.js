function ComboCodes() {}
/**
 * Sets the state's basic configurations.
 */
ComboCodes.prototype.init = function() {
	this.game.renderer.renderSession.roundPixels = true;
	this.physics.startSystem(Phaser.Physics.ARCADE);
};
var coordinated = false;
var keyCreated = true;
/**
 * Initializes the stage objects.
 */

ComboCodes.prototype.create = function() {

	// Sets the world bounds.
	this.game.world.setBounds(0, 0, 800, 600);

	// Creates and loads a Key object.	
	this.game.Key = new Key(window.game);
	this.game.Key.render();

	//Creates and loads Clock object
	this.game.clock = new Clock(window.game);
	
}	

/**
 * Updates all the stages's objects.
 */
ComboCodes.prototype.update = function(){


	this.game.Key.update();
	this.game.clock.load();

	this.restartCombo();
	
	//creates a timer for when a single key is pressed
	/*if(//key pressed
	){
		game.clock.load();
	}
	if(game.clock.total == 3) {
		this.game.Key.kill();
		keyCreated = true;
		game.clock.kill();
	}
	//creates a timer of half the time for when all keys are pressed at the same time
	if (//key1 & key2 & key3 pressed
		) {
		game.clock.load();
		coordinated = true;
	}
	if (coordinated & game.clock.total == 1.5) {
		this.game.Key.kill();
		keyCreated = true;
		game.clock.kill();
	}
	//updates a new key
	if(keyCreated) {
		this.game.Key.update();
		keyCreated = false;
	}*/
}

ComboCodes.prototype.restartCombo = function(){

	if(this.game.Key.hold == true)
	{
		if (this.game.clock.total == 200) 
		{
			this.game.clock.total = 0 ;
			this.game.Key.kill();
			this.game.Key = new Key(window.game);
			this.game.Key.render();

		}
	}
	else 
	{
		this.game.clock.total = 0;
	}
}



// Adds this stage to the game's states.
States.ComboCodes = new ComboCodes();

