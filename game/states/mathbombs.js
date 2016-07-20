//Function createBombs with random position and velocity
function createBombs() {
	var bombs;
	var text;

	//Group for bombs
	bombs = this.game.add.group();
	bombs.enableBody = true;
	//Creation of bombs
	//for (var i = 0; i < 4; i++) {

		//Random var for creation of bombs (not all in the same position)
		var random = this.game.rnd.realInRange(50, 500);
		var bomb = bombs.create(0, random, 'bomb');
			
		//Little modification to bombs size
		bomb.width = 50;
		bomb.height = 150;

		//Gravity on x axis
        bomb.body.gravity.x = 300;
        bomb.body.collideWorldBounds = true;

        //Var style for text
        var style = {boundsAlignH : "center", boundsAlignV:"middle", align: "center" };

        //Numbers under each bomb
        var positionTextX = Math.round(bomb.width * 0.5 );
        var positionTextY = Math.round(bomb.height * 0.5 );
        text = this.game.add.text(positionTextX, positionTextY,createRandomNumbers(1,10), style);
       	//text.anchor.x = Math.round(text.width * 0.5) / text.width;
       	text.anchor.setTo = 0.5;
        bomb.addChild(text);

        //Another random var for velocity this could be used for levels 
        var randomVelocity = this.game.rnd.realInRange(2,0);
        bomb.body.velocity.x = randomVelocity;
	//};
}
//Create random Numbers
function createRandomNumbers(min, max){
	var randomNumber = this.game.rnd.realInRange(min,max);
	var numberRounded = Math.round(randomNumber);
	return numberRounded;
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
 		this.game.stage.backgroundColor = 'rgb(255, 255, 255)';
 		this.game.time.events.loop(Phaser.Timer.SECOND, createBombs, this);
 		//this.game.time.events.loop(2000, createBombs, this);

		var graphics = this.game.add.graphics(0, 0);
		var colors = [0x0A9CD8, 0xFAE927, 0x2AEDA1, 0x7109DA];

		this.mathBars = [];
		var width = this.game.width / (2 * this.game.nBars);
		
		for (var i=0; i < this.game.nBars; i++){
			this.mathBars[i] = new MathBar(this.game, this.game.width/2 + i*width, 0, width, this.game.height, graphics, colors[i]);
			this.mathBars[i].load();
		}

		this.mathNumber = new MathNumber(this.game, 100, 100);
		this.mathNumber.load();
		
	},
	// Updates all the game's objects.
	update: function(){
		this.mathNumber.update();
	}

}