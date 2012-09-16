game.player = {};

var plr = null;

game.player.setup = function(){
	if(game.scenes.battle.hero == game.scenes.battle.charBubblegun){
		game.player.setChar(game.chars.bublegun());
	}else{
		game.player.setChar(game.chars.marceline());
	}
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
	
	var atacking = 	(game.dpad.keys.actionUp.state == game.dpad.stateKeyDown) || 
					/*(game.dpad.keys.actionDown.state == game.dpad.stateKeyDown) ||*/
					(game.dpad.keys.actionRight.state == game.dpad.stateKeyDown);
	
	//begin attack, only if not jumping
	if((atacking || plr.attack.active) && plr.status != game.chars.stateJump){
	
		var atkAsset = null;
		
		if(game.dpad.keys.actionRight.state == game.dpad.stateKeyDown) {
			atkAsset = plr.assets.atkMiddle;
		}
		
		if(game.dpad.keys.actionUp.state == game.dpad.stateKeyDown) {
			atkAsset = plr.assets.atkUp;
		}
		
		//if(game.dpad.keys.actionRight.state == game.dpad.stateKeyDown) atkAsset = plr.assets.atkMiddle;
		//if(game.dpad.keys.actionRight.state == game.dpad.stateKeyDown) atkAsset = plr.assets.atkMiddle;
		
		if(!plr.attack.active){
			
			plr.attack.active = true;
			atkAsset.onAnimationFinish = function () {
				plr.attack.active = false;		
			}
			
			if(atkAsset == plr.assets.atkMiddle){
				plr.status = game.chars.stateAtkMiddle;
			}else if(atkAsset == plr.assets.atkUp){
				plr.status = game.chars.stateAtkUp;
			}
		}		
		
	// not attacking
	}else{
	
		plr.status = game.chars.stateIdle;
	
		//not jumping
		if(!plr.jumping.life){
		
			//walk forward
			if(!plr.lowered.active && game.dpad.keys.right.state == game.dpad.stateKeyPressed){
				if(enm.position.x > plr.position.x+plr.size.w){
					plr.position.x += plr.speed.forward;
					plr.status = game.chars.stateForward;
				}
			}
			
			// walk backward
			if(!plr.lowered.active && game.dpad.keys.left.state == game.dpad.stateKeyPressed){
				if(plr.position.x > game.scenes.battle.field.arenaMarginLeft()){
					plr.position.x -= plr.speed.backward;
					plr.status = game.chars.stateBackward;
				}
			}
			
			// start jump
			if(!plr.lowered.active && game.dpad.keys.up.state == game.dpad.stateKeyPressed){
				plr.jumping.life = 100;
			}
			
			// lowered
			if(game.dpad.keys.down.state == game.dpad.stateKeyPressed){
				plr.lowered.active = true;
				plr.status = game.chars.stateLowered;
			// not lowered
			}else{
				plr.lowered.active = false;
			}
			
		// jumping
		}else{
			
			plr.status = game.chars.stateJump;
			plr.jumping.life -= plr.jumping.speed;
			
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
	
}

game.player.draw = function(_frame){					
	plr.draw(_frame, false);
}



// footer
console.log("bootstrap: player ready");