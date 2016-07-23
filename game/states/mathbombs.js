// Math Bombs minigame state
States.MathBombs = {
	// Sets the game's basic configurations.
	init: function(){
		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
	},
	// Starts the game.
	create: function(){
		this.game.nBars = 4;
 		this.game.stage.backgroundColor = '0xFFFFFF';

		this.mathBars = new MathBars(this.game);
		this.mathBars.createBars();
	
		
		/*for (var i=0; i < this.game.nBars; i++){
			var mathbar = new MathBar(this.game, this.game.width/2 + i*width, 0, graphics, colors[i]);
			mathbar.load();
			this.mathBars.add(mathbar);
		}*/

		this.mathNumber = new MathNumber(this.game, 50, this.game.height, this.mathBars);
		this.mathNumber.load();

		//Creates and loads Bomb object
		this.bomb = new Bombs(this.game);
		this.bomb.createBomb();
  		//this.bombs.add(bomb);

		/*//Creates and loads Bomb object
		this.bombs = new Bomb(this.game);
 		this.bombs.createBombs();*/

 		//Creates and loads clock object
		this.clock = new Clock(window.game);
		this.clock.load();
	},

	// Updates all the game's objects.
	update: function(){
		this.mathNumber.update();
		//Timer to create bombs
		if(this.clock.total == 2){
			this.bomb.createBomb();
			this.clock.total = 0;
		}
	}	
}