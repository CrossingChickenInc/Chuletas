//Function createBombs with random position and velocity
function createBombs() {
	var bombs;
	//Group for bombs
	bombs = this.game.add.group();
	bombs.enableBody = true;
	//Creation of bombs
	//for (var i = 0; i < 4; i++) {

		//Random var for creation of bombs (not all in the same position)
		var random = this.game.rnd.realInRange(50, 500);
		var bomb = bombs.create(0, random, 'bomb');
		//var bomb = this.game.create(0, random, 'bomb');
			
		//Little modification to bombs size
		bomb.width = 30;
		bomb.height = 150;

		//  Gravity on x axis
        bomb.body.gravity.x = 300;
        bomb.body.collideWorldBounds = true;

        //Another random var for velocity this could be used for levels 
        var randomVelocity = this.game.rnd.realInRange(110,60);
        bomb.body.velocity.x = randomVelocity;
	//};
}

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
 		this.game.time.events.loop(Phaser.Timer.QUARTER, createBombs, this);

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
		
	},
	// Updates all the game's objects.
	update: function(){
		this.mathNumber.update();
	}

}