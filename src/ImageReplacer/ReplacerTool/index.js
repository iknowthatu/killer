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
    let observer = new MutationObserver( (mut)=>{
      if( !this.isMainDivsLoaded() ) return;
      observer.disconnect();
			this.setObservers();
     });
    let config = { attributes: true, childList: true, subtree: true };
    observer.observe( document, config );
  }

  switchOn(value) {
    if(!value) return this.stopObservers();
    this.setObservers();
  }

  isMainDivsLoaded() {
    let myPokemonDiv = document.querySelector(SELECTOR_FIGHT_POKEMON_PANEL_PLAYER);
		let enemyPokemonDiv = document.querySelector(SELECTOR_FIGHT_POKEMON_PANEL_ENEMY);
		let myPokeTeam = document.querySelector(SELECTOR_MENU_PANELS);
		let pokeCards = document.querySelector(SELECTOR_POKE_CARDS);
    let pokedex = document.querySelector(SELECTOR_POKEDEX_PANEL);
    let farm = document.querySelector(SELECTOR_NURSERY_PANEL);

    let allMainDivsLoaded = myPokemonDiv && enemyPokemonDiv && myPokeTeam && pokeCards
      pokeCards && pokedex && farm;
    return allMainDivsLoaded;
  }

	setObservers() {
    if(this.observer) return;

		let myPokemonDiv = document.querySelector(SELECTOR_FIGHT_POKEMON_PANEL_PLAYER);
		let enemyPokemonDiv = document.querySelector(SELECTOR_FIGHT_POKEMON_PANEL_ENEMY);
		let myPokeTeam = document.querySelector(SELECTOR_MENU_PANELS); // .divPokeTeam
		let pokeCards = document.querySelector(SELECTOR_POKE_CARDS);
    let pokedex = document.querySelector(SELECTOR_POKEDEX_PANEL);
    let farm = document.querySelector(SELECTOR_NURSERY_PANEL);

		let config = { attributes: true, childList: true, subtree: true };

    let observer = new MutationObserver(  (mut)=>{ this.comparator.compare(); } );
    this.observer = observer;

		observer.observe( myPokemonDiv, config );
		observer.observe( enemyPokemonDiv, config );
		observer.observe( myPokeTeam, config );
		observer.observe( pokeCards, config );
    observer.observe( pokedex, config );
    observer.observe( farm, config );
  }

  stopObservers() {
    if(!this.observer) return;
    this.observer.disconnect();
    this.observer = undefined;
  }
}

export default League17HelperApp;

