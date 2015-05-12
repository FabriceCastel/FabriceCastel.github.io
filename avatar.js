var animInProg = true;
var animSecondPhase = false;
var assetsPath = "assets/";
var frameIncrement = 1.2;

function animateAvatar(){
	var avatar = document.getElementById("landingPageAvatar");
	setTimeout(function(){
		animateClap(avatar);
	}, 6000);
}

function animateClap(avatar){
	setupForClap(avatar);
	setTimeout(function(){
		doClap(avatar, 2);
	}, 2500);
	setTimeout(function(){
		returnToIdle(avatar);
	}, 4000);
	blink(avatar);
}

function setupForClap(avatar){
	animInProg = true;
	iter_setupForClap(avatar, 0);
}

function iter_setupForClap(avatar, frame){
	if(frame <= 3){
		avatar.src = assetsPath + "avatar_clap0" + frame + ".png";
		setTimeout(function(){
			iter_setupForClap(avatar, frame+1);
		}, 200);
	}
}

function doClap(avatar, numberOfClaps){
	avatar.src = assetsPath + "avatar_clap04.png";
	setTimeout(function(){
		avatar.src = assetsPath + "avatar_clap03.png";
	}, 100);
	if(numberOfClaps > 1){
		setTimeout(function(){
			doClap(avatar, numberOfClaps - 1);
		}, 200);
	} else {
		frameIncrement = 0.5;
		setTimeout(function(){
			frameIncrement = 0.2;
		}, 100);
	}
}

function returnToIdle(avatar){
	iter_returnToIdle(avatar, 3);
}

function iter_returnToIdle(avatar, frame){
	if(frame >= 0){
		avatar.src = assetsPath + "avatar_clap0" + frame + ".png";
		setTimeout(function(){
			iter_returnToIdle(avatar, frame-1);
		}, 100);
	} else {
		animInProg = false;
	}
}

function blink(avatar){
	if(!animInProg){
		avatar.src = "assets/avatar_idle_blink.png";
		setTimeout(function(){
			if(!animInProg) avatar.src = "assets/avatar_idle.png";
		}, 100);
		if(Math.random() > 0.2){
			setTimeout(function(){
				if(!animInProg) avatar.src = "assets/avatar_idle_blink.png";
			}, 300);
			setTimeout(function(){
				if(!animInProg) avatar.src = "assets/avatar_idle.png";
			}, 430);
		}
	}
	setTimeout(function(){
		blink(avatar);
	}, (Math.random() + 1.0) * 5000);
}