var States = {};

// Loads all the necesasary assets before starting the game.
States.Boot = {
	// Loads the assets.
	preload: function(){
		this.game.load.image('dukeCollider', 'assets/images/characters/collider.png');
		this.game.load.image('blockH', 'assets/images/backgrounds/blockH.png');
		this.game.load.image('block', 'assets/images/backgrounds/block.png');
		this.game.load.spritesheet('duke', 'assets/images/characters/duke.png', 23, 43);
		
		this.game.load.image('map', 'assets/images/backgrounds/yourmommasmap.png');

		this.game.load.spritesheet('portal', 'assets/images/misc/portal.png', 123, 123);
	},
	// Starts the next state.
	create: function(){
		this.state.start('Play');
	}
};
