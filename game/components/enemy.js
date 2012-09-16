game.enemy = {};

// current enemy
var enm = null;

game.enemy.setup = function(){
	game.enemy.setChar(game.chars.marceline);
}

game.enemy.destroy = function() {
	
}

game.enemy.setChar = function(_char){
	enm = _char;
}

game.enemy.update = function(_frame){
	// awesome IA
	if(Math.abs(plr.position.x - enm.position.x) > 100){
		enm.position.x -= enm.speed.forward;
	}else if(Math.abs(plr.position.x - enm.position.x) < 80){
		enm.position.x += enm.speed.backward;
	}
}

game.enemy.draw = function(_frame){
	
	viewport.fillStyle = enm.hitAreaColor;
	viewport.fillRect(enm.position.x, enm.position.y,
					  enm.size.w, enm.size.h);
	
}
