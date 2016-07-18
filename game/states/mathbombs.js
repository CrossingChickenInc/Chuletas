function createBombs() {
	var bombs;
	//Group for bombs
	bombs = this.game.add.group();
	bombs.enableBody = true;
	//Creation of bombs
	for (var i = 0; i < 4; i++) {

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
	};
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
 		//this.game.stage.backgroundColor = 'rgb(204, 255, 204)';
 		this.game.stage.backgroundColor = 'rgb(255, 255, 255)';
 		this.game.time.events.loop(Phaser.Timer.SECOND, createBombs, this);
 	
 	},
 	// Updates all the game's objects.
 	update: function(){
 	}
 };
