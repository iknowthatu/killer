class League17MonsterComparator {
	constructor() {
      this.init();
  }

  /**
   *
   * @param {Object} params
   * @param {string} params.pokemonsDataSrc
   */
  init(params = {}) {
      // this.normalHost = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';
      this.normalHost = 'https://www.serebii.net/sunmoon/pokemon/';
      this.shineHost = 'https://www.serebii.net/Shiny/SM/';
      this.pokemons = [];
      this.pokemonsDataSrc = params.pokemonsDataSrc || 'data/pokemons.json';

      this.loadPokemonsData(this.pokemonsDataSrc);
  }

  loadPokemonsData(pokemonsDataSrc) {
    return fetch(chrome.runtime.getURL(pokemonsDataSrc))
    .then( response=>response.json() )
    .then( data=>this.pokemons=data );
  }

  getOldGoodPokemonImageSrc( number, isShine=false ) {
    let host = isShine ? this.shineHost : this.normalHost;
    return `${host}${number}.png`;
  }

  getPokemonNameByNumber( number ) {
    let pokemonFromData = this.pokemons.filter(pok=>pok.number==number)[0];
    if( !pokemonFromData ) return `i don't know this pokemon`;
    return pokemonFromData.name;
  }

  getPokemonNumberString( number=0 ) {
    if(number < 10) return `00${number}`;
    if(number < 100) return `0${number}`;
    if(number > 806) return 0;
    return number;
  }

    /* inline pokemons */

  getInlinePokemons() {
    let inlinePokemons = document.querySelectorAll( '.intextpoke:not([data-changed])' );
    return inlinePokemons;
  }

  getInlinePokemonNumber( inlinePokemon ) {
    let stringWithNumber = inlinePokemon.getAttribute('onclick');
    stringWithNumber = stringWithNumber ? stringWithNumber : '';
    stringWithNumber = stringWithNumber.replace(/^.*?'/, '').replace(/'.*/,'');
    let number = stringWithNumber.match( /\d+/ );
    number = number != null ? this.getPokemonNumberString(+number[0]) : 0;
    return number;
  }

  isShineInlinePokemon( inlinePokemon ) {
    let stringWithIsShineInfo = inlinePokemon.getAttribute('onclick');
    let isShine = stringWithIsShineInfo.match( /\d[^\d]*?\)/ )[0];
    isShine = isShine.match(/\d/);
    isShine = isShine != null && isShine[0] == 1;
    return isShine;
  }

  changeInlinePokemonImage( inlinePokemon, number, isShine=false ) {
    let image = this.makeOldGoodPokemonImage( number, isShine );
    let oldImage = inlinePokemon.querySelector( '.pk' );
    if( oldImage) oldImage.style.display = 'none';
    let lastChild = inlinePokemon.lastChild;
    if( !lastChild ) inlinePokemon.appendChild(image);
    else inlinePokemon.insertBefore(image, lastChild);
    image.classList.add('pk');
    image.style.maxHeight = "2rem";
  }

  changeInlinePokemonName( inlinePokemon, number ) {
    let name = this.getPokemonNameByNumber( number );
    let oldNameNode = inlinePokemon.lastChild;
    oldNameNode.textContent = name;
  }

  changeInlinePokemonItemNameAndImage( inlinePokemon ) {
    let number = this.getInlinePokemonNumber( inlinePokemon );
    if( !number ) return;
    let isShine = this.isShineInlinePokemon( inlinePokemon );
    this.changeInlinePokemonImage( inlinePokemon, number, isShine );
    this.changeInlinePokemonName( inlinePokemon, number );
    inlinePokemon.setAttribute( 'data-changed', '' );
  }

  changeInlinePokemonsNamesAndImages( inlinePokemons ) {
    inlinePokemons.forEach( inlinePokemon=>{
      this.changeInlinePokemonItemNameAndImage( inlinePokemon );
    });
  }

  changeInlinePokemons() {
    let inlinePokemons = this.getInlinePokemons();
    this.changeInlinePokemonsNamesAndImages( inlinePokemons );
  }

    /* tiny Cards */

  findAllTinyCards() {
    let tinyCards = document.querySelectorAll( '.pokemonBoxTiny:not([data-changed])' );
    return tinyCards;
  }

  getTinyCardNumber( tinyCard ) {
    let oldImage = tinyCard.querySelector('.image');
    if(!oldImage) return;
    let number = oldImage.src.match( /\d{3}/ );
    number = number ? this.getPokemonNumberString(+number[0]) : 0;
    return number;
  }

  insertImageInTinyCard( tinyCard, image ) {
    image.classList.add('image');
    let oldImage = tinyCard.querySelector('.image');
    if(!oldImage) return;
    oldImage.style.display = 'none';
    let parentOldImage = oldImage.parentNode;
    parentOldImage.insertBefore( image, oldImage );
    if(!image.parentNode.classList.contains('pokemonBoxTiny'))
    image.style = 'margin-top: 0; width: 100%; height: 100%;';
  }

  changeNameInTinyCard( tinyCard , pokemonNumber ) {
    let name = this.getPokemonNameByNumber( pokemonNumber );
    let nameDiv = tinyCard.querySelector('.name');
    if(!nameDiv) return;
    nameDiv = Array.from(nameDiv.childNodes).find(child => child.nodeType == 3 && child.textContent.match(/#\d+/));
    nameDiv.textContent = `#${pokemonNumber} ${name}`;
  }

  isTinyCardShine( tinyCard ) {
    let image = tinyCard.querySelector('.image');
    let isShine = image.src.match(/shine/);
    isShine = isShine != null;
    return isShine;
  }

  changeTinyCardsImagesAndNames( tinyCards ) {
    tinyCards.forEach( tinyCard=>{
      let pokemonNumber = this.getTinyCardNumber(tinyCard);
      if( !pokemonNumber ) return;
      let isShine = this.isTinyCardShine( tinyCard );
      let image = this.makeOldGoodPokemonImage( pokemonNumber, isShine );
      this.insertImageInTinyCard( tinyCard, image );
      this.changeNameInTinyCard( tinyCard, pokemonNumber );
      tinyCard.setAttribute('data-changed','');
    });
  }

  changeTinyCards() {
    let tinyCards = this.findAllTinyCards();
    this.changeTinyCardsImagesAndNames( tinyCards );
  }

    /* pokemon Cards */

  isPokemonInCardShine( pokemonCard ) {
    let pokemonImage = pokemonCard.querySelector('.image > img');
    if( !pokemonImage ) return false;
    let isShine = pokemonImage.src.match( /shine/ );
    isShine = isShine != null;
		return isShine;
  }

	getPokemonNumberForCards( pokemonBoxCard ) {
    let pokemonImage = pokemonBoxCard.querySelector('.image > img');
    if( !pokemonImage ) return 0;
    let number = pokemonImage.src.match(/\d{3}/);
    number = number ? this.getPokemonNumberString(+number[0]) : 0;
		return number;
  }

  findAllPokemonsInCards() {
		let pokemons = document.querySelectorAll('.pokemonBoxCard:not([data-changed])');
		return pokemons;
	}

	makeOldGoodPokemonImage( number, isShine=false ) {
		let image = new Image();
		image.src = this.getOldGoodPokemonImageSrc( number, isShine );
		image.classList.add( 'leagueHelper__pokemon-image' );
		return image;
	}

	insertOldGoodPokemonImageForCards( pokemonBoxCard, pokemonImage ) {
    let pokemonImageDiv = pokemonBoxCard.querySelector('.image');
    if(!pokemonImageDiv) return;
		pokemonImageDiv.appendChild( pokemonImage );
	}

	hideOldNonameImageForCards( pokemonBoxCard ) {
    let pokemonImage = pokemonBoxCard.querySelector('.image > img');
    if(!pokemonImage) return;
		pokemonImage.style.display = 'none';
  }

  changePokemonNameInCard( pokemonCard, name ) {
    let title = pokemonCard.querySelector('.title > .name');
    if(!title) return;
    title.innerHTML = name;
    if( pokemonCard.getAttribute('data-nameWatcher') != null  ) return;
    pokemonCard.addEventListener('click',()=>{if(title.innerHTML != name)title.innerHTML=name;});
    pokemonCard.setAttribute('data-nameWatcher','');
  }

	showRealPokemonsForCards( pokemonsCards ) {
		pokemonsCards.forEach( pokemonCard => {
      let pokNumber = this.getPokemonNumberForCards( pokemonCard );
      if( !pokNumber ) return;
      if( !Number.isInteger( +pokNumber ) ) return;
      if( this.isComparasionAlreadyDidForCards(pokemonCard) ) return;
      let isShine = this.isPokemonInCardShine( pokemonCard );
      let image = this.makeOldGoodPokemonImage( pokNumber, isShine );
      this.hideOldNonameImageForCards( pokemonCard );
      this.insertOldGoodPokemonImageForCards( pokemonCard, image );
      let pokemonName = this.getPokemonNameByNumber( pokNumber );
      this.changePokemonNameInCard( pokemonCard, pokemonName );
      pokemonCard.setAttribute('data-changed','');
		});
  }

	isComparasionAlreadyDidForCards( pokemonBoxCard ) {
		let pokemonImages = pokemonBoxCard.querySelectorAll('.image > img');
		if( pokemonImages.length > 1 ) return true;
		return false;
  }

  changeAllPokemonCards() {
    let pokemonsCards = this.findAllPokemonsInCards();
    this.showRealPokemonsForCards( pokemonsCards );
  }

    /* search in pokedex */

  findPokemonInPokedex() {
    let divWithImage = document.querySelector( '#divPokedex .imagebox' );
    if( divWithImage == null ) return null;
    if ( divWithImage.getAttribute( 'data-changed' ) != null ) return null;
    return divWithImage;
  }

  getPokemonNumberInPokedex( pokemonImageBox ) {
    let number = pokemonImageBox.style.backgroundImage.match( /\d{3}/ );
    number = number ? this.getPokemonNumberString(+number[0]) : 0;
    return number;
  }

  changePokedexTitle( pokemonNumber ) {
    let pokedexTitle = document.querySelector( '#divPokedex .params > .title' );
    if( pokedexTitle == null ) return;
    let pokemonName = this.getPokemonNameByNumber(pokemonNumber);
    pokedexTitle.innerHTML = `#${pokemonNumber} ${pokemonName}`;
  }

  isShineInPokedex( divWithImage ) {
    let isShine = divWithImage.style.backgroundImage.match( /shine/ );
    isShine = isShine != null;
    return isShine;
  }

  changePokedex() {
    let imageDiv = this.findPokemonInPokedex();
    if( imageDiv == null ) return;

    let pokemonNumber = this.getPokemonNumberInPokedex( imageDiv );
    if(!pokemonNumber) return;
    let isShine = this.isShineInPokedex( imageDiv );
    let realImageUrl = this.getOldGoodPokemonImageSrc( pokemonNumber, isShine );
    imageDiv.style.backgroundImage = `url("${realImageUrl}")`;
    imageDiv.style.backgroundSize = `100% 100%`;
    imageDiv.setAttribute( 'data-changed', '' );

    this.changePokedexTitle( pokemonNumber );
  }

    /* main func */

	compare() {
    this.changeAllPokemonCards();
    this.changeTinyCards();
    this.changeInlinePokemons();
    this.changePokedex();
	}
}

export default League17MonsterComparator;