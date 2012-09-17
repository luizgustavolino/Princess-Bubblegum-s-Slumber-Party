// Resources.JS

game.resources = {};


game.resources.harvest = function(){

    game.resources.contextDom = document.getElementById("viewport");
	game.resources.canvas     = game.resources.contextDom.getContext("2d");
	
	viewport = game.resources.canvas;
	
    var imageSet = ["bubble_backward", "bubble_down", "bubble_forward", "bubble_idle", "bubble_up",
    "bubble_atk_middle","bubble_atk_up", "bubble_atk_down",
    "bubble_hit_down","bubble_hit_up","bubble_hit_middle","bubble_win",
    "marce_backward", "marce_down", "marce_forward", "marce_idle", "marce_up",
    "marce_atk_middle","marce_atk_up", "marce_atk_down","marce_win",
    "marce_hit_down","marce_hit_up","marce_hit_middle",
    "background","lifebar_empty","lifebar_marce","lifebar_bubble",
    "profile_marce_small", "profile_bubble_small","titlescreen","select_bubble","select_marce","selection",
    "feathers","bubble_death","marce_death", "endbox_loose", "endbox_win", "jiggler"];
    
    for(var i = 0; i < imageSet.length; i++){
        var imageName = imageSet[i];
        game.resources[imageName] = document.getElementById(imageName);
        if(!game.resources[imageName]) console.log("Invalid image: "+game.resources[imageName]);
    }
    
    game.resources.audio = [];
    
    var audioAssets = ["fxAttack", "fxCrouch", "fxHit", "fxJump", "fxLost",
    "fxSelect", "fxStepbackward", "fxStepforward", "fxWin", "ostCanopy"];
    
    for(var j = 0; j < audioAssets.length; j++){
        var audioName = audioAssets[j];
        game.resources.audio[audioName] = document.getElementById(audioName);
        if(!game.resources.audio[audioName]) console.log("Invalid audio: "+audioName);
    }
}

// footer
console.log("bootstrap: resources ready");