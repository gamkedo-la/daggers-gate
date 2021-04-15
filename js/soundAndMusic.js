var audioFormat;
var isMuted = false;
var soundSetforMeetings = true; //make false to hear at normal level

//Background Sounds
var musicSound = new BackgroundMusicClass("kyleTrack_1");


//Warrior's Voice
var warriorOuch = new SoundOverlapsClass("ouch");
var enemyDefaultGrunt = new SoundOverlapsClass("ouch");

//Asset Sounds
var doorOpenning = new SoundOverlapsClass("door_openning");
var manaGain = new SoundOverlapsClass("manaGain");
var healthGain = new SoundOverlapsClass("healthGain");
var brokenPot = new SoundOverlapsClass("brokenPot");
var pickingUpArrows = new SoundOverlapsClass("pickingUpArrows");
var pickingUpCoins = new SoundOverlapsClass("pickingUpCoins");


function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("audio/mp3")) {
		audioFormat = ".mp3";
    } else {
		audioFormat = ".ogg";
    }
}

function SoundOverlapsClass(filenameWithPath) {
    setFormat();
    var altSoundTurn = false;
    var mainSound = new Audio("sound/" + filenameWithPath + audioFormat);
    var altSound = new Audio("sound/" + filenameWithPath + audioFormat);
    
    this.play = function() {
    	if (isMuted) {
    		console.log ("sound muted");
    		return;
    	}
		if (altSoundTurn) {
			altSound.currentTime = 0;
			if(soundSetforMeetings){
				altSound.volume = 0.05;  //quieter for screen sharing during meetings
			}
			altSound.play();
		} else {
			mainSound.currentTime = 0;
			if(soundSetforMeetings){
				mainSound.volume = 0.05; //quieter for screen sharing during meetings
			}
			mainSound.play();
		}
		console.log("sound played")
		altSoundTurn = !altSoundTurn;
    }
}  

function BackgroundMusicClass(filenameWithPath) {
    this.loopSong = function() {
		setFormat();

		if (musicSound != null) {
		//	musicSound.pause();
			musicSound = null;
		}
		musicSound = new Audio("sound/" + filenameWithPath + audioFormat);
		if(soundSetforMeetings){
			musicSound.volume = 0.04; //quieter for screen sharing during meetings
		}
		musicSound.loop = true;
		musicSound.play();
    }

    this.startOrStopMusic = function() {
        if (!musicSound) {
            console.error("ERROR: musicSound not initialized before startOrStopMusic was run!");
            return; 
        }
		if (isMuted == false) {
			musicSound.play();
		} else {
			musicSound.pause();
		}
    }
}
