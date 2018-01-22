var emojiDiv, emojiDivWidth, emojiDivHeight;

emoji = {
  tapCount: 0,
  names: ['702','703','706','710','712','745','755', '229'],
  create: function(){
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
  },
  random: function(){ // generate random emoticon from the array
    return generateRandomNumb(0 , emoji.names.length - 1);
  },
  randomPosition: function(){ // showing the emoticon box randomly
    emojiDiv.style.left = generateRandomNumb(emojiDivWidth, gameSpace.offsetWidth - emojiDivWidth) + 'px'; // random left position minus the emoticon width
    emojiDiv.style.top = generateRandomNumb(emojiDivWidth, gameSpace.offsetHeight - emojiDivHeight) + 'px'; // random top position minus the emoticon height
  },
  respawn: function(){ // re generate emoji in a random position
    gameSpace.removeChild(emojiDiv);
    emojiDiv.setAttribute('src', 'emoticons/' + emoji.names[emoji.random()] +'.png'); // get a random emoji
    emoji.randomPosition(); // get random position
    gameSpace.appendChild(emojiDiv);
  },
  tap: function(){
    tapAudio.play(); // play the tap sound effect
    emoji.respawn(); // change the emoticon
    emojiTapsCount = ++emojiTapsCount; // add 1 to the counter
    gameScore.innerHTML = emojiTapsCount + ' / ' + gameCurrentLevel.goal; // show the count in the count box
  },
  destroy: function() {
    gameSpace.removeChild(emojiDiv);
  }
}

// ------ START SOUNDS ------ //
tapAudio = {
  sounds: ['tap1','tap2','tap3','tap4','tap5','tap6','tap7','tap8'],
  generatePlayer: function() { // Create Audio Player and add it to page
    audioPlayer = document.createElement('audio');
    waveSource = document.createElement('source');
    audioPlayer.setAttribute('controls','');
    audioPlayer.appendChild(waveSource);
    document.body.appendChild(audioPlayer);
  },
  randomSound: function(){ // generate random sound
    return generateRandomNumb(0, tapAudio.sounds.length - 1);
  },
  addSound: function() {
    waveSource.setAttribute('src', 'sounds/' + tapAudio.sounds[tapAudio.randomSound()] + '.wav');
    audioPlayer.load();
  },
  play: function() {
    tapAudio.addSound();
    audioPlayer.currentTime = 0;
    audioPlayer.play();
  }
}

tapAudio.generatePlayer();

// ------ END SOUNDS ------ //
