document.addEventListener('DOMContentLoaded', function() {
});

// ----------- Game Settings ----------- //
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
  emoji.destroy();
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

// ------------------------------------------------------- //

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
    gameScore.innerHTML = emojiTapsCount; // Reset the score to 0
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
  emoji.destroy();
  timesUpCont.style.display = "none";
  game.start();
}

// Clicking Go To Next level button
continueNextLevelButton.onclick = function() {
  levelPassedCont.style.display = "none";
  emoji.destroy();
  game.reset();
  game.start(); // Start game
}

// -------------------------------------------- //

soundPool = function() { // sounds I want to preload

}

// Add 2 more levels then do sound stuff
// 1- Play background music
// 2- Buttons sound effects
// 3- Game Pause music
// 4- You win music
// 5- You lost music
// 6- Catched emoji music
;
