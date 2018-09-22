import Comparator from './../MonsterComparator';

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
    let myPokemonDiv = document.querySelector('#divFightI');
		let enemyPokemonDiv = document.querySelector('#divFightH');
		let myPokeTeam = document.querySelector('#divDockMenu > .divDockPanels');
		let pokeCards = document.querySelector('#divPokeCard');
    let pokedex = document.querySelector('#divPokedex');
    let farm = document.querySelector('.divDialog');

    let allMainDivsLoaded = myPokemonDiv && enemyPokemonDiv && myPokeTeam && pokeCards
      pokeCards && pokedex && farm;
    return allMainDivsLoaded;
  }

	setObservers() {
    if(this.observer) return;

		let myPokemonDiv = document.querySelector( '#divFightI' );
		let enemyPokemonDiv = document.querySelector( '#divFightH' );
		let myPokeTeam = document.querySelector( '#divDockMenu > .divDockPanels' ); // .divPokeTeam
		let pokeCards = document.querySelector( '#divPokeCard' );
    let pokedex = document.querySelector( '#divPokedex' );
    let farm = document.querySelector( '.divDialog' );

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

