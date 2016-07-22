"use strict";

function Bomb(game) {
	this.game = game;
	this.timer = null;
	this.total = 0;
}
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
        text = this.game.add.text(positionTextX, positionTextY, this.createRandomNumbers(1,10) , style);
       	//text.anchor.x = Math.round(text.width * 0.5) / text.width;
       	text.anchor.setTo = 0.5;
        bomb.addChild(text);

        //Another random var for velocity this could be used for levels 
        var randomVelocity = this.game.rnd.realInRange(2,0);
        bomb.body.velocity.x = randomVelocity;

        //this.game.time.events.loop(Phaser.Timer.SECOND, this.createBombs(), this);
      
	//}
}
Bomb.prototype.load = function() {
	this.createBombs();
}