// Chars.js

game.chars = {
	bublegun: function (){
		var self = {
			status: game.chars.stateIdle,
			position: {
				x:100,
				y:200,
				center: function () {
					return {
						x: (self.position.x+self.size.w/2),
						y: (self.position.y+self.size.h/2)
					}	
				}
			},
			size: {
				w:140,
				h:190
			},
			speed: {
				forward:4.4,
				backward:3.8
			},
			jumping: {
				factor:.44,
				speed:5.4,
				life:0,
				movementFreedom: .4,
				animationFrame: 0
			},
			lowered:{
				active: false,
				animationFrame: 0
			},
			attack:{
				active: false,
				animationFrame: 0
			},
			ia:{
				nearDistanceLimit: 200,
				diceFrameCount: 30,
				pursueChance: .20,
				pursuing: false,
				withdrawChance: .75,
				withdrawing: false
			},
			assets:{
				backward: {
					name:"bubble_backward",
					frames:4,
					sync: 4,
					loop: true
				},
				down: {
					name:"bubble_down",
					frames:3,
					sync: 4,
					loop: false
				},
				forward: {
					name:"bubble_forward",
					frames: 4,
					sync: 4,
					loop: true
				},
				idle: {
					name: "bubble_idle",
					frames: 4,
					sync: 4,
					loop: true
				},
				up: {
					name:"bubble_up",
					frames: 3,
					sync: 4,
					loop: false
				},
				atkMiddle: {
					name:"bubble_atk_middle",
					frames: 4,
					sync: 3,
					loop: false
				},
				atkUp:{
					name:"bubble_atk_up",
					frames: 4,
					sync: 3,
					loop: false
				}
			},
			hitAreaColor: "rgba(120,120,120,0)",
			draw: function(_frame, _flip) {
				game.chars.draw(self,_frame,_flip);
			}
		}; return self;
	},
	marceline: function (){
		var self = {
			status: game.chars.stateIdle,
			position: {
				x:250,
				y:200,
				center: function () {
					return {
						x: (self.position.x+self.size.w/2),
						y: (self.position.y+self.size.h/2)
					}	
				}
			},
			size: {
				w:140,
				h:190
			},
			speed: {
				forward:4.0,
				backward:4.0
			},
			jumping: {
				factor:.44,
				speed:5.4,
				life:0,
				movementFreedom: .4,
				animationFrame: 0
			},
			lowered:{
				active: false,
				animationFrame: 0
			},
			attack:{
				active: false,
				animationFrame: 0
			},
			ia:{
				nearDistanceLimit: 200,
				diceFrameCount:30,
				pursueChance: .40,
				pursuing: false,
				withdrawChance: .20,
				withdrawing: false
			},
			assets:{
				backward: {
					name:"marce_backward",
					frames:4,
					sync: 4,
					loop: true
				},
				down: {
					name:"marce_down",
					frames:3,
					sync: 4,
					loop: false
				},
				forward: {
					name:"marce_forward",
					frames: 4,
					sync: 4,
					loop: true
				},
				idle: {
					name: "marce_idle",
					frames: 4,
					sync: 4,
					loop: true
				},
				up: {
					name:"marce_up",
					frames: 3,
					sync: 4,
					loop: false
				},
				atkMiddle: {
					name:"marce_atk_middle",
					frames: 4,
					sync: 3,
					loop: false,
				},
				atkUp:{
					name:"marce_atk_up",
					frames: 4,
					sync: 3,
					loop: false
				}
			},
			hitAreaColor: "rgba(120,120,120,0)",
			draw: function(_frame, _flip) {
				game.chars.draw(self,_frame,_flip);
			}
		}; return self;
	}
}

game.chars.stateIdle 		= 0;
game.chars.stateLowered 	= 1;
game.chars.stateJump		= 2;
game.chars.stateForward 	= 3;
game.chars.stateBackward 	= 4;

game.chars.stateAtkUp 		= 5;
game.chars.stateAtkMiddle 	= 6;
game.chars.stateAtkDown 	= 7;

game.chars.draw = function(_char,_frame,_flip) {
	
	var jumpHeight = 0, charHeight = _char.size.h, charY = _char.position.y,
	anmImage = null, frame = {x: 0, y: 0, w:0,h:0}, charCenter = null, asset = null,
	anmFrame = 0;
	
	if(_char.lowered.active) {
		charHeight /= 2;
		charY += charHeight;
	}
	
	if(_char.jumping.life){
		jumpHeight = (100-Math.pow((_char.jumping.life/5)-10, 2))*_char.jumping.factor;
	}
	
	// colision area
	viewport.fillStyle = _char.hitAreaColor;
	viewport.fillRect(_char.position.x, charY-jumpHeight, _char.size.w, charHeight);
	
	// get asset
	
	if(_char.status == game.chars.stateIdle) asset = _char.assets.idle;
	if(_char.status == game.chars.stateJump) asset = _char.assets.up;
	if(_char.status == game.chars.stateForward) asset = _char.assets.forward;
	if(_char.status == game.chars.stateBackward) asset = _char.assets.backward;
	if(_char.status == game.chars.stateLowered) asset = _char.assets.down;
	
	if(_char.status == game.chars.stateAtkMiddle) asset = _char.assets.atkMiddle;
	if(_char.status == game.chars.stateAtkUp) asset = _char.assets.atkUp;
	
	// clear nonloop animations
	for(var aKey in _char.assets){	
		var anAsset = _char.assets[aKey];
		if(!anAsset.loop && anAsset != asset) anAsset.animationFrame = 0;
	}
	
	//frame
	anmFrame = (Math.floor(_frame/asset.sync))%asset.frames;
	
	if(!asset.loop) {
		var targetFrame = Math.floor(asset.animationFrame/asset.sync);
		
		if(targetFrame == asset.frames){
			anmFrame = asset.frames -1;
			if(asset.onAnimationFinish){
				asset.onAnimationFinish();
				asset.onAnimationFinish = null;
			}
		}else{
			anmFrame = targetFrame;
			asset.animationFrame += 1;
		}
		
	}
	
	anmImage = game.resources[asset.name];
	charCenter = _char.position.center();
	
	frame.w = anmImage.width/asset.frames;
	frame.h = anmImage.height;
	frame.x = charCenter.x - frame.w/2;
	frame.y = charCenter.y - frame.h/2;
	
	if(_flip) {
		viewport.save();
		viewport.scale(-1, 1);
		
		viewport.drawImage(anmImage, anmFrame*frame.w,0,frame.w,frame.h,
						-frame.x-frame.w, frame.y-jumpHeight, frame.w, frame.h);
		
		viewport.restore();
	}else{
		viewport.drawImage(anmImage, anmFrame*frame.w,0,frame.w,frame.h,
						frame.x, frame.y-jumpHeight, frame.w, frame.h);
	}
}

