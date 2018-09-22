import KillerContainer from './MainContainer';
import CommonHeart from './CommonHeart';
import KillerHeart from './KillerHeart';
import HealerHeart from './HealerHeart';
import CatcherHeart from './CatcherHeart';
import TravellerHeart from './TravellerHeart';
import TravellerTentacle from './TravellerTentacle';
import SettingsView from './SettingsContainer';
import setRequestsHook from './Inject/RequestsHook';
import spillGlobalVars from './Inject/TKeyGetter';
import CookieMaker from './CookieMaker';
import Alarm from './Alarm';

class Killer {
  constructor(imageReplacer){
    //this.init();
    this.setDocumentObserver();
    setRequestsHook();
    this.imageReplacer = imageReplacer;
  }

  init() {
    this.alarm = new Alarm();
    this.settingsParametres  = ['forbiddennumbers', 'waytoheal', 'showpokemons', 'autoheal',
      'showiv', 'controlhp', 'controlexp', 'autocatch', 'autocatchsettings',
      'alarmsrc', 'alarmswitch', 'alarmvolume'];
    let killerView = new KillerContainer();
    let settingsView = new SettingsView();

    let commonHeart = new CommonHeart();
    let killerHeart = new KillerHeart();
    let healerHeart = new HealerHeart();
    let catcherHeart = new CatcherHeart();
    let travellerHeart = new TravellerHeart();
    let travellerTentacle = new TravellerTentacle();

    this.settings = {
      'autofight': false,
      'attack': [0,0,0,0],
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

    document.addEventListener('keyup', (evt)=>{
      if(evt.ctrlKey && evt.shiftKey) {
        if(evt.key == 'H' || evt.key == 'Р') {
          this.toggleVisionMainContainer();
        }
      }
    });
  }

  setDocumentObserver() {
    let observer = new MutationObserver(mut => {
      if(!document.querySelector('#divLocGo .button')) return;
      observer.disconnect();
      this.init();
      setTimeout(_ => this.settings.globalVars = this.getGlobalVars(), 1000);
     });
    let config = {attributes: true, childList: true, subtree: true};
    observer.observe( document, config );
  }

  getGlobalVars() {
    let hiddenStore = document.querySelector('[data-globalvarsstore]');
    let globalVars = JSON.parse(hiddenStore.value);
    return globalVars;
  }

  startKillerLife() {
    this.killerHeartbeat();
  }

  wait(ms, paramToChain) {
    return new Promise(resolve => {
      setTimeout(_ => resolve(paramToChain), ms);
    });
  }

  showKilledCounter(value) {
    let counterView = document.querySelector('[data-view=killedwild]');
    counterView.value = value ? value : 0;
  }

  killerHeartbeat(blood={}) {
    if(!this.settings.autofight) return Promise.resolve(blood);

    this.showKilledCounter(this.killedCounter);
    //console.log(`blood: `, blood);

    let randomTimeInterval = (Math.random()*2+1)*1000;
    return Promise.resolve(blood)
      .then(this.commonHeart.nextPulse)
      .then(this.killerHeart.nextPulse)
      .then(this.catcherHeart.nextPulse)
      .then(this.healerHeart.nextPulse)
      .then(this.travellerHeart.nextPulse)
      .then(blood => this.wait(randomTimeInterval, blood))
      .then(blood => this.killerHeartbeat(blood));
  }

  toggleVisionMainContainer() {
    let killerView = this.killerView.getMainContainerElement();
    if(killerView.style.display != 'none') killerView.style.display = 'none';
    else killerView.style.display = 'block';
  }

  toggleVisionSettingsView() {
    let settingsView = this.settingsView.getMainContainerElement();
    if(settingsView.style.display != 'none') settingsView.style.display = 'none';
    else settingsView.style.display = 'block';
  }

  injectViewsIntoDocument() {
    document.body.appendChild(this.killerView.getMainContainerElement());
    document.body.appendChild(this.settingsView.getMainContainerElement());
    this.toggleVisionSettingsView();
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
        number: attackNumber-1
      });
    });

    this.killerView.setSettingsClickListener(_ => this.toggleVisionSettingsView());
  }

  setSettingsViewListeners() {
    let parametres = this.settingsParametres;
    parametres.forEach(parameter => {
      this.settingsView.setChangeListener(parameter, (newValue) => {
        this.changeSettings({
          parameter: parameter,
          value: newValue
        });
      });
    });
  }

  changeSettings(newPartOfSettings={}) {
    let newSettings = {...this.settings};
    switch(newPartOfSettings.parameter) {
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
        if(newPartOfSettings.parameter == 'showpokemons') this.imageReplacer.switchOn(newSettings.showpokemons);
        if(newPartOfSettings.parameter == 'showiv') this.catcherHeart.setObserverIV(newSettings.showiv);
        if(newPartOfSettings.parameter == 'alarmvolume') this.alarm.changeVolume(newSettings.alarmvolume);
        if(newPartOfSettings.parameter == 'alarmsrc') this.alarm.changeMelody(newSettings.alarmsrc);
      break;
      case 'attack':
        let attackNumber = newPartOfSettings.number;
        newSettings.attack[attackNumber] = newPartOfSettings.value ? 1 : 0;
      break;
    }

    let oldAutofightStatus = this.settings.autofight;
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

  loadSettings() {
    let loadedSettings = CookieMaker.getCookie('killerSettings');
    if(!loadedSettings) return;
    loadedSettings = JSON.parse(loadedSettings);
    let parametres = this.settingsParametres;
    parametres.forEach(parameter => {
      let value = loadedSettings[parameter] && loadedSettings[parameter] != 'undefined' ? loadedSettings[parameter] : '';
      this.changeSettings({parameter: parameter, value: value});
    });
    this.settings.attack = loadedSettings.attack;
  }

  updateViews(settings) {
    let attackCheckboxes = document.querySelectorAll('[data-changeaction=attack] > input');
    attackCheckboxes.forEach((checkbox, index) => {
      checkbox.checked = !!settings.attack[index];
    });

    let parametres = this.settingsParametres;
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
    let timeExpires = new Date(new Date().getTime() + 7*24*60*60 * 1000);
    let options = {expires: timeExpires.toUTCString()};
    let settingsToSave = JSON.stringify(this.getSettingsToSave());
    CookieMaker.setCookie('killerSettings', settingsToSave, options);
  }

  getSettingsToSave() {
    let parametres = this.settingsParametres;
    let settingsToSave = {
      'attack': this.settings.attack
    }
    parametres.forEach(parameter => {
      settingsToSave[parameter] = this.settings[parameter];
    });
    return settingsToSave;
  }

  sendRequest(url, params=[]) {
    let formData = new FormData();
    formData.append('t_key', this.settings.globalVars.t_key);
    params.forEach(param => {
      formData.append(param.key, param.value);
    });
    let options = {
      method: 'POST',
      body: formData,
      credentials: 'include'
    }
    //'http://game.league17.ru/do/pokes/load/team'
    return fetch(url, options)
    .then(_ => _.json());
  }
}

export default Killer;