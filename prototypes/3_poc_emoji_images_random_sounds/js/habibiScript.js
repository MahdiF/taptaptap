document.addEventListener('DOMContentLoaded', function() {
});

var mainContainer = document.getElementById('game-container'); // main game canvas

var clicksDiv = document.getElementById('clicksDiv'); // the clicks count div
var clicksCount = 20;


var countDownDiv = document.getElementById('countDownDiv');
var countDownValue = 60;

var emoticons = ['702','703','706','710','712','745','755', '229']; // emoticons array
var audioTapSources = ['tap1','tap2','tap3','tap4','tap5','tap6','tap7','tap8'];

generateRandomNumb = function(minNumb, maxNumb) { // generate random number in range
  return Math.floor(Math.random() * (maxNumb - minNumb + 1)) + minNumb;
}

// Create emoji and append it to the container div
var emoticonDiv = document.createElement('img');
emoticonDiv.setAttribute('id', 'emoticon');
emoticonDiv.setAttribute('src', 'emoticons/229.png');
mainContainer.appendChild(emoticonDiv);
var emoticonDivWidth = emoticonDiv.offsetWidth;
var emoticonDivHeight = emoticonDivWidth;

var windowSize = { // get the size of the page
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
}

getEmoticonHeight = function() {
  return emoticonDiv.offsetHeight;
}

randomEmoticon = function() { // generate random emoticon from the array
  return generateRandomNumb(0 , emoticons.length - 1);
}

showEmoticonRandomPosition = function() { // showing the emoticon box randomly
  emoticonDiv.style.display = "block"; // show
  emoticonDiv.style.left = generateRandomNumb(0, mainContainer.offsetWidth - emoticonDivWidth) + 'px'; // random left position minus the emoticon width
  emoticonDiv.style.top = generateRandomNumb(0, mainContainer.offsetHeight - emoticonDivHeight) + 'px'; // random top position minus the emoticon height
}

generateNewEmoticon = function() { // generate random emoticon in a random position
  emoticonDiv.style.display = "none";
  emoticonDiv.setAttribute('src', 'emoticons/' + emoticons[randomEmoticon()] +'.png');
  showEmoticonRandomPosition(); // show the emmoticon in a random position
}

generateNewEmoticon();

// START SOUNDS

// Create Audio Player and add it to page
var audioPlayer = document.createElement('audio');
var waveSource = document.createElement('source');
audioPlayer.setAttribute('controls','');
audioPlayer.appendChild(waveSource);
document.body.appendChild(audioPlayer);


generateRandomSound = function() { // generate random sound
  return generateRandomNumb(0, audioTapSources.length - 1);
}

addSoundToPlayer = function () { // add sound and load it
  waveSource.setAttribute('src', 'sounds/' + audioTapSources[generateRandomSound()] + '.wav');
  audioPlayer.load();
}


playSound = function() {
  addSoundToPlayer();
  audioPlayer.currentTime = 0;
  audioPlayer.play();
}
// END SOUNDS




// CLICKING functions [MOST IMPORTANT PART]
emoticonDiv.onclick = function() { // when tappign the emoticon
  playSound();
  mainContainer.removeChild(emoticonDiv);
  mainContainer.appendChild(emoticonDiv);
  generateNewEmoticon(); // change the emoticon
  clicksCount = ++clicksCount; // add 1 to the counter
  clicksDiv.innerHTML = clicksCount; // show the count in the count box
}


countingDown = function() {
  if (countDownValue > 0) { // if the counter is more than 0
    countDownValue = --countDownValue;
    countDownDiv.innerHTML = countDownValue;
  } else {
    countDownDiv.innerHTML = "Time's up!";
    window.clearInterval(countDownTimer);
  }
}

var countDownTimer = setInterval(countingDown, 1000);
