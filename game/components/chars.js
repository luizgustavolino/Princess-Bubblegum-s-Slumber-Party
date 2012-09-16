// Chars.js

game.chars = {
	bublegun: function (){
		var self = {
			position: {
				x:100,
				y:200
			},
			size: {
				w:140,
				h:190
			},
			speed: {
				forward:2.4,
				backward:1.8
			},
			jumping: {
				factor:.44,
				speed:5.4,
				life:0,
				movementFreedom: .4
			},
			lowered:{
				active: false
			},
			ia:{
				nearDistanceLimit: 200,
				diceFrameCount: 30,
				pursueChance: .20,
				pursuing: false,
				withdrawChance: .75,
				withdrawing: false
			},
			hitAreaColor: "#C0DE00"
		}; return self;
	},
	marceline: function (){
		var self = {
			position: {
				x:250,
				y:200
			},
			size: {
				w:140,
				h:190
			},
			speed: {
				forward:2.0,
				backward:2.0
			},
			jumping: {
				factor:.44,
				speed:5.4,
				life:0,
				movementFreedom: .4
			},
			lowered:{
				active: false
			},
			ia:{
				nearDistanceLimit: 200,
				diceFrameCount:30,
				pursueChance: .40,
				pursuing: false,
				withdrawChance: .20,
				withdrawing: false
			},
			hitAreaColor: "#00C0DE"
		}; return self;
	}
}