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

	this.createEventListeners();
};


// Updates the Key.
Key.prototype.update = function(){
	//this.setBodyPosition(this.colliderSprite.x - this.positionData.colliderDifference.x, this.colliderSprite.y - this.positionData.colliderDifference.x);
}
	
	
// Implement KeyBoard Events
Key.prototype.createEventListeners = function() {

    keys = game.input.keyboard.addKeys(
        {

            'key0': Phaser.Keyboard.A,
            'key1': Phaser.Keyboard.B,
            'key2': Phaser.Keyboard.C,
            'key3': Phaser.Keyboard.D,
            'key4': Phaser.Keyboard.E,
            'key5': Phaser.Keyboard.F,
            'key6': Phaser.Keyboard.G,
            'key7': Phaser.Keyboard.H,
            'key8': Phaser.Keyboard.I,
            'key9': Phaser.Keyboard.J,
            'key10': Phaser.Keyboard.K,
            'key11': Phaser.Keyboard.L,
            'key12': Phaser.Keyboard.M,
            'key13': Phaser.Keyboard.N,
            'key14': Phaser.Keyboard.O,
            'key15': Phaser.Keyboard.P,
            'key16': Phaser.Keyboard.Q,
            'key17': Phaser.Keyboard.R,
            'key18': Phaser.Keyboard.S,
            'key19': Phaser.Keyboard.T,
            'key20': Phaser.Keyboard.U,
            'key21': Phaser.Keyboard.V,
            'key22': Phaser.Keyboard.W,
            'key23': Phaser.Keyboard.X,
            'key24': Phaser.Keyboard.Y,
            'key25': Phaser.Keyboard.Z
        }
    );

    for (var i = 0; i < 26; i++)
    {
        keys['key' + i].onDown.add(keyDown,this, 0,i);
    }
}

//
function keyDown(n,p) {

    /*if (typeof p !== 'undefined')
    {
        //  It came from a Keyboard Event, in which case index is in p, not i.
        n = p;
    }*/

    if (p == this.keyNumber)
    {
    	this.game.add.text(10, 10, "INPUT VERIFICATION" + " === KeyNumber: " + this.keyNumber, { font: "30px Courier", fill: "#FFD700", tabs: 32 });
	}
	else 
	{
		this.game.add.text(10, 500, "INPUT ERROR: " + p + " === KeyNumber: " + this.keyNumber, { font: "30px Courier", fill: "#FFD700", tabs: 32 });
	}
}




