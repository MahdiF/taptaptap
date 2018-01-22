document.addEventListener('DOMContentLoaded', function() {
});

var mainContainer = document.getElementById('main-container');
var clicksCountBox = document.getElementById('clicks-count-box'); // the clicks count div
var clicksCounterValue = parseInt(clicksCountBox.innerHTML);
var emoticons = ['😂','😳','😡','🍉','💩','🔥']; // emoticons array
var countDownTimerBox = document.getElementById('count-down-box');
var countDownTimerValue = parseInt(countDownTimerBox.innerHTML);
var audioTapSources = ['tap1','tap2','tap3','tap4','tap5','tap6','tap7','tap8'];

generateRandomNumb = function(minNumb, maxNumb) { // generate random number in range
  return Math.floor(Math.random() * (maxNumb - minNumb + 1)) + minNumb;
}

// Create emoji and append it to the container div
var emoticonDiv = document.createElement('div');
emoticonDiv.setAttribute('id', 'red-box');
mainContainer.appendChild(emoticonDiv);


var windowSize = {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
}
var emoticonDivSize = {
  width: emoticonDiv.offsetWidth,
  height: emoticonDiv.offsetHeight
}

var emoticonWidth;
var emoticonHeight;

getEmoticonSize = function() {
  emoticonWidth = emoticonDiv.offsetWidth;
  emoticonHeight = emoticonDiv.offsetHeight;
}



randomEmoticon = function() { // generate random emoticon from the array
  return generateRandomNumb(0 , emoticons.length - 1);
}

showEmoticonRandomPosition = function() { // showing the emoticon box randomly
  emoticonDiv.style.display = "block"; // show
  getEmoticonSize();
  // emoticonDiv.style.top = generateRandomNumb(0, 100) -
  emoticonDiv.style.top = generateRandomNumb(0, mainContainer.offsetHeight - emoticonHeight) + 'px'; // random top position
  emoticonDiv.style.left = generateRandomNumb(0, mainContainer.offsetWidth - emoticonWidth) + 'px'; // random left position
}

generateNewEmoticon = function() { // generate random emoticon in a random position
  emoticonDiv.style.display = "none";
  emoticonDiv.innerHTML = emoticons[randomEmoticon()]; // show random emoticon
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
  clicksCounterValue = ++clicksCounterValue; // add 1 to the counter
  clicksCountBox.innerHTML = clicksCounterValue; // show the count in the count box
}


countingDown = function() {
  if (countDownTimerValue > 0) { // if the counter is more than 0
    countDownTimerValue = --countDownTimerValue;
    countDownTimerBox.innerHTML = countDownTimerValue;
  } else {
    countDownTimerBox.innerHTML = "Time's up!";
    window.clearInterval(countDownTimer);
  }
}

var countDownTimer = setInterval(countingDown, 1000);
console.log(countDownTimerValue);
