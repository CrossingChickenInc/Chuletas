"use strict"
function Bombs(game){

	this.game = game;
	this.number = 0;
}

Bombs.prototype.createBomb = function(){
	var bomb;
	this.bomb = new Bomb(this.game);
	this.bomb.createBombs();
	//this.add(bomb);
}

///////////////////

"use strict";

function Bomb(game) {
	Phaser.Sprite.call(this, game, 'bomb');
	this.game = game;
	this.game.add.existing(this);
	this.immovable = true;
	this.game.physics.enable(this, Phaser.Physics.ARCADE);

	this.number=0;

}

Bomb.prototype = Object.create(Phaser.Sprite.prototype);
Bomb.prototype.constructor = Bomb;


Bomb.prototype.createRandomNumbers = function(min, max){
	var randomNumber = this.game.rnd.realInRange(min,max);
	var numberRounded = Math.round(randomNumber);
	return numberRounded;
};

Bomb.prototype.createBombs = function(){
	var bombs; 
	var text;

	bombs = this.game.add.group();
	bombs.enableBody = true;

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

	    text = this.game.add.text(positionTextX, positionTextY, this.number= this.createRandomNumbers(1,10) , style);
	   	//text.anchor.x = Math.round(text.width * 0.5) / text.width;
	   	text.anchor.setTo = 0.5;
	    bomb.addChild(text);

	    //Another random var for velocity this could be used for levels 
	    var randomVelocity = this.game.rnd.realInRange(2,0);
	    bomb.body.velocity.x = randomVelocity;

	//}
}
Bomb.prototype.load = function() {
	this.createBombs();
}