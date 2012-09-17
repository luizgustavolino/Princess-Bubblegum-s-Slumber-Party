// Engine.JS

game.engine = {};

game.engine.paused 			= false;
game.engine.frameCount 		= 0;
game.engine.timer 			= null;
game.engine.perFrameDelay 	= 1000.0/32.0;

game.engine.mute			= false;

game.engine.scene = null;

game.engine.bootstrap = function(){
	game.resources.harvest();
	game.engine.timer = setInterval(game.engine.loop, game.engine.perFrameDelay);
	game.engine.showScene(game.scenes.title);
	game.dpad.setup();
	
}

game.engine.showScene = function(_scene){
    
    if(game.engine.scene && game.engine.scene.onExit){
        game.engine.scene.onExit();
    }
	
    game.engine.scene = _scene;
    
    if(game.engine.scene.onEnter){
        game.engine.scene.onEnter();
    }
    
}

game.engine.clear = function(){
    game.resources.canvas.clearRect(0, 0, game.resources.contextDom.width, game.resources.contextDom.height);
}

game.engine.loop = function(){
	

	    if(!game.engine.paused){
	        game.engine.frameCount += 1;
	    }
	    
	    game.engine.clear();
	    
	    if(game.engine.scene){
	        game.engine.scene.update(game.engine.frameCount);
	        game.engine.scene.draw(game.engine.frameCount);
	    }
	    
	    game.dpad.update();
	
}

game.engine.setMute = function (_mute) {

	for(var tag in game.resources.audio){
	    var audioAsset = game.resources.audio[tag];
		audioAsset.muted = _mute;
	}
	
	game.engine.mute = _mute;
}

game.engine.fx = function (_name) {
	game.resources.audio[_name].currentTime = 0;
	game.resources.audio[_name].play();
	
}

// footer
console.log("bootstrap: engine ready");