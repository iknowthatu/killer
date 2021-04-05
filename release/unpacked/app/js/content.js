/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App/index.js":
/*!**************************!*\
  !*** ./src/App/index.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ImageReplacer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../ImageReplacer */ "./src/ImageReplacer/index.js");
/* harmony import */ var _Killer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../Killer */ "./src/Killer/index.js");



class KillerApp {
  constructor() {
    this.init();
  }

  init() {
    let replacer = new _ImageReplacer__WEBPACK_IMPORTED_MODULE_0__["default"]();
    console.info('Image replacer was loaded');
    let killer = new _Killer__WEBPACK_IMPORTED_MODULE_1__["default"](replacer);
		console.info('Killer was loaded');
  }
}

/* harmony default export */ __webpack_exports__["default"] = (KillerApp);




/***/ }),

/***/ "./src/ImageReplacer/MonsterComparator/index.js":
/*!******************************************************!*\
  !*** ./src/ImageReplacer/MonsterComparator/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (League17MonsterComparator);

/***/ }),

/***/ "./src/ImageReplacer/ReplacerTool/index.js":
/*!*************************************************!*\
  !*** ./src/ImageReplacer/ReplacerTool/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MonsterComparator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../MonsterComparator */ "./src/ImageReplacer/MonsterComparator/index.js");


class League17HelperApp {
    constructor() {
		this.init();
	}

	init() {
		this.comparator = new _MonsterComparator__WEBPACK_IMPORTED_MODULE_0__["default"]();
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

/* harmony default export */ __webpack_exports__["default"] = (League17HelperApp);



/***/ }),

/***/ "./src/ImageReplacer/index.js":
/*!************************************!*\
  !*** ./src/ImageReplacer/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReplacerTool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReplacerTool */ "./src/ImageReplacer/ReplacerTool/index.js");

/* harmony default export */ __webpack_exports__["default"] = (_ReplacerTool__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/Killer/Alarm/index.js":
/*!***********************************!*\
  !*** ./src/Killer/Alarm/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Alarm {
  constructor() {
    this.init();
  }

  init() {
    this.preloadAlarm();
    this.defaultSrc = chrome.runtime.getURL('audio/signal.ogx');
  }

  preloadAlarm() {
    let alarmAudio = document.createElement('audio');
      alarmAudio.classList.add('killer__alarm');
      alarmAudio.loop = true;
      alarmAudio.volume = 0.1;
    let alarmSource = document.createElement('source');
      alarmSource.src = this.defaultSrc;
      alarmAudio.appendChild(alarmSource);
    this.alarmAudio = alarmAudio;
    this.alarmSource = alarmSource;
  }

  changeVolume(value) {
    if(isNaN(+value)) return;
    if(+value < 1 && +value > 0) {
      this.alarmAudio.volume = value;
      return;
    }
    if(+value <= 0) {
      this.alarmAudio.volume = 0;
      return;
    }
    if(+value >= 100) {
      this.alarmAudio.volume = 1;
      return;
    }
    this.alarmAudio.volume = (+value)/100;
  }

  changeMelody(src) {
    if(!src.trim()) {
      this.alarmAudio.src = this.defaultSrc;
      return;
    }
    this.alarmAudio.src = src;
  }

  startPlay() {
    this.alarmAudio.play();
  }

  stopPlay() {
    this.alarmAudio.pause();
    this.alarmAudio.currentTime = 0;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Alarm);

/***/ }),

/***/ "./src/Killer/CatcherHeart/index.js":
/*!******************************************!*\
  !*** ./src/Killer/CatcherHeart/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let allBaseHPpoks = [0,78,60,80,39,58,78,44,59,79,45,50,60,40,45,65,40,63,83,30,55,40,65,35,60,35,60,50,75,55,70,90,46,61,81,70,95,38,73,115,140,40,75,45,60,75,35,60,60,70,10,35,40,65,50,80,40,65,55,90,40,65,90,25,40,55,70,80,90,50,65,80,40,80,40,55,80,50,65,90,95,25,50,52,35,60,65,90,80,105,30,50,30,45,60,35,60,85,30,55,40,60,60,95,50,60,50,50,90,40,65,80,105,250,65,105,30,55,45,80,30,60,40,70,65,65,65,65,75,20,95,130,48,55,130,65,65,65,35,70,30,60,80,160,90,90,90,41,61,91,106,100,45,60,80,39,58,78,50,65,85,35,85,60,100,40,55,40,70,85,75,125,20,50,90,35,55,40,65,55,70,90,75,70,100,70,90,35,55,75,55,30,75,65,55,95,65,95,60,95,60,48,190,70,50,75,100,65,75,60,90,65,70,20,80,55,60,90,40,50,50,100,55,35,75,45,65,65,45,75,75,90,90,85,73,55,35,50,45,45,45,95,255,90,115,100,50,70,100,106,106,100,40,50,70,45,60,80,50,70,100,35,70,38,78,45,50,60,50,60,40,60,80,40,70,90,40,60,40,60,28,38,68,40,70,60,60,60,80,150,31,61,1,64,84,104,72,144,50,30,50,70,50,50,50,60,70,30,60,40,70,60,60,65,65,50,70,100,45,70,130,170,60,70,70,60,80,60,45,50,80,50,70,45,75,73,73,70,70,50,110,43,63,40,60,66,86,45,75,20,95,70,60,44,64,20,40,99,65,65,95,50,80,70,90,110,35,55,55,100,43,45,65,95,40,60,80,80,80,80,80,80,100,100,105,100,50,55,75,95,44,64,76,53,64,84,40,55,85,59,79,37,77,45,60,80,40,60,97,97,30,60,40,60,70,30,70,60,55,85,45,70,76,111,75,90,150,55,65,60,100,49,71,45,63,103,57,67,50,20,100,76,50,58,68,108,135,40,70,68,108,40,70,48,83,74,49,69,45,60,90,70,70,110,115,100,75,75,85,86,65,65,75,110,85,68,60,45,70,50,75,80,75,100,90,91,110,150,120,80,100,70,100,120,100,45,60,75,65,90,110,55,75,95,45,60,45,65,85,41,64,50,75,50,75,50,75,76,116,50,62,80,45,75,55,70,85,55,67,60,110,103,75,85,105,50,75,105,120,75,45,55,75,30,40,60,40,60,45,70,70,50,60,95,70,105,75,50,70,50,65,72,38,58,54,74,55,75,50,80,40,60,55,75,45,60,70,45,65,110,62,75,36,51,71,60,80,55,50,70,69,114,55,100,165,50,70,44,74,40,60,60,35,65,85,55,75,50,60,60,46,66,76,55,95,70,50,80,109,45,65,77,59,89,45,65,95,70,100,70,110,85,58,52,72,92,55,85,91,91,91,79,79,100,100,89,125,91,100,71,56,61,88,40,59,75,41,54,72,38,85,45,62,78,38,45,80,62,86,44,54,78,66,123,67,95,75,62,74,45,59,60,78,101,62,82,53,86,42,72,50,65,50,71,44,62,58,82,77,123,95,78,67,50,45,68,90,57,43,85,49,65,55,95,40,85,126,126,108,50,80,80];
//console.log(allBaseHPpoks.length);

class CatcherHeart {
  constructor() {
    this.init();
  }

  init() {
    this.settings = {};
    this.nextPulse = this.nextPulse.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.timeBetweenActions = 1000;
  }

  nextPulse(params={}) {
    let newParams = {...params};

    /* it should restrict disappearing of wild pokemon with time */
    if(params.waitingForCatchCounter > 30) {
      if(!this.isDivContextLoaded()) {
        this.clickPokeballOnDivFightI();
      } else this.changePokemonFromDivContext();
    }

    if(!params.needCatch || !this.settings.autocatch) return newParams;

    if(!this.isPokemonShouldBeCaughtAutomatically()) return newParams;

    let catchParams = {};
    if(!params.catchParams) {
      newParams.catchParams = catchParams;
    } else {
      catchParams = params.catchParams;
    }

    newParams.waitingForCatchCounter = 0;
    //console.log(catchParams.phase);
    //console.log(catchParams);

    if(!catchParams.phase) {
      let preparings = this.catchPreparing();
      if(!preparings) {
        //this.clickPokeballOnDivFightI();
        //catchParams.phase = 9; //??
        console.log('i cant catch with this parameters')
        return newParams;
      } else {
        this.openTeamDiv();
        catchParams.phase = 1;
        catchParams.pokemonId = preparings.id;
        catchParams.specialAttackNumber = preparings.specialAttackNumber - 1;
        catchParams.waitAttackNumber = preparings.waitAttackNumber - 1;
        catchParams.allowedPokeballs = preparings.allowedPokeballs;
        return newParams;
      }
    }

    if(catchParams.phase == 1) {
      let teamLoaded = this.isTeamOpenedAndLoaded();
      if(!teamLoaded) return newParams;
      let pokemonExist = this.findPokemonAndClickTheBallById(catchParams.pokemonId);
      if(!pokemonExist) {
        catchParams.phase = 9; //?
        return newParams;
      } else {
        let pokemonSended = this.sendPokemonInBattle();
        if(!pokemonSended) return newParams;
        catchParams.phase = 2;
        return newParams;
      }
    };

    if(catchParams.phase == 2) {
      let specialAttackClicked = this.doSpecialAttack(catchParams.specialAttackNumber);
      //this.settings.killerHeart.clickAttack(catchParams.specialAttackNumber);
      if(!specialAttackClicked) return newParams;

      catchParams.phase = 3;
      return newParams;
    }

    if(catchParams.phase == 3) {
      let enemyPreparedToCatch = this.isEnemyHpMinimal();
      if(enemyPreparedToCatch) {
        this.clickPokeballOnDivFightI();
        catchParams.phase = 5;
        return newParams;
      }

      let enemyHp = this.settings.killerHeart.getEnemyHPpercents();
      if(enemyHp != catchParams.enemyLastHP) catchParams.enemyLastHP = enemyHp;
      else {
        catchParams.idleCounter = catchParams.idleCounter ? catchParams.idleCounter + 1 : 1;
      }

      if(catchParams.idleCounter > 4) {
        catchParams.phase = 2;
        return newParams;
      }

      if(catchParams.waitAttackNumber >= 0 && catchParams.waitAttackNumber <= 3) {
        let waitAttackClicked = this.doAttackForWaiting(catchParams.waitAttackNumber)
        //this.settings.killerHeart.clickAttack(catchParams.waitAttackNumber);
        if(!waitAttackClicked) catchParams.waitAttackNumber = -1;
        return newParams;
      }

      this.clickPokeballOnDivFightI();
      catchParams.phase = 4;
      return newParams;
    }

    if(catchParams.phase == 4) {
      if(!this.isDivContextLoaded()) return newParams;
      this.changePokemonFromDivContext();
      catchParams.phase = 3;
      return newParams;
    }

    if(catchParams.phase == 5) {
      if(!this.isDivContextLoaded()) return newParams;
      this.chooseItemInFight();
      catchParams.phase = 6;
      return newParams;
    }

    if(catchParams.phase == 6) {
      if(!this.isHintsWithItemsLoaded()) return newParams;
      let throwingSuccess = this.findAndThrowPokeball(catchParams.allowedPokeballs);
      if(!throwingSuccess) {
        console.log('no pokeballs! cmon, man');
        return newParams;
      }
      catchParams.phase = 3;
      newParams.needHeal = true;
      this.settings.commonHeart.turnWildPokemons(false);
      return newParams;
    }

    if(catchParams.phase == 7) {
      //console.log(`catched: ${catchParams.catched}`);
      //console.log(`phase 7:`, newParams);
      if(!catchParams.catched) {
        newParams.needCatch = false;
        newParams.catchParams = undefined;
        return newParams;
      }

      //console.log(`phase 7: reached:${params.destinationReached} direction:${params.direction}`);
      if(params.destinationReached && params.direction == 'fwd') {
        //console.log('now i leave pokemonss')
        newParams.needCatch = false;
        newParams.catchParams = undefined;
        return this.leaveLastPokemonInPC()
          .then(_ => newParams);
      }

      return newParams;
    }
  }

  isPokemonShouldBeCaughtAutomatically() {
    let numbersForCatch = this.settings.forbiddennumbers.match(/!\d+;?/g);
    if(!numbersForCatch || numbersForCatch.length < 1) return false;

    let enemyNumber = +this.settings.killerHeart.getEnemyPokemonNumberAsString();
    if(numbersForCatch.every(number => +number.replace(/!(\d+);?/,'$1') != +enemyNumber)) return false;

    return true;
  }

  /*
    0) open team window
    1) find pokemon by id ? 2) : 9)
      1) click on pokemon ball
      2) choose 'В битву'
      3) click special attack
        4) click attack for waiting
          or
        5) click ball
        6) change pokemons if > 1 untile hp min -> 9)
      or
    5) click ball
    7) click 'Использовать предмет'
    8) click pokeball
  */

  setSettings(settings = {}) {
    this.settings = settings;
  }

  /* catcher methods */

  setObserverIV(mode) {
    if(!mode) {
      if(!this.observerIV) return;
      this.observerIV.disconnect();
      return;
    }
    let observer = new MutationObserver(_ => {
      setTimeout( this.showEnemyIVhp, 0 );
    });
    let config = {attributes: true, childList: true, subtree: true};
    let enemyDiv = document.querySelector('#divFightH');
    if(!enemyDiv) return;
    observer.observe(enemyDiv, config);
    this.observerIV = observer;
  }

  showEnemyIVhp()
  {
    let lvlDiv = document.querySelector('#divFightH .pokemonBoxCard .lvl');

    if(!lvlDiv) return;
    if(lvlDiv.getAttribute('data-changed')) return;
    let globalVars = JSON.parse(document.querySelector('[data-globalvarsstore]').value);
    let hpStat = globalVars.enemyHPmax;
    let enemyNumber = globalVars.enemyNumber;
    let lvl = globalVars.enemyLvl;
    let hpBase = allBaseHPpoks[enemyNumber];

    let maxIVhp  = Math.floor(100*(hpStat-9.5-lvl)/lvl-(hpBase*2)-0.0001);
    let minIVhp  = Math.ceil(100*(hpStat-10.5-lvl)/lvl-(hpBase*2));

    let spanWithIV = document.createElement('span');
    spanWithIV.classList.add('killerApp__spanIV');
    spanWithIV.innerHTML = ` /IVhp: ${minIVhp}-${maxIVhp}`;
    lvlDiv.appendChild(spanWithIV);
    lvlDiv.setAttribute('data-changed', '1');
  }

  /* functions for catching: */

  /* phase 0: prepare to catch */
  catchPreparing() {
    let pokemonId = +this.settings.autocatchsettings.replace(/[^]*?\/\s?(?:id)?([^]*?)\/[^]*/,'$1').trim();
    if(!pokemonId || isNaN(pokemonId)) {
      console.log('no pokemonId');
      return false;
    }
    //let pokemonId = '3660958';
    let catcherAttackNumber = +this.settings.autocatchsettings.replace(/[^]*?\/[^]*?\/\s*(\d+?)\s*?\/[^]*/,'$1').trim();
    if(!catcherAttackNumber || isNaN(catcherAttackNumber) || catcherAttackNumber < 1 || catcherAttackNumber > 4) {
      console.log('no correct catcher attack number');
      return false;
    }
    //console.log(`catchar attack ${catcherAttackNumber}`);
    let allowedPokeballs = ['1', '2', '4'];
    let pokeballsNames = ['покебол', 'монстробол', 'pokeball', 'гритбол', 'greatball',
        'ультрабол', 'ultraball', 'мастербол', 'masterball'];
    let pokeballsParams = this.settings.autocatchsettings.replace(/([^]*?)\/[^]*/i, '$1').trim().split(';').filter(_ => _);
    //console.log(`pokeball params: `, pokeballsParams);
    pokeballsParams.forEach(pokeball => {
      let numberPokeball = pokeballsNames.findIndex(name => !!pokeball.match(new RegExp(name, 'i')));
      switch(numberPokeball) {
        case 0: case 1: case 2:
          numberPokeball = 1; break;
        case 3: case 4:
          numberPokeball = 2; break;
        case 5: case 6:
          numberPokeball = 4; break;
        case 7: case 8:
          numberPokeball = 3; break;
        default: return;
      }
      let isPokeballDepricated = !!pokeball.match(/!/);
      if(isPokeballDepricated) {
        allowedPokeballs = allowedPokeballs.filter(allowedNumber => allowedNumber != numberPokeball);
      } else {
        if(allowedPokeballs.findIndex(allowedNumber => allowedNumber == numberPokeball) != -1) return;
        allowedPokeballs.push(numberPokeball);
      }
    });

    let waitAttackNumber = +this.settings.autocatchsettings.replace(/[^]*?\/[^]*?\/[^]*?\/\s*?(\d+?)/,'$1').trim();
    waitAttackNumber = isNaN(waitAttackNumber) ? 0 : waitAttackNumber;
    //console.log(`wait attack: ${waitAttackNumber}`);
    return {id: pokemonId, specialAttackNumber: catcherAttackNumber,
            waitAttackNumber: waitAttackNumber, allowedPokeballs: allowedPokeballs};
  }

  /* phase 1: open team window */
  isTeamOpenedAndLoaded() {
    let panelWithTeam = document.querySelector('#divDockMenu .divDockPanels');
    let teamDiv = panelWithTeam.querySelector('.divPokeTeam');
    if(teamDiv.classList.contains('ajxloading')) return false;
    return true;
  }

  openTeamDiv() {
    let menuButtons = document.querySelectorAll('#divDockMenu .divDockIn .icon');
    if(menuButtons.length < 1) return;
    menuButtons[1].click();
  }

  /* phase 2-3 */
  findPokemonAndClickTheBallById(pokemonId) {
    //console.log(`trying to call poke with id${pokemonId}`);
    let ballWasClicked = Array.from(document.querySelectorAll('.divPokeTeam .pokemonBoxCard'))
      .some(pokemonCard => {
        let currentIDdiv = pokemonCard.querySelector('.id');
        if(!currentIDdiv) return false;
        let currentID = currentIDdiv.innerHTML.match(pokemonId);
        if(!currentID) return false;
        let ballToClick = pokemonCard.querySelector('.ball');
        if(!ballToClick) return false;
        ballToClick.click();
        return true;
      });
    if(ballWasClicked) return true;
    console.log(`i cant find pokemon with this id.`);
    return false;
  }

  /* phase 4 */
  sendPokemonInBattle() {
    //console.log(`now im trying to choose context item "В битву"`);
    let contextItems = Array.from(document.querySelectorAll('.divContext .divElement'));
    let pokemonChangeStarted = contextItems.some(item => {
      if(!item.innerHTML.match(/в битву/i)) return false;
      item.click();
      return true;
    });
    //console.log(`pokemon changing: ${pokemonChangeStarted}`);
    return pokemonChangeStarted;
  }

  /* phase 5 */
  doSpecialAttack(attackNumber) {
    return this.settings.killerHeart.clickAttack(attackNumber);
  }

  /* phase 6 */
  doAttackForWaiting(attackNumber) {
    return this.settings.killerHeart.clickAttack(attackNumber);
  }

  isEnemyHpMinimal() {
    let enemyHp = this.settings.killerHeart.getEnemyHPpercents();
    if(enemyHp <= 30) return true;
    return false;
  }

  /* phase 7 */
  clickPokeballOnDivFightI() {
    let dummy = document.querySelector('#divFightI .pokemonBoxDummy');
    if(dummy) dummy.click();
    else document.querySelector('#divFightI .pokemonBoxCard .boxleft .ball').click();
  }

  isDivContextLoaded() {
    let divContext = document.querySelector('.divContext');
    if(!divContext || divContext.style.display == 'none') return false;
    let divContextTitle = document.querySelector('.divContext .divTitle').innerHTML;
    if(!divContextTitle.match(/монстра/i)) return false;
    let pokemons = document.querySelectorAll('.divContext .divElement');
    if(!pokemons || pokemons.length < 1) return false;
    return true;
  }

  /* phase 8 */
  changePokemonFromDivContext() {
    let pokemons = document.querySelectorAll('.divContext .divElement');
    let numberPokemons = document.querySelectorAll('.divContext .divElement .pokemonBoxTiny').length;
    pokemons[~~((numberPokemons)*Math.random())].click();
  }

  /* phase 9 */
  chooseItemInFight() {
    let callBag = document.querySelectorAll('.divContext .divElement');
    let numberPokemons = document.querySelectorAll('.divContext .divElement .pokemonBoxTiny').length;
    let bagNumber = (callBag.length - numberPokemons) == 2 ? callBag.length - 2 : callBag.length - 1;
    callBag[bagNumber].click();
  }

  /* phase 10 */
  isHintsWithItemsLoaded() {
    let divHintTitle = document.querySelector('.hint .hinttitle').innerHTML;
    if(!divHintTitle.match(/Использовать в битве/i)) {
      console.log(`no "Использовать в битве"`);
      return false;
    }
    let hintContent = document.querySelector('.hint .hintcontent');
    let balls = document.querySelectorAll('.hint .divItemFightlist .item');
    if(!balls || balls.length < 1 || hintContent.classList.contains('loading'))
      return false;
    return true;
  }

  findAndThrowPokeball(allowedItems) {
    let items = document.querySelectorAll('.hint .divItemFightlist .item');
    items = Array.from(items);
    let ballThrowed = items.some(item => {
      let itemImage = item.querySelector('img');
      if(!itemImage) return false;
      let isItemBall = !!itemImage.src.match(/ball/i);
      if(!isItemBall) return false;
      let itemNumber = +itemImage.src.replace(/.*?(\d+)\.png/i, '$1');
      let isItemNumberAllowed = allowedItems.findIndex(item => item == itemNumber);
      if(isItemNumberAllowed == -1) return false;
      item.click();
      return true;
    });
    if(!ballThrowed) {
      console.log('No pokeballs!!!', items);
      return false;
    }
    return true;
  }

  /*     */

  isPokemonWasCaught() {
    return document.querySelector('#divFightLog .greennumber') &&
      !!document.querySelector('#divFightLog .greennumber').innerHTML.match(/монстр пойман/i);
  }

  isPokemonCanBeCaught() {
    let globalVars = JSON.parse(document.querySelector('[data-globalvarsstore]').value);
    let isPokemonCatchable = !!globalVars.enemyCatchable;
    /*
    let teamLink = 'https://game.league17.ru/do/pokes/load/team';
    let isTeamHaveEmptySlot = await this.settings.organism.sendRequest(teamLink)
      .then(response => {return response.object ? response.object.length < 6 : 0});*/
    return isPokemonCatchable;
  }

  leaveLastPokemonInPC() {
    let teamLink = 'https://game.league17.ru/do/pokes/load/team';
    let leavePokemonLink = 'https://game.league17.ru/do/pc/farm/poke';
    let leavPokemonParams = [{key:'vars', value: 0}];
    return this.settings.organism.sendRequest(teamLink)
    .then(response => {
      return response.object && response.object[response.object.length-1] &&
      response.object[response.object.length-1].id})
    .then(id => this.settings.organism.sendRequest(leavePokemonLink, [{key:'vars', value: `${id}/0`}]));
    //.then(response => console.log(response.alerten && response.alerten.type) );
  }

}

/* harmony default export */ __webpack_exports__["default"] = (CatcherHeart);

/***/ }),

/***/ "./src/Killer/CommonHeart/index.js":
/*!*****************************************!*\
  !*** ./src/Killer/CommonHeart/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class CommonHeart {
  constructor() {
    this.init();
  }

  init() {
    this.settings = {};
    this.nextPulse = this.nextPulse.bind(this);
    this.setSettings = this.setSettings.bind(this);
  }

  nextPulse(params={}) {
    let newParams = {...params};

    let isFight = this.isFight();
    //this.showLocationIds();

    newParams.isFight = isFight;
    return newParams;
  }

  setSettings(settings = {}) {
    this.settings = settings;
  }

  /* game Functions */

  showLocationIds() {
    let locationButtons = document.querySelectorAll('#divLocGo > .button');
    let nextLocationButtons = Array.from(locationButtons)
      .forEach(locationButton => {
        if(locationButton.innerHTML.match(/\[id\d+\]/)) return;
        let btnWrapper = locationButton.outerHTML;
        let locationId = btnWrapper.match(/btnGo\d+/)[0].replace('btnGo','');
        locationButton.innerHTML += ` [id${locationId}]`;
        let contentWidth = locationButton.innerHTML.length*10;
        if(locationButton.offsetWidth > contentWidth) return;
        locationButton.style.width = `${contentWidth}px`;
      });
  }

  isFight() {
    let fightDiv = document.querySelector('#divVisioFight');
    if(fightDiv.style.display == 'none') return 0; //no fight
    return 1; //fight is right now
  }

  turnWildPokemons(newState) {
    let buttonsDiv = document.querySelector('#divInputButtons');
    let turnWildButton = buttonsDiv.querySelector('.btnSwitchWilds');
    if(newState != turnWildButton.classList.contains('pressed')) turnWildButton.click();
  }

  closeFightDiv() {
    let movesDiv = document.querySelector('#divFightI .moves');
    let closeButton = document.querySelectorAll('#divFightButtons .button');
    if((movesDiv && movesDiv.style.display != 'none') || closeButton[4].style.display == 'none') return;
    closeButton[4].click();
  }

  getPokemonOpenParameter(options={}) {
    let nameDivWithPokemonInfo = options.pokemonOwner == 'player' ? '#divFightI' : '#divFightH';
    let nameDivWithParams = options.parameter == 'exp' ? '.barEXP' : '.barHP';
    let fightDivWithPokemon = document.querySelector(nameDivWithPokemonInfo);
    if(!fightDivWithPokemon) return -1;	// no fight?
    let paramBar = fightDivWithPokemon.querySelector(nameDivWithParams);
    if(!paramBar) return -2; //no param bar ?
    let pokemonParamPercents = +paramBar.firstElementChild.style.width.replace('%','');
    return pokemonParamPercents;
  }

  turnAutoFight(newState) {
    let autofightButtonCheckbox = document.querySelector('[data-changeaction=autofight]>input');
    if(newState != autofightButtonCheckbox.checked) autofightButtonCheckbox.click();
  }

  checkingIsTeamOpenedAndLoaded() {
    let panelWithTeam = document.querySelector('#divDockMenu .divDockPanels');
    if(!panelWithTeam || panelWithTeam.style.display == 'none') return this.openTeamDiv();
    let teamDiv = panelWithTeam.querySelector('.divPokeTeam');
    if(teamDiv.classList.contains('ajxloading'))
    return this.settings.organism.wait(1000)
      .then(_ => this.checkingIsTeamOpenedAndLoaded());
  }

  openTeamDiv() {
    let menuButtons = document.querySelectorAll('#divDockMenu .divDockIn .icon');
    if(menuButtons.length < 1) return;
    menuButtons[1].click();
    return this.settings.organism.wait(1000)
      .then(_ => this.checkingIsTeamOpenedAndLoaded());
  }

}

/* harmony default export */ __webpack_exports__["default"] = (CommonHeart);

/***/ }),

/***/ "./src/Killer/CookieMaker/index.js":
/*!*****************************************!*\
  !*** ./src/Killer/CookieMaker/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class CookieMaker {
  // возвращает cookie с именем name, если есть, если нет, то undefined
  static getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  static setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
      var d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
      updatedCookie += "; " + propName;
      var propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }

    document.cookie = updatedCookie;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (CookieMaker);

/***/ }),

/***/ "./src/Killer/HealerHeart/index.js":
/*!*****************************************!*\
  !*** ./src/Killer/HealerHeart/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class HealerHeart {
  constructor() {
    this.init();
  }

  init() {
    this.settings = {};
    this.nextPulse = this.nextPulse.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.healAll =this.healAll.bind(this);
    this.isTeamRestored = this.isTeamRestored.bind(this);
  }

  nextPulse(params = {}) {
    if(!params.needHeal || params.isFight || !this.settings.autoheal) return params;
    if(params.nextLocationNumber != null && !params.destinationReached) return params;
    let newParams = {...params};

    if(params.destinationReached && params.direction == 'fwd') {
      //console.log('we have reached a pc');
      newParams.direction = 'bck';
      newParams.destinationReached = false;
      return this.healAll()
        .then(_ => newParams);
    }

    if(params.destinationReached && params.direction != 'fwd') {
      //console.log('we have back to farm place ;)');
      newParams.needHeal = false;
      newParams.needMove = false;
      this.settings.commonHeart.turnWildPokemons(true);
      return newParams;
    }

    //console.info('go to heal');
    newParams.needMove = true;
    newParams.waySource = this.settings.waytoheal;
    return newParams;
  }

  setSettings(settings={}) {
    this.settings = settings;
  }

  /* healing commands */

  healAll() {
    let healLink = 'https://game.league17.ru/do/pc/heal/poke';
    let params = [{key:'vars', value: 0}];
    let healResponseChecker = (response) => {
      if(!response || !response.alerten || response.alerten.type != 'success') {
        //console.log(response.alerten);
        throw 'Error healing';
      }
      return true;
    };
    return this.settings.organism.sendRequest(healLink, params)
    .then(healResponseChecker)
    .then(this.isTeamRestored);
  }

  isTeamRestored() {
    let teamRestoringChecker = (teamResponse) => {
      let team = teamResponse.object;
      let teamNotRestored = team.some(pokemon => {
        if(pokemon.hp < pokemon.hp_max) return true;
        let moves = Object.values(pokemon.moves);
        let isMovesNotRestored = moves.some(move => {
          if(!move)return false;
          return move.pp < move.pp_max;
        });
      });
      return !teamNotRestored;
    }

    return this.settings.organism.sendRequest('https://game.league17.ru/do/pokes/load/team')
      .then(teamRestoringChecker);
    /*
    let nameDivWithParams = '.barHP';
    let team = document.querySelectorAll('.divPokeTeam .minicardContainer');
    if(team.length == 0) return false;
    let isPokemonsNotRestored = team.some(pokemonCard => {
      // hp check
      let hpBar = pokemonCard.querySelector('.barHP');
      if(!hpBar) return true; //no hp bar ?
      let pokemonHpPercents = +hpBar.firstElementChild.style.width.replace('%','');
      if(pokemonHpPercents < 100) return true;

      // pp check
      let stringsWithPP = pokemonCard.querySelectorAll('.divMoveParams');
      let isPPNotFull = stringsWithPP.some(stringWithPP => {
        let currentPP = +stringWithPP.match(/\d+\//)[0].replace('/','');
        let maxPP = +stringWithPP.match(/\/\d+/)[0].replace('/','');
        return currentPP/maxPP < 1;
      });

      return isPPNotFull;
    });

    return !isPokemonsNotRestored; */
  }

}

/* harmony default export */ __webpack_exports__["default"] = (HealerHeart);

/***/ }),

/***/ "./src/Killer/Inject/RequestsHook.js":
/*!*******************************************!*\
  !*** ./src/Killer/Inject/RequestsHook.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createRequestsHook; });
let func = `(function() {
  let tempStore = '{}';

  function getOldInfo() {
    let store = document.querySelector('[data-globalvarsstore]');
    if(!store) return JSON.parse(tempStore);
    let oldInfo = store.value ? JSON.parse(store.value) : JSON.parse(tempStore);
    return oldInfo;
  }

  function saveInfoToStore(infoData) {
    let store = document.querySelector('[data-globalvarsstore]');
    if(!store) {
      tempStore = JSON.stringify(infoData);
      return;
    }
    store.value = JSON.stringify(infoData);
  }

  function parseResponse(request) {
    try{
      let respBody = JSON.parse(request.response);
      let info = getOldInfo();
      if(respBody.object) {
        let obj = respBody.object;
        info.t_key = obj.key ? obj.key : info.t_key;
        info.locId = obj.loc ? obj.loc.id : info.locId;
        if (obj.fight) {
          info.enemyHPmax = obj.fight.side.H.poke.hp_max || info.enemyHPmax;
          info.enemyNumber = obj.fight.side.H.poke.sp_id || info.enemyNumber;
          info.enemyLvl = obj.fight.side.H.poke.lvl || info.enemyLvl;
          info.enemyShine = obj.fight.side.H.poke.shine || info.enemyShine;
          info.enemyCatchable = !obj.fight.side.H.poke.wild.nocatch || info.enemyCatchable;
          info.weather = obj.fight.weather || info.weather;
        }

        let side = obj.fight && obj.fight.side || obj.side;
        if(side) {
          info.enemyHP = side.H.poke.hp || info.enemyHP;
          info.playerPokHP = side.I.poke.hp || info.playerPokHP;
          info.playerPokMaxHP = side.I.poke.hp_max || info.playerPokMaxHP;
          info.playerPokExp = side.I.poke.exp.cur || info.playerPokExp;
          info.playerPokNextExp = side.I.poke.exp.next || info.playerPokNextExp;
          info.playerPokPrevExp = side.I.poke.exp.prev || info.playerPrevExp;
          info.playerMovesPP = side.I.poke.moves && isNaN(side.I.poke.moves) &&
            Object.values(side.I.poke.moves)
            .filter(_ => _).map(move => ({pp: move.pp, maxpp: move.pp_max})) || info.playerMovesPP;
        }

        saveInfoToStore(info);
      }
    } catch(err) {
      console.log(\`Error getting response\n\`, err, '\\nRequest:', {...request}, '\\nResponse:', JSON.stringify(request.response, null, 2));
    }
  }

  let origOpen = XMLHttpRequest.prototype.open;
  let origSend = XMLHttpRequest.prototype.send;
  let exampleRequest = {};
  XMLHttpRequest.prototype.open = function() {
      exampleRequest.openArgs = arguments;
      this.addEventListener('load', function(evt) {
          if(this.status != 200) return;
          exampleRequest.response = this.responseText;
          parseResponse(exampleRequest);
      });

      origOpen.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function() {
      exampleRequest.sendArgs = arguments;
      origSend.apply(this, arguments);
  };


})();`;

function createRequestsHook() {
  let scr = document.createElement('script');
  let code = document.createTextNode(func);
  scr.appendChild(code);
  (document.body || document.head).appendChild(scr);
}

/***/ }),

/***/ "./src/Killer/Inject/TKeyGetter.js":
/*!*****************************************!*\
  !*** ./src/Killer/Inject/TKeyGetter.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return spillGlobalVars; });
function spillGlobalVars() {
  let scr = document.createElement('script');
  scr.setAttribute('data-mustbedeleted','');
  let func = `function getTKey() {
    let elementToWrite = document.querySelector('[data-globalvarsstore]');
    let key = 'not_found';
    for(let keyWord in window){
      if(window[keyWord] && window[keyWord].key && (typeof window[keyWord].key).match(/string/i)) {
        key = window[keyWord].key;
      }
    }
    let globalvarsobject = {
      t_key: key
    }
    elementToWrite.value = JSON.stringify(globalvarsobject);
    let src = document.querySelector('[data-mustbedeleted]');
    src.remove();
  }`;
  let code = document.createTextNode(`(${func})()`);
  scr.appendChild(code);
  (document.body || document.head).appendChild(scr);
};

/***/ }),

/***/ "./src/Killer/KillerHeart/index.js":
/*!*****************************************!*\
  !*** ./src/Killer/KillerHeart/index.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class KillerHeart {
  constructor() {
    this.init();
  }

  init() {
    this.settings = {};
    this.nextPulse = this.nextPulse.bind(this);
    this.setSettings = this.setSettings.bind(this);
  }

  switchAlarm(value) {
    if(!value || !this.settings.alarmswitch) return this.settings.organism.alarm.stopPlay();
    this.settings.organism.alarm.startPlay();
  }

  nextPulse(params = {}) {
    if(!params.isFight) {
      return params;
    }

    let newParams = {...params};

    let isCaptcha = this.isCaptchaEnterNeed();
    newParams.isCaptcha = isCaptcha;
    if(isCaptcha) {
      console.log('u should enter captcha');

      // for electron wrapper
      if (window.killerExtension && window.killerExtension.shotCaptcha) {
        window.killerExtension.shotCaptcha();
      }

      this.switchAlarm(true);
      return newParams;
    };
    this.switchAlarm(false);

    let numberOfPermittedAttacks = this.getNumberOfPermittedAttacks();
    if(!numberOfPermittedAttacks) {
      //console.log('no permitted attacks');
      return newParams;
    };

    newParams.killedCounter = newParams.killedCounter ? newParams.killedCounter : 0;
    let fightStatus = this.getFightStatus();
    switch(fightStatus) {
      case 1: case 2: case 3:
        if(fightStatus == 2) this.settings.organism.killedCounter++;
        if(newParams.needCatch && newParams.catchParams) {
          newParams.catchParams.catched = this.settings.catcherHeart.isPokemonWasCaught();
          newParams.catchParams.phase = 7;
        }
        this.settings.commonHeart.closeFightDiv();
        return newParams;
      case 4:
        console.log(`Pokemon was killed but enemy was killed too`);
        this.settings.organism.killedCounter++;
        this.settings.commonHeart.turnWildPokemons(false);
        this.settings.commonHeart.closeFightDiv();
        newParams.needHeal = true;
        return newParams;
      case 5:
        console.log(`Pokemon was killed`);
        this.settings.commonHeart.turnWildPokemons(false);
        //this.settings.commonHeart.closeFightDiv();
        newParams.needHeal = true;
        return this.changePokemon().then(_ => newParams);
    }

    if(this.settings.controlexp && !isNaN(this.settings.controlexp)) {
      let currentExp = this.getPlayerPokemonCurrentEXPpercents();
      let criticalExp = this.settings.controlexp > 90 ? this.settings.controlexp : 90;
      if(currentExp >= criticalExp) return;
    }

    let currentHp = this.getPlayerPokemonCurrentHPpercents();
    let criticalHp = this.settings.controlhp > 20 ? this.settings.controlhp : 20;
    if(currentHp <= criticalHp) {
      this.settings.commonHeart.turnWildPokemons(false);
      newParams.needHeal = true;
    }

    let enemyPokemonNumber = this.getEnemyPokemonNumberAsString();
    newParams.lastPokemonNumber = enemyPokemonNumber;
    if( this.isAttackForbiddenForThisNumber() &&
        (this.settings.catcherHeart.isPokemonCanBeCaught() ||
        !this.settings.catcherHeart.isPokemonShouldBeCaughtAutomatically())) {
      //console.log('forbidden pokemon');

      newParams.waitingForCatchCounter && newParams.waitingForCatchCounter++ ||
        (newParams.waitingForCatchCounter = 0);
      newParams.needCatch = true;
      return newParams;
    }

    let enemyType = this.isEnemyNormal();
    if(!enemyType) {
      console.log('Enemy is shine or smt else');
      this.switchAlarm();
      //newParams.needCatch = true;
      newParams.waitingForCatchCounter && newParams.waitingForCatchCounter++ ||
        (newParams.waitingForCatchCounter = 0);
      return newParams;
    }

    this.repeatAttackCounter = 0;
    if(this.numberOfPermittedAttacksPP() < 2) {
      console.log('PP is over. Need Heal');
      this.settings.commonHeart.turnWildPokemons(false);
      newParams.needHeal = true;
      this.chooseAttack(true);
      return newParams;
    }

    this.chooseAttack();
    return newParams;
  }

  /* fight actions & parametres */

  isCaptchaEnterNeed() {
    let captchaDiv = document.querySelector('#divFightCaptcha');
    let captchaImage = captchaDiv.querySelector('img');
    if(captchaDiv.style.display == 'none' ||
        !captchaImage ||
        captchaImage.src == undefined)
      return 0; // there is no captcha form
    return 1; // oops, it wants captcha
  }

  getFightStatus() {
    let fightStatusText = document.querySelector('#divFightAction').innerHTML;
    if(fightStatusText.match(/ничья/i)) return 1; // draw
    if(fightStatusText.match(/вы победили/i)) return 2; // victory
    if(fightStatusText.match(/вы проиграли/i)) return 3; // lose

    let dummyInsteadPlayerPokemon = document.querySelector('#divFightI .pokemonBoxDummy');
    let dummyInsteadEnemyPokemon = document.querySelector('#divFightH .pokemonBoxDummy');
    if(dummyInsteadPlayerPokemon && dummyInsteadEnemyPokemon) return 4;
    //pokemon was killed/changed but u can close window
    if(dummyInsteadPlayerPokemon && !dummyInsteadEnemyPokemon) return 5;
    //pokemon was killed/changed but u can get another

    return 0; // it's okay, fight is continuing
  }

  getNumberOfPermittedAttacks() {
    return this.settings.attack.filter(attack=>attack==1).length;
  }

  getWeather() {
    let weatherDiv = document.querySelector('#divFightWeather');
    let hail = weatherDiv.querySelector('.w3');
    if(hail) return 1; // hail
    let sandstorm = weatherDiv.querySelector('.w4');
    if(sandstorm) return 2; //sandstorm
    return 0; // sun/rain etc
  }

  chooseAttack(lastTry) {
    if(!this.getNumberOfPermittedAttacks()) return;
    //if(this.numberOfPermittedAttacksPP() < 1) return; //excess checking
    let randomAttack = ~~(Math.random()*4);
    if(this.settings.attack[randomAttack]) {
      let resultClicking = this.clickAttack(randomAttack, lastTry);
      if(resultClicking) return;
    }
    this.repeatAttackCounter++;
    if(this.repeatAttackCounter > 100) throw 'Too much attacks repeat';
    this.chooseAttack(lastTry);
  }

  clickAttack(attackNumber, lastTry) {
    if(attackNumber > 3 || attackNumber < 0) return false;
    if(this.getPlayerPokemonAttackPP(attackNumber) < 1 && !lastTry) return false;
    let moveBox = document.querySelectorAll('#divFightI .moveBox')[attackNumber];
    if(!moveBox) return false;
    if(!moveBox.querySelector('.divMove')) return false;
    let divForClicking = moveBox.querySelector('.divMoveInfo');
    divForClicking.click();
    return true;
  }

  /* switch pokemon */

  checkIsPokemonsListToChangeLoaded() {
    let divContextTitle = document.querySelector('.divContext .divTitle').innerHTML;
    if(!divContextTitle.match(/выбрать монстра/i)) return this.changePokemon();
    let pokemons = document.querySelectorAll('.divContext .divElement');
    if(!pokemons || pokemons.length < 1)
    return this.settings.organism.wait(1000)
      .then(_ => this.checkIsPokemonsListToChangeLoaded());
    return true;
  }

  changePokemon() {
    return this.settings.organism.wait(500)
    .then(_ => {
      document.querySelector('#divFightI .pokemonBoxDummy').click();
    })
    .then(_ => this.settings.organism.wait(1000))
    .then(_ => this.checkIsPokemonsListToChangeLoaded())
    .then(_ => {
      let pokemons = document.querySelectorAll('.divContext .divElement');
      pokemons[~~(pokemons.length*Math.random())].click();
    })
    .then(_ => this.settings.organism.wait(1000))
  }

  /* infight parametres & actions with player pokemon */

  getPlayerPokemonCurrentHPpercents() {
    return this.settings.commonHeart.getPokemonOpenParameter({pokemonOwner:'player',parameter:'hp'});
  }

  getPlayerPokemonCurrentEXPpercents() {
    return this.settings.commonHeart.getPokemonOpenParameter({pokemonOwner:'player',parameter:'exp'});
  }

  getPlayerPokemonAttackPP(attackNumber) {
    if(attackNumber > 3 || attackNumber < 0) return false;
    let stringWithPP = document.querySelectorAll('#divFightI .divMoveParams')[attackNumber].innerHTML;
    let currentPPValue = +stringWithPP.replace(/\/\d+/,'');
    return currentPPValue;
  }

  numberOfPermittedAttacksPP() {
    let sumOfAllPermittedAttacksPP =
      this.settings.attack.reduce((sum, attackPermission, index) => {
        if(!attackPermission) return sum;
        return sum + this.getPlayerPokemonAttackPP(index);
      }, 0);
    return sumOfAllPermittedAttacksPP;
  }

  /* infight parametres & actions with enemy pokemon */

  isEnemyCanBeCaught() {
    let noCatch = document.querySelector('#divFightOptions .nocatch');
    return noCatch != null;
  }

  getEnemyPokemonNumberAsString() {
    let enemyImage = document.querySelector('#divFightH .image > img');
    if(!enemyImage) return 0;
    let enemyNumber = enemyImage.src.match(/\d{3}/)[0];
    return enemyNumber;
  }

  getEnemyLevel() {
    let enemyLevelDiv = document.querySelector('#divFightH .lvl');
    if(!enemyLevelDiv) return 0;
    let enemyLevel = +enemyLevel.innerHTML;
    return enemyLevel;
  }

  isEnemyNormal() {
    let enemyRankDiv = document.querySelector('#divFightH .rank');
    if(!enemyRankDiv) return true;
    let enemyRankSpan = enemyRankDiv.querySelector('span');
    if(!enemyRankSpan) {
      let enemyRank = enemyRankDiv.innerHTML;
      if(enemyRank.match(/\S+/)) return false;
    } else {
      if(enemyRankSpan.innerHTML.match(/\S+/)) return false;
    }
    return true;
  }

  getEnemyHPpercents() {
    return this.settings.commonHeart.getPokemonOpenParameter({pokemonOwner:'enemy',parameter:'hp'});
  }

  isAttackForbiddenForThisNumber() {
    let currentNumber = this.getEnemyPokemonNumberAsString();
    let forbiddenNumbers = this.settings.forbiddennumbers.match(/\d{1,3};?/g);
    if(!forbiddenNumbers) return false;
    return forbiddenNumbers.some(number => +currentNumber == +(number.replace(';','')));
  }

  /* common actions */

  setSettings(settings={}) {
    this.settings = settings;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (KillerHeart);

/***/ }),

/***/ "./src/Killer/MainContainer/index.js":
/*!*******************************************!*\
  !*** ./src/Killer/MainContainer/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let killerHtml = `<div class="killer__wrapper">
  <div class="killer__topPanel"></div>
  <div class="killer__controlPanel">
    <label class="killer__controlPanelLabel killer__controlPanelLabel--row" data-changeaction="autofight">
      <input type="checkbox" />
      <span>AF</span>
    </label>
    <label class="killer__controlPanelLabel killer__controlPanelLabel--halfRow" data-changeaction="attack" data-attacknumber="1">
      <input type="checkbox" />
      <span>Attack 1</span>
    </label>
    <label class="killer__controlPanelLabel killer__controlPanelLabel--halfRow" data-changeaction="attack" data-attacknumber="2">
      <input type="checkbox" />
      <span>Attack 2</span>
    </label>
    <label class="killer__controlPanelLabel killer__controlPanelLabel--halfRow" data-changeaction="attack" data-attacknumber="3">
      <input type="checkbox" />
      <span>Attack 3</span>
    </label>
    <label class="killer__controlPanelLabel killer__controlPanelLabel--halfRow" data-changeaction="attack" data-attacknumber="4">
      <input type="checkbox">
      <span>Attack 4</span>
    </label>
    <div class="killer__controlPanelCell" data-action="showsettings">
      <button class="button">Settings</button>
    </div>
  </div>
  <input data-globalvarsstore="" type="hidden" value="">
</div>`;


class KillerContainer {
  constructor() {
    this.init();
  }

  createView() {
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = killerHtml;
    return tempDiv.firstChild;
  }

  init() {
    this.mainContainer = this.createView();
      this.topPanel = this.mainContainer.querySelector('.killer__topPanel');
      this.controlPanel = this.mainContainer.querySelector('.killer__controlPanel');
      this.globalVarsStore = this.mainContainer.querySelector('[data-globalvarsstore]');

    this.addTopPanelDragListeners();

    this.controlPanel.addEventListener(
      'click',
      (evt)=>{this.controlPanelClickListener(evt);}
    );
  }

  createTopPanel() {
    let topPanel = document.createElement('div');
      topPanel.classList.add('killerMainContainer__topPanel');
    return topPanel;
  }

  createHiddenInputForGlobalVars() {
    let hiddenDB = document.createElement('input');
    hiddenDB.setAttribute('data-globalvarsstore','');
    hiddenDB.type = 'hidden';
    return hiddenDB;
  }

  addTopPanelDragListeners() {
    let panel = this.topPanel;
    let moveFlag = false;
    panel.addEventListener('mousedown', ()=>moveFlag=true);
    panel.addEventListener('mouseup', ()=>moveFlag=false);
    document.body.addEventListener('mousemove',(evt)=>{
      if(!moveFlag) return;
      let newTop = evt.pageY - 2*this.topPanel.offsetHeight/3;
      this.mainContainer.style.top = `${newTop}px`;
      let newLeft = evt.pageX - this.mainContainer.offsetWidth/2;
      this.mainContainer.style.left = `${newLeft}px`;
    });
  }

  getMainContainerElement() {
    return this.mainContainer;
  }

  controlPanelClickListener(evt) {
    if(evt.target.tagName == 'INPUT'){
      let changedAction = evt.target.parentNode.dataset['changeaction'];
      if(changedAction == 'autofight') {
        if(!this.autoFightStatusChangedListener) return;
        this.autoFightStatusChangedListener(evt.target.checked);
      }
      if(changedAction == 'attack') {
        if(!this.attackStatusChangedListener) return;
        let changedAttackNumber = evt.target.parentNode.dataset['attacknumber'];
        this.attackStatusChangedListener(evt.target.checked, changedAttackNumber);
      }
    }
    if(evt.target.tagName == 'BUTTON') {
      let action = evt.target.parentNode.dataset['action'];
      if(action == 'showsettings') {
        if(!this.settingsButtonClickListener) return;
        this.settingsButtonClickListener();
      }
    }
  }

  setAutoFightStatusChangedListener(listener) {
    this.autoFightStatusChangedListener = listener;
  }

  setAttackStatusChangedListener(listener) {
    this.attackStatusChangedListener = listener;
  }

  setSettingsClickListener(listener) {
    this.settingsButtonClickListener = listener;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (KillerContainer);

/***/ }),

/***/ "./src/Killer/SettingsContainer/index.js":
/*!***********************************************!*\
  !*** ./src/Killer/SettingsContainer/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let settingsViewHtml = `<div class="killerSettings__wrapper">
<div class="killerSettings__topPanel"></div>
<div class="killerSettings__controlPanel">
  <div class="killerSettings__controlPanelRow">
    <div class="killerSettings__controlPanelCell">
      <label class="killerSettings__row" data-changeaction="showpokemons">
        <span>Show pokemons:</span>
        <input type="checkbox" />
      </label>
      <label class="killerSettings__row killerSettings__row--innerColumn" data-changeaction="forbiddennumbers">
        <span>Forbidden numbers:</span>
        <textarea></textarea>
      </label>
      <label class="killerSettings__row killerSettings__row--innerColumn">
        <span>Counter of killed wild pokemons:</span>
        <input type="text" disabled class="killerSettings__input killerSettings__input--max" data-view="killedwild"/>
      </label>
      <label class="killerSettings__row" data-changeaction="controlexp">
        <span>EXP control, %:</span>
        <input type="text" class="killerSettings__input" />
      </label>
    </div>
    <div class="killerSettings__controlPanelCell">
      <label class="killerSettings__row" data-changeaction="autoheal">
        <span>Auto heal:</span>
        <input type="checkbox" />
      </label>
      <label class="killerSettings__row killerSettings__row--innerColumn" data-changeaction="waytoheal">
        <span>Way to healing:</span>
        <textarea></textarea>
      </label>
      <label class="killerSettings__row" data-changeaction="controlhp">
        <span>HP control, %:</span>
        <input type="text" class="killerSettings__input" />
      </label>
    </div>
  </div>
  <div class="killerSettings__controlPanelRow">
    <div class="killerSettings__controlPanelCell">
      <label class="killerSettings__row" data-changeaction="alarmswitch">
        <span>Alarm:</span>
        <input type="checkbox" />
      </label>
      <label class="killerSettings__row" data-changeaction="alarmvolume">
        <span>Alarm volume (0-100):</span>
        <input class="killerSettings__input killerSettings__input--min" type="text" value="10" />
      </label>
      <label class="killerSettings__row killerSettings__row--innerColumn" data-changeaction="alarmsrc" style="display:none">
        <span>Alarm source:</span>
        <input class="killerSettings__input killerSettings__input--max" type="text" />
      </label>
    </div>
    <div class="killerSettings__controlPanelCell">
      <label class="killerSettings__row" data-changeaction="showiv">
        <span>Show IV HP:</span>
        <input type="checkbox" />
      </label>
      <label class="killerSettings__row" data-changeaction="autocatch">
        <span>Autocatch:</span>
        <input type="checkbox" />
      </label>
      <label class="killerSettings__row killerSettings__row--innerColumn" data-changeaction="autocatchsettings">
        <textarea></textarea>
      </label>
    </div>
  </div>
  <div class="killerSettings__controlPanelRow">
    <button class="button">Save</button>
  </div>
</div>
</div>`;

class SettingsContainer {
  constructor() {
    this.init();
  }

  init() {
    this.mainWrapper = this.createView();
      this.topPanel = this.mainWrapper.querySelector('.killerSettings__topPanel');
      this.controlPanel = this.mainWrapper.querySelector('.killerSettings__controlPanel');

    this.addTopPanelDragListeners();

    this.changeListeners = {};

    this.controlPanel.addEventListener(
      'change',
      (evt)=>{this.controlPanelChangeListener(evt);}
    );
  }

  createView() {
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = settingsViewHtml;
    return tempDiv.firstChild;
  }

  getMainContainerElement() {
    return this.mainWrapper;
  }

  addTopPanelDragListeners() {
    let panel = this.topPanel;
    let moveFlag = false;
    panel.addEventListener('mousedown', ()=>moveFlag=true);
    panel.addEventListener('mouseup', ()=>moveFlag=false);
    document.body.addEventListener('mousemove',(evt)=>{
      if(!moveFlag) return;
      let newTop = evt.pageY - 2*panel.offsetHeight/3;
      this.mainWrapper.style.top = `${newTop}px`;
      let newLeft = evt.pageX - this.mainWrapper.offsetWidth/2;
      this.mainWrapper.style.left = `${newLeft}px`;
    });
  }

  controlPanelChangeListener(evt) {
    if(evt.target.tagName == 'TEXTAREA' || evt.target.tagName == 'INPUT'){
      let changedAction = evt.target.parentNode.dataset['changeaction'];
      if(changedAction == 'forbiddennumbers' ||
         changedAction == 'waytoheal' ||
         changedAction == 'controlhp' ||
         changedAction == 'controlexp' ||
         changedAction == 'autocatchsettings' ||
         changedAction == 'alarmvolume' ||
         changedAction == 'alarmsrc') {
        if(!this.changeListeners[changedAction]) return;
        this.changeListeners[changedAction](evt.target.value);
      }
      if(changedAction == 'showpokemons' ||
         changedAction == 'autoheal' ||
         changedAction == 'showiv' ||
         changedAction == 'autocatch' ||
         changedAction == 'alarmswitch' ) {
        if(!this.changeListeners[changedAction]) return;
        this.changeListeners[changedAction](evt.target.checked);
      }
    }
  }

  /* funcs for setting listeners */
  setChangeListener(type, listener) {
    this.changeListeners[type] = listener;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (SettingsContainer);

/***/ }),

/***/ "./src/Killer/TravellerHeart/index.js":
/*!********************************************!*\
  !*** ./src/Killer/TravellerHeart/index.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class TravellerHeart {
  constructor() {
    this.init();
  }

  init() {
    this.nextPulse = this.nextPulse.bind(this);
    this.setSettings = this.setSettings.bind(this);
  }

  setSettings(settings={}) {
    this.settings = settings;
  }

  nextPulse(params={}) {
    let newParams = {...params};
    if(!params.needMove) {
      newParams.nextLocationNumber = null;
      newParams.direction = 'fwd';
      newParams.waySource = '';
      newParams.prevLocationWays = null;
      newParams.destinationReached = false;
    }

    //console.log(`is fight? ${params.isFight}`, `is Need Move? ${params.needMove}`,
     // `isDestReached ${newParams.destinationReached}`);

    if(params.isFight || !params.needMove || newParams.destinationReached) return newParams;

    /*
    if(params.onWrongPlaceCounter > 3) {
      newParams.nextLocationNumber--;
      newParams.prevLocationWays = null;
      return newParams;
    } */

    //console.log(`place changed?: ${params.prevLocationWays != null && !this.isPlaceWasChanged(params.prevLocationWays)}`);
    if(params.prevLocationWays != null && !this.isPlaceWasChanged(params.prevLocationWays)) {
      //console.log(`place wasn't changed. prev:`, params.prevLocationWays, `counter: `, newParams.onWrongPlaceCounter);
      //newParams.onWrongPlaceCounter = newParams.onWrongPlaceCounter && newParams.onWrongPlaceCounter + 1 || 1;
      return newParams;
    }

    //newParams.onWrongPlaceCounter = 0;
    //console.log(`direction: ${newParams.direction}`);

    let wayChain = this.getWay(params.waySource, params.direction);
    let locationNumber = params.nextLocationNumber != null ? params.nextLocationNumber : 0;

    if(locationNumber >= wayChain.length) {
      newParams.nextLocationNumber = 0;
      newParams.destinationReached = true;
      return newParams;
    }

    //console.log(wayChain[locationNumber]);
    newParams.nextLocationNumber = locationNumber + 1;
    newParams.prevLocationWays = this.goToLocation(wayChain[locationNumber]);
    return newParams;
  }

  getWay(waytoheal, direction) {
    if(!waytoheal) return 1; //no input value or empty
    let way = direction == 'fwd' ? waytoheal.match(/([^]+?)\//) : waytoheal.match(/\/([^]+)/);
    if(!way) return 2; // no slash in input value
    way = way[1].split(';').map(_ => _.trim()).filter(_ => _);
    return way;
  }

  goToLocation(locationName) {
    //console.log(locationName);
    let locationNumber = locationName.match(/\s+\d+/);
    if(locationNumber) locationName = locationName.replace(/\s+\d+/, '');
    locationNumber = locationNumber && !isNaN(+locationNumber[0]) && +locationNumber[0] || 0;
    let locationButtons = document.querySelectorAll('#divLocGo > .button');
    if(locationButtons.length < 1) {
      console.log('There is no exit');
      throw 'No exit here';
    }

    let nextLocationButtons = Array.from(locationButtons)
      .filter(locationButton => locationButton.innerHTML.match(new RegExp(locationName, 'i')));

    if(nextLocationButtons.length < 1) {
      console.log(`no such place: ${locationName}`);
      throw `no such place: ${locationName}`;
    }

    //console.log(`nextLoc: ${locationNumber}`, nextLocationButtons);
    let nextLocationButton = nextLocationButtons[locationNumber];
    //console.log(`nextLocBtn:`, nextLocationButton);
    nextLocationButton.click();

    return locationButtons;
  }

  isPlaceWasChanged(oldLocationButtons) {
    let locationButtons = document.querySelectorAll('#divLocGo > .button');
    if(oldLocationButtons.length != locationButtons.length) return true;

    for(let i = 0; i < oldLocationButtons.length; i++) {
      let locationIdForOldButton = oldLocationButtons[0].outerHTML.match(/btnGo\d+/).toString();
      let locationIdForNewButton = locationButtons[0].outerHTML.match(/btnGo\d+/).toString();
      if(locationIdForNewButton != locationIdForOldButton) return true;
    }

    return false;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TravellerHeart);

/***/ }),

/***/ "./src/Killer/TravellerTentacle/index.js":
/*!***********************************************!*\
  !*** ./src/Killer/TravellerTentacle/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class TravellerTentacle {
  constructor() {
    this.init();
  }

  init() {

  }

  setSettings(settings={}) {
    this.settings = settings;
  }

  go(to) {
    let direction = to == 'heal' ? 'fwd' : 'bck';
    let way = this.getWay(this.settings.waytoheal, direction);
    if(way == 1 || way == 2) throw 'no way';
    let walkingTheWay = way.reduce((chain, nextWay) =>
      chain.then(_ => this.goToLocation(nextWay)),
      Promise.resolve());
    return walkingTheWay;
  }

  getWay(waytoheal, direction) {
    if(!waytoheal) return 1; //no input value or empty
    let way = direction == 'fwd' ? waytoheal.match(/([^]+?)\//) : waytoheal.match(/\/([^]+)/);
    if(!way) return 2; // no slash in input value
    way = way[1].split(';').map(_ => _.trim()).filter(_ => _);
    return way;
  }

  goToLocation(locationName) {
    let locationNumber = locationName.match(/\s+\d+/);
    if(locationNumber) loactionName = locationName.replace(/\s+\d+/, '');
    locationNumber = locationNumber ? locationNumber[0] : 0;
    let locationButtons = document.querySelectorAll('#divLocGo > .button');
    if(locationButtons.length < 1) {
      console.log('There is no exit');
      throw 'No exit here';
    }

    let nextLocationButtons = Array.from(locationButtons)
      .filter(locationButton => locationButton.innerHTML.match(new RegExp(locationName, 'i')));

    if(nextLocationButtons.length < 1) {
      console.log(`no such place: ${locationName}`);
      throw `no such place: ${locationName}`;
    }

    let nextLocationButton = nextLocationButtons[locationNumber];
    //let locationId = nextLocationButton.outerHTML.match(/btnGo\d+/)[0].replace('btnGo','');

    nextLocationButton.click();

    return this.settings.organism.wait(1000)
    .then(_ => this.isPlaceWasChanged(locationButtons));
  }

  isPlaceWasChanged(oldLocationButtons) {
    let locationButtons = document.querySelectorAll('#divLocGo > .button');
    if(oldLocationButtons.length != locationButtons.length) return true;

    for(let i = 0; i < oldLocationButtons.length; i++) {
      let locationIdForOldButton = oldLocationButtons[0].outerHTML.match(/btnGo\d+/).toString();
      let locationIdForNewButton = locationButtons[0].outerHTML.match(/btnGo\d+/).toString();
      if(locationIdForNewButton != locationIdForOldButton) return true;
    }

    //console.log('waiting for place changing');
    return this.settings.organism.wait(1000)
      .then(_ => this.isPlaceWasChanged(oldLocationButtons));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (TravellerTentacle);

/***/ }),

/***/ "./src/Killer/index.js":
/*!*****************************!*\
  !*** ./src/Killer/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MainContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MainContainer */ "./src/Killer/MainContainer/index.js");
/* harmony import */ var _CommonHeart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommonHeart */ "./src/Killer/CommonHeart/index.js");
/* harmony import */ var _KillerHeart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./KillerHeart */ "./src/Killer/KillerHeart/index.js");
/* harmony import */ var _HealerHeart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HealerHeart */ "./src/Killer/HealerHeart/index.js");
/* harmony import */ var _CatcherHeart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CatcherHeart */ "./src/Killer/CatcherHeart/index.js");
/* harmony import */ var _TravellerHeart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TravellerHeart */ "./src/Killer/TravellerHeart/index.js");
/* harmony import */ var _TravellerTentacle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TravellerTentacle */ "./src/Killer/TravellerTentacle/index.js");
/* harmony import */ var _SettingsContainer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SettingsContainer */ "./src/Killer/SettingsContainer/index.js");
/* harmony import */ var _Inject_RequestsHook__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Inject/RequestsHook */ "./src/Killer/Inject/RequestsHook.js");
/* harmony import */ var _Inject_TKeyGetter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Inject/TKeyGetter */ "./src/Killer/Inject/TKeyGetter.js");
/* harmony import */ var _CookieMaker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./CookieMaker */ "./src/Killer/CookieMaker/index.js");
/* harmony import */ var _Alarm__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Alarm */ "./src/Killer/Alarm/index.js");













let lifesCounter = 0;

class Killer {
  constructor(imageReplacer){
    //this.init();
    this.setDocumentObserver();
    Object(_Inject_RequestsHook__WEBPACK_IMPORTED_MODULE_8__["default"])();
    this.imageReplacer = imageReplacer;
  }

  init() {
    this.alarm = new _Alarm__WEBPACK_IMPORTED_MODULE_11__["default"]();
    this.settingsParametres  = ['forbiddennumbers', 'waytoheal', 'showpokemons', 'autoheal',
      'showiv', 'controlhp', 'controlexp', 'autocatch', 'autocatchsettings',
      'alarmsrc', 'alarmswitch', 'alarmvolume'];
    let killerView = new _MainContainer__WEBPACK_IMPORTED_MODULE_0__["default"]();
    let settingsView = new _SettingsContainer__WEBPACK_IMPORTED_MODULE_7__["default"]();

    let commonHeart = new _CommonHeart__WEBPACK_IMPORTED_MODULE_1__["default"]();
    let killerHeart = new _KillerHeart__WEBPACK_IMPORTED_MODULE_2__["default"]();
    let healerHeart = new _HealerHeart__WEBPACK_IMPORTED_MODULE_3__["default"]();
    let catcherHeart = new _CatcherHeart__WEBPACK_IMPORTED_MODULE_4__["default"]();
    let travellerHeart = new _TravellerHeart__WEBPACK_IMPORTED_MODULE_5__["default"]();
    let travellerTentacle = new _TravellerTentacle__WEBPACK_IMPORTED_MODULE_6__["default"]();

    this.settings = {
      'autofight': false,
      'attack': [0,0,0,0],
      'forbiddennumbers': '',
      'showpokemons': true,
      'autoheal': true,
      'commonHeart': commonHeart,
      'killerHeart': killerHeart,
      'healerHeart': healerHeart,
      'catcherHeart': catcherHeart,
      'travellerHeart': travellerHeart,
      'travellerTentacle': travellerTentacle,
      'organism': this
    };

    this.commonHeart = commonHeart;
    this.killerHeart = killerHeart;
    this.healerHeart = healerHeart;
    this.catcherHeart = catcherHeart;
    this.travellerHeart = travellerHeart;
    this.travellerTentacle = travellerTentacle;

    this.killerView = killerView;
    this.settingsView = settingsView;

    this.killedCounter = 0;

    this.injectViewsIntoDocument();
    this.setMainViewListeners();
    this.setSettingsViewListeners();

    this.loadSettings();
    this.updateViews(this.settings);

    document.addEventListener('keyup', (evt)=>{
      if(evt.ctrlKey && evt.shiftKey) {
        if(evt.key == 'H' || evt.key == 'Р') {
          this.toggleVisionMainContainer();
        }
      }
    });
  }

  setDocumentObserver() {
    let observer = new MutationObserver(mut => {
      if(!document.querySelector('#divLocGo .button')) return;
      observer.disconnect();
      this.init();
      setTimeout(_ => this.settings.globalVars = this.getGlobalVars(), 1000);
     });
    let config = {attributes: true, childList: true, subtree: true};
    observer.observe( document, config );
  }

  getGlobalVars() {
    let hiddenStore = document.querySelector('[data-globalvarsstore]');
    let globalVars = JSON.parse(hiddenStore.value);
    return globalVars;
  }

  startKillerLife() {
    this.currentKillerLife = lifesCounter++;
    this.killerHeartbeat({ life: this.currentKillerLife });
  }

  wait(ms, paramToChain) {
    return new Promise(resolve => {
      setTimeout(_ => resolve(paramToChain), ms);
    });
  }

  showKilledCounter(value) {
    let counterView = document.querySelector('[data-view=killedwild]');
    counterView.value = value ? value : 0;
  }

  killerHeartbeat(blood={}) {
    if(!this.settings.autofight || this.currentKillerLife !== blood.life) return Promise.resolve(blood);

    this.showKilledCounter(this.killedCounter);

    let randomTimeInterval = (Math.random()*5+2)*1000;
    return Promise.resolve(blood)
      .then(this.commonHeart.nextPulse)
      .then(this.killerHeart.nextPulse)
      .then(this.catcherHeart.nextPulse)
      .then(this.healerHeart.nextPulse)
      .then(this.travellerHeart.nextPulse)
      .then(blood => this.wait(randomTimeInterval, blood))
      .then(blood => this.killerHeartbeat(blood));
  }

  toggleVisionMainContainer() {
    let killerView = this.killerView.getMainContainerElement();
    if(killerView.style.display != 'none') killerView.style.display = 'none';
    else killerView.style.display = 'block';
  }

  toggleVisionSettingsView() {
    let settingsView = this.settingsView.getMainContainerElement();
    if(settingsView.style.display != 'none') settingsView.style.display = 'none';
    else settingsView.style.display = 'block';
  }

  injectViewsIntoDocument() {
    document.body.appendChild(this.killerView.getMainContainerElement());
    document.body.appendChild(this.settingsView.getMainContainerElement());
    this.toggleVisionSettingsView();
  }

  setMainViewListeners() {
    this.killerView.setAutoFightStatusChangedListener((newState)=>{
      this.changeSettings({
        parameter:'autofight',
        value: newState
      });
    });

    this.killerView.setAttackStatusChangedListener((newState, attackNumber)=>{
      this.changeSettings({
        parameter:'attack',
        value: newState,
        number: attackNumber-1
      });
    });

    this.killerView.setSettingsClickListener(_ => this.toggleVisionSettingsView());
  }

  setSettingsViewListeners() {
    let parametres = this.settingsParametres;
    parametres.forEach(parameter => {
      this.settingsView.setChangeListener(parameter, (newValue) => {
        this.changeSettings({
          parameter: parameter,
          value: newValue
        });
      });
    });
  }

  changeSettings(newPartOfSettings={}) {
    let newSettings = {...this.settings};
    switch(newPartOfSettings.parameter) {
      case 'autofight':
      case 'forbiddennumbers':
      case 'waytoheal':
      case 'showpokemons':
      case 'autoheal':
      case 'showiv':
      case 'controlhp':
      case 'controlexp':
      case 'autocatch':
      case 'autocatchsettings':
      case 'alarmsrc':
      case 'alarmvolume':
      case 'alarmswitch':
        newSettings[newPartOfSettings.parameter] = newPartOfSettings.value;
        if(newPartOfSettings.parameter == 'showpokemons') this.imageReplacer.switchOn(newSettings.showpokemons);
        if(newPartOfSettings.parameter == 'showiv') this.catcherHeart.setObserverIV(newSettings.showiv);
        if(newPartOfSettings.parameter == 'alarmvolume') this.alarm.changeVolume(newSettings.alarmvolume);
        if(newPartOfSettings.parameter == 'alarmsrc') this.alarm.changeMelody(newSettings.alarmsrc);
      break;
      case 'attack':
        let attackNumber = newPartOfSettings.number;
        newSettings.attack[attackNumber] = newPartOfSettings.value ? 1 : 0;
      break;
    }

    let oldAutofightStatus = this.settings.autofight;
    this.settings = {...newSettings};
    this.killerHeart.setSettings(this.settings);
    this.commonHeart.setSettings(this.settings);
    this.healerHeart.setSettings(this.settings);
    this.catcherHeart.setSettings(this.settings);
    this.travellerHeart.setSettings(this.settings);
    this.travellerTentacle.setSettings(this.settings);

    this.saveSettings();
    if(this.settings.autofight != oldAutofightStatus) this.startKillerLife();
  }

  updateViews(settings) {
    let attackCheckboxes = document.querySelectorAll('[data-changeaction=attack] > input');
    attackCheckboxes.forEach((checkbox, index) => {
      checkbox.checked = !!settings.attack[index];
    });

    let parametres = this.settingsParametres;
    let settingsInput;
    parametres.forEach(parameter => {
      switch(parameter) {
        case 'forbiddennumbers':
        case 'waytoheal':
        case 'autocatchsettings':
          settingsInput = document.querySelector(`[data-changeaction=${parameter}] > textarea`);
          settingsInput.value = settings[parameter];
        break;
        case 'showpokemons':
        case 'autoheal':
        case 'showiv':
        case 'autocatch':
        case 'alarmswitch':
          settingsInput = document.querySelector(`[data-changeaction=${parameter}] > input`);
          settingsInput.checked = settings[parameter];
        break;
        case 'controlhp':
        case 'controlexp':
        case 'alarmsrc':
        case 'alarmvolume':
          settingsInput = document.querySelector(`[data-changeaction=${parameter}] > input`);
          settingsInput.value = settings[parameter];
        break;
      }
    });
  }

  saveSettings() {
    let settingsToSave = JSON.stringify(this.getSettingsToSave());
    window.localStorage.setItem('killerSettings', settingsToSave);
  }

  loadSettings() {
    let loadedSettings = window.localStorage.getItem('killerSettings');
    if(!loadedSettings) return;
    loadedSettings = JSON.parse(loadedSettings);
    let parametres = this.settingsParametres;
    parametres.forEach(parameter => {
      let value = loadedSettings[parameter] && loadedSettings[parameter] != 'undefined' ? loadedSettings[parameter] : '';
      this.changeSettings({parameter: parameter, value: value});
    });
    this.settings.attack = loadedSettings.attack;
  }

  getSettingsToSave() {
    let parametres = this.settingsParametres;
    let settingsToSave = {
      'attack': this.settings.attack
    }
    parametres.forEach(parameter => {
      settingsToSave[parameter] = this.settings[parameter];
    });
    return settingsToSave;
  }

  sendRequest(url, params=[]) {
    let formData = new FormData();
    formData.append('t_key', this.settings.globalVars.t_key);
    params.forEach(param => {
      formData.append(param.key, param.value);
    });
    let options = {
      method: 'POST',
      body: formData,
      credentials: 'include'
    }
    //'http://game.league17.ru/do/pokes/load/team'
    return fetch(url, options)
    .then(_ => _.json());
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Killer);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/App/index.js");
__webpack_require__(/*! ./styles/styles.css */ "./src/styles/styles.css");



let app = new _App__WEBPACK_IMPORTED_MODULE_0__["default"]();


/***/ }),

/***/ "./src/styles/styles.css":
/*!*******************************!*\
  !*** ./src/styles/styles.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "dist/app/css/styles.css";

/***/ })

/******/ });
//# sourceMappingURL=content.js.map