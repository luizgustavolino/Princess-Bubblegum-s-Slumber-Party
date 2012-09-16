// Resources.JS

game.resources = {};


game.resources.harvest = function(){

    game.resources.contextDom = document.getElementById("viewport");
	game.resources.canvas     = game.resources.contextDom.getContext("2d");
	
	viewport = game.resources.canvas;
	
    var imageSet = [];
    
    for(var i = 0; i < imageSet.length; i++){
        var imageName = imageSet[i];
        game.resources[imageName] = document.getElementById(imageName);
    }
    
}


// footer
console.log("bootstrap: resources ready");