game.feather = {};

var gRand = function(_radius, _core){
	if(_core){
		var value = (Math.random()*_radius*2)-_radius;
		if(value > 0) return value + _core;
		else return value - _core;
	}else{
		return (Math.random()*_radius*2)-_radius; 
	}
}

var nRand = function(_radius){
	return (Math.random()*_radius); 
}

var lRand = function(_limit){
	return Math.floor(Math.random()*_limit); 
}

game.feather.atBG = [];
game.feather.atFG = [];

game.feather.update = function(_frame) {
	
	var i = 0, j = 0, targetArray = null, aFeather = null;
	
	//console.log("penas: "+(game.feather.atBG.length + game.feather.atFG.length));
	
	for(j = 0; j < 2; j ++){
		
		targetArray = j == 0 ? game.feather.atBG : game.feather.atFG;
		
		for(i = 0; i < targetArray.length; i += 1){
			
			aFeather = targetArray[i];
			aFeather.update();
			
			if(aFeather.life == 0){
				targetArray.splice(i, 1);
				i -= 1;
			}
		}
	}
	
}

game.feather.drawFG = function(_frame) {
	game.feather.draw(_frame, game.feather.atFG);
}

game.feather.drawBG = function(_frame) {
	game.feather.draw(_frame, game.feather.atBG);
}

game.feather.draw = function(_frame, _array) {
	
	var i = 0, aFeather = null;
	
	for(i = 0; i < _array.length; i += 1){
		aFeather = _array[i];
		aFeather.draw();
	}
		
}

game.feather.addExplosionAt = function(_x, _y) {
		
	var total = 20, i = 0;
	
	for(i = 0; i < total; i += 1){
		if(i % 2 == 0){
			game.feather.atBG.push(game.feather.makeOne(_x, _y));
		}else{
			game.feather.atFG.push(game.feather.makeOne(_x, _y));
		}
	}
		
}

game.feather.makeOne = function(_x, _y) {
	var one = {};
	
	one.pos = {
		x: _x + gRand(2,1),
		y: _y + gRand(2,1)
	};
	
	one.acc = {
		x: gRand(5,3),
		y: lRand(8)*-1,
		rotation: gRand(.2)
	}
	
	one.life = 30 + lRand(5); 
	one.type = lRand(3);
	one.rotation = gRand(Math.PI);
	
	one.update = function () {
		
		one.pos.x += one.acc.x;
		one.pos.y += one.acc.y;
		
		one.acc.x += one.acc.x < 0 ? .2 : -.2;
		one.acc.y += .3;
		
		one.rotation += one.acc.rotation;
		
		one.life -= 1;
	}
	
	one.draw = function () {
		
		viewport.save();
		
		viewport.translate(one.pos.x+11/2, one.pos.y+31/2); 
		viewport.rotate(one.rotation); 
		
		if(one.life <= 10){
			viewport.globalAlpha = one.life/10;
		}
		
		viewport.drawImage(game.resources.feathers, 11*one.type,0,11,31,
							0, 0, 11,31);
							
		viewport.restore();
	}
	
	return one;	
}

