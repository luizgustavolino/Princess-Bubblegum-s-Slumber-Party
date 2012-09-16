game.player = {};

game.player.position = {x:100,y:300};
game.player.size 	 = {w:40,h:90};
game.player.speed	 = 2.4;
game.player.hitAreaColor = "#C0DE00";

game.player.setup = function(){
	
}

game.player.destroy = function() {
	
}

game.player.update = function(_frame){
	if(game.dpad.keys.alt.state != game.dpad.stateKeyPressed){
		if(game.dpad.keys.right.state == game.dpad.stateKeyPressed){
			game.player.position.x += game.player.speed;
		}else if(game.dpad.keys.left.state == game.dpad.stateKeyPressed){
			game.player.position.x -= game.player.speed;
		}
	}
}

game.player.draw = function(_frame){
	
	viewport.fillStyle = game.player.hitAreaColor;
	viewport.fillRect(game.player.position.x, game.player.position.y,
					  game.player.size.w, game.player.size.h);
	
}