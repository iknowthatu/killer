import {
  SELECTOR_FIGHT_STATUS,
  SELECTOR_FIGHT_DUMMY_POKEMON,
  SELECTOR_FIGHT_POKEMON_PANEL_PLAYER,
  SELECTOR_FIGHT_POKEMON_PANEL_ENEMY,
  SELECTOR_FIGHT_ENEMY_POKEMON_RANK,
  SELECTOR_FIGHT_ENEMY_POKEMON_RANK_ALT,
  SELECTOR_FIGHT_PLAYER_POKEMON_MOVE_INFO,
  SELECTOR_GLOBAL_CONTEXT_MENU_TITLE,
  SELECTOR_GLOBAL_CONTEXT_MENU_BODY,
  SELECTOR_FIGHT_PLAYER_DUMMY_POKEMON
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
import CommonUtils from './CommonUtils';

export default class FightUtils {

  /**
   * [fight mode]
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
   * [fight mode]
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
   * [fight mode]
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
   * [fight mode]
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

  /**
   * [fight mode]
   * perform click on numberOfMove move of Player pokemon
   * if PP of the clicked move less than 1, clickcing is prevented
   * if lastTry === true, clicking is performed even if PP < 1
   * returns true if click was performed and false in another case
   * @param {number} numberOfMove
   * @param {boolean} [lastTry]
   * @returns {boolean}
   */
  static clickPokemonMove(numberOfMove, lastTry) {
    if (numberOfMove > 3 || numberOfMove < 0) {
      return false;
    }

    if (EnvironmentUtils.getPlayerPokemonAttackPP(numberOfMove) < 1 && !lastTry) {
      return false;
    }

    const moveInfoNode = document.querySelectorAll(SELECTOR_FIGHT_PLAYER_POKEMON_MOVE_INFO)[numberOfMove];
    if (!moveInfoNode) {
      return false;
    }

    moveInfoNode.click();

    return true;
  }

  /**
   * [fight mode]
   * returns number of percentes of enemy HP
   * @returns {number}
   */
  static getEnemyHPpercents() {
    return EnvironmentUtils.getPokemonOpenParameter({ pokemonOwner: 'enemy', parameter: 'hp' });
  }

  /**
   * [fight mode]
   * choose random pokemon move and use it if it possible
   * @param {number[]} pokemonMovesConfig
   * @param {object} [param1]
   * @param {boolean} [param1.lastTry]
   * @param {number} [param1.attackCounter]
   */
  static usePokemonMove(pokemonMovesConfig, { lastTry, attackCounter = 0 } = {}) {
    if (!FightUtils.getNumberOfPermittedAttacks(pokemonMovesConfig)) {
      return;
    }

    const randomAttackNumber = CommonUtils.integerRandom(3); // 0 - 3
    if (pokemonMovesConfig[randomAttackNumber]) {
      const clickingResult = FightUtils.clickPokemonMove(randomAttackNumber, lastTry);
      if (clickingResult) {
        return;
      }
    }

    if (attackCounter > 100) {
      throw 'Too much attacks repeat';
    }

    attackCounter++;
    FightUtils.usePokemonMove(pokemonMovesConfig, { lastTry, attackCounter });
  }

  static async isPokemonsListToChangeLoaded() {
    const divContextTitle = document.querySelector(SELECTOR_GLOBAL_CONTEXT_MENU_TITLE).innerHTML;
    if (!divContextTitle.match(/выбрать монстра/i)) {
      return await FightUtils.changePokemon();
    }

    const pokemons = document.querySelectorAll(SELECTOR_GLOBAL_CONTEXT_MENU_BODY);
    if (!pokemons || pokemons.length < 1) {
      await CommonUtils.wait(1000);
      return await FightUtils.isPokemonsListToChangeLoaded();
    }

    return true;
  }

  static async changePokemon() {
    await CommonUtils.wait(500);
    document.querySelector(SELECTOR_FIGHT_PLAYER_DUMMY_POKEMON).click();
    await CommonUtils.wait(1000);
    await FightUtils.isPokemonsListToChangeLoaded();

    const pokemonsNodes = document.querySelectorAll(SELECTOR_GLOBAL_CONTEXT_MENU_BODY);
    pokemonsNodes[CommonUtils.integerRandom(pokemonsNodes.length - 1)].click();
    await CommonUtils.wait(1000);
  }

  /**
   * unused
   */
  /**
   * [fight mode]
   * returns type of weather
   */
  // getWeather() {
  //   const weatherDiv = document.querySelector('#divFightWeather');
  //   const hail = weatherDiv.querySelector('.w3');
  //   if(hail) return 1; // hail
  //   const sandstorm = weatherDiv.querySelector('.w4');
  //   if(sandstorm) return 2; //sandstorm
  //   return 0; // sun/rain etc
  // }

  /**
   * [fight mode]
   * returns true if enemy pokemon can be caught,
   * false in other case
   */
  // isEnemyCanBeCaught() {
  //   const noCatch = document.querySelector('#divFightOptions .nocatch');
  //   return noCatch === null;
  // }

  /**
   * [fight mode]
   * returns enemy level
   */
  // getEnemyLevel() {
  //   const enemyLevelDiv = document.querySelector('#divFightH .lvl');
  //   if(!enemyLevelDiv) return 0;
  //   const enemyLevel = +enemyLevel.innerHTML;
  //   return enemyLevel;
  // }
}