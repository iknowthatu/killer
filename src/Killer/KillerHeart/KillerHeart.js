import EnvironmentUtils from '../../Utils/EnvironmentUtils';
import FightUtils from './../../Utils/FightUtils';
import {
  FIGHT_STATUS_VICTORY,
  FIGHT_STATUS_FAIL,
  FIGHT_STATUS_DRAW,
  FIGHT_STATUS_HARD_DRAW,
  FIGHT_STATUS_POKEMON_LOST
} from '../../configs/killerConfigs';
import CommonUtils from '../../Utils/CommonUtils';

class KillerHeart {
  constructor() {
    this.init();
  }

  init() {
    this.settings = {};
    this.nextPulse = this.nextPulse.bind(this);
    this.setSettings = this.setSettings.bind(this);
  }

  switchAlarm(value) {
    if (!value || !this.settings.alarmswitch) {
      return this.settings.organism.alarm.stopPlay();
    }

    this.settings.organism.alarm.startPlay();
  }

  nextPulse(params = {}) {
    if (!params.isFight) {
      return params;
    }

    const newParams = { ...params };

    const isCaptcha = EnvironmentUtils.isCaptchaVisible();
    newParams.isCaptcha = isCaptcha;
    if(isCaptcha) {
      console.log('u should enter captcha');

      // for electron wrapper
      if (window.killerExtension && window.killerExtension.shotCaptcha) {
        window.killerExtension.shotCaptcha();
      }

      this.switchAlarm(true);
      return newParams;
    };
    this.switchAlarm(false);

    const numberOfPermittedAttacks = FightUtils.getNumberOfPermittedAttacks(this.settings.attack);
    if (!numberOfPermittedAttacks) {
      //console.log('no permitted attacks');
      return newParams;
    };

    newParams.killedCounter = newParams.killedCounter ? newParams.killedCounter : 0;
    const fightStatus = FightUtils.getFightStatus();
    switch (fightStatus) {
      case FIGHT_STATUS_VICTORY: case FIGHT_STATUS_FAIL: case FIGHT_STATUS_DRAW:
        if(fightStatus === FIGHT_STATUS_VICTORY) this.settings.organism.killedCounter++;
        if(newParams.needCatch && newParams.catchParams) {
          newParams.catchParams.catched = this.settings.catcherHeart.isPokemonWasCaught();
          newParams.catchParams.phase = 7;
        }
        EnvironmentUtils.closeFightLayerNode();
        return newParams;

      case FIGHT_STATUS_HARD_DRAW:
        console.log(`Pokemon was killed but enemy was killed too`);
        this.settings.organism.killedCounter++;
        EnvironmentUtils.turnWildPokemons(false);
        EnvironmentUtils.closeFightLayerNode();
        newParams.needHeal = true;
        return newParams;

      case FIGHT_STATUS_POKEMON_LOST:
        console.log(`Pokemon was killed`);
        EnvironmentUtils.turnWildPokemons(false);
        // EnvironmentUtils.closeFightLayerNode();
        newParams.needHeal = true;
        return this.changePokemon().then(() => newParams);
    }

    if (this.settings.controlexp && !isNaN(this.settings.controlexp)) {
      const currentExp = EnvironmentUtils.getPlayerPokemonCurrentEXPpercents();
      const criticalExp = this.settings.controlexp > 90 ? this.settings.controlexp : 90;
      if(currentExp >= criticalExp) return;
    }

    const currentHp = EnvironmentUtils.getPlayerPokemonCurrentHPpercents();
    const criticalHp = this.settings.controlhp > 20 ? this.settings.controlhp : 20;
    if(currentHp <= criticalHp) {
      EnvironmentUtils.turnWildPokemons(false);
      newParams.needHeal = true;
    }

    const enemyPokemonNumber = EnvironmentUtils.getEnemyPokemonNumberAsString();
    newParams.lastPokemonNumber = enemyPokemonNumber;
    if (FightUtils.isAttackForbiddenForThisNumber(this.settings.forbiddennumbers) &&
        (this.settings.catcherHeart.isPokemonCanBeCaught() ||
        !this.settings.catcherHeart.isPokemonShouldBeCaughtAutomatically())) {
      //console.log('forbidden pokemon');

      newParams.waitingForCatchCounter && newParams.waitingForCatchCounter++ ||
        (newParams.waitingForCatchCounter = 0);
      newParams.needCatch = true;
      return newParams;
    }

    const enemyType = FightUtils.isEnemyNormal();
    if(!enemyType) {
      console.log('Enemy is shine or smt else');
      this.switchAlarm();
      //newParams.needCatch = true;
      newParams.waitingForCatchCounter && newParams.waitingForCatchCounter++ ||
        (newParams.waitingForCatchCounter = 0);
      return newParams;
    }

    this.repeatAttackCounter = 0;
    if(FightUtils.getNumberOfPermittedAttacksPP(this.settings.attack) < 2) {
      console.log('PP is over. Need Heal');
      EnvironmentUtils.turnWildPokemons(false);
      newParams.needHeal = true;
      this.chooseAttack(true);
      return newParams;
    }

    this.chooseAttack();
    return newParams;
  }

  /* fight actions & parametres */
  // getWeather() {
  //   const weatherDiv = document.querySelector('#divFightWeather');
  //   const hail = weatherDiv.querySelector('.w3');
  //   if(hail) return 1; // hail
  //   const sandstorm = weatherDiv.querySelector('.w4');
  //   if(sandstorm) return 2; //sandstorm
  //   return 0; // sun/rain etc
  // }

  chooseAttack(lastTry) {
    if (!FightUtils.getNumberOfPermittedAttacks(this.settings.attack)) {
      return;
    }
    //if(this.numberOfPermittedAttacksPP() < 1) return; //excess checking
    const randomAttack = ~~(Math.random()*4);
    if (this.settings.attack[randomAttack]) {
      const resultClicking = FightUtils.clickAttack(randomAttack, lastTry);
      if (resultClicking) {
        return;
      }
    }

    this.repeatAttackCounter++;
    if (this.repeatAttackCounter > 100) {
      throw 'Too much attacks repeat';
    }

    this.chooseAttack(lastTry);
  }

  /* switch pokemon */

  isPokemonsListToChangeLoaded() {
    const divContextTitle = document.querySelector('.divContext .divTitle').innerHTML;
    if (!divContextTitle.match(/выбрать монстра/i)) {
      return this.changePokemon();
    }

    const pokemons = document.querySelectorAll('.divContext .divElement');
    if (!pokemons || pokemons.length < 1) {
      return CommonUtils.wait(1000)
        .then(() => this.isPokemonsListToChangeLoaded());
    }

    return true;
  }

  changePokemon() {
    return CommonUtils.wait(500)
      .then(() => {
        document.querySelector('#divFightI .pokemonBoxDummy').click();
      })
      .then(() => CommonUtils.wait(1000))
      .then(() => this.isPokemonsListToChangeLoaded())
      .then(() => {
        const pokemons = document.querySelectorAll('.divContext .divElement');
        pokemons[~~(pokemons.length*Math.random())].click();
      })
      .then(() => CommonUtils.wait(1000));
  }

  /* infight parametres & actions with enemy pokemon */

  // isEnemyCanBeCaught() {
  //   const noCatch = document.querySelector('#divFightOptions .nocatch');
  //   return noCatch != null;
  // }

  // getEnemyLevel() {
  //   const enemyLevelDiv = document.querySelector('#divFightH .lvl');
  //   if(!enemyLevelDiv) return 0;
  //   const enemyLevel = +enemyLevel.innerHTML;
  //   return enemyLevel;
  // }
  /* common actions */

  setSettings(settings={}) {
    this.settings = settings;
  }

}

export default KillerHeart;