game.enemy = {};

// current enemy
var enm = null;

game.enemy.setup = function(){
	game.enemy.setChar(game.chars.bublegun());
}

game.enemy.destroy = function() {
	
}

game.enemy.setChar = function(_char){
	enm = _char;
}

game.enemy.update = function(_frame){


	var charsDistance = Math.abs(plr.position.x - enm.position.x);

	// awesome IA
	if(charsDistance > enm.ia.nearDistanceLimit){
		if(enm.ia.pursuing){
			if(charsDistance > plr.size.w){	
				enm.position.x -= enm.speed.forward;
			}
		}else if((_frame%enm.ia.diceFrameCount) == 0){
			enm.ia.pursuing = (Math.random() < enm.ia.pursueChance);
		}
	}else{
		enm.ia.pursuing = false;
	}
	
	
	if(charsDistance < enm.ia.nearDistanceLimit){
		if(enm.ia.withdrawing){
			if(enm.position.x + enm.size.w < game.scenes.battle.field.arenaMarginRight()){
				enm.position.x += enm.speed.backward;
			}
		}else if((_frame%enm.ia.diceFrameCount) == 0){
			enm.ia.withdrawing = (Math.random() < enm.ia.withdrawChance-(charsDistance<enm.ia.nearDistanceLimit/4 ? .3 : 0));
		}
	}else{
		enm.ia.withdrawing = false;
	}
}

game.enemy.draw = function(_frame){
	
	viewport.fillStyle = enm.hitAreaColor;
	viewport.fillRect(enm.position.x, enm.position.y,
					  enm.size.w, enm.size.h);
	
}
