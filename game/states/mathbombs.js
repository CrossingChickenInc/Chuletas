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

		var graphics = this.game.add.graphics(0, 0);
		var colors = [0x0A9CD8, 0xFAE927, 0x2AEDA1, 0x7109DA];

		this.mathBars = [];
		var width = this.game.width / (2 * this.game.nBars);
		
		for (var i=0; i < this.game.nBars; i++){
			this.mathBars[i] = new MathBar(this.game, this.game.width/2 + i*width, 0, width, this.game.height, graphics, colors[i]);
			this.mathBars[i].load();
		}

		this.mathNumber = new MathNumber(this.game, 50, this.game.height, this.mathBars);
		this.mathNumber.load();

		this.bombs = new Bomb(this.game);
 		this.bombs.load();
 		//this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 10, this.bombs.createBombs(), this);
 		//this.game.time.events.loop(Phaser.Timer.SECOND, this.bombs.createBombs(), this);

		
	},
	// Updates all the game's objects.
	update: function(){
		this.mathNumber.update();
	}
}