import {
  FSM_StateTransition,
  FSM_State,
  FSM
} from './../FSM/FiniteStateMachine';

import {
  checkIsFight
} from './EnvironmentUtils';
import KillerContainer from '../Killer/MainContainer';

class KillerFSM extends FSM {
  constructor() {
    this.environment = {
      isFight: false
    };

    this.settings = {
      'autofight': false,
      'attack': [ 0, 0, 0, 0 ],
      'forbiddennumbers': '',
      'showpokemons': true,
      'autoheal': true
    };

    this.killerView = new KillerContainer();
  }

  main() {
    const waitState = new FSM_State('wait');
    waitState.action = function() {
      this.environment.isFight = checkIsFight();
    };

    const waitStateTransitionToFight = new FSM_StateTransition();
    waitStateTransitionToFight.targetStateName = 'fight';
    waitStateTransitionToFight.addCondition(killer => killer.environment.isFight);


    const walkingState = new FSM_State('fight');
    walkingState.action = function() {
      this.environment.isFight = checkIsFight();
    };

    const walkingStateTransitionToWait = new FSM_StateTransition();
    walkingStateTransitionToWait.targetStateName = 'fight';
    walkingStateTransitionToWait.addCondition(killer => !killer.environment.isFight);
  }

  insertViewIntoDocument(view) {
    document.body.appendChild(view.getMainContainerElement());
    // document.body.appendChild(this.settingsView.getMainContainerElement());
    // this.toggleVisionSettingsView();
  }

  setMainViewListeners() {
    this.killerView.setAutoFightStatusChangedListener(newState => {
      this.changeSettings({
        parameter: 'autofight',
        value: newState
      });
    });

    this.killerView.setAttackStatusChangedListener((newState, attackNumber)=>{
      this.changeSettings({
        parameter: 'attack',
        value: newState,
        number: attackNumber - 1
      });
    });

    // this.killerView.setSettingsClickListener(_ => this.toggleVisionSettingsView());
  }

  changeSettings(newPartOfSettings = {}) {
    const newSettings = { ...this.settings };
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
        // if (newPartOfSettings.parameter == 'showpokemons') {
        //   this.imageReplacer.switchOn(newSettings.showpokemons);
        // }

        // if (newPartOfSettings.parameter == 'showiv') {
        //   this.catcherHeart.setObserverIV(newSettings.showiv);
        // }

        // if (newPartOfSettings.parameter == 'alarmvolume') {
        //   this.alarm.changeVolume(newSettings.alarmvolume);
        // }

        // if (newPartOfSettings.parameter == 'alarmsrc') {
        //   this.alarm.changeMelody(newSettings.alarmsrc);
        // }
      break;
      case 'attack':
        const attackNumber = newPartOfSettings.number;
        newSettings.attack[attackNumber] = newPartOfSettings.value ? 1 : 0;
      break;
    }

    const oldAutofightStatus = this.settings.autofight;
    this.settings = { ...newSettings };
    // this.killerHeart.setSettings(this.settings);
    // this.commonHeart.setSettings(this.settings);
    // this.healerHeart.setSettings(this.settings);
    // this.catcherHeart.setSettings(this.settings);
    // this.travellerHeart.setSettings(this.settings);
    // this.travellerTentacle.setSettings(this.settings);

    this.saveSettings();
    // if (this.settings.autofight !== oldAutofightStatus) this.startKillerLife();
  }
}