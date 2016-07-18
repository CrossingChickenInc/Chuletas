"use strict";

function MathBar(game, x, y, width, height, graphics, color) {
	this.game = game;
	
	this.sprite = null;
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
}

MathBar.prototype.render = function() {
	this.graphics.beginFill(this.color);
    this.graphics.drawRect(this.x, this.y, this.width, this.height);
	this.graphics.endFill();
	this.sprite = this.game.add.sprite(this.x, this.y, 'basicFortress');

	this.sprite.immovable = true; // makes it immovable when a collision occurs
	
	this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);	
};

MathBar.prototype.renderText = function() {
	this.changeNumber(1, 10);
	for (var i = 0; i< 2; i++){
		this.text[i] = game.add.text(this.textX, this.textY[i], this.number.toString());
		this.text[i].x -= this.text[i].width / 2;
		this.text[i].y -= this.text[i].height / 2; 
	}
	
};

MathBar.prototype.load = function() {
	this.render();
	this.renderText();
}

MathBar.prototype.changeNumber = function(min, max){
	this.number = Math.floor(Math.random() * (max - min + 1)) + min; 
};