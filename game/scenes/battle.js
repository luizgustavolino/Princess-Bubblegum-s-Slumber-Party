game.scenes.battle = {};

game.scenes.battle.draw = function(_frame){
	game.player.draw();
	game.enemy.draw();
}

game.scenes.battle.update = function(_frame){
	game.player.update();
	game.enemy.update();
}

game.scenes.battle.onEnter = function(_frame){
	game.player.setup();
	game.enemy.setup();
}

game.scenes.battle.onExit = function(_frame){
	game.player.destroy();
	game.enemy.destroy();
}