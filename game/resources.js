// Resources.JS

game.resources = {};


game.resources.harvest = function(){

    game.resources.contextDom = document.getElementById("viewport");
	game.resources.canvas     = game.resources.contextDom.getContext("2d");
	
	viewport = game.resources.canvas;
	
    var imageSet = ["bubble_backward", "bubble_down", "bubble_forward", "bubble_idle", "bubble_up",
    "bubble_atk_middle","bubble_atk_up",
    "marce_backward", "marce_down", "marce_forward", "marce_idle", "marce_up",
    "marce_atk_middle","marce_atk_up"];
    
    for(var i = 0; i < imageSet.length; i++){
        var imageName = imageSet[i];
        game.resources[imageName] = document.getElementById(imageName);
    }
    
}

// footer
console.log("bootstrap: resources ready");