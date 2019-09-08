import {
  SELECTOR_FIGHT_VIEW,
  SELECTOR_CAPTCHA,
  SELECTOR_INTERFACE_TOGGLE_WILD,
  SELECTOR_FIGHT_PLAYER_POKEMON_MOVES,
  SELECTOR_FIGHT_PLAYER_ACTION_BUTTON
} from '../configs/querySelectors';

function checkIsNodeVisible(node) {
  return node.style.display !== 'none';
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
  const movesDiv = document.querySelector(SELECTOR_FIGHT_PLAYER_POKEMON_MOVES);
  const closeButton = document.querySelectorAll(SELECTOR_FIGHT_PLAYER_ACTION_BUTTON);
  if ((movesDiv && checkIsNodeVisible(movesDiv)) || !checkIsNodeVisible(closeButton[CLOSE_FIGHT_VIEW_BUTTON_NUMBER])) {
    return;
  }

  closeButton[CLOSE_FIGHT_VIEW_BUTTON_NUMBER].click();
}