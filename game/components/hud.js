game.hud = {};

var hudBars = null;

game.hud.create = function (){
	hudBars = {plr:20,enm:20};
}

game.hud.update = function (_frame) {
	
	if(plr.life < hudBars.plr) hudBars.plr -= 1;
	if(enm.life < hudBars.enm) hudBars.enm -= 1;
	
	if(plr.life > hudBars.plr) hudBars.plr += 5;
	if(enm.life > hudBars.enm) hudBars.enm += 5;
	
	if(hudBars.plr > 100) hudBars.plr = 100;
	if(hudBars.enm > 100) hudBars.enm = 100;
}

game.hud.draw = function (_frame) {
	
	// lifebars bg
	viewport.drawImage(game.resources.lifebar_empty, 60, 26);
	viewport.drawImage(game.resources.lifebar_empty, 370, 26);
	
	if(game.scenes.battle.hero == game.scenes.battle.charBubblegun){
		
		viewport.drawImage(game.resources.lifebar_bubble, 0, 0,1,22,
			60+(210-(210*hudBars.plr/100)),26,210*hudBars.plr/100,22);
		viewport.drawImage(game.resources.lifebar_marce, 0, 0,1,22,
			370,26,210*hudBars.enm/100,22);
			
		viewport.drawImage(game.resources.profile_bubble_small,10,7);	
		viewport.drawImage(game.resources.profile_marce_small,589,7);	
		
	}else {
		viewport.drawImage(game.resources.lifebar_marce, 0, 0,1,22,
			60+(210-(210*hudBars.plr/100)),26,210*hudBars.plr/100,22);
		viewport.drawImage(game.resources.lifebar_bubble, 0, 0,1,22,
			370,26,210*hudBars.enm/100,22);		
			
			
		viewport.drawImage(game.resources.profile_marce_small,10,7);	
		viewport.drawImage(game.resources.profile_bubble_small,589,7);	
			
	}
	
}
