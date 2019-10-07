import {
  SELECTOR_FIGHT_VIEW,
  SELECTOR_CAPTCHA,
  SELECTOR_INTERFACE_TOGGLE_WILD,
  SELECTOR_FIGHT_PLAYER_POKEMON_MOVES,
  SELECTOR_FIGHT_PLAYER_ACTION_BUTTON,
  SELECTOR_FIGHT_POKEMON_PANEL_PLAYER,
  SELECTOR_FIGHT_POKEMON_PANEL_ENEMY,
  SELECTOR_FIGHT_PLAYER_POKEMON_MOVE_PARAMS,
  SELECTOR_FIGHT_ENEMY_POKEMON_IMAGE,
  SELECTOR_LOCATION_TRANSITIONS_BUTTONS,
  SELECTOR_POKECENTER_HEAL_BUTTON,
  SELECTOR_POKECENTER_FARM_BUTTON
} from '../configs/querySelectors';

export default class EnvironmentUtils {

  /**
   * check display style parameter
   * @param {HTMLElement} node
   */
  static isNodeVisible(node) {
    return node && node.style.display !== 'none';
  }

  /**
   * check is fight mode active
   * @returns {boolean}
   */
  static isFight() {
    const fightViewNode = document.querySelector(SELECTOR_FIGHT_VIEW);

    return EnvironmentUtils.isNodeVisible(fightViewNode);
  }

  /**
   * [fight mode]
   * returns true if capthca appeared
   * false in other case
   * @returns {boolean}
   */
  static isCaptchaVisible() {
    const captchaNode = document.querySelector(SELECTOR_CAPTCHA);
    const captchaImage = captchaNode.querySelector('img');

    return EnvironmentUtils.isNodeVisible(captchaNode) &&
      captchaImage && captchaImage.src !== undefined;
  }

  /**
   * [fight mode]
   * returns enemy pokemon number
   * @returns {string}
   */
  static getEnemyPokemonNumberAsString() {
    const enemyPokemonImageNode = document.querySelector(SELECTOR_FIGHT_ENEMY_POKEMON_IMAGE);
    if (!enemyPokemonImageNode) {
      return 0;
    }

    const enemyNumber = enemyPokemonImageNode.src.match(/\d{3}/)[0];
    return enemyNumber;
  }

  /**
   * [fight mode]
   * returns number of available PP for 'attackNumber' move of pokemon
   * @param {number} attackNumber
   * @returns {number}
   */
  static getPlayerPokemonAttackPP(attackNumber) {
    if (attackNumber > 3 || attackNumber < 0) {
      return false;
    }

    const stringWithPP = document.querySelectorAll(SELECTOR_FIGHT_PLAYER_POKEMON_MOVE_PARAMS)[attackNumber].innerHTML;
    const currentPPValue = parseInt(stringWithPP.replace(/\/\d+/, ''));

    return currentPPValue;
  }

  /**
   * [fight mode]
   * returns number of percentes for player's pokemon exp
   * or undefined, if there is no available exp bar
   * @returns {number}
   */
  static getPlayerPokemonCurrentEXPpercents() {
    return EnvironmentUtils.getPokemonOpenParameter({ pokemonOwner: 'player', parameter: 'exp' });
  }

  /**
   * [fight mode]
   * returns number of percentes for player's pokemon hp
   * or undefined, if there is no available hp bar
   * @returns {number}
   */
  static getPlayerPokemonCurrentHPpercents() {
    return EnvironmentUtils.getPokemonOpenParameter({ pokemonOwner: 'player', parameter: 'hp' });
  }

  /**
   * [fight mode]
   * returns number of percentes for pokemon parameter
   * or undefined, if there is no available parameter bar
   * @param {object} options
   * @param {string} options.pokemonOwner
   * @param {string} options.parameter
   * @returns {number}
   */
  static getPokemonOpenParameter(options = {}) {
    const parameterNodeClassname = options.parameter === 'exp' ? '.barEXP' : '.barHP';
    const fightPokemonPanelNode = options.pokemonOwner !== 'player' ? EnvironmentUtils.getFightEnemyPanel() : EnvironmentUtils.getFightPlayerPanel();
    if (!fightPokemonPanelNode) { // no fight?
      return;
    }

    const parameterBarNode = fightPokemonPanelNode.querySelector(parameterNodeClassname);
    if (!parameterBarNode) { //no param bar ?
      return;
    }

    const pokemonParameterPercentes = parseInt(parameterBarNode.firstElementChild
      .style.width.replace('%', ''));

    return pokemonParameterPercentes;
  }

  /**
   * [fight mode]
   * returns node with enemy pokemon panel
   * @returns {HTMLElement}
   */
  static getFightEnemyPanel() {
    return document.querySelector(SELECTOR_FIGHT_POKEMON_PANEL_ENEMY);
  }

  /**
   * [fight mode]
   * returns node with player pokemon panel
   * @returns {HTMLElement}
   */
  static getFightPlayerPanel() {
    return document.querySelector(SELECTOR_FIGHT_POKEMON_PANEL_PLAYER);
  }

  /**
   * [fight mode]
   * close view layer of fight.
   */
  static closeFightLayerNode() {
    const CLOSE_FIGHT_VIEW_BUTTON_NUMBER = 4;
    const pokeMovesNode = document.querySelector(SELECTOR_FIGHT_PLAYER_POKEMON_MOVES);
    const closeButtonNode = document.querySelectorAll(SELECTOR_FIGHT_PLAYER_ACTION_BUTTON)[CLOSE_FIGHT_VIEW_BUTTON_NUMBER];
    if ((pokeMovesNode && EnvironmentUtils.isNodeVisible(pokeMovesNode)) ||
        !EnvironmentUtils.isNodeVisible(closeButtonNode)) {
      return;
    }

    closeButtonNode.click();
  }

  /**
   * turn on/off fights with wild pokemons
   * @param {boolean} newState
   */
  static turnWildPokemons(newState) {
    const turnWildButtonNode = document.querySelector(SELECTOR_INTERFACE_TOGGLE_WILD);
    if (newState !== turnWildButtonNode.classList.contains('pressed')) {
      turnWildButtonNode.click();
    }
  }

  /**
   * @returns {HTMLCollection}
   */
  static getLocationButtons() {
    return document.querySelectorAll(SELECTOR_LOCATION_TRANSITIONS_BUTTONS);
  }

  /**
   * collect all transition buttons ids and concat them into one string
   * @returns {string}
   */
  static getLocationInfoByAvailableTransitions() {
    return Array.from(EnvironmentUtils.getLocationButtons())
      .map(transitionButton => transitionButton.id)
      .join('');
  }

  /**
   * @returns {boolean}
   */
  static isPokecenter() {
    return document.querySelector(SELECTOR_POKECENTER_HEAL_BUTTON) &&
      document.querySelector(SELECTOR_POKECENTER_FARM_BUTTON);
  }

  /**
   * show number of killed enemies in special input
   * @param {number} value
   */
  static showKilledCounter(value) {
    const counterView = document.querySelector('[data-view=killedwild]');
    counterView.value = value ? value : 0;
  }

  /**
   *
   * @param {HTMLElement} node
   */
  static toggleNodeVisibility(node) {
    if (node.style.display !== 'none') {
      node.style.display = 'none';
    } else {
      node.style.display = 'block';
    }
  }

  /**
   * toggle autofight input
   * @param {boolean} newState
   */
  static turnAutoFight(newState) {
    const autofightButtonCheckbox = document.querySelector('[data-changeaction=autofight]>input');
    if(newState !== autofightButtonCheckbox.checked) autofightButtonCheckbox.click();
  }

  /**
   * click enter button when game page will be loaded first time.
   */
  static startGameProcess() {
    const startButton = document.querySelector('.waiter .btnStart');
    if (!startButton) {
      return;
    }

    startButton.click();
    EnvironmentUtils.turnWildPokemons(true);
    EnvironmentUtils.turnAutoFight(true);
  }
}