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

game.player.takeDamage = function () {
	
	plr.hit.timer = plr.hit.value;
	plr.life -= 10;
	
	if(plr.life <= 0){
		plr.life = 0;
		game.engine.fx("fxLost");
	}
	
	var charCenter = plr.position.center();
	game.feather.addExplosionAt(charCenter.x, charCenter.y);
	game.engine.fx("fxHit");
}

game.player.update = function(_frame){
	
	
	if(plr.life <= 0 || enm.life <= 0){
	
		// DEAD x_x
		if(plr.life <= 0) plr.status = game.chars.stateDead;
		else plr.status = game.chars.stateWin;
		
	}else{
	
		var atacking = 	(game.dpad.keys.actionUp.state == game.dpad.stateKeyDown) || 
						(game.dpad.keys.actionDown.state == game.dpad.stateKeyDown) ||
						(game.dpad.keys.actionRight.state == game.dpad.stateKeyDown);
		
		// if have been hit, wait
		if(plr.hit.timer){
		
			plr.hit.timer -= 1;
			plr.attack.active = false;
			
			if(plr.position.x > game.scenes.battle.field.arenaMarginLeft()){
				plr.position.x -= plr.speed.backward;
			}
			
			if(plr.status != game.chars.stateHitUp && plr.status != game.chars.stateHitDown
			&& plr.status != game.chars.stateHitMiddle){
				if(plr.status == game.chars.stateJump) plr.status = game.chars.stateHitUp;
				else if(plr.status == game.chars.stateLowered) plr.status = game.chars.stateHitDown;
				else plr.status = game.chars.stateHitMiddle;
			}
		
		}
		//begin attack, only if not jumping
		else if((atacking || plr.attack.active) && plr.status != game.chars.stateJump){
		
			var atkAsset = null;
			
			if(game.dpad.keys.actionRight.state == game.dpad.stateKeyDown) atkAsset = plr.assets.atkMiddle;
			if(game.dpad.keys.actionUp.state == game.dpad.stateKeyDown) atkAsset = plr.assets.atkUp;
			if(game.dpad.keys.actionDown.state == game.dpad.stateKeyDown) atkAsset = plr.assets.atkDown;
			
			if(!plr.attack.active){
				
				plr.attack.active = true;
				
				if(atkAsset == plr.assets.atkMiddle) plr.status = game.chars.stateAtkMiddle;
				else if(atkAsset == plr.assets.atkUp) plr.status = game.chars.stateAtkUp;
				else if(atkAsset == plr.assets.atkDown) plr.status = game.chars.stateAtkDown;
				
				var enemyPreventAttack = game.enemy.willDefend(plr.status);
				
				atkAsset.onAnimationFinish = function () {
					plr.attack.active = false;
				}
				
				atkAsset.onAnimationTrigger = function () {
					if(!enemyPreventAttack) {
						game.enemy.takeDamage();
					}
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
						if(_frame % 8 == 0 && game.scenes.battle.hero == game.scenes.battle.charBubblegun){
							game.engine.fx("fxStepforward");
						}
						plr.position.x += plr.speed.forward;
						plr.status = game.chars.stateForward;
					}
				}
				
				// walk backward
				if(!plr.lowered.active && game.dpad.keys.left.state == game.dpad.stateKeyPressed){
					if(plr.position.x > game.scenes.battle.field.arenaMarginLeft()){
						if(_frame % 8 == 0 && game.scenes.battle.hero == game.scenes.battle.charBubblegun){
							game.engine.fx("fxStepbackward");
						}
						plr.position.x -= plr.speed.backward;
						plr.status = game.chars.stateBackward;
					}
				}
				
				// start jump
				if(!plr.lowered.active && game.dpad.keys.up.state == game.dpad.stateKeyPressed){
					plr.jumping.life = 100;
					game.engine.fx("fxJump");
				}
				
				// lowered
				if(game.dpad.keys.down.state == game.dpad.stateKeyPressed){
					if(!plr.lowered.active) game.engine.fx("fxCrouch");
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
	
}

game.player.draw = function(_frame){					
	plr.draw(_frame, false);
}



// footer
console.log("bootstrap: player ready");