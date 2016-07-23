// Math Bombs minigame state
States.MathBombs = {
	// Sets the game's basic configurations.
	init: function(){
		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
	},
	// Starts the game.
	create: function(){
 		this.game.stage.backgroundColor = '0xFFFFFF';

		//Number of bars in-game (Use it later to change game's difficulty)
		this.game.nBars = 4;

		//Creates a Phaser.Group of math bars
		this.mathBars = new MathBars(this.game);
		this.mathBars.createBars();
		
		//Creates a Phaser.Group of bombs
		this.bombs = new Bombs(this.game);

		//Creates and loads a mathNumber object to the game's input
		this.mathNumber = new MathNumber(this.game, 50, this.game.height, this.mathBars, this.bombs);
		this.mathNumber.load();

 		//Creates and loads clock object
		this.clock = new Clock(window.game);
		this.clock.load();
	},

	// Updates all the game's objects.
	update: function(){
		this.mathNumber.update();
		//Timer to create bombs
		if(this.clock.total == 2){
			this.bombs.createBomb();
			this.clock.total = 0;
		}
	}	
}