import {
  SELECTOR_FIGHT_STATUS,
  SELECTOR_FIGHT_DUMMY_POKEMON,
  SELECTOR_FIGHT_POKEMON_PANEL_PLAYER,
  SELECTOR_FIGHT_POKEMON_PANEL_ENEMY,
  SELECTOR_FIGHT_ENEMY_POKEMON_RANK,
  SELECTOR_FIGHT_ENEMY_POKEMON_RANK_ALT
} from '../configs/querySelectors';

import {
  FIGHT_STATUS_VICTORY,
  FIGHT_STATUS_FAIL,
  FIGHT_STATUS_DRAW,
  FIGHT_STATUS_HARD_DRAW,
  FIGHT_STATUS_POKEMON_LOST,
  FIGHT_STATUS_RUNNING
} from '../configs/killerConfigs';

import EnvironmentUtils from './EnvironmentUtils';

export default class FightUtils {

  /**
   * returns sum of permitted pokemon moves
   * @param {number[]} pokemonMovesConfig e.g. [1,0,1,1]
   * @returns {number}
   */
  static getNumberOfPermittedAttacksPP(pokemonMovesConfig) {
    return pokemonMovesConfig.reduce((sum, attackPermission, index) => {
        if (!attackPermission) {
          return sum;
        }

        return sum + EnvironmentUtils.getPlayerPokemonAttackPP(index);
      }, 0);
  }

  /**
   * returns code of current fight status
   * @returns {number}
   */
  static getFightStatus() {
    const fightStatusText = document.querySelector(SELECTOR_FIGHT_STATUS).innerHTML;
    if (fightStatusText.match(/ничья/i)) return FIGHT_STATUS_DRAW; // draw
    if (fightStatusText.match(/вы победили/i)) return FIGHT_STATUS_VICTORY; // victory
    if (fightStatusText.match(/вы проиграли/i)) return FIGHT_STATUS_FAIL; // lose

    const dummyInsteadPlayerPokemon = document.querySelector(`${SELECTOR_FIGHT_POKEMON_PANEL_PLAYER} ${SELECTOR_FIGHT_DUMMY_POKEMON}`);
    const dummyInsteadEnemyPokemon = document.querySelector(`${SELECTOR_FIGHT_POKEMON_PANEL_ENEMY} ${SELECTOR_FIGHT_DUMMY_POKEMON}`);
    if (dummyInsteadPlayerPokemon && dummyInsteadEnemyPokemon) return FIGHT_STATUS_HARD_DRAW;
    //pokemon was killed/changed but u can close window
    if (dummyInsteadPlayerPokemon && !dummyInsteadEnemyPokemon) return FIGHT_STATUS_POKEMON_LOST;
    //pokemon was killed/changed but u can get another

    return FIGHT_STATUS_RUNNING; // it's okay, fight continuing
  }

  /**
   * true if enemy is normal, false if it is shine or smt like that
   * @returns {boolean}
   */
  static isEnemyNormal() {
    const enemyRankNode = document.querySelector(SELECTOR_FIGHT_ENEMY_POKEMON_RANK);
    if (!enemyRankNode) {
      return true;
    }

    let enemyRank;
    const enemyAltRankNode = document.querySelector(SELECTOR_FIGHT_ENEMY_POKEMON_RANK_ALT);

    if (enemyAltRankNode) {
      enemyRank = enemyAltRankNode.innerHTML;
    } else {
      enemyRank = enemyRankNode.innerHTML;
    }

    return !enemyRank.match(/\S+/);
  }

  /**
   * true if pokemon with this number shouldn't be killed
   * false in other case
   * @param {string} forbiddenNumbersConfig
   * @returns {boolean}
   */
  static isAttackForbiddenForThisNumber(forbiddenNumbersConfig) {
    const currentEnemyPokemonNumber = EnvironmentUtils.getEnemyPokemonNumberAsString();
    const forbiddenNumbers = forbiddenNumbersConfig.match(/\d{1,3};?/g);
    if (!forbiddenNumbers) {
      return false;
    }

    return forbiddenNumbers.some(number => currentEnemyPokemonNumber === number.replace(';', ''));
  }

  /**
   * returns number of moves, which can be used for attack
   * @param {number} pokemonMovesConfig
   * @returns {number}
   */
  static getNumberOfPermittedAttacks(pokemonMovesConfig) {
    return pokemonMovesConfig.filter(attack => !!attack).length;
  }
}