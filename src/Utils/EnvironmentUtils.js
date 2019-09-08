import {
  SELECTOR_FIGHT_VIEW,
  SELECTOR_CAPTCHA,
  SELECTOR_INTERFACE_TOGGLE_WILD
} from '../configs/querySelectors';

function checkIsNodeVisible(node) {
  return node.style.display !== 'none';
}

/**
 * checks is fight mode active
 * @returns {boolean}
 */
export function checkIsFight() {
  const fightViewNode = document.querySelector(SELECTOR_FIGHT_VIEW);

  return checkIsNodeVisible(fightViewNode);
}

/**
 * checks is captcha blocked process
 * @returns {boolean}
 */
export function checkIsCaptchaAppears() {
  const captchaNode = document.querySelector(SELECTOR_CAPTCHA);
  const captchaImage = captchaNode.querySelector('img');

  return checkIsNodeVisible(captchaNode) &&
    captchaImage && captchaImage.src !== undefined;
}

/**
 *
 * @param {boolean} newState
 */
export function turnWildPokemons(newState) {
  const turnWildButtonNode = document.querySelector(SELECTOR_INTERFACE_TOGGLE_WILD);
  if (newState !== turnWildButtonNode.classList.contains('pressed')) {
    turnWildButtonNode.click();
  }
}