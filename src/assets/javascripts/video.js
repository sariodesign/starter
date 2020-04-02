const playpause   = document.getElementById('play-pause');
const stop        = document.getElementById('stop');
const mute        = document.getElementById('mute');
const volinc      = document.getElementById('volinc');
const voldec      = document.getElementById('voldec');
const progress    = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const fullscreen  = document.getElementById('full-screen');

playpause.addEventListener('click', function(e) {
  if (video.paused || video.ended) video.play();
  else video.pause();
});