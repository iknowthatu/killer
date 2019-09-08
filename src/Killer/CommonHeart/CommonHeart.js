import { checkIsFight } from '../../KillerFSM/EnvironmentUtils';

class CommonHeart {
  constructor() {
    this.init();
  }

  init() {
    this.settings = {};
    this.nextPulse = this.nextPulse.bind(this);
    this.setSettings = this.setSettings.bind(this);
  }

  nextPulse(params = {}) {
    const newParams = { ...params };

    const isFight = checkIsFight();
    //this.showLocationIds();
    newParams.isFight = isFight;

    return newParams;
  }

  setSettings(settings = {}) {
    this.settings = settings;
  }

  /* game Functions */
  showLocationIds() {
    const locationButtons = document.querySelectorAll('#divLocGo > .button');
    const nextLocationButtons = Array.from(locationButtons)
      .forEach(locationButton => {
        if(locationButton.innerHTML.match(/\[id\d+\]/)) return;
        const btnWrapper = locationButton.outerHTML;
        const locationId = btnWrapper.match(/btnGo\d+/)[0].replace('btnGo','');
        locationButton.innerHTML += ` [id${locationId}]`;
        const contentWidth = locationButton.innerHTML.length*10;
        if(locationButton.offsetWidth > contentWidth) return;
        locationButton.style.width = `${contentWidth}px`;
      });
  }

  turnWildPokemons(newState) {
    const buttonsDiv = document.querySelector('#divInputButtons');
    const turnWildButton = buttonsDiv.querySelector('.btnSwitchWilds');
    if(newState != turnWildButton.classList.contains('pressed')) turnWildButton.click();
  }

  closeFightDiv() {
    const movesDiv = document.querySelector('#divFightI .moves');
    const closeButton = document.querySelectorAll('#divFightButtons .button');
    if((movesDiv && movesDiv.style.display != 'none') || closeButton[4].style.display == 'none') return;
    closeButton[4].click();
  }

  getPokemonOpenParameter(options={}) {
    const nameDivWithPokemonInfo = options.pokemonOwner == 'player' ? '#divFightI' : '#divFightH';
    const nameDivWithParams = options.parameter == 'exp' ? '.barEXP' : '.barHP';
    const fightDivWithPokemon = document.querySelector(nameDivWithPokemonInfo);
    if(!fightDivWithPokemon) return -1;	// no fight?
    const paramBar = fightDivWithPokemon.querySelector(nameDivWithParams);
    if(!paramBar) return -2; //no param bar ?
    const pokemonParamPercents = +paramBar.firstElementChild.style.width.replace('%','');
    return pokemonParamPercents;
  }

  turnAutoFight(newState) {
    const autofightButtonCheckbox = document.querySelector('[data-changeaction=autofight]>input');
    if(newState != autofightButtonCheckbox.checked) autofightButtonCheckbox.click();
  }

  checkingIsTeamOpenedAndLoaded() {
    const panelWithTeam = document.querySelector('#divDockMenu .divDockPanels');
    if(!panelWithTeam || panelWithTeam.style.display == 'none') return this.openTeamDiv();
    const teamDiv = panelWithTeam.querySelector('.divPokeTeam');
    if(teamDiv.classList.contains('ajxloading'))
    return this.settings.organism.wait(1000)
      .then(_ => this.checkingIsTeamOpenedAndLoaded());
  }

  openTeamDiv() {
    const menuButtons = document.querySelectorAll('#divDockMenu .divDockIn .icon');
    if(menuButtons.length < 1) return;
    menuButtons[1].click();
    return this.settings.organism.wait(1000)
      .then(_ => this.checkingIsTeamOpenedAndLoaded());
  }

}

export default CommonHeart;