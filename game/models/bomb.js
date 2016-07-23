"use strict"
function Bombs(game){
	Phaser.Group.call(this, game);

	this.game = game;
	this.number = 0;
}

Bombs.prototype = Object.create(Phaser.Group.prototype);
Bombs.prototype.constructor = Bombs;

Bombs.prototype.createBomb = function(){
	var text;

	//for (var i = 0; i < 4; i++) {

	//Random var for creation of bombs (not all in the same position)
	var random = this.game.rnd.realInRange(50, 500);
	var bomb = new Bomb(this.game, -100, random);
		
		//Little modification to bombs size
		bomb.width = 50;
		bomb.height = 150;

		//Gravity on x axis
	    bomb.body.gravity.x = 300;
	    //bomb.body.collideWorldBounds = true;

	    //Var style for text
	    var style = {boundsAlignH : "center", boundsAlignV:"middle", align: "center" };

	    //Numbers under each bomb
	    var positionTextX = Math.round(bomb.width * 0.5 );
	    var positionTextY = Math.round(bomb.height * 0.5 );

	    bomb.createRandomNumber(1, 10);
	    text = this.game.add.text(positionTextX, positionTextY, bomb.number , style);
	   	//text.anchor.x = Math.round(text.width * 0.5) / text.width;
	   	text.anchor.setTo = 0.5;
	    bomb.addChild(text);

	    //Another random var for velocity this could be used for levels 
	    var randomVelocity = this.game.rnd.realInRange(2,0);
	    bomb.body.velocity.x = randomVelocity;

	//}

	this.add(bomb);
}

///////////////////

"use strict";

function Bomb(game, x, y) {
	Phaser.Sprite.call(this, game, x, y,'bomb');
	this.game = game;
	this.game.add.existing(this);
	this.immovable = true;
	this.checkWorldBounds = true;
	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	this.number=0;

}

Bomb.prototype = Object.create(Phaser.Sprite.prototype);
Bomb.prototype.constructor = Bomb;

Bomb.prototype.createRandomNumber = function(min, max){
	this.number = this.game.rnd.between(min, max);;
};