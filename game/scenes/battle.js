game.scenes.battle = {};

game.scenes.battle.charMarceline = 1;
game.scenes.battle.charBubblegun = 2;

game.scenes.battle.hero = game.scenes.battle.charBubblegun;
//game.scenes.battle.hero = game.scenes.battle.charMarceline;

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
	game.player.draw(_frame);
	game.enemy.draw(_frame);
}

game.scenes.battle.update = function(_frame){
	game.player.update(_frame);
	game.enemy.update(_frame);
}

game.scenes.battle.onEnter = function(_frame){
	game.player.setup();
	game.enemy.setup();
	
	plr.position.x =  game.scenes.battle.field.arenaLeftCharStartx()-plr.size.w;
	enm.position.x =  game.scenes.battle.field.arenaRightCharStartx();
}

game.scenes.battle.onExit = function(_frame){
	game.player.destroy();
	game.enemy.destroy();
}