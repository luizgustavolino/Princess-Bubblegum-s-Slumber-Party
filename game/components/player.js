game.player = {};

var plr = null;

game.player.setup = function(){
	game.player.setChar(game.chars.bublegun);
}

game.player.setChar = function(_char){
	plr = _char;
}

game.player.destroy = function() {
	
}

game.player.update = function(_frame){
	
	if(!plr.jumping.life){
		if(game.dpad.keys.alt.state != game.dpad.stateKeyPressed){
			
			if(!plr.lowered && game.dpad.keys.right.state == game.dpad.stateKeyPressed){
				if(enm.position.x > plr.position.x+plr.size.w){
					plr.position.x += plr.speed.forward;
				}
			}
			
			if(!plr.lowered && game.dpad.keys.left.state == game.dpad.stateKeyPressed){
				plr.position.x -= plr.speed.backward;
			}
			
			if(!plr.lowered && game.dpad.keys.up.state == game.dpad.stateKeyPressed){
				plr.jumping.life = 100;
			}
			
			if(game.dpad.keys.down.state == game.dpad.stateKeyPressed){
				plr.lowered = true;
			}else{
				plr.lowered = false;
			}
			
		}
	}else{
	
		plr.jumping.life -= plr.jumping.speed;
		if(plr.jumping.life < 0) plr.jumping.life = 0;
		
		if(game.dpad.keys.right.state == game.dpad.stateKeyPressed){
			if(enm.position.x > plr.position.x+plr.size.w){
				plr.position.x += plr.speed.forward*plr.jumping.movementFreedom;
			}
		}
		
		if(game.dpad.keys.left.state == game.dpad.stateKeyPressed){
			plr.position.x -= plr.speed.backward*plr.jumping.movementFreedom;
		}
		
	}
	
}

game.player.draw = function(_frame){
	
	var jumpHeight = 0, playerHeight = plr.size.h, playerY = plr.position.y;
	
	if(plr.lowered) {
		playerHeight /= 2;
		playerY += playerHeight;
	}
	
	if(plr.jumping.life){
		jumpHeight = (100-Math.pow((plr.jumping.life/5)-10, 2))*plr.jumping.factor;
	}
	
	viewport.fillStyle = plr.hitAreaColor;
	viewport.fillRect(plr.position.x, playerY-jumpHeight, plr.size.w, playerHeight);
	
}



// footer
console.log("bootstrap: player ready");