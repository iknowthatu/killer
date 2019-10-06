import { ALARM_SOUND_PATH } from '../../configs/killerConfigs';

class Alarm {
  constructor() {
    this.init();
  }

  init() {
    this.preloadAlarm();
    this.defaultSrc = chrome.runtime.getURL(ALARM_SOUND_PATH);
  }

  preloadAlarm() {
    const alarmAudio = document.createElement('audio');
      alarmAudio.classList.add('killer__alarm');
      alarmAudio.loop = true;
      alarmAudio.volume = 0.1;
    const alarmSource = document.createElement('source');
      alarmSource.src = this.defaultSrc;
      alarmAudio.appendChild(alarmSource);
    this.alarmAudio = alarmAudio;
    this.alarmSource = alarmSource;
  }

  changeVolume(value) {
    const alarmVolume = +value;
    if (isNaN(alarmVolume)) {
      return;
    }

    if (alarmVolume < 1 && alarmVolume > 0) {
      this.alarmAudio.volume = value;
      return;
    }

    if (alarmVolume <= 0) {
      this.alarmAudio.volume = 0;
      return;
    }

    if (alarmVolume >= 100) {
      this.alarmAudio.volume = 1;
      return;
    }

    this.alarmAudio.volume = alarmVolume / 100;
  }

  changeMelody(src) {
    if (!src.trim()) {
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

const alarmSingleton = new Alarm();

export default alarmSingleton;