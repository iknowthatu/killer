import {
  SELECTOR_FIGHT_VIEW,
  SELECTOR_CAPTCHA,
  SELECTOR_INTERFACE_TOGGLE_WILD,
  SELECTOR_FIGHT_PLAYER_POKEMON_MOVES,
  SELECTOR_FIGHT_PLAYER_ACTION_BUTTON,
  SELECTOR_FIGHT_POKEMON_PANEL_PLAYER,
  SELECTOR_FIGHT_POKEMON_PANEL_ENEMY,
  SELECTOR_FIGHT_PLAYER_POKEMON_MOVE_PARAMS,
  SELECTOR_FIGHT_ENEMY_POKEMON_IMAGE
} from '../configs/querySelectors';

export default class EnvironmentUtils {

  /**
   * check display style parameter
   * @param {HTMLElement} node
   */
  static checkIsNodeVisible(node) {
    return node && node.style.display !== 'none';
  }

  /**
   * check is fight mode active
   * @returns {boolean}
   */
  static checkIsFight() {
    const fightViewNode = document.querySelector(SELECTOR_FIGHT_VIEW);

    return EnvironmentUtils.checkIsNodeVisible(fightViewNode);
  }

  /**
   * returns true if capthca appeared
   * false in other case
   * @returns {boolean}
   */
  static checkIsCaptchaAppears() {
    const captchaNode = document.querySelector(SELECTOR_CAPTCHA);
    const captchaImage = captchaNode.querySelector('img');

    return EnvironmentUtils.checkIsNodeVisible(captchaNode) &&
      captchaImage && captchaImage.src !== undefined;
  }

  /**
   * get enemy pokemon number
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
   *
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
   * @returns {number}
   */
  static getPlayerPokemonCurrentEXPpercents() {
    return EnvironmentUtils.getPokemonOpenParameter({ pokemonOwner: 'player', parameter: 'exp' });
  }

  /**
   * @returns {number}
   */
  static getPlayerPokemonCurrentHPpercents() {
    return EnvironmentUtils.getPokemonOpenParameter({ pokemonOwner: 'player', parameter: 'hp' });
  }

  /**
   *
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

    const pokemonParameterPercentes = +parameterBarNode.firstElementChild
      .style.width.replace('%', '');

    return pokemonParameterPercentes;
  }

  /**
   * @returns {HTMLElement}
   */
  static getFightEnemyPanel() {
    return document.querySelector(SELECTOR_FIGHT_POKEMON_PANEL_ENEMY);
  }

  /**
   * @returns {HTMLElement}
   */
  static getFightPlayerPanel() {
    return document.querySelector(SELECTOR_FIGHT_POKEMON_PANEL_PLAYER);
  }

  /**
   * close view layer of fight.
   */
  static closeFightLayerNode() {
    const CLOSE_FIGHT_VIEW_BUTTON_NUMBER = 4;
    const pokeMovesNode = document.querySelector(SELECTOR_FIGHT_PLAYER_POKEMON_MOVES);
    const closeButtonNode = document.querySelectorAll(SELECTOR_FIGHT_PLAYER_ACTION_BUTTON)[CLOSE_FIGHT_VIEW_BUTTON_NUMBER];
    if ((pokeMovesNode && EnvironmentUtils.checkIsNodeVisible(pokeMovesNode)) || !EnvironmentUtils.checkIsNodeVisible(closeButtonNode)) {
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
}