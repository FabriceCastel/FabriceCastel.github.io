var animInProg = true;
var animSecondPhase = false;
var assetsPath = "assets/";
var frameIncrement = 1.2;
var scene = 0.0;
var changeScene = false;

function updateAvatarReflection(avatar){
	avatar.onload = function(){
		updateReflection(avatar); // call to initGL.js
	}
}

function displayFrame(avatar, frameName){
	if(document.location.host != "") // avoid cross-doman GL texture exception in local testing
		updateAvatarReflection(avatar);
	avatar.src = frameName;
}

function animateAvatar(){
	var avatar = document.getElementById("landingPageAvatar");
	setTimeout(function(){
		animateClap(avatar);
	}, 6000);
	blink(avatar);
}

function animateClap(avatar){
	setupForClap(avatar);
	setTimeout(function(){
		doClap(avatar, 2);
	}, 2500);
	setTimeout(function(){
		returnToIdle(avatar);
	}, 4000);
}

function setupForClap(avatar){
	animInProg = true;
	iter_setupForClap(avatar, 0);
}

function iter_setupForClap(avatar, frame){
	if(frame <= 3){
		displayFrame(avatar, assetsPath + "avatar_clap0" + frame + ".png");
		setTimeout(function(){
			iter_setupForClap(avatar, frame+1);
		}, 200);
	}
}

function doClap(avatar, numberOfClaps){
	displayFrame(avatar, assetsPath + "avatar_clap04.png");
	setTimeout(function(){
		displayFrame(avatar, assetsPath + "avatar_clap03.png");
	}, 150);
	if(numberOfClaps > 1){
		setTimeout(function(){
			doClap(avatar, numberOfClaps - 1);
		}, 250);
	} else {
		setTimeout(function(){
			gotoNextScene();
		}, 200);
	}
}

function gotoNextScene(){
	iter_gotoNextScene(scene + 1.0);
}

function iter_gotoNextScene(targetScene){
	// if(scene + sceneTransitionSpeed >= targetScene){
		scene = targetScene;
		changeScene = true;
	// } else {
	// 	scene = scene + sceneTransitionSpeed;
	// 	setTimeout(function(){
	// 		iter_gotoNextScene(targetScene);
	// 	}, 20);
	// }
}

function returnToIdle(avatar){
	iter_returnToIdle(avatar, 3);
}

function iter_returnToIdle(avatar, frame){
	if(frame >= 0){
		displayFrame(avatar, assetsPath + "avatar_clap0" + frame + ".png");
		setTimeout(function(){
			iter_returnToIdle(avatar, frame-1);
		}, 100);
	} else {
		animInProg = false;
		setTimeout(function(){
			animateClap(avatar);
		}, 6000);
	}
}

function blink(avatar){
	if(!animInProg){
		displayFrame(avatar, "assets/avatar_idle_blink.png");
		setTimeout(function(){
			if(!animInProg) displayFrame(avatar, "assets/avatar_idle.png");
		}, 100);
		if(Math.random() > 0.2){
			setTimeout(function(){
				if(!animInProg) displayFrame(avatar, "assets/avatar_idle_blink.png");
			}, 300);
			setTimeout(function(){
				if(!animInProg) displayFrame(avatar, "assets/avatar_idle.png");
			}, 430);
		}
	}
	setTimeout(function(){
		blink(avatar);
	}, (Math.random() + 1.0) * 5000);
}