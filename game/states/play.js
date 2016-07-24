// Principal game state, all the fun begins here.
States.Play = {
	// Sets the game's basic configurations.
	init: function(){
		this.game.renderer.renderSession.roundPixels = true;
		this.physics.startSystem(Phaser.Physics.ARCADE);
	},
	// Starts the game.
	create: function(){
		// Sets the game background with file associated to 'map' on boot.js.
		this.game.background = this.game.add.sprite(0, 0, 'map');

		// Sets the world bounds.
		this.game.world.setBounds(0, 0, 800, 600);

		// Initialiazes the cursor keys.
		this.game.cursors = game.input.keyboard.createCursorKeys();

		// Creates and loads a Player object.
    	game.player = new Player(window.game);
		game.player.load();
		game.physics.arcade.enable(game.player);

		// Sets the camera to follow the player.
		this.game.camera.follow(this.game.player.colliderSprite);

		game.portals = [];
		game.portals.push(new Portal(window.game, 200, 180, 'ReticleState'));
		game.portals.push(new Portal(window.game, 300, 180, 'Play'));
		game.portals.push(new Portal(window.game, 400, 180, 'Play'));
		
		var style = { font: "14px", fill: "#ffffff" };
		game.add.text(200, 200, "RETICLE", style);
		game.add.text(305, 200, "BOMBS", style);
		game.add.text(410, 200, "KEYS", style);
	},
	// Updates all the game's objects.
	update: function(){
		// Updates the player.
		game.player.update(game.player);
		game.portals.every(portal => portal.update());
	}

};
