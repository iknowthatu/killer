import KillerContainer from './MainContainer';
import CommonHeart from './CommonHeart/CommonHeart.js';
import KillerHeart from './KillerHeart/KillerHeart.js';
import HealerHeart from './HealerHeart/HealerHeart.js';
import CatcherHeart from './CatcherHeart/CatcherHeart.js';
import TravellerHeart from './TravellerHeart/TravellerHeart.js';
import SettingsView from './SettingsContainer';
import setRequestsHook from './Inject/RequestsHook';
// import CookieMaker from './CookieMaker';
import alarm from './Alarm/Alarm';
import CommonUtils from '../Utils/CommonUtils';
import EnvironmentUtils from '../Utils/EnvironmentUtils';

class KillerState {
  constructor(state = {}) {
    this.params = {...state.params};
    this.finished = false;
    this.settings = {...state.settings};
  }

  isFinished() {
    return this.finished;
  }

  end() {
    this.finished = true;
  }

  setParam(key, value) {
    this.params[key] = value;
  }

  getParam(key) {
    return this.params[key];
  }

  removeParam(key) {
    delete this.params[key];
  }

  setSettings(settings) {
    this.settings = settings;
  }

  getSettings() {
    return this.settings;
  }
}

class Killer {
  constructor(imageReplacer) {
    this.setDocumentObserver();
    setRequestsHook();
    this.imageReplacer = imageReplacer;
  }

  init() {
    this.middlewares = [];
    this.alarm = alarm;
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

    this.settings = {
      'autofight': false,
      'attack': [ 0, 0, 0, 0 ],
      'forbiddennumbers': '',
      'showpokemons': true,
      'autoheal': true
    };

    // this.useMiddleware(state => commonHeart.nextPulse(state));
    this.useMiddleware(state => killerHeart.nextPulse(state));
    this.useMiddleware(state => travellerHeart.nextPulse(state));
    this.useMiddleware(state => healerHeart.nextPulse(state));
    // this.useMiddleware(state => catcherHeart.nextPulse(state));

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

    this.start();
  }

  setDocumentObserver() {
    const observer = new MutationObserver(() => {
      if (EnvironmentUtils.getLocationButtons().length < 1) {
        return;
      }

      observer.disconnect();
      this.init();
      setTimeout(() => this.settings.globalVars = CommonUtils.getGlobalVars(), 1000);
    });
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(document, config);
  }

  toggleVisibilityMainContainer() {
    EnvironmentUtils.toggleNodeVisibility(this.killerView.getMainContainerElement());
  }

  toggleVisibilitySettingsView() {
    EnvironmentUtils.toggleNodeVisibility(this.settingsView.getMainContainerElement());
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

    this.settings = {...newSettings};

    this.saveSettings();
    if (!this.settings.alarmswitch) {
      alarm.stopPlay();
    }
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

  /**
   * add middleware to use during lifecycle
   * @param {Function} middlewareFunction
   */
  useMiddleware(middlewareFunction) {
    this.middlewares.push(middlewareFunction);
  }

  async start() {
    let state = new KillerState();
    while (true) {
      try {
        await CommonUtils.wait(CommonUtils.random(2, 7));
        state.setSettings(this.settings);
        if (!this.settings.autofight) {
          continue;
        };

        state = await this.tick(state);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async tick(globalState) {
    let state = new KillerState(globalState);
    for (let i = 0, length = this.middlewares.length; i < length; i++) {
      if (state.isFinished()) {
        break;
      }
      state = await this.middlewares[i](state);
    }

    return state;
  }
}

export default Killer;