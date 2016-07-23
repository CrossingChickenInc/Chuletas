"use strict";

function MathBars(game) {
	Phaser.Group.call(this, game); //Extends Phaser.Group
	this.game = game;
}

MathBars.prototype = Object.create(Phaser.Group.prototype);
MathBars.prototype.constructor = MathBars;

MathBars.prototype.createBars = function(){
	var graphics = this.game.add.graphics(0, 0); //To fill the bars with colors
	var width = this.game.width / (2 * this.game.nBars); //Width of a bar will be determined by the number of bars in-game (not yet implemented for the sprite itself)
	var colors = [0x0A9CD8, 0xFAE927, 0x2AEDA1, 0x7109DA]; //The first 4 colors of the bars (As seen in the Test Pilot Document)

	for (var i=0; i < this.game.nBars; i++){
		//Creates a mathbar object with a unique position and color, and loads it
		var mathbar = new MathBar(this.game, this.game.width/2 + i*width, 0, graphics, colors[i]); 
		mathbar.load();

		this.add(mathbar); //The mathbar object is added to this group
	}

	this.game.world.moveUp(this); //Draws all the sprites on top of the graphics object (colors)
};

// Tests the entered number in all bars of the group 
MathBars.prototype.testNumber = function(number, bombs){ 
	this.callAll('testNumber', null, number, bombs);
	this.checkBars();
};

// Checks if the bars are all hit, if that's the case, refresh their numbers
MathBars.prototype.checkBars = function(){
	if (this.checkAll('killed', true)){
		this.callAll('updateNumber');
	}
};

"use strict";

function MathBar(game, x, y, graphics, color) {
	Phaser.Sprite.call(this, game, x, y, 'bar'); //Extends Phaser.Sprite

	this.game = game;
    this.game.add.existing(this);

    this.immovable = true;
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	
	this.number = 0;

	this.text = []; //2 texts to show the bar's number
	this.textX = x + this.width / 2;
	this.textY = [this.height / 5, 4 * this.height / 5];
	
	this.graphics = graphics;
	this.color = color;

	this.hit = false; //If this bar was hit
}

MathBar.prototype = Object.create(Phaser.Sprite.prototype);
MathBar.prototype.constructor = MathBar;


MathBar.prototype.renderColor = function() {
	this.graphics.beginFill(this.color);
    this.graphics.drawRect(this.x, this.y, this.width, this.height);
	this.graphics.endFill();
};

MathBar.prototype.renderText = function() {
	this.changeNumber(1, 10);
	for (var i = 0; i< 2; i++){
		this.text[i] = game.add.text(this.textX, this.textY[i], this.number.toString());
		this.text[i].x = this.textX - this.text[i].width / 2;
		this.text[i].y = this.textY[i] - this.text[i].height / 2; 
	}
	
};

MathBar.prototype.load = function() {
	this.renderColor();
	this.renderText();
}

MathBar.prototype.changeNumber = function(min, max){
	this.number = Math.floor(Math.random() * (max - min + 1)) + min; //A whole number in the range (min, max)
};

// It changes the graphics and the number when a bar is hit
MathBar.prototype.killBar = function(){ 
	this.graphics.beginFill(0xAFB0B2);
	this.graphics.drawRect(this.x, this.y, this.width, this.height);
	this.graphics.endFill(); 	
		
	for (var i = 0; i< 2; i++){
		this.text[i].setText("0");
	}
	this.number = 0;
};

// Tests if the number entered will affect this bar
MathBar.prototype.testNumber = function(number, bombs){

	if (this.number != 0){ //if this bar wasn't already hit
		this.game.physics.arcade.overlap(this, bombs, testArithmetic, null, this);	//Checks the bombs that are overlaping this bar	
		if (this.hit){
			this.killBar();
		}	
	}

	// Tests the arithmetics between the bar's number and the overlaping bomb's number
	function testArithmetic(bar, bomb) {
		var calculedNumber;
		var option = 0;
		switch (option){
			case 0:
				calculedNumber = bomb.number + bar.number;
			break;
			case 1:
				calculedNumber = bomb.number * bar.number;
			break;
		}
		if (calculedNumber == number){
			bomb.kill();
			bar.hit = true;
		}
	}
};

// Changes the graphics to the initial color, and refreshes the bar's number
MathBar.prototype.updateNumber = function(number){
	this.hit = false;
	this.graphics.beginFill(this.color);
    this.graphics.drawRect(this.x, this.y, this.width, this.height);
	this.graphics.endFill();
	this.changeNumber(1,10);
	for (var i = 0; i< 2; i++){
		this.text[i].setText(this.number.toString());
		this.text[i].x = this.textX - this.text[i].width / 2;
		this.text[i].y = this.textY[i] - this.text[i].height / 2; 
	}
};

