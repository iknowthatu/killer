import { turnWildPokemons, closeFightDiv, getPokemonOpenParameter } from '../../Utils/EnvironmentUtils';

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
    if(!params.isFight) {
      return params;
    }

    const newParams = {...params};

    const isCaptcha = this.isCaptchaEnterNeed();
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
    if(!numberOfPermittedAttacks) {
      //console.log('no permitted attacks');
      return newParams;
    };

    newParams.killedCounter = newParams.killedCounter ? newParams.killedCounter : 0;
    const fightStatus = this.getFightStatus();
    switch(fightStatus) {
      case 1: case 2: case 3:
        if(fightStatus == 2) this.settings.organism.killedCounter++;
        if(newParams.needCatch && newParams.catchParams) {
          newParams.catchParams.catched = this.settings.catcherHeart.isPokemonWasCaught();
          newParams.catchParams.phase = 7;
        }
        closeFightDiv();
        return newParams;
      case 4:
        console.log(`Pokemon was killed but enemy was killed too`);
        this.settings.organism.killedCounter++;
        turnWildPokemons(false);
        closeFightDiv();
        newParams.needHeal = true;
        return newParams;
      case 5:
        console.log(`Pokemon was killed`);
        turnWildPokemons(false);
        // closeFightDiv();
        newParams.needHeal = true;
        return this.changePokemon().then(_ => newParams);
    }

    if(this.settings.controlexp && !isNaN(this.settings.controlexp)) {
      const currentExp = this.getPlayerPokemonCurrentEXPpercents();
      const criticalExp = this.settings.controlexp > 90 ? this.settings.controlexp : 90;
      if(currentExp >= criticalExp) return;
    }

    const currentHp = this.getPlayerPokemonCurrentHPpercents();
    const criticalHp = this.settings.controlhp > 20 ? this.settings.controlhp : 20;
    if(currentHp <= criticalHp) {
      turnWildPokemons(false);
      newParams.needHeal = true;
    }

    const enemyPokemonNumber = this.getEnemyPokemonNumberAsString();
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

  isCaptchaEnterNeed() {
    const captchaDiv = document.querySelector('#divFightCaptcha');
    const captchaImage = captchaDiv.querySelector('img');
    if(captchaDiv.style.display == 'none' ||
        !captchaImage ||
        captchaImage.src == undefined)
      return 0; // there is no captcha form
    return 1; // oops, it wants captcha
  }

  getFightStatus() {
    const fightStatusText = document.querySelector('#divFightAction').innerHTML;
    if(fightStatusText.match(/ничья/i)) return 1; // draw
    if(fightStatusText.match(/вы победили/i)) return 2; // victory
    if(fightStatusText.match(/вы проиграли/i)) return 3; // lose

    const dummyInsteadPlayerPokemon = document.querySelector('#divFightI .pokemonBoxDummy');
    const dummyInsteadEnemyPokemon = document.querySelector('#divFightH .pokemonBoxDummy');
    if(dummyInsteadPlayerPokemon && dummyInsteadEnemyPokemon) return 4;
    //pokemon was killed/changed but u can close window
    if(dummyInsteadPlayerPokemon && !dummyInsteadEnemyPokemon) return 5;
    //pokemon was killed/changed but u can get another

    return 0; // it's okay, fight is continuing
  }

  getNumberOfPermittedAttacks() {
    return this.settings.attack.filter(attack=>attack==1).length;
  }

  getWeather() {
    const weatherDiv = document.querySelector('#divFightWeather');
    const hail = weatherDiv.querySelector('.w3');
    if(hail) return 1; // hail
    const sandstorm = weatherDiv.querySelector('.w4');
    if(sandstorm) return 2; //sandstorm
    return 0; // sun/rain etc
  }

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
    if(this.getPlayerPokemonAttackPP(attackNumber) < 1 && !lastTry) return false;
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

  getPlayerPokemonCurrentHPpercents() {
    return getPokemonOpenParameter({ pokemonOwner: 'player', parameter: 'hp' });
  }

  getPlayerPokemonCurrentEXPpercents() {
    return getPokemonOpenParameter({ pokemonOwner: 'player', parameter: 'exp' });
  }

  getPlayerPokemonAttackPP(attackNumber) {
    if(attackNumber > 3 || attackNumber < 0) return false;
    const stringWithPP = document.querySelectorAll('#divFightI .divMoveParams')[attackNumber].innerHTML;
    const currentPPValue = +stringWithPP.replace(/\/\d+/,'');
    return currentPPValue;
  }

  numberOfPermittedAttacksPP() {
    const sumOfAllPermittedAttacksPP =
      this.settings.attack.reduce((sum, attackPermission, index) => {
        if(!attackPermission) return sum;
        return sum + this.getPlayerPokemonAttackPP(index);
      }, 0);
    return sumOfAllPermittedAttacksPP;
  }

  /* infight parametres & actions with enemy pokemon */

  isEnemyCanBeCaught() {
    const noCatch = document.querySelector('#divFightOptions .nocatch');
    return noCatch != null;
  }

  getEnemyPokemonNumberAsString() {
    const enemyImage = document.querySelector('#divFightH .image > img');
    if(!enemyImage) return 0;
    const enemyNumber = enemyImage.src.match(/\d{3}/)[0];
    return enemyNumber;
  }

  getEnemyLevel() {
    const enemyLevelDiv = document.querySelector('#divFightH .lvl');
    if(!enemyLevelDiv) return 0;
    const enemyLevel = +enemyLevel.innerHTML;
    return enemyLevel;
  }

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
    const currentNumber = this.getEnemyPokemonNumberAsString();
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