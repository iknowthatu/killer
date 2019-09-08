import {
  SELECTOR_FIGHT_VIEW,
  SELECTOR_CAPTCHA
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
export function checkIsFightIsCaptchaAppears() {
  const captchaNode = document.querySelector(SELECTOR_CAPTCHA);
  const captchaImage = captchaNode.querySelector('img');

  return checkIsNodeVisible(captchaNode) &&
    captchaImage && captchaImage.src !== undefined;
}