class CommonHeart {
  constructor() {
    this.init();
  }

  init() {
    this.settings = {};
    this.nextPulse = this.nextPulse.bind(this);
    this.setSettings = this.setSettings.bind(this);
  }

  nextPulse(params={}) {
    let newParams = {...params};

    let isFight = this.isFight();
    //this.showLocationIds();

    newParams.isFight = isFight;
    return newParams;
  }

  setSettings(settings = {}) {
    this.settings = settings;
  }

  /* game Functions */

  showLocationIds() {
    let locationButtons = document.querySelectorAll('#divLocGo > .button');
    let nextLocationButtons = Array.from(locationButtons)
      .forEach(locationButton => {
        if(locationButton.innerHTML.match(/\[id\d+\]/)) return;
        let btnWrapper = locationButton.outerHTML;
        let locationId = btnWrapper.match(/btnGo\d+/)[0].replace('btnGo','');
        locationButton.innerHTML += ` [id${locationId}]`;
        let contentWidth = locationButton.innerHTML.length*10;
        if(locationButton.offsetWidth > contentWidth) return;
        locationButton.style.width = `${contentWidth}px`;
      });
  }

  isFight() {
    let fightDiv = document.querySelector('#divVisioFight');
    if(fightDiv.style.display == 'none') return 0; //no fight
    return 1; //fight is right now
  }

  turnWildPokemons(newState) {
    let buttonsDiv = document.querySelector('#divInputButtons');
    let turnWildButton = buttonsDiv.querySelector('.btnSwitchWilds');
    if(newState != turnWildButton.classList.contains('pressed')) turnWildButton.click();
  }

  closeFightDiv() {
    let movesDiv = document.querySelector('#divFightI .moves');
    let closeButton = document.querySelectorAll('#divFightButtons .button');
    if((movesDiv && movesDiv.style.display != 'none') || closeButton[4].style.display == 'none') return;
    closeButton[4].click();
  }

  getPokemonOpenParameter(options={}) {
    let nameDivWithPokemonInfo = options.pokemonOwner == 'player' ? '#divFightI' : '#divFightH';
    let nameDivWithParams = options.parameter == 'exp' ? '.barEXP' : '.barHP';
    let fightDivWithPokemon = document.querySelector(nameDivWithPokemonInfo);
    if(!fightDivWithPokemon) return -1;	// no fight?
    let paramBar = fightDivWithPokemon.querySelector(nameDivWithParams);
    if(!paramBar) return -2; //no param bar ?
    let pokemonParamPercents = +paramBar.firstElementChild.style.width.replace('%','');
    return pokemonParamPercents;
  }

  turnAutoFight(newState) {
    let autofightButtonCheckbox = document.querySelector('[data-changeaction=autofight]>input');
    if(newState != autofightButtonCheckbox.checked) autofightButtonCheckbox.click();
  }

  checkingIsTeamOpenedAndLoaded() {
    let panelWithTeam = document.querySelector('#divDockMenu .divDockPanels');
    if(!panelWithTeam || panelWithTeam.style.display == 'none') return this.openTeamDiv();
    let teamDiv = panelWithTeam.querySelector('.divPokeTeam');
    if(teamDiv.classList.contains('ajxloading'))
    return this.settings.organism.wait(1000)
      .then(_ => this.checkingIsTeamOpenedAndLoaded());
  }

  openTeamDiv() {
    let menuButtons = document.querySelectorAll('#divDockMenu .divDockIn .icon');
    if(menuButtons.length < 1) return;
    menuButtons[1].click();
    return this.settings.organism.wait(1000)
      .then(_ => this.checkingIsTeamOpenedAndLoaded());
  }

}

export default CommonHeart;