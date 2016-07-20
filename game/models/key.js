// Declaration of Key data.

function Key(game){
	this.game = game;
	this.sprite = null;
	this.colliderSprite = null;
	this.x = game.rnd.between(0, 750);
    this.y = game.rnd.between(0, 550);
    this.keyNumber = game.rnd.between(0,25);
	this.enableBody = true;
	this.positionData = {
	colliderDifference: {x: 4, y: 3}, // distance from collider sprite to sprite
};

	this.keys;
	this.pmap = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
}

// Initializes the Keys sprites.
Key.prototype.render = function(){
	// loads sprites
	this.colliderSprite = this.game.add.sprite(this.x - this.positionData.colliderDifference.x, this.y - this.positionData.colliderDifference.y, 'KeyCollider');
	this.sprite = this.game.add.sprite(this.x, this.y, 'KeyBackground');
	this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

	// sets sprite properties
	this.colliderSprite.alpha = 0; // invisible collider sprite
	this.game.physics.arcade.enable(this.colliderSprite); // enables physics on colliderSprite
	this.game.physics.arcade.enable(this.sprite); // enables physics on sprite

	//this.colliderSprite.immovable = true; // makes it immovable when a collision occurs
	this.colliderSprite.body.collideWorldBounds = true; // colliderSprite cannot exceed the world bounds

	//adding the random letter
	this.game.add.text(this.x + 45, this.y + 15, this.pmap[this.keyNumber], { font: "50px Courier", fill: "#000", tabs: 32 });

	//createEventListeners();
};


// Updates the Key.
Key.prototype.update = function(){}
	
	//this.setBodyPosition(this.colliderSprite.x - this.positionData.colliderDifference.x, this.colliderSprite.y - this.positionData.colliderDifference.x);






