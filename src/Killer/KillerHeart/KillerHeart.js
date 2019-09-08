import {
  turnWildPokemons,
  closeFightDiv,
  getPokemonOpenParameter,
  checkIsCaptchaAppears,
  getPlayerPokemonCurrentHPpercents,
  getPlayerPokemonCurrentEXPpercents,
  getPlayerPokemonAttackPP,
  getEnemyPokemonNumberAsString
} from '../../Utils/EnvironmentUtils';
import { getFightStatus } from '../../KillerFSM/FightUtils';
import { FIGHT_STATUS_VICTORY, FIGHT_STATUS_FAIL, FIGHT_STATUS_DRAW, FIGHT_STATUS_HARD_DRAW, FIGHT_STATUS_POKEMON_LOST } from '../../configs/killerConfigs';

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
    if(!value || !this.settings.alarmswitch) return this.settings.organism.alarm.stopPlay();
    this.settings.organism.alarm.startPlay();
  }

  nextPulse(params = {}) {
    if (!params.isFight) {
      return params;
    }

    const newParams = { ...params };

    const isCaptcha = checkIsCaptchaAppears();
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

    const numberOfPermittedAttacks = this.getNumberOfPermittedAttacks();
    if (!numberOfPermittedAttacks) {
      //console.log('no permitted attacks');
      return newParams;
    };

    newParams.killedCounter = newParams.killedCounter ? newParams.killedCounter : 0;
    const fightStatus = getFightStatus();
    switch (fightStatus) {
      case FIGHT_STATUS_VICTORY: case FIGHT_STATUS_FAIL: case FIGHT_STATUS_DRAW:
        if(fightStatus === FIGHT_STATUS_VICTORY) this.settings.organism.killedCounter++;
        if(newParams.needCatch && newParams.catchParams) {
          newParams.catchParams.catched = this.settings.catcherHeart.isPokemonWasCaught();
          newParams.catchParams.phase = 7;
        }
        closeFightDiv();
        return newParams;
      case FIGHT_STATUS_HARD_DRAW:
        console.log(`Pokemon was killed but enemy was killed too`);
        this.settings.organism.killedCounter++;
        turnWildPokemons(false);
        closeFightDiv();
        newParams.needHeal = true;
        return newParams;
      case FIGHT_STATUS_POKEMON_LOST:
        console.log(`Pokemon was killed`);
        turnWildPokemons(false);
        // closeFightDiv();
        newParams.needHeal = true;
        return this.changePokemon().then(_ => newParams);
    }

    if (this.settings.controlexp && !isNaN(this.settings.controlexp)) {
      const currentExp = getPlayerPokemonCurrentEXPpercents();
      const criticalExp = this.settings.controlexp > 90 ? this.settings.controlexp : 90;
      if(currentExp >= criticalExp) return;
    }

    const currentHp = getPlayerPokemonCurrentHPpercents();
    const criticalHp = this.settings.controlhp > 20 ? this.settings.controlhp : 20;
    if(currentHp <= criticalHp) {
      turnWildPokemons(false);
      newParams.needHeal = true;
    }

    const enemyPokemonNumber = getEnemyPokemonNumberAsString();
    newParams.lastPokemonNumber = enemyPokemonNumber;
    if( this.isAttackForbiddenForThisNumber() &&
        (this.settings.catcherHeart.isPokemonCanBeCaught() ||
        !this.settings.catcherHeart.isPokemonShouldBeCaughtAutomatically())) {
      //console.log('forbidden pokemon');

      newParams.waitingForCatchCounter && newParams.waitingForCatchCounter++ ||
        (newParams.waitingForCatchCounter = 0);
      newParams.needCatch = true;
      return newParams;
    }

    const enemyType = this.isEnemyNormal();
    if(!enemyType) {
      console.log('Enemy is shine or smt else');
      this.switchAlarm();
      //newParams.needCatch = true;
      newParams.waitingForCatchCounter && newParams.waitingForCatchCounter++ ||
        (newParams.waitingForCatchCounter = 0);
      return newParams;
    }

    this.repeatAttackCounter = 0;
    if(this.numberOfPermittedAttacksPP() < 2) {
      console.log('PP is over. Need Heal');
      turnWildPokemons(false);
      newParams.needHeal = true;
      this.chooseAttack(true);
      return newParams;
    }

    this.chooseAttack();
    return newParams;
  }

  /* fight actions & parametres */
  getNumberOfPermittedAttacks() {
    return this.settings.attack.filter(attack => attack === 1).length;
  }

  // getWeather() {
  //   const weatherDiv = document.querySelector('#divFightWeather');
  //   const hail = weatherDiv.querySelector('.w3');
  //   if(hail) return 1; // hail
  //   const sandstorm = weatherDiv.querySelector('.w4');
  //   if(sandstorm) return 2; //sandstorm
  //   return 0; // sun/rain etc
  // }

  chooseAttack(lastTry) {
    if(!this.getNumberOfPermittedAttacks()) return;
    //if(this.numberOfPermittedAttacksPP() < 1) return; //excess checking
    const randomAttack = ~~(Math.random()*4);
    if(this.settings.attack[randomAttack]) {
      const resultClicking = this.clickAttack(randomAttack, lastTry);
      if(resultClicking) return;
    }
    this.repeatAttackCounter++;
    if(this.repeatAttackCounter > 100) throw 'Too much attacks repeat';
    this.chooseAttack(lastTry);
  }

  clickAttack(attackNumber, lastTry) {
    if(attackNumber > 3 || attackNumber < 0) return false;
    if(getPlayerPokemonAttackPP(attackNumber) < 1 && !lastTry) return false;
    const moveBox = document.querySelectorAll('#divFightI .moveBox')[attackNumber];
    if(!moveBox) return false;
    if(!moveBox.querySelector('.divMove')) return false;
    const divForClicking = moveBox.querySelector('.divMoveInfo');
    divForClicking.click();
    return true;
  }

  /* switch pokemon */

  checkIsPokemonsListToChangeLoaded() {
    const divContextTitle = document.querySelector('.divContext .divTitle').innerHTML;
    if(!divContextTitle.match(/выбрать монстра/i)) return this.changePokemon();
    const pokemons = document.querySelectorAll('.divContext .divElement');
    if(!pokemons || pokemons.length < 1)
    return this.settings.organism.wait(1000)
      .then(_ => this.checkIsPokemonsListToChangeLoaded());
    return true;
  }

  changePokemon() {
    return this.settings.organism.wait(500)
    .then(_ => {
      document.querySelector('#divFightI .pokemonBoxDummy').click();
    })
    .then(_ => this.settings.organism.wait(1000))
    .then(_ => this.checkIsPokemonsListToChangeLoaded())
    .then(_ => {
      const pokemons = document.querySelectorAll('.divContext .divElement');
      pokemons[~~(pokemons.length*Math.random())].click();
    })
    .then(_ => this.settings.organism.wait(1000));
  }

  /* infight parametres & actions with player pokemon */
  numberOfPermittedAttacksPP() {
    return this.settings.attack.reduce((sum, attackPermission, index) => {
        if (!attackPermission) {
          return sum;
        }

        return sum + getPlayerPokemonAttackPP(index);
      }, 0);
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

  isEnemyNormal() {
    const enemyRankDiv = document.querySelector('#divFightH .rank');
    if(!enemyRankDiv) return true;
    const enemyRankSpan = enemyRankDiv.querySelector('span');
    if(!enemyRankSpan) {
      const enemyRank = enemyRankDiv.innerHTML;
      if(enemyRank.match(/\S+/)) return false;
    } else {
      if(enemyRankSpan.innerHTML.match(/\S+/)) return false;
    }
    return true;
  }

  getEnemyHPpercents() {
    return getPokemonOpenParameter({ pokemonOwner: 'enemy', parameter: 'hp' });
  }

  isAttackForbiddenForThisNumber() {
    const currentNumber = getEnemyPokemonNumberAsString();
    const forbiddenNumbers = this.settings.forbiddennumbers.match(/\d{1,3};?/g);
    if(!forbiddenNumbers) return false;
    return forbiddenNumbers.some(number => +currentNumber == +(number.replace(';','')));
  }

  /* common actions */

  setSettings(settings={}) {
    this.settings = settings;
  }

}

export default KillerHeart;