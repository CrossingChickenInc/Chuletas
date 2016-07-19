"use strict";

function MathNumber(game, x, y) {
	this.game = game;
	this.x = x;
	this.y = y;
	
	this.number = 0;

	this.text = null;
	this.pressed = [];
	this.numpad = [Phaser.Keyboard.NUMPAD_0, Phaser.Keyboard.NUMPAD_1,
					Phaser.Keyboard.NUMPAD_2, Phaser.Keyboard.NUMPAD_3,
					Phaser.Keyboard.NUMPAD_4, Phaser.Keyboard.NUMPAD_5,
					Phaser.Keyboard.NUMPAD_6, Phaser.Keyboard.NUMPAD_7,
					Phaser.Keyboard.NUMPAD_8, Phaser.Keyboard.NUMPAD_9]
	this.numbers = [Phaser.Keyboard.ZERO, Phaser.Keyboard.ONE,
					Phaser.Keyboard.TWO, Phaser.Keyboard.THREE,
					Phaser.Keyboard.FOUR, Phaser.Keyboard.FIVE,
					Phaser.Keyboard.SIX, Phaser.Keyboard.SEVEN,
					Phaser.Keyboard.EIGHT, Phaser.Keyboard.NINE]
}

MathNumber.prototype.renderText = function() {
	this.text = game.add.text(this.x, this.y, this.number.toString());
	this.text.x = this.x - this.text.width;
	this.text.y = this.y - this.text.height;
	
};

MathNumber.prototype.load = function() {
	this.renderText();
}

MathNumber.prototype.changeNumber = function(number){
	if (!this.pressed[number]){
		this.number = (this.number * 10 + number)%1000;
		this.text.setText(this.number.toString());
		this.text.x = this.x - this.text.width;
		this.pressed[number] = true;
	}
};

MathNumber.prototype.update = function(){
	this.handleInput();
};

MathNumber.prototype.handleInput = function(){
	for (var i=0; i<10; i++){
		if (game.input.keyboard.isDown(this.numpad[i]) || game.input.keyboard.isDown(this.numbers[i])){
		this.changeNumber(i);
		} else {
			this.pressed[i] = false;
		}
	}
};
