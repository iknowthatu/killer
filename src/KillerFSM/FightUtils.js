import {
  SELECTOR_FIGHT_STATUS,
  SELECTOR_FIGHT_DUMMY_POKEMON,
  SELECTOR_FIGHT_POKEMON_PANEL_PLAYER,
  SELECTOR_FIGHT_POKEMON_PANEL_ENEMY
} from '../configs/querySelectors';

import {
  FIGHT_STATUS_VICTORY,
  FIGHT_STATUS_FAIL,
  FIGHT_STATUS_DRAW,
  FIGHT_STATUS_HARD_DRAW,
  FIGHT_STATUS_POKEMON_LOST,
  FIGHT_STATUS_RUNNING
} from '../configs/killerConfigs';

export function getFightStatus() {
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