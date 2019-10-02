import KillerContainer from './MainContainer';
import CommonHeart from './CommonHeart/CommonHeart.js';
import KillerHeart from './KillerHeart/KillerHeart.js';
import HealerHeart from './HealerHeart/HealerHeart.js';
import CatcherHeart from './CatcherHeart/CatcherHeart.js';
import TravellerHeart from './TravellerHeart/TravellerHeart.js';
import TravellerTentacle from './TravellerTentacle';
import SettingsView from './SettingsContainer';
import setRequestsHook from './Inject/RequestsHook';
// import spillGlobalVars from './Inject/TKeyGetter';
// import CookieMaker from './CookieMaker';
import Alarm from './Alarm/Alarm';
import CommonUtils from '../Utils/CommonUtils';

let lifesCounter = 0;

class Killer {
  constructor(imageReplacer){
    //this.init();
    this.setDocumentObserver();
    setRequestsHook();
    this.imageReplacer = imageReplacer;
  }

  init() {
    this.alarm = new Alarm();
    this.settingsParametres  = [
      'forbiddennumbers', 'waytoheal', 'showpokemons', 'autoheal',
      'showiv', 'controlhp', 'controlexp', 'autocatch', 'autocatchsettings',
      'alarmsrc', 'alarmswitch', 'alarmvolume'
    ];
    const killerView = new KillerContainer();
    const settingsView = new SettingsView();

    const commonHeart = new CommonHeart();
    const killerHeart = new KillerHeart();
    const healerHeart = new HealerHeart();
    const catcherHeart = new CatcherHeart();
    const travellerHeart = new TravellerHeart();
    const travellerTentacle = new TravellerTentacle();

    this.settings = {
      'autofight': false,
      'attack': [ 0, 0, 0, 0 ],
      'forbiddennumbers': '',
      'showpokemons': true,
      'autoheal': true,
      'commonHeart': commonHeart,
      'killerHeart': killerHeart,
      'healerHeart': healerHeart,
      'catcherHeart': catcherHeart,
      'travellerHeart': travellerHeart,
      'travellerTentacle': travellerTentacle,
      'organism': this
    };

    this.commonHeart = commonHeart;
    this.killerHeart = killerHeart;
    this.healerHeart = healerHeart;
    this.catcherHeart = catcherHeart;
    this.travellerHeart = travellerHeart;
    this.travellerTentacle = travellerTentacle;

    this.killerView = killerView;
    this.settingsView = settingsView;

    this.killedCounter = 0;

    this.injectViewsIntoDocument();
    this.setMainViewListeners();
    this.setSettingsViewListeners();

    this.loadSettings();
    this.updateViews(this.settings);

    document.addEventListener('keyup', evt => {
      if(evt.ctrlKey && evt.shiftKey) {
        if(evt.key == 'H' || evt.key == 'Р') { // P is russian letter
          this.toggleVisibilityMainContainer();
        }
      }
    });
  }

  setDocumentObserver() {
    const observer = new MutationObserver(() => {
      if (!document.querySelector('#divLocGo .button')) {
        return;
      }

      observer.disconnect();
      this.init();
      setTimeout(() => this.settings.globalVars = this.getGlobalVars(), 1000);
    });
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(document, config);
  }

  getGlobalVars() {
    const hiddenStore = document.querySelector('[data-globalvarsstore]');
    const globalVars = JSON.parse(hiddenStore.value);

    return globalVars;
  }

  startKillerLife() {
    this.currentKillerLife = lifesCounter++;
    this.killerHeartbeat({ life: this.currentKillerLife });
  }

  showKilledCounter(value) {
    const counterView = document.querySelector('[data-view=killedwild]');
    counterView.value = value ? value : 0;
  }

  killerHeartbeat(blood = {}) {
    if (!this.settings.autofight || this.currentKillerLife !== blood.life) {
      return Promise.resolve(blood);
    }

    this.showKilledCounter(this.killedCounter);

    const randomTimeInterval = (Math.random()*5 + 2);
    return Promise.resolve(blood)
      .then(this.commonHeart.nextPulse)
      .then(this.killerHeart.nextPulse)
      .then(this.catcherHeart.nextPulse)
      .then(this.healerHeart.nextPulse)
      .then(this.travellerHeart.nextPulse)
      .then(blood => CommonUtils.wait(randomTimeInterval, blood))
      .then(blood => this.killerHeartbeat(blood));
  }

  toggleViewNodeVisibility(viewNode) {
    if (viewNode.style.display !== 'none') {
      viewNode.style.display = 'none';
    } else {
      viewNode.style.display = 'block';
    }
  }

  toggleVisibilityMainContainer() {
    this.toggleViewNodeVisibility(this.killerView.getMainContainerElement());
  }

  toggleVisibilitySettingsView() {
    this.toggleViewNodeVisibility(this.settingsView.getMainContainerElement());
  }

  injectViewsIntoDocument() {
    document.body.appendChild(this.killerView.getMainContainerElement());
    document.body.appendChild(this.settingsView.getMainContainerElement());
    this.toggleVisibilitySettingsView();
  }

  setMainViewListeners() {
    this.killerView.setAutoFightStatusChangedListener((newState)=>{
      this.changeSettings({
        parameter:'autofight',
        value: newState
      });
    });

    this.killerView.setAttackStatusChangedListener((newState, attackNumber)=>{
      this.changeSettings({
        parameter:'attack',
        value: newState,
        number: attackNumber - 1
      });
    });

    this.killerView.setSettingsClickListener(_ => this.toggleVisibilitySettingsView());
  }

  setSettingsViewListeners() {
    this.settingsParametres.forEach(parameter => {
      this.settingsView.setChangeListener(parameter, newValue => {
        this.changeSettings({
          parameter: parameter,
          value: newValue
        });
      });
    });
  }

  changeSettings(newPartOfSettings = {}) {
    const newSettings = { ...this.settings };
    switch (newPartOfSettings.parameter) {
      case 'autofight':
      case 'forbiddennumbers':
      case 'waytoheal':
      case 'showpokemons':
      case 'autoheal':
      case 'showiv':
      case 'controlhp':
      case 'controlexp':
      case 'autocatch':
      case 'autocatchsettings':
      case 'alarmsrc':
      case 'alarmvolume':
      case 'alarmswitch':
        newSettings[newPartOfSettings.parameter] = newPartOfSettings.value;
        if (newPartOfSettings.parameter == 'showpokemons') {
          this.imageReplacer.switchOn(newSettings.showpokemons);
        }

        if (newPartOfSettings.parameter == 'showiv') {
          this.catcherHeart.setObserverIV(newSettings.showiv);
        }

        if (newPartOfSettings.parameter == 'alarmvolume') {
          this.alarm.changeVolume(newSettings.alarmvolume);
        }

        if (newPartOfSettings.parameter == 'alarmsrc') {
          this.alarm.changeMelody(newSettings.alarmsrc);
        }
      break;
      case 'attack':
        const attackNumber = newPartOfSettings.number;
        newSettings.attack[attackNumber] = newPartOfSettings.value ? 1 : 0;
      break;
    }

    const oldAutofightStatus = this.settings.autofight;
    this.settings = {...newSettings};
    this.killerHeart.setSettings(this.settings);
    this.commonHeart.setSettings(this.settings);
    this.healerHeart.setSettings(this.settings);
    this.catcherHeart.setSettings(this.settings);
    this.travellerHeart.setSettings(this.settings);
    this.travellerTentacle.setSettings(this.settings);

    this.saveSettings();
    if(this.settings.autofight != oldAutofightStatus) this.startKillerLife();
  }

  updateViews(settings) {
    const attackCheckboxes = document.querySelectorAll('[data-changeaction=attack] > input');
    attackCheckboxes.forEach((checkbox, index) => {
      checkbox.checked = !!settings.attack[index];
    });

    const parametres = this.settingsParametres;
    let settingsInput;
    parametres.forEach(parameter => {
      switch(parameter) {
        case 'forbiddennumbers':
        case 'waytoheal':
        case 'autocatchsettings':
          settingsInput = document.querySelector(`[data-changeaction=${parameter}] > textarea`);
          settingsInput.value = settings[parameter];
        break;
        case 'showpokemons':
        case 'autoheal':
        case 'showiv':
        case 'autocatch':
        case 'alarmswitch':
          settingsInput = document.querySelector(`[data-changeaction=${parameter}] > input`);
          settingsInput.checked = settings[parameter];
        break;
        case 'controlhp':
        case 'controlexp':
        case 'alarmsrc':
        case 'alarmvolume':
          settingsInput = document.querySelector(`[data-changeaction=${parameter}] > input`);
          settingsInput.value = settings[parameter];
        break;
      }
    });
  }

  saveSettings() {
    const settingsToSave = JSON.stringify(this.getSettingsToSave());
    window.localStorage.setItem('killerSettings', settingsToSave);
  }

  loadSettings() {
    let loadedSettings = window.localStorage.getItem('killerSettings');
    if (!loadedSettings) {
      return;
    }
    loadedSettings = JSON.parse(loadedSettings);
    const parametres = this.settingsParametres;
    parametres.forEach(parameter => {
      const value = loadedSettings[parameter] && loadedSettings[parameter] !== 'undefined' ? loadedSettings[parameter] : '';
      this.changeSettings({ parameter: parameter, value: value });
    });
    this.settings.attack = loadedSettings.attack;
  }

  getSettingsToSave() {
    const parametres = this.settingsParametres;
    const settingsToSave = {
      'attack': this.settings.attack
    };
    parametres.forEach(parameter => {
      settingsToSave[parameter] = this.settings[parameter];
    });

    return settingsToSave;
  }

  sendRequest(url, params = []) {
    const formData = new FormData();
    formData.append('t_key', this.settings.globalVars.t_key);
    params.forEach(param => {
      formData.append(param.key, param.value);
    });

    const options = {
      method: 'POST',
      body: formData,
      credentials: 'include'
    };

    //'http://game.league17.ru/do/pokes/load/team'
    return fetch(url, options)
      .then(_ => _.json());
  }
}

export default Killer;