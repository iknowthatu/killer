import Comparator from './../MonsterComparator';
import {
  SELECTOR_FIGHT_POKEMON_PANEL_ENEMY,
  SELECTOR_FIGHT_POKEMON_PANEL_PLAYER,
  SELECTOR_MENU_PANELS,
  SELECTOR_NURSERY_PANEL,
  SELECTOR_POKEDEX_PANEL,
  SELECTOR_POKE_CARDS
} from '../../configs/querySelectors';

class League17HelperApp {
    constructor() {
		this.init();
	}

	init() {
		this.comparator = new Comparator();
    this.setDocumentObserver();
	}

  setDocumentObserver() {
    const observer = new MutationObserver(() => {
      if (!this.isMainDivsLoaded()) {
        return;
      }

      observer.disconnect();
			this.setObservers();
     });

    const config = { attributes: true, childList: true, subtree: true };
    observer.observe( document, config );
  }

  switchOn(value) {
    if (!value) {
      return this.stopObservers();
    }

    this.setObservers();
  }

  isMainDivsLoaded() {
    const myPokemonDiv = document.querySelector(SELECTOR_FIGHT_POKEMON_PANEL_PLAYER);
		const enemyPokemonDiv = document.querySelector(SELECTOR_FIGHT_POKEMON_PANEL_ENEMY);
		const myPokeTeam = document.querySelector(SELECTOR_MENU_PANELS);
		const pokeCards = document.querySelector(SELECTOR_POKE_CARDS);
    const pokedex = document.querySelector(SELECTOR_POKEDEX_PANEL);
    const farm = document.querySelector(SELECTOR_NURSERY_PANEL);

    const allMainDivsLoaded = myPokemonDiv && enemyPokemonDiv && myPokeTeam && pokeCards
      && pokedex && farm;

    return allMainDivsLoaded;
  }

	setObservers() {
    if (this.observer) {
      return;
    }

		const myPokemonDiv = document.querySelector(SELECTOR_FIGHT_POKEMON_PANEL_PLAYER);
		const enemyPokemonDiv = document.querySelector(SELECTOR_FIGHT_POKEMON_PANEL_ENEMY);
		const myPokeTeam = document.querySelector(SELECTOR_MENU_PANELS); // .divPokeTeam
		const pokeCards = document.querySelector(SELECTOR_POKE_CARDS);
    const pokedex = document.querySelector(SELECTOR_POKEDEX_PANEL);
    const farm = document.querySelector(SELECTOR_NURSERY_PANEL);

		const config = { attributes: true, childList: true, subtree: true };

    const observer = new MutationObserver(() => {this.comparator.compare();});
    this.observer = observer;

		observer.observe( myPokemonDiv, config );
		observer.observe( enemyPokemonDiv, config );
		observer.observe( myPokeTeam, config );
		observer.observe( pokeCards, config );
    observer.observe( pokedex, config );
    observer.observe( farm, config );
  }

  stopObservers() {
    if (!this.observer) {
      return;
    }

    this.observer.disconnect();
    this.observer = undefined;
  }
}

export default League17HelperApp;

