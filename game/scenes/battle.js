game.scenes.battle = {};

game.scenes.battle.charMarceline = 1;
game.scenes.battle.charBubblegun = 2;

//game.scenes.battle.hero = game.scenes.battle.charBubblegun;
game.scenes.battle.hero = game.scenes.battle.charMarceline;

game.scenes.battle.field = {
	
	arenaMargin: 20,

	arenaLeftCharStartx: function() {
		return 2*game.resources.contextDom.width/6;
	},
	
	arenaRightCharStartx: function () {
		return 4*(game.resources.contextDom.width/6);
	},
	
	arenaMarginLeft: function () {
		return game.scenes.battle.field.arenaMargin;
	},
	arenaMarginRight: function(){
		return game.resources.contextDom.width - game.scenes.battle.field.arenaMargin;
	}
}

game.scenes.battle.draw = function(_frame){
	
	var bgFrame = {x:0, y:0,
		w:game.resources.background.width/2,
		h:game.resources.background.height};
	
	if(_frame%10>5) bgFrame.x = game.resources.background.width/2;
	
	viewport.drawImage(game.resources.background,
					bgFrame.x, bgFrame.y, bgFrame.w, bgFrame.h,
					0, 0, bgFrame.w, bgFrame.h);
	
	game.feather.drawBG();
	
	game.player.draw(_frame);
	game.enemy.draw(_frame);
	
	game.feather.drawFG();
	
	game.hud.draw(_frame);
	
	if(plr.life <= 0) viewport.drawImage(game.resources.endbox_loose,101,57);
	else if(enm.life <= 0) viewport.drawImage(game.resources.endbox_win,101,57);
	
	// jigger
	viewport.drawImage(game.resources.jiggler, game.engine.mute?62:0,0,62,47, 0,433,62,47);
	
}

game.scenes.battle.update = function(_frame){
	game.player.update(_frame);
	game.enemy.update(_frame);
	game.hud.update(_frame);
	game.feather.update(_frame);
}

game.scenes.battle.onEnter = function(_frame){
	game.player.setup();
	game.enemy.setup();
	
	game.hud.create();
	
	plr.position.x =  game.scenes.battle.field.arenaLeftCharStartx()-plr.size.w;
	enm.position.x =  game.scenes.battle.field.arenaRightCharStartx();
	
	game.resources.contextDom.addEventListener('mouseup', game.scenes.battle.handleMouseUp, false);
	
}

game.scenes.battle.onExit = function(_frame){

	game.resources.contextDom.removeEventListener('mouseup', game.scenes.battle.handleMouseUp, false);

	game.player.destroy();
	game.enemy.destroy();
}


// events

game.scenes.battle.handleMouseUp = function (e) {

	var startX, startY;
	startX = e.pageX - this.offsetLeft;
	startY = e.pageY - this.offsetTop;


	if(startX > 0 && startX < 62 && startY > 433 && startY < 480){
		game.engine.setMute(!game.engine.mute);
	}else if(plr.life <= 0 || enm.life <= 0){
		game.engine.showScene(game.scenes.title);
		game.engine.fx("fxSelect");
	}
	
}






