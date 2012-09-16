// Chars.js

game.chars = {
	bublegun:{
		position: {
			x:100,
			y:300
		},
		size: {
			w:40,
			h:90
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
			pursueChance: .2,
			pursuing: false,
			withdrawChance: .8,
			withdrawing: false
		},
		hitAreaColor: "#C0DE00"
	},
	marceline:{
		position: {
			x:250,
			y:300
		},
		size: {
			w:40,
			h:90
		},
		speed: {
			forward:1.4,
			backward:0.8
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
			pursueChance: .7,
			pursuing: false,
			withdrawChance: .25,
			withdrawing: false
		},
		hitAreaColor: "#00C0DE"
	}
}