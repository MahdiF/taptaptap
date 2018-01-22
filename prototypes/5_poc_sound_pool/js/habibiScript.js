document.addEventListener('DOMContentLoaded', function() {
});

// ----------- Game Settings ----------- //

var emojiDiv, emojiDivWidth, emojiDivHeight; // Emoji variables

var currentLevel = 1; // The number of current level
var totalLevels; // Total number of levels in the game

var emojiTapsCount = 0;

var generateRandomNumb = function(minNumb, maxNumb) { // generate random number in range
  return Math.floor(Math.random() * (maxNumb - minNumb + 1)) + minNumb;
}

var getObjectLength = function(l) { // get the length of an object
  return Object.keys(l).length;
}

var windowSize = { // get the size of the page
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
}

// Pages / Containers
var menuCont = document.getElementById('menuCont');
var levelTitleCont = document.getElementById('levelTitleCont');
var gameSpaceCont = document.getElementById('gameSpaceCont');
var timesUpCont = document.getElementById('timesUpCont');
var gamePauseCont = document.getElementById('gamePausedCont');
var levelPassedCont = document.getElementById('levelPassedCont');


// Menu Buttons & Call to Action
var newGameButton = document.getElementById('newGameButton');
var highScoresButton = document.getElementById('highScoresButton');
var aboutButton = document.getElementById('aboutButton');

// Level title screen
var levelNumberTitle = document.getElementById('levelNumberTitle');
var levelGoalTitle = document.getElementById('levelGoalTitle');

// Start Level Button
var startLevelButton = document.getElementById('startLevelButton');

// Pause Screen
var continueGameButton = document.getElementById('continueGameButton');
var gamePauseEndGameButton = document.getElementById('gamePauseEndGameButton');
var gamePausedDescription = document.getElementById('gamePausedDescription');

// Game Space
var progressLine = document.getElementById('progressLine');
var gameTime = document.getElementById('gameTime');
var gameScore = document.getElementById('gameScore');
var gameSpace = document.getElementById('gameSpace');
var inGameLevelNum = document.getElementById('inGameLevelNum');

// Time's up screen
var tryAgainButton = document.getElementById('tryAgainButton');
var timesUpDescription = document.getElementById('timesUpDescription');
var timesUpEndGameButton = document.getElementById('timesUpEndGameButton');

// Level passed screen
var levelPassedDescreption = document.getElementById('levelPassedDescreption');
var nextLevelDesc = document.getElementById('nextLevelDesc');
var continueNextLevelButton = document.getElementById('continueNextLevelButton');


// End the game buttons and go to game home page
var endGameGoHome = function() {
  updateGameLevelValue(1); //Go back to level 1
  menuCont.style.display = "block";
  timesUpCont.style.display = "none";
  gamePauseCont.style.display = "none";
  levelTitleCont.style.display = "none";
  gameSpaceCont.style.display = "none";
  levelPassedCont.style.display = "none";
}

// Update level number in game space
var updateGameLevelValue = function(levelNumb) {
  inGameLevelNum.innerHTML = levelNumb;
}

updateGameLevelValue(currentLevel);

// Make the progress  100%
progressLine.style.width = "100%";

// Game play time & the time left
var playTime, timeLeft;

helllll = function() {
  alert('hadssdfsdf');
}


// ------------------------------------------------------ //

var timeEngines = {
  start: function() {
    gameTime.innerHTML = timeLeft; // show the time left in the screen
    // Run the progress bar and time functions
    progressTimer = setInterval(timeEngines.updateTimeProgress, 100); // Every 0.1 of a second
    countDownTimer = setInterval(timeEngines.updateTime, 1000); // Every second
  },
  stop: function() {
    clearInterval(countDownTimer);
    clearInterval(progressTimer);
  },
  reset: function(time) {
    emojiTapsCount = 0;
    gameScore.innerHTML = emojiTapsCount + ' / ' + gameCurrentLevel.goal; // Reset the score to 0
    progressValue = 100; // Progress bar value
    gameTime.innerHTML = time;
    timeLeft = time;
    playTime = time;
  },
  updateTimeProgress: function() { // Subtract (100 / total game play time / 10) 10 to make it smaller, and the time is 0.1 of a second (100ms)
    progressValue = progressValue - (100/playTime/10);
    progressLine.style.width = progressValue + "%";
    timeEngines.checkTime(); // Check if game's time is 0
  },
  updateTime: function() { // Subtract 1 from the game time label
    gameTime.innerHTML = gameTime.innerHTML - 1;
    timeLeft = gameTime.innerHTML;
  },
  checkTime: function() { // Check if game's time is 0 or not
    if (gameTime.innerHTML == 0) {
      game.timesUp();
    } else if (emojiTapsCount >= gameCurrentLevel.goal) {
      game.levelPassed();
    }
  },
}


// --------- GAME LEVELS --------- //

var levels = {}; // Levels object

var addLevel = function(n, g, t) { // Adding levels function
  levels[n] = {goal: g, time: t};
}
addLevel(1, 4, 10); // Adding level 1

var updateLevelsCount = function() {
  totalLevels = getObjectLength(levels); // Get number of levels
}
updateLevelsCount();

var game = {
  start: function() {
    timeEngines.reset(gameCurrentLevel.time); // Reset game settings
    timeEngines.start();
    emoji.create();
  },
  stop: function() {
    timeEngines.stop();
  },
  reset: function() {
    timeEngines.reset(gameCurrentLevel.time); // Reset game settings
  },
  pause: function() {
    timeEngines.stop();
  },
  resume: function() {
    timeEngines.start();
  },
  checkScore: function() {
    if (emojiTapsCount >= gameCurrentLevel.goal) {
      game.levelPassed();
    } else {
      game.levelLost();
    }
  },
  levelPassed: function() {
    timeEngines.stop();
    currentLevel++; // Increase the level
    addLevel(currentLevel, currentLevel*4, 10); // Adding level 5
    updateLevelsCount();
    levelPassedCont.style.display = "block"; // Show level passed screen
    updateGameLevelValue(currentLevel); // Update level number in game space
    getGameCurrentLevel(currentLevel); // Get the current level object
    continueNextLevelButton.innerHTML = 'Start Level ' + currentLevel + ' 👍';
    levelPassedDescreption.innerHTML = 'You catched all the ' + emojiTapsCount + ' emoticons!';
    nextLevelDesc.innerHTML = 'Now try to catch ' + gameCurrentLevel.goal + ' emoticons.';
  },
  levelLost: function() {
    timesUpCont.style.display = "block";
    timesUpDescription.innerHTML = 'You catched ' + emojiTapsCount + ' emoticons, and you had to catch ' + gameCurrentLevel.goal + ' at least to complete this level.';
  },
  timesUp: function() {
    timeEngines.stop();
    game.checkScore(); // Check the score
  },
}

getGameCurrentLevel = function(levelNumb) {
  gameCurrentLevel = levels[levelNumb];
}
getGameCurrentLevel(currentLevel); // Get the current level object

var gameCurrentLevel = levels[currentLevel]; //gameLevel + level number


// ----------- Setting the level title and goal ----------- //
levelNumberTitle.innerHTML = 'Level ' + currentLevel;
levelGoalTitle.innerHTML = 'Try to catch ' + gameCurrentLevel.goal + ' emojis in ' + gameCurrentLevel.time + ' seconds.';

// ------------------------------------------------------- //
// -------------------- Emoji Object -------------------- //
var emoji = {
  tapCount: 0,
  names: ['702','703','706','710','712','745','755', '229'],
  create: function(){
    // if the emoji already exists delete it and re create it.
    if (document.getElementById('emoticon')) {
      emoji.destroy();
      emoji.create();
    } else {
      // Create emoji and append it to the container div
      emojiDiv = document.createElement('img');
      emojiDiv.setAttribute('id', 'emoticon');
      emojiDiv.setAttribute('src', 'emoticons/' + emoji.names[emoji.random()] +'.png');
      gameSpace.appendChild(emojiDiv);
      emojiDivWidth = emojiDiv.offsetWidth;
      emojiDivHeight = emojiDivWidth;
      emoji.randomPosition(); // show the emmoticon in a random position
      emojiDiv.onclick = function() { // when tappign the emoticon
        emoji.tap();
      }
    }
  },
  random: function(){ // generate random emoticon from the array
    return generateRandomNumb(0 , emoji.names.length - 1);
  },
  randomPosition: function(){ // showing the emoticon box randomly
    emojiDiv.style.left = generateRandomNumb(emojiDivWidth, gameSpace.offsetWidth - emojiDivWidth) + 'px'; // random left position minus the emoticon width
    emojiDiv.style.top = generateRandomNumb(emojiDivWidth, gameSpace.offsetHeight - emojiDivHeight) + 'px'; // random top position minus the emoticon height
  },
  tap: function() {
    emoji.create(); // change the emoticon
    emojiTapsCount = ++emojiTapsCount; // add 1 to the counter
    gameScore.innerHTML = emojiTapsCount + ' / ' + gameCurrentLevel.goal; // show the count in the count box
  },
  destroy: function() {
    gameSpace.removeChild(emojiDiv);
  },
}
emoji.create();


// ------------------ Buttons ------------------ //
// Stop the rubber effect on iOS
document.ontouchmove = function(e) {
  e.preventDefault();
}

// Clicking New Game Button
newGameButton.onclick = function() {
  menuCont.style.display = "none";
  levelTitleCont.style.display = "block";
}

// Clicking Start Level Button
startLevelButton.onclick = function() {
  levelTitleCont.style.display = "none";
  gameSpaceCont.style.display = "block";
  game.start(); // Start game
}

// Clicking Pause Game Button
pauseGameButton.onclick = function() {
  gamePauseCont.style.display = "block";
  game.pause(); // Pause game
  gamePausedDescription.innerHTML = 'You catched ' + emojiTapsCount + ' emojis, and you have to catch ' + gameCurrentLevel.goal + ' at least to complete this level.'
}

// Clicking Continue Game Button
continueGameButton.onclick = function() {
  gamePauseCont.style.display = "none";
  game.resume();
}

// Clicking End Game Buttons
gamePauseEndGameButton.onclick = function() {
  endGameGoHome();
}
timesUpEndGameButton.onclick = function() {
  endGameGoHome();
}

// Clicking Try Again in the you lost screen
tryAgainButton.onclick = function() {
  timesUpCont.style.display = "none";
  game.start();
}

// Clicking Go To Next level button
continueNextLevelButton.onclick = function() {
  levelPassedCont.style.display = "none";
  game.reset();
  game.start(); // Start game
}

// -------------------------------------------- //
// ---------------- Audio Pool --------------- //

var randomButton = document.getElementById('randomButton');

var soundEffects = [
  regularButton = {
    id: "randomButton",
    sound: "tap",
    preload: true,
  },
  regularButton2 = {
    id: "randomButton2",
    sound: "chick",
    preload: false,
  },
  emojisFaces = {
    id: "emoticon",
    sound: "chick",
    preload: true,
  }
]

var soundsHabibi = [
  emojiTap = { sound: "tap", preload: true},
  buttonTab = { sound: "click", preload: true},
  backgroundMusic = { sound: "music01", preload: true},
]

var element;

var createAudioPlayer = function(element) {
  element.audioPlayer = document.createElement('audio');

  mp3Source = document.createElement('source');
  oggSource = document.createElement('source');

  // Assign an id to the player to recognize it when debugging
  element.audioPlayer.setAttribute('id', element.id + "Player");

  // Get the name of the sounds from the object inside the array
  mp3Link = "sounds/mp3/" + element.sound + ".mp3";
  oggLink = "sounds/ogg/" + element.sound + ".ogg";

  // Setting the attributes for the source elemnts
  mp3Source.setAttribute('type', 'audio/mpeg');
  oggSource.setAttribute('type','audio/ogg');
  mp3Source.setAttribute('src', mp3Link);
  oggSource.setAttribute('src', oggLink);

  // Appending the sources to the player, and appending the player to the page
  element.audioPlayer.appendChild(mp3Source);
  element.audioPlayer.appendChild(oggSource);
  document.body.appendChild(element.audioPlayer);

  if (element.preload) {
    element.audioPlayer.load(); // Preload the sound
  }

  document.getElementById(element.id).onclick = function(){
    console.log(element);
    element.audioPlayer.currentTime = 0;
    element.audioPlayer.play();
  }
}


// createAudioPlayer(soundEffects[0].id);

for (var i = 0; i < soundEffects.length; i++) {
  createAudioPlayer(soundEffects[i]);
}

var playThisSound = function(element, soundName) {
  if (createAudioPlayer(element)){
  }
}


// Add 2 more levels then do sound stuff
// 1- Play background music
// 2- Buttons sound effects
// 3- Game Pause music
// 4- You win music
// 5- You lost music
// 6- Catched emoji music
