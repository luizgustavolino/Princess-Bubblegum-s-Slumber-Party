game.player = {};

var plr = null;

game.player.setup = function(){
	game.player.setChar(game.chars.marceline());
}

game.player.setChar = function(_char){
	plr = _char;
}

game.player.destroy = function() {
	
}

game.player.update = function(_frame){
	
	/*
	game.chars.stateIdle 		= 0;
	game.chars.stateLowered 	= 1;
	game.chars.stateJump		= 2;
	game.chars.stateForward 	= 3;
	game.chars.stateBackward 	= 4;
	*/
	
	plr.status = game.chars.stateIdle;
	
	if(!plr.jumping.life){
		if(game.dpad.keys.alt.state != game.dpad.stateKeyPressed){
			
			if(!plr.lowered.active && game.dpad.keys.right.state == game.dpad.stateKeyPressed){
				if(enm.position.x > plr.position.x+plr.size.w){
					plr.position.x += plr.speed.forward;
					plr.status = game.chars.stateForward;
				}
			}
			
			if(!plr.lowered.active && game.dpad.keys.left.state == game.dpad.stateKeyPressed){
				if(plr.position.x > game.scenes.battle.field.arenaMarginLeft()){
					plr.position.x -= plr.speed.backward;
					plr.status = game.chars.stateBackward;
				}
			}
			
			if(!plr.lowered.active && game.dpad.keys.up.state == game.dpad.stateKeyPressed){
				plr.jumping.life = 100;
			}else{
				plr.jumping.animationFrame = 0;
			}
			
			if(game.dpad.keys.down.state == game.dpad.stateKeyPressed){
				plr.lowered.active = true;
				plr.lowered.animationFrame += 1;
				plr.status = game.chars.stateLowered;
			}else{
				plr.lowered.active = false;
				plr.lowered.animationFrame = 0;
			}
			
		}
	}else{
		
		plr.status = game.chars.stateJump;
		plr.jumping.life -= plr.jumping.speed;
		plr.jumping.animationFrame += 1;
		
		if(plr.jumping.life < 0) plr.jumping.life = 0;
		
		if(game.dpad.keys.right.state == game.dpad.stateKeyPressed){
			if(enm.position.x > plr.position.x+plr.size.w){
				plr.position.x += plr.speed.forward*plr.jumping.movementFreedom;
			}
		}
		
		if(game.dpad.keys.left.state == game.dpad.stateKeyPressed){
			if(plr.position.x > game.scenes.battle.field.arenaMarginLeft()){
				plr.position.x -= plr.speed.backward*plr.jumping.movementFreedom;
			}
		}
		
	}
	
}

game.player.draw = function(_frame){					
	plr.draw(_frame, false);
}



// footer
console.log("bootstrap: player ready");