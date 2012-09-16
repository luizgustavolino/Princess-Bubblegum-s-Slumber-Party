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

game.enemy.update = function(_frame){

	/*
	game.chars.stateIdle 		= 0;
	game.chars.stateLowered 	= 1;
	game.chars.stateJump		= 2;
	game.chars.stateForward 	= 3;
	game.chars.stateBackward 	= 4;
	*/
	
	var charsDistance = Math.abs(plr.position.x - enm.position.x);
	enm.status = game.chars.stateIdle;

	// awesome IA
	if(charsDistance > enm.ia.nearDistanceLimit*1.1){
		if(enm.ia.pursuing){
			if(charsDistance > plr.size.w){	
				enm.position.x -= enm.speed.forward;
				enm.status = game.chars.stateForward;
			}
		}else if((_frame%enm.ia.diceFrameCount) == 0){
			enm.ia.pursuing = (Math.random() < enm.ia.pursueChance);
		}
	}else{
		enm.ia.pursuing = false;
	}
	
	if(charsDistance < enm.ia.nearDistanceLimit*0.9){
		if(enm.ia.withdrawing){
			if(enm.position.x + enm.size.w < game.scenes.battle.field.arenaMarginRight()){
				enm.position.x += enm.speed.backward;
				enm.status = game.chars.stateBackward;
			}
		}else if((_frame%enm.ia.diceFrameCount) == 0){
			enm.ia.withdrawing = (Math.random() < enm.ia.withdrawChance-(charsDistance<enm.ia.nearDistanceLimit/4 ? .3 : 0));
		}
	}else{
		enm.ia.withdrawing = false;
	}
}

game.enemy.draw = function(_frame){
	enm.draw(_frame, true);
}
