"use strict";

function MathBar(game, x, y, width, height, graphics, color) {
	Phaser.Sprite.call(this, game, x, y, 'bar');

	this.game = game;
    this.game.add.existing(this);

    this.immovable = true;
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.number = 0;

	this.text = [];
	this.textX = this.x + width / 2;
	this.textY = [this.height / 5, 4 * this.height / 5];
	
	this.graphics = graphics;
	this.color = color;

	this.killed = false;


}

MathBar.prototype = Object.create(Phaser.Sprite.prototype);
MathBar.prototype.constructor = MathBar;

MathBar.prototype.render = function() {
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
	this.render();
	this.renderText();
}

MathBar.prototype.changeNumber = function(min, max){
	this.number = Math.floor(Math.random() * (max - min + 1)) + min; 
};

MathBar.prototype.killBar = function(){
	this.graphics.beginFill(0xAFB0B2);
	this.graphics.drawRect(this.x, this.y, this.width, this.height);
	this.graphics.endFill(); 	
		
	for (var i = 0; i< 2; i++){
		this.text[i].setText("0");
	}
	this.killed = true;
};

MathBar.prototype.testNumber = function(number){
	// Function to catch all the overlaping bombs here

	if (!this.killed && this.number == number){
		this.killBar();
	}
};

MathBar.prototype.testArithmetic = function(bomb, number){
	/*
		var calculedNumber;
		var option = 0;
		switch (option){
			case 0:
				calculedNumber = bomb.number + this.number;
			break;
			case 1:
				calculedNumber = bomb.number * this.number;
			break;
		}
		if (calculedNumber == number){
			this.killBar();
		}
	*/
};

MathBar.prototype.updateNumber = function(number){
	this.killed = false;
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

