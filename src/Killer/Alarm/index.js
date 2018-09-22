class Alarm {
  constructor() {
    this.init();
  }

  init() {
    this.preloadAlarm();
    this.defaultSrc = chrome.runtime.getURL('audio/signal.ogx');
  }

  preloadAlarm() {
    let alarmAudio = document.createElement('audio');
      alarmAudio.classList.add('killer__alarm');
      alarmAudio.loop = true;
      alarmAudio.volume = 0.1;
    let alarmSource = document.createElement('source');
      alarmSource.src = this.defaultSrc;
      alarmAudio.appendChild(alarmSource);
    this.alarmAudio = alarmAudio;
    this.alarmSource = alarmSource;
  }

  changeVolume(value) {
    if(isNaN(+value)) return;
    if(+value < 1 && +value > 0) {
      this.alarmAudio.volume = value;
      return;
    }
    if(+value <= 0) {
      this.alarmAudio.volume = 0;
      return;
    }
    if(+value >= 100) {
      this.alarmAudio.volume = 1;
      return;
    }
    this.alarmAudio.volume = (+value)/100;
  }

  changeMelody(src) {
    if(!src.trim()) {
      this.alarmAudio.src = this.defaultSrc;
      return;
    }
    this.alarmAudio.src = src;
  }

  startPlay() {
    this.alarmAudio.play();
  }

  stopPlay() {
    this.alarmAudio.pause();
    this.alarmAudio.currentTime = 0;
  }
}

export default Alarm;