import { turnWildPokemons } from '../../Utils/EnvironmentUtils';

let allBaseHPpoks = [0,78,60,80,39,58,78,44,59,79,45,50,60,40,45,65,40,63,83,30,55,40,65,35,60,35,60,50,75,55,70,90,46,61,81,70,95,38,73,115,140,40,75,45,60,75,35,60,60,70,10,35,40,65,50,80,40,65,55,90,40,65,90,25,40,55,70,80,90,50,65,80,40,80,40,55,80,50,65,90,95,25,50,52,35,60,65,90,80,105,30,50,30,45,60,35,60,85,30,55,40,60,60,95,50,60,50,50,90,40,65,80,105,250,65,105,30,55,45,80,30,60,40,70,65,65,65,65,75,20,95,130,48,55,130,65,65,65,35,70,30,60,80,160,90,90,90,41,61,91,106,100,45,60,80,39,58,78,50,65,85,35,85,60,100,40,55,40,70,85,75,125,20,50,90,35,55,40,65,55,70,90,75,70,100,70,90,35,55,75,55,30,75,65,55,95,65,95,60,95,60,48,190,70,50,75,100,65,75,60,90,65,70,20,80,55,60,90,40,50,50,100,55,35,75,45,65,65,45,75,75,90,90,85,73,55,35,50,45,45,45,95,255,90,115,100,50,70,100,106,106,100,40,50,70,45,60,80,50,70,100,35,70,38,78,45,50,60,50,60,40,60,80,40,70,90,40,60,40,60,28,38,68,40,70,60,60,60,80,150,31,61,1,64,84,104,72,144,50,30,50,70,50,50,50,60,70,30,60,40,70,60,60,65,65,50,70,100,45,70,130,170,60,70,70,60,80,60,45,50,80,50,70,45,75,73,73,70,70,50,110,43,63,40,60,66,86,45,75,20,95,70,60,44,64,20,40,99,65,65,95,50,80,70,90,110,35,55,55,100,43,45,65,95,40,60,80,80,80,80,80,80,100,100,105,100,50,55,75,95,44,64,76,53,64,84,40,55,85,59,79,37,77,45,60,80,40,60,97,97,30,60,40,60,70,30,70,60,55,85,45,70,76,111,75,90,150,55,65,60,100,49,71,45,63,103,57,67,50,20,100,76,50,58,68,108,135,40,70,68,108,40,70,48,83,74,49,69,45,60,90,70,70,110,115,100,75,75,85,86,65,65,75,110,85,68,60,45,70,50,75,80,75,100,90,91,110,150,120,80,100,70,100,120,100,45,60,75,65,90,110,55,75,95,45,60,45,65,85,41,64,50,75,50,75,50,75,76,116,50,62,80,45,75,55,70,85,55,67,60,110,103,75,85,105,50,75,105,120,75,45,55,75,30,40,60,40,60,45,70,70,50,60,95,70,105,75,50,70,50,65,72,38,58,54,74,55,75,50,80,40,60,55,75,45,60,70,45,65,110,62,75,36,51,71,60,80,55,50,70,69,114,55,100,165,50,70,44,74,40,60,60,35,65,85,55,75,50,60,60,46,66,76,55,95,70,50,80,109,45,65,77,59,89,45,65,95,70,100,70,110,85,58,52,72,92,55,85,91,91,91,79,79,100,100,89,125,91,100,71,56,61,88,40,59,75,41,54,72,38,85,45,62,78,38,45,80,62,86,44,54,78,66,123,67,95,75,62,74,45,59,60,78,101,62,82,53,86,42,72,50,65,50,71,44,62,58,82,77,123,95,78,67,50,45,68,90,57,43,85,49,65,55,95,40,85,126,126,108,50,80,80];
//console.log(allBaseHPpoks.length);

class CatcherHeart {
  constructor() {
    this.init();
  }

  init() {
    this.settings = {};
    this.nextPulse = this.nextPulse.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.timeBetweenActions = 1000;
  }

  nextPulse(params={}) {
    let newParams = {...params};

    /* it should restrict disappearing of wild pokemon with time */
    if(params.waitingForCatchCounter > 30) {
      if(!this.isDivContextLoaded()) {
        this.clickPokeballOnDivFightI();
      } else this.changePokemonFromDivContext();
    }

    if(!params.needCatch || !this.settings.autocatch) return newParams;

    if(!this.isPokemonShouldBeCaughtAutomatically()) return newParams;

    let catchParams = {};
    if(!params.catchParams) {
      newParams.catchParams = catchParams;
    } else {
      catchParams = params.catchParams;
    }

    newParams.waitingForCatchCounter = 0;
    //console.log(catchParams.phase);
    //console.log(catchParams);

    if(!catchParams.phase) {
      let preparings = this.catchPreparing();
      if(!preparings) {
        //this.clickPokeballOnDivFightI();
        //catchParams.phase = 9; //??
        console.log('i cant catch with this parameters')
        return newParams;
      } else {
        this.openTeamDiv();
        catchParams.phase = 1;
        catchParams.pokemonId = preparings.id;
        catchParams.specialAttackNumber = preparings.specialAttackNumber - 1;
        catchParams.waitAttackNumber = preparings.waitAttackNumber - 1;
        catchParams.allowedPokeballs = preparings.allowedPokeballs;
        return newParams;
      }
    }

    if(catchParams.phase == 1) {
      let teamLoaded = this.isTeamOpenedAndLoaded();
      if(!teamLoaded) return newParams;
      let pokemonExist = this.findPokemonAndClickTheBallById(catchParams.pokemonId);
      if(!pokemonExist) {
        catchParams.phase = 9; //?
        return newParams;
      } else {
        let pokemonSended = this.sendPokemonInBattle();
        if(!pokemonSended) return newParams;
        catchParams.phase = 2;
        return newParams;
      }
    };

    if(catchParams.phase == 2) {
      let specialAttackClicked = this.doSpecialAttack(catchParams.specialAttackNumber);
      //this.settings.killerHeart.clickAttack(catchParams.specialAttackNumber);
      if(!specialAttackClicked) return newParams;

      catchParams.phase = 3;
      return newParams;
    }

    if(catchParams.phase == 3) {
      let enemyPreparedToCatch = this.isEnemyHpMinimal();
      if(enemyPreparedToCatch) {
        this.clickPokeballOnDivFightI();
        catchParams.phase = 5;
        return newParams;
      }

      let enemyHp = this.settings.killerHeart.getEnemyHPpercents();
      if(enemyHp != catchParams.enemyLastHP) catchParams.enemyLastHP = enemyHp;
      else {
        catchParams.idleCounter = catchParams.idleCounter ? catchParams.idleCounter + 1 : 1;
      }

      if(catchParams.idleCounter > 4) {
        catchParams.phase = 2;
        return newParams;
      }

      if(catchParams.waitAttackNumber >= 0 && catchParams.waitAttackNumber <= 3) {
        let waitAttackClicked = this.doAttackForWaiting(catchParams.waitAttackNumber)
        //this.settings.killerHeart.clickAttack(catchParams.waitAttackNumber);
        if(!waitAttackClicked) catchParams.waitAttackNumber = -1;
        return newParams;
      }

      this.clickPokeballOnDivFightI();
      catchParams.phase = 4;
      return newParams;
    }

    if(catchParams.phase == 4) {
      if(!this.isDivContextLoaded()) return newParams;
      this.changePokemonFromDivContext();
      catchParams.phase = 3;
      return newParams;
    }

    if(catchParams.phase == 5) {
      if(!this.isDivContextLoaded()) return newParams;
      this.chooseItemInFight();
      catchParams.phase = 6;
      return newParams;
    }

    if(catchParams.phase == 6) {
      if(!this.isHintsWithItemsLoaded()) return newParams;
      let throwingSuccess = this.findAndThrowPokeball(catchParams.allowedPokeballs);
      if(!throwingSuccess) {
        console.log('no pokeballs! cmon, man');
        return newParams;
      }
      catchParams.phase = 3;
      newParams.needHeal = true;
      turnWildPokemons(false);
      return newParams;
    }

    if(catchParams.phase == 7) {
      //console.log(`catched: ${catchParams.catched}`);
      //console.log(`phase 7:`, newParams);
      if(!catchParams.catched) {
        newParams.needCatch = false;
        newParams.catchParams = undefined;
        return newParams;
      }

      //console.log(`phase 7: reached:${params.destinationReached} direction:${params.direction}`);
      if(params.destinationReached && params.direction == 'fwd') {
        //console.log('now i leave pokemonss')
        newParams.needCatch = false;
        newParams.catchParams = undefined;
        return this.leaveLastPokemonInPC()
          .then(_ => newParams);
      }

      return newParams;
    }
  }

  isPokemonShouldBeCaughtAutomatically() {
    let numbersForCatch = this.settings.forbiddennumbers.match(/!\d+;?/g);
    if(!numbersForCatch || numbersForCatch.length < 1) return false;

    let enemyNumber = +this.settings.killerHeart.getEnemyPokemonNumberAsString();
    if(numbersForCatch.every(number => +number.replace(/!(\d+);?/,'$1') != +enemyNumber)) return false;

    return true;
  }

  /*
    0) open team window
    1) find pokemon by id ? 2) : 9)
      1) click on pokemon ball
      2) choose 'В битву'
      3) click special attack
        4) click attack for waiting
          or
        5) click ball
        6) change pokemons if > 1 untile hp min -> 9)
      or
    5) click ball
    7) click 'Использовать предмет'
    8) click pokeball
  */

  setSettings(settings = {}) {
    this.settings = settings;
  }

  /* catcher methods */

  setObserverIV(mode) {
    if(!mode) {
      if(!this.observerIV) return;
      this.observerIV.disconnect();
      return;
    }
    let observer = new MutationObserver(_ => {
      setTimeout( this.showEnemyIVhp, 0 );
    });
    let config = {attributes: true, childList: true, subtree: true};
    let enemyDiv = document.querySelector('#divFightH');
    if(!enemyDiv) return;
    observer.observe(enemyDiv, config);
    this.observerIV = observer;
  }

  showEnemyIVhp()
  {
    let lvlDiv = document.querySelector('#divFightH .pokemonBoxCard .lvl');

    if(!lvlDiv) return;
    if(lvlDiv.getAttribute('data-changed')) return;
    let globalVars = JSON.parse(document.querySelector('[data-globalvarsstore]').value);
    let hpStat = globalVars.enemyHPmax;
    let enemyNumber = globalVars.enemyNumber;
    let lvl = globalVars.enemyLvl;
    let hpBase = allBaseHPpoks[enemyNumber];

    let maxIVhp  = Math.floor(100*(hpStat-9.5-lvl)/lvl-(hpBase*2)-0.0001);
    let minIVhp  = Math.ceil(100*(hpStat-10.5-lvl)/lvl-(hpBase*2));

    let spanWithIV = document.createElement('span');
    spanWithIV.classList.add('killerApp__spanIV');
    spanWithIV.innerHTML = ` /IVhp: ${minIVhp}-${maxIVhp}`;
    lvlDiv.appendChild(spanWithIV);
    lvlDiv.setAttribute('data-changed', '1');
  }

  /* functions for catching: */

  /* phase 0: prepare to catch */
  catchPreparing() {
    let pokemonId = +this.settings.autocatchsettings.replace(/[^]*?\/\s?(?:id)?([^]*?)\/[^]*/,'$1').trim();
    if(!pokemonId || isNaN(pokemonId)) {
      console.log('no pokemonId');
      return false;
    }
    //let pokemonId = '3660958';
    let catcherAttackNumber = +this.settings.autocatchsettings.replace(/[^]*?\/[^]*?\/\s*(\d+?)\s*?\/[^]*/,'$1').trim();
    if(!catcherAttackNumber || isNaN(catcherAttackNumber) || catcherAttackNumber < 1 || catcherAttackNumber > 4) {
      console.log('no correct catcher attack number');
      return false;
    }
    //console.log(`catchar attack ${catcherAttackNumber}`);
    let allowedPokeballs = ['1', '2', '4'];
    let pokeballsNames = ['покебол', 'монстробол', 'pokeball', 'гритбол', 'greatball',
        'ультрабол', 'ultraball', 'мастербол', 'masterball'];
    let pokeballsParams = this.settings.autocatchsettings.replace(/([^]*?)\/[^]*/i, '$1').trim().split(';').filter(_ => _);
    //console.log(`pokeball params: `, pokeballsParams);
    pokeballsParams.forEach(pokeball => {
      let numberPokeball = pokeballsNames.findIndex(name => !!pokeball.match(new RegExp(name, 'i')));
      switch(numberPokeball) {
        case 0: case 1: case 2:
          numberPokeball = 1; break;
        case 3: case 4:
          numberPokeball = 2; break;
        case 5: case 6:
          numberPokeball = 4; break;
        case 7: case 8:
          numberPokeball = 3; break;
        default: return;
      }
      let isPokeballDepricated = !!pokeball.match(/!/);
      if(isPokeballDepricated) {
        allowedPokeballs = allowedPokeballs.filter(allowedNumber => allowedNumber != numberPokeball);
      } else {
        if(allowedPokeballs.findIndex(allowedNumber => allowedNumber == numberPokeball) != -1) return;
        allowedPokeballs.push(numberPokeball);
      }
    });

    let waitAttackNumber = +this.settings.autocatchsettings.replace(/[^]*?\/[^]*?\/[^]*?\/\s*?(\d+?)/,'$1').trim();
    waitAttackNumber = isNaN(waitAttackNumber) ? 0 : waitAttackNumber;
    //console.log(`wait attack: ${waitAttackNumber}`);
    return {id: pokemonId, specialAttackNumber: catcherAttackNumber,
            waitAttackNumber: waitAttackNumber, allowedPokeballs: allowedPokeballs};
  }

  /* phase 1: open team window */
  isTeamOpenedAndLoaded() {
    let panelWithTeam = document.querySelector('#divDockMenu .divDockPanels');
    let teamDiv = panelWithTeam.querySelector('.divPokeTeam');
    if(teamDiv.classList.contains('ajxloading')) return false;
    return true;
  }

  openTeamDiv() {
    let menuButtons = document.querySelectorAll('#divDockMenu .divDockIn .icon');
    if(menuButtons.length < 1) return;
    menuButtons[1].click();
  }

  /* phase 2-3 */
  findPokemonAndClickTheBallById(pokemonId) {
    //console.log(`trying to call poke with id${pokemonId}`);
    let ballWasClicked = Array.from(document.querySelectorAll('.divPokeTeam .pokemonBoxCard'))
      .some(pokemonCard => {
        let currentIDdiv = pokemonCard.querySelector('.id');
        if(!currentIDdiv) return false;
        let currentID = currentIDdiv.innerHTML.match(pokemonId);
        if(!currentID) return false;
        let ballToClick = pokemonCard.querySelector('.ball');
        if(!ballToClick) return false;
        ballToClick.click();
        return true;
      });
    if(ballWasClicked) return true;
    console.log(`i cant find pokemon with this id.`);
    return false;
  }

  /* phase 4 */
  sendPokemonInBattle() {
    //console.log(`now im trying to choose context item "В битву"`);
    let contextItems = Array.from(document.querySelectorAll('.divContext .divElement'));
    let pokemonChangeStarted = contextItems.some(item => {
      if(!item.innerHTML.match(/в битву/i)) return false;
      item.click();
      return true;
    });
    //console.log(`pokemon changing: ${pokemonChangeStarted}`);
    return pokemonChangeStarted;
  }

  /* phase 5 */
  doSpecialAttack(attackNumber) {
    return this.settings.killerHeart.clickAttack(attackNumber);
  }

  /* phase 6 */
  doAttackForWaiting(attackNumber) {
    return this.settings.killerHeart.clickAttack(attackNumber);
  }

  isEnemyHpMinimal() {
    let enemyHp = this.settings.killerHeart.getEnemyHPpercents();
    if(enemyHp <= 30) return true;
    return false;
  }

  /* phase 7 */
  clickPokeballOnDivFightI() {
    let dummy = document.querySelector('#divFightI .pokemonBoxDummy');
    if(dummy) dummy.click();
    else document.querySelector('#divFightI .pokemonBoxCard .boxleft .ball').click();
  }

  isDivContextLoaded() {
    let divContext = document.querySelector('.divContext');
    if(!divContext || divContext.style.display == 'none') return false;
    let divContextTitle = document.querySelector('.divContext .divTitle').innerHTML;
    if(!divContextTitle.match(/выбрать монстра/i)) return false;
    let pokemons = document.querySelectorAll('.divContext .divElement');
    if(!pokemons || pokemons.length < 1) return false;
    return true;
  }

  /* phase 8 */
  changePokemonFromDivContext() {
    let pokemons = document.querySelectorAll('.divContext .divElement');
    let numberPokemons = document.querySelectorAll('.divContext .divElement .pokemonBoxTiny').length;
    pokemons[~~((numberPokemons)*Math.random())].click();
  }

  /* phase 9 */
  chooseItemInFight() {
    let callBag = document.querySelectorAll('.divContext .divElement');
    let numberPokemons = document.querySelectorAll('.divContext .divElement .pokemonBoxTiny').length;
    let bagNumber = (callBag.length - numberPokemons) == 2 ? callBag.length - 2 : callBag.length - 1;
    callBag[bagNumber].click();
  }

  /* phase 10 */
  isHintsWithItemsLoaded() {
    let divHintTitle = document.querySelector('.hint .hinttitle').innerHTML;
    if(!divHintTitle.match(/Использовать в битве/i)) {
      console.log(`no "Использовать в битве"`);
      return false;
    }
    let hintContent = document.querySelector('.hint .hintcontent');
    let balls = document.querySelectorAll('.hint .divItemFightlist .item');
    if(!balls || balls.length < 1 || hintContent.classList.contains('loading'))
      return false;
    return true;
  }

  findAndThrowPokeball(allowedItems) {
    let items = document.querySelectorAll('.hint .divItemFightlist .item');
    items = Array.from(items);
    let ballThrowed = items.some(item => {
      let itemImage = item.querySelector('img');
      if(!itemImage) return false;
      let isItemBall = !!itemImage.src.match(/ball/i);
      if(!isItemBall) return false;
      let itemNumber = +itemImage.src.replace(/.*?(\d+)\.png/i, '$1');
      let isItemNumberAllowed = allowedItems.findIndex(item => item == itemNumber);
      if(isItemNumberAllowed == -1) return false;
      item.click();
      return true;
    });
    if(!ballThrowed) {
      console.log('No pokeballs!!!', items);
      return false;
    }
    return true;
  }

  /*     */

  isPokemonWasCaught() {
    return document.querySelector('#divFightLog .greennumber') &&
      !!document.querySelector('#divFightLog .greennumber').innerHTML.match(/монстр пойман/i);
  }

  isPokemonCanBeCaught() {
    let globalVars = JSON.parse(document.querySelector('[data-globalvarsstore]').value);
    let isPokemonCatchable = !!globalVars.enemyCatchable;
    /*
    let teamLink = 'https://game.league17.ru/do/pokes/load/team';
    let isTeamHaveEmptySlot = await this.settings.organism.sendRequest(teamLink)
      .then(response => {return response.object ? response.object.length < 6 : 0});*/
    return isPokemonCatchable;
  }

  leaveLastPokemonInPC() {
    let teamLink = 'https://game.league17.ru/do/pokes/load/team';
    let leavePokemonLink = 'https://game.league17.ru/do/pc/farm/poke';
    let leavPokemonParams = [{key:'vars', value: 0}];
    return this.settings.organism.sendRequest(teamLink)
    .then(response => {
      return response.object && response.object[response.object.length-1] &&
      response.object[response.object.length-1].id})
    .then(id => this.settings.organism.sendRequest(leavePokemonLink, [{key:'vars', value: `${id}/0`}]));
    //.then(response => console.log(response.alerten && response.alerten.type) );
  }

}

export default CatcherHeart;