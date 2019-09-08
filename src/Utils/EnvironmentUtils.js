import {
  SELECTOR_FIGHT_VIEW,
  SELECTOR_CAPTCHA,
  SELECTOR_INTERFACE_TOGGLE_WILD,
  SELECTOR_FIGHT_PLAYER_POKEMON_MOVES,
  SELECTOR_FIGHT_PLAYER_ACTION_BUTTON,
  SELECTOR_FIGHT_POKEMON_PANEL_PLAYER,
  SELECTOR_FIGHT_POKEMON_PANEL_ENEMY
} from '../configs/querySelectors';

/**
 * check display style parameter
 * @param {HTMLElement} node
 */
export function checkIsNodeVisible(node) {
  return node && node.style.display !== 'none';
}

/**
 * check is fight mode active
 * @returns {boolean}
 */
export function checkIsFight() {
  const fightViewNode = document.querySelector(SELECTOR_FIGHT_VIEW);

  return checkIsNodeVisible(fightViewNode);
}

/**
 * check is captcha blocked process
 * @returns {boolean}
 */
export function checkIsCaptchaAppears() {
  const captchaNode = document.querySelector(SELECTOR_CAPTCHA);
  const captchaImage = captchaNode.querySelector('img');

  return checkIsNodeVisible(captchaNode) &&
    captchaImage && captchaImage.src !== undefined;
}

/**
 * turn on/off fights with wild pokemons
 * @param {boolean} newState
 */
export function turnWildPokemons(newState) {
  const turnWildButtonNode = document.querySelector(SELECTOR_INTERFACE_TOGGLE_WILD);
  if (newState !== turnWildButtonNode.classList.contains('pressed')) {
    turnWildButtonNode.click();
  }
}

/**
 * close view layer of fight.
 */
export function closeFightDiv() {
  const CLOSE_FIGHT_VIEW_BUTTON_NUMBER = 4;
  const pokeMovesNode = document.querySelector(SELECTOR_FIGHT_PLAYER_POKEMON_MOVES);
  const closeButtonNode = document.querySelectorAll(SELECTOR_FIGHT_PLAYER_ACTION_BUTTON)[CLOSE_FIGHT_VIEW_BUTTON_NUMBER];
  if ((pokeMovesNode && checkIsNodeVisible(pokeMovesNode)) || !checkIsNodeVisible(closeButtonNode)) {
    return;
  }

  closeButtonNode.click();
}

/**
 * @returns {HTMLElement}
 */
export function getFightPlayerPanel() {
  return document.querySelector(SELECTOR_FIGHT_POKEMON_PANEL_PLAYER);
}

/**
 * @returns {HTMLElement}
 */
export function getFightEnemyPanel() {
  return document.querySelector(SELECTOR_FIGHT_POKEMON_PANEL_ENEMY);
}

/**
 *
 * @param {object} options
 * @param {string} options.pokemonOwner
 * @param {string} options.parameter
 * @returns {number}
 */
export function getPokemonOpenParameter(options = {}) {
  const parameterNodeClassname = options.parameter === 'exp' ? '.barEXP' : '.barHP';
  const fightPokemonPanelNode = options.pokemonOwner !== 'player' ? getFightEnemyPanel() : getFightPlayerPanel();
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