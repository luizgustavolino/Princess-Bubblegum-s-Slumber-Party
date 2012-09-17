game.enemy = {};

// current enemy
var enm = null;

game.enemy.setup = function(){
	if(game.scenes.battle.hero == game.scenes.battle.charBubblegun){
		game.enemy.setChar(game.chars.marceline());
	}else{
		game.enemy.setChar(game.chars.bublegun());
	}
}

game.enemy.destroy = function() {
	
}

game.enemy.setChar = function(_char){
	enm = _char;
}

game.enemy.willDefend = function (_type) {

	var charsDistance = Math.abs(plr.position.x - enm.position.x), hit = false;
	
	if(charsDistance < 200 && enm.status != game.chars.stateLowered && enm.status != game.chars.stateJump){
		if(_type == game.chars.stateAtkUp){
			if(Math.random() < enm.ia.lowerDefenseChance){
				enm.ia.lowerDefenseTimer = 20;
				game.engine.fx("fxCrouch");
			}else hit = true;
		}else if(_type == game.chars.stateAtkMiddle){
			if(Math.random() < enm.ia.middleDefenseChance){
				enm.ia.middleDefenseTimer = 10;
			}else hit = true;
		}else if(_type == game.chars.stateAtkDown){
			if(Math.random() < enm.ia.jumpDefenseChance){
				enm.ia.jumpDefenseTimer = 1;
				game.engine.fx("fxJump");
			}else hit = true;
		}
		
	}
	
	return !hit;

}

game.enemy.takeDamage = function () {
	enm.hit.timer = enm.hit.value;
	enm.life -= 10;
	
	if(enm.life <= 0){
		game.engine.fx("fxWin");
	 	enm.life = 0;
	}
	
	var charCenter = enm.position.center();
	game.feather.addExplosionAt(charCenter.x, charCenter.y);
	game.engine.fx("fxHit");
}

game.enemy.update = function(_frame){

	/*
	game.chars.stateIdle 		= 0;
	game.chars.stateLowered 	= 1;
	game.chars.stateJump		= 2;
	game.chars.stateForward 	= 3;
	game.chars.stateBackward 	= 4;
	
	game.chars.stateAtkUp 		= 5;
	game.chars.stateAtkMiddle 	= 6;
	game.chars.stateAtkDown 	= 7;
	
	*/
	
	if(enm.life <= 0 || plr.life <= 0){
	
		// DEAD x_x
		if(enm.life <= 0) enm.status = game.chars.stateDead;
		else enm.status = game.chars.stateWin;
		
	}else{
	
		// awesome IA
		var charsDistance = Math.abs(plr.position.x - enm.position.x);
	
		//if attacking, just wait
		if(enm.attack.active){
			
		}else{
		
			// first, clear status
			enm.status = game.chars.stateIdle;
		
			// been hit!
			if(enm.hit.timer){
				
				enm.hit.timer -= 1;
				enm.attack.active = false;
				
				if(enm.position.x + enm.size.w < game.scenes.battle.field.arenaMarginRight()){
					enm.position.x += enm.speed.backward*0.5;
				}
				
				if(enm.status != game.chars.stateHitUp && enm.status != game.chars.stateHitDown
				&& enm.status != game.chars.stateHitMiddle){
					if(enm.status == game.chars.stateJump) enm.status = game.chars.stateHitUp;
					else if(enm.status == game.chars.stateLowered) enm.status = game.chars.stateHitDown;
					else enm.status = game.chars.stateHitMiddle;
				}
				
			// defending 
			}else if(enm.ia.lowerDefenseTimer || enm.ia.middleDefenseTimer || enm.ia.jumpDefenseTimer){
				
				if(enm.ia.lowerDefenseTimer){
					enm.ia.lowerDefenseTimer -= 1;
					enm.status = game.chars.stateLowered;
					
				}else if(enm.ia.middleDefenseTimer){
					enm.ia.middleDefenseTimer -= 1;
					enm.status = game.chars.stateBackward;
					if(enm.position.x + enm.size.w < game.scenes.battle.field.arenaMarginRight()){
					
						if(_frame % 8 == 0 && game.scenes.battle.hero != game.scenes.battle.charBubblegun){
							game.engine.fx("fxStepbackward");
						}
						
						enm.position.x += enm.speed.backward;
					}
				}else if(enm.ia.jumpDefenseTimer ){
					
					enm.status = game.chars.stateJump;
					if(!enm.jumping.life){
						enm.jumping.life = 100;
					}else{
						enm.jumping.life -= enm.jumping.speed
						if(enm.jumping.life < 0) enm.jumping.life = 0;
						enm.ia.jumpDefenseTimer = enm.jumping.life;
					}
				}
			// coming from idle 
			}else{
			
				var attackBonus = 0.0;
				
				if(charsDistance > enm.ia.farDistanceLimit || (enm.ia.pursuing && charsDistance > enm.ia.nearDistanceLimit)){
					if(enm.ia.pursuing){
						if(charsDistance > plr.size.w){	
						
							if(_frame % 8 == 0 && game.scenes.battle.hero != game.scenes.battle.charBubblegun){
								game.engine.fx("fxStepforward");
							}
						
							enm.position.x -= enm.speed.forward;
							enm.status = game.chars.stateForward;
						}
					}else if((_frame%enm.ia.diceFrameCount) == 0){
						enm.ia.pursuing = (Math.random() < enm.ia.pursueChance);
					}
				}else{
					enm.ia.pursuing = false;
				}
				
				if(charsDistance < enm.ia.nearDistanceLimit || (enm.ia.withdrawing && charsDistance < enm.ia.farDistanceLimit)){
					if(enm.ia.withdrawing){
						if(enm.position.x + enm.size.w < game.scenes.battle.field.arenaMarginRight()){
							
							if(_frame % 8 == 0 && game.scenes.battle.hero != game.scenes.battle.charBubblegun){
								game.engine.fx("fxStepbackward");
							}
							
							enm.position.x += enm.speed.backward;
							enm.status = game.chars.stateBackward;
						}else{
							enm.ia.withdrawing = false;
							attackBonus += .4;
						}
					}else if((_frame%enm.ia.diceFrameCount) == 0){
						enm.ia.withdrawing = (Math.random() < enm.ia.withdrawChance-(charsDistance<enm.ia.nearDistanceLimit/4 ? .3 : 0));
					}
				}else{
					enm.ia.withdrawing = false;
				}
				
				if(!enm.ia.withdrawing && !enm.ia.pursuing && charsDistance < enm.ia.nearDistanceLimit+20){
					
					var atkAsset = null;
					
					if(enm.ia.attackCooldownCount){
						enm.ia.attackCooldownCount -= 1;
					}else if(Math.random()-attackBonus < enm.ia.attackChance){
						
						enm.ia.attackCooldownCount = enm.ia.attackCooldown;
	
						switch (Math.floor(Math.random()*3)) {
							case 0:
								atkAsset = enm.assets.atkMiddle;
								break;
							case 1:
								atkAsset = enm.assets.atkUp;
								break;
							default:
							case 2:
								atkAsset = enm.assets.atkDown;
								break;
						}
						
						if(!enm.attack.active){
							
							enm.attack.active = true;
							
							if(atkAsset == enm.assets.atkMiddle) enm.status = game.chars.stateAtkMiddle;
							else if(atkAsset == enm.assets.atkUp) enm.status = game.chars.stateAtkUp;
							else if(atkAsset == enm.assets.atkDown) enm.status = game.chars.stateAtkDown;
							
							atkAsset.onAnimationFinish = function () {
								enm.attack.active = false;
							}
							
		
							atkAsset.onAnimationTrigger = function () {
								
								var beenHit = false;
								
								if(enm.status == game.chars.stateAtkMiddle){
									if(plr.status != game.chars.stateForward){
										beenHit = true;
									}
								}
								
								if(enm.status == game.chars.stateAtkUp){
									if(plr.status != game.chars.stateLowered){
										beenHit = true;
									}
								}
								
								if(enm.status == game.chars.stateAtkDown){
									if(plr.status != game.chars.stateJump){
										beenHit = true;
									}
								}
								
								if(beenHit) game.player.takeDamage();
								
							}
							
						}	
					}
				}		
			}
		}
	}
}

game.enemy.draw = function(_frame){
	enm.draw(_frame, true);
}
