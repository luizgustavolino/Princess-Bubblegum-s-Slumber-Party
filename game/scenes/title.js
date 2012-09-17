game.scenes.title = {};

game.scenes.curretHero = null;

game.scenes.title.draw = function(_frame){
	viewport.drawImage(game.resources.titlescreen,0,0);
	
	
	viewport.drawImage(game.resources.select_bubble, 150,240);
	viewport.drawImage(game.resources.select_marce, 334,240);
	
	if(game.scenes.curretHero == game.scenes.battle.charBubblegun){
		viewport.drawImage(game.resources.selection, 150,240);
	}
	
	if(game.scenes.curretHero == game.scenes.battle.charMarceline){
		viewport.drawImage(game.resources.selection, 334,240);
	}
	
	// jigger
	viewport.drawImage(game.resources.jiggler, game.engine.mute?62:0,0,62,47, 0,433,62,47);
	
}

game.scenes.title.update = function(_frame){

	if(game.dpad.keys.right.state == game.dpad.stateKeyPressed) game.scenes.curretHero = game.scenes.battle.charMarceline;
	if(game.dpad.keys.left.state == game.dpad.stateKeyPressed) game.scenes.curretHero = game.scenes.battle.charBubblegun;
	
	var ready = 	(game.dpad.keys.actionUp.state == game.dpad.stateKeyDown) || 
					(game.dpad.keys.actionDown.state == game.dpad.stateKeyDown) ||
					(game.dpad.keys.actionRight.state == game.dpad.stateKeyDown);
					
	if(ready) game.scenes.title.beginAction();
	
}

game.scenes.title.onEnter = function(_frame){
	game.resources.contextDom.addEventListener('mousemove', game.scenes.title.handleMouseMove, false);
	game.resources.contextDom.addEventListener('mouseup', game.scenes.title.handleMouseUp, false);
}

game.scenes.title.onExit = function(_frame){
	game.resources.contextDom.removeEventListener('mousemove', game.scenes.title.handleMouseMove, false);
	game.resources.contextDom.removeEventListener('mouseup', game.scenes.title.handleMouseUp, false);
}

game.scenes.title.beginAction = function () {
	if(game.scenes.curretHero){
		game.scenes.battle.hero = game.scenes.curretHero;
		game.engine.showScene(game.scenes.battle);
		game.scenes.curretHero = null;
		
		game.engine.fx("fxSelect");
	}
}

game.scenes.title.handleMouseUp = function (e) {
	
	var startX, startY;
	startX = e.pageX - this.offsetLeft;
	startY = e.pageY - this.offsetTop;

	if(startX > 150 && startX < 150+160 && startY > 240 && startY < 240+160){
		game.scenes.title.beginAction()
	}else if(startX > 334 && startX < 334+160 && startY > 240 && startY < 240+160){
		game.scenes.title.beginAction();
	}
	
	if(startX > 0 && startX < 62 && startY > 433 && startY < 480){
		game.engine.setMute(!game.engine.mute);
	}
}

// events
game.scenes.title.handleMouseMove = function(e){
	
	var startX, startY;
	startX = e.pageX - this.offsetLeft;
	startY = e.pageY - this.offsetTop;
	
	if(startX > 150 && startX < 150+160 && startY > 240 && startY < 240+160){
		game.scenes.curretHero = game.scenes.battle.charBubblegun;
	}else if(startX > 334 && startX < 334+160 && startY > 240 && startY < 240+160){
		game.scenes.curretHero = game.scenes.battle.charMarceline;
	}else{
		game.scenes.curretHero = null;
	}
	
}