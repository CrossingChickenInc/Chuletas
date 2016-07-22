function Clock(game){
	this.game = game;
	this.timer = null;
	this.total = 0;
}

Clock.prototype.render = function(){

 //  Create our Timer
    this.timer = game.time.create(false);

    //  Set a TimerEvent to occur after a second
    this.timer.loop(Phaser.Timer.SECOND, this.updateCounter, this);

    //  Start the timer running - this is important!
    this.timer.start();
}

Clock.prototype.updateCounter = function(){
	this.total++;

}
Clock.prototype.load = function(){
	this.render();
	this.updateCounter();
}