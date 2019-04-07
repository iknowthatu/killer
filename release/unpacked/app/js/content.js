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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ImageReplacer = __webpack_require__(/*! ./../ImageReplacer */ "./src/ImageReplacer/index.js");

var _ImageReplacer2 = _interopRequireDefault(_ImageReplacer);

var _Killer = __webpack_require__(/*! ./../Killer */ "./src/Killer/index.js");

var _Killer2 = _interopRequireDefault(_Killer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KillerApp = function () {
  function KillerApp() {
    _classCallCheck(this, KillerApp);

    this.init();
  }

  _createClass(KillerApp, [{
    key: 'init',
    value: function init() {
      var replacer = new _ImageReplacer2.default();
      console.info('Image replacer was loaded');
      var killer = new _Killer2.default(replacer);
      console.info('Killer was loaded');
    }
  }]);

  return KillerApp;
}();

exports.default = KillerApp;

/***/ }),

/***/ "./src/ImageReplacer/MonsterComparator/index.js":
/*!******************************************************!*\
  !*** ./src/ImageReplacer/MonsterComparator/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var League17MonsterComparator = function () {
  function League17MonsterComparator() {
    _classCallCheck(this, League17MonsterComparator);

    this.init();
  }

  /**
   *
   * @param {Object} params
   * @param {string} params.pokemonsDataSrc
   */


  _createClass(League17MonsterComparator, [{
    key: 'init',
    value: function init() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // this.normalHost = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';
      this.normalHost = 'https://www.serebii.net/sunmoon/pokemon/';
      this.shineHost = 'https://www.serebii.net/Shiny/SM/';
      this.pokemons = [];
      this.pokemonsDataSrc = params.pokemonsDataSrc || 'data/pokemons.json';

      this.loadPokemonsData(this.pokemonsDataSrc);
    }
  }, {
    key: 'loadPokemonsData',
    value: function loadPokemonsData(pokemonsDataSrc) {
      var _this = this;

      return fetch(chrome.runtime.getURL(pokemonsDataSrc)).then(function (response) {
        return response.json();
      }).then(function (data) {
        return _this.pokemons = data;
      });
    }
  }, {
    key: 'getOldGoodPokemonImageSrc',
    value: function getOldGoodPokemonImageSrc(number) {
      var isShine = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var host = isShine ? this.shineHost : this.normalHost;
      return '' + host + number + '.png';
    }
  }, {
    key: 'getPokemonNameByNumber',
    value: function getPokemonNameByNumber(number) {
      var pokemonFromData = this.pokemons.filter(function (pok) {
        return pok.number == number;
      })[0];
      if (!pokemonFromData) return 'i don\'t know this pokemon';
      return pokemonFromData.name;
    }
  }, {
    key: 'getPokemonNumberString',
    value: function getPokemonNumberString() {
      var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (number < 10) return '00' + number;
      if (number < 100) return '0' + number;
      if (number > 806) return 0;
      return number;
    }

    /* inline pokemons */

  }, {
    key: 'getInlinePokemons',
    value: function getInlinePokemons() {
      var inlinePokemons = document.querySelectorAll('.intextpoke:not([data-changed])');
      return inlinePokemons;
    }
  }, {
    key: 'getInlinePokemonNumber',
    value: function getInlinePokemonNumber(inlinePokemon) {
      var stringWithNumber = inlinePokemon.getAttribute('onclick');
      stringWithNumber = stringWithNumber ? stringWithNumber : '';
      stringWithNumber = stringWithNumber.replace(/^.*?'/, '').replace(/'.*/, '');
      var number = stringWithNumber.match(/\d+/);
      number = number != null ? this.getPokemonNumberString(+number[0]) : 0;
      return number;
    }
  }, {
    key: 'isShineInlinePokemon',
    value: function isShineInlinePokemon(inlinePokemon) {
      var stringWithIsShineInfo = inlinePokemon.getAttribute('onclick');
      var isShine = stringWithIsShineInfo.match(/\d[^\d]*?\)/)[0];
      isShine = isShine.match(/\d/);
      isShine = isShine != null && isShine[0] == 1;
      return isShine;
    }
  }, {
    key: 'changeInlinePokemonImage',
    value: function changeInlinePokemonImage(inlinePokemon, number) {
      var isShine = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var image = this.makeOldGoodPokemonImage(number, isShine);
      var oldImage = inlinePokemon.querySelector('.pk');
      if (oldImage) oldImage.style.display = 'none';
      var lastChild = inlinePokemon.lastChild;
      if (!lastChild) inlinePokemon.appendChild(image);else inlinePokemon.insertBefore(image, lastChild);
      image.classList.add('pk');
      image.style.maxHeight = "2rem";
    }
  }, {
    key: 'changeInlinePokemonName',
    value: function changeInlinePokemonName(inlinePokemon, number) {
      var name = this.getPokemonNameByNumber(number);
      var oldNameNode = inlinePokemon.lastChild;
      oldNameNode.textContent = name;
    }
  }, {
    key: 'changeInlinePokemonItemNameAndImage',
    value: function changeInlinePokemonItemNameAndImage(inlinePokemon) {
      var number = this.getInlinePokemonNumber(inlinePokemon);
      if (!number) return;
      var isShine = this.isShineInlinePokemon(inlinePokemon);
      this.changeInlinePokemonImage(inlinePokemon, number, isShine);
      this.changeInlinePokemonName(inlinePokemon, number);
      inlinePokemon.setAttribute('data-changed', '');
    }
  }, {
    key: 'changeInlinePokemonsNamesAndImages',
    value: function changeInlinePokemonsNamesAndImages(inlinePokemons) {
      var _this2 = this;

      inlinePokemons.forEach(function (inlinePokemon) {
        _this2.changeInlinePokemonItemNameAndImage(inlinePokemon);
      });
    }
  }, {
    key: 'changeInlinePokemons',
    value: function changeInlinePokemons() {
      var inlinePokemons = this.getInlinePokemons();
      this.changeInlinePokemonsNamesAndImages(inlinePokemons);
    }

    /* tiny Cards */

  }, {
    key: 'findAllTinyCards',
    value: function findAllTinyCards() {
      var tinyCards = document.querySelectorAll('.pokemonBoxTiny:not([data-changed])');
      return tinyCards;
    }
  }, {
    key: 'getTinyCardNumber',
    value: function getTinyCardNumber(tinyCard) {
      var oldImage = tinyCard.querySelector('.image');
      if (!oldImage) return;
      var number = oldImage.src.match(/\d{3}/);
      number = number ? this.getPokemonNumberString(+number[0]) : 0;
      return number;
    }
  }, {
    key: 'insertImageInTinyCard',
    value: function insertImageInTinyCard(tinyCard, image) {
      image.classList.add('image');
      var oldImage = tinyCard.querySelector('.image');
      if (!oldImage) return;
      oldImage.style.display = 'none';
      var parentOldImage = oldImage.parentNode;
      parentOldImage.insertBefore(image, oldImage);
      if (!image.parentNode.classList.contains('pokemonBoxTiny')) image.style = 'margin-top: 0; width: 100%; height: 100%;';
    }
  }, {
    key: 'changeNameInTinyCard',
    value: function changeNameInTinyCard(tinyCard, pokemonNumber) {
      var name = this.getPokemonNameByNumber(pokemonNumber);
      var nameDiv = tinyCard.querySelector('.name');
      if (!nameDiv) return;
      nameDiv = Array.from(nameDiv.childNodes).find(function (child) {
        return child.nodeType == 3 && child.textContent.match(/#\d+/);
      });
      nameDiv.textContent = '#' + pokemonNumber + ' ' + name;
    }
  }, {
    key: 'isTinyCardShine',
    value: function isTinyCardShine(tinyCard) {
      var image = tinyCard.querySelector('.image');
      var isShine = image.src.match(/shine/);
      isShine = isShine != null;
      return isShine;
    }
  }, {
    key: 'changeTinyCardsImagesAndNames',
    value: function changeTinyCardsImagesAndNames(tinyCards) {
      var _this3 = this;

      tinyCards.forEach(function (tinyCard) {
        var pokemonNumber = _this3.getTinyCardNumber(tinyCard);
        if (!pokemonNumber) return;
        var isShine = _this3.isTinyCardShine(tinyCard);
        var image = _this3.makeOldGoodPokemonImage(pokemonNumber, isShine);
        _this3.insertImageInTinyCard(tinyCard, image);
        _this3.changeNameInTinyCard(tinyCard, pokemonNumber);
        tinyCard.setAttribute('data-changed', '');
      });
    }
  }, {
    key: 'changeTinyCards',
    value: function changeTinyCards() {
      var tinyCards = this.findAllTinyCards();
      this.changeTinyCardsImagesAndNames(tinyCards);
    }

    /* pokemon Cards */

  }, {
    key: 'isPokemonInCardShine',
    value: function isPokemonInCardShine(pokemonCard) {
      var pokemonImage = pokemonCard.querySelector('.image > img');
      if (!pokemonImage) return false;
      var isShine = pokemonImage.src.match(/shine/);
      isShine = isShine != null;
      return isShine;
    }
  }, {
    key: 'getPokemonNumberForCards',
    value: function getPokemonNumberForCards(pokemonBoxCard) {
      var pokemonImage = pokemonBoxCard.querySelector('.image > img');
      if (!pokemonImage) return 0;
      var number = pokemonImage.src.match(/\d{3}/);
      number = number ? this.getPokemonNumberString(+number[0]) : 0;
      return number;
    }
  }, {
    key: 'findAllPokemonsInCards',
    value: function findAllPokemonsInCards() {
      var pokemons = document.querySelectorAll('.pokemonBoxCard:not([data-changed])');
      return pokemons;
    }
  }, {
    key: 'makeOldGoodPokemonImage',
    value: function makeOldGoodPokemonImage(number) {
      var isShine = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var image = new Image();
      image.src = this.getOldGoodPokemonImageSrc(number, isShine);
      image.classList.add('leagueHelper__pokemon-image');
      return image;
    }
  }, {
    key: 'insertOldGoodPokemonImageForCards',
    value: function insertOldGoodPokemonImageForCards(pokemonBoxCard, pokemonImage) {
      var pokemonImageDiv = pokemonBoxCard.querySelector('.image');
      if (!pokemonImageDiv) return;
      pokemonImageDiv.appendChild(pokemonImage);
    }
  }, {
    key: 'hideOldNonameImageForCards',
    value: function hideOldNonameImageForCards(pokemonBoxCard) {
      var pokemonImage = pokemonBoxCard.querySelector('.image > img');
      if (!pokemonImage) return;
      pokemonImage.style.display = 'none';
    }
  }, {
    key: 'changePokemonNameInCard',
    value: function changePokemonNameInCard(pokemonCard, name) {
      var title = pokemonCard.querySelector('.title > .name');
      if (!title) return;
      title.innerHTML = name;
      if (pokemonCard.getAttribute('data-nameWatcher') != null) return;
      pokemonCard.addEventListener('click', function () {
        if (title.innerHTML != name) title.innerHTML = name;
      });
      pokemonCard.setAttribute('data-nameWatcher', '');
    }
  }, {
    key: 'showRealPokemonsForCards',
    value: function showRealPokemonsForCards(pokemonsCards) {
      var _this4 = this;

      pokemonsCards.forEach(function (pokemonCard) {
        var pokNumber = _this4.getPokemonNumberForCards(pokemonCard);
        if (!pokNumber) return;
        if (!Number.isInteger(+pokNumber)) return;
        if (_this4.isComparasionAlreadyDidForCards(pokemonCard)) return;
        var isShine = _this4.isPokemonInCardShine(pokemonCard);
        var image = _this4.makeOldGoodPokemonImage(pokNumber, isShine);
        _this4.hideOldNonameImageForCards(pokemonCard);
        _this4.insertOldGoodPokemonImageForCards(pokemonCard, image);
        var pokemonName = _this4.getPokemonNameByNumber(pokNumber);
        _this4.changePokemonNameInCard(pokemonCard, pokemonName);
        pokemonCard.setAttribute('data-changed', '');
      });
    }
  }, {
    key: 'isComparasionAlreadyDidForCards',
    value: function isComparasionAlreadyDidForCards(pokemonBoxCard) {
      var pokemonImages = pokemonBoxCard.querySelectorAll('.image > img');
      if (pokemonImages.length > 1) return true;
      return false;
    }
  }, {
    key: 'changeAllPokemonCards',
    value: function changeAllPokemonCards() {
      var pokemonsCards = this.findAllPokemonsInCards();
      this.showRealPokemonsForCards(pokemonsCards);
    }

    /* search in pokedex */

  }, {
    key: 'findPokemonInPokedex',
    value: function findPokemonInPokedex() {
      var divWithImage = document.querySelector('#divPokedex .imagebox');
      if (divWithImage == null) return null;
      if (divWithImage.getAttribute('data-changed') != null) return null;
      return divWithImage;
    }
  }, {
    key: 'getPokemonNumberInPokedex',
    value: function getPokemonNumberInPokedex(pokemonImageBox) {
      var number = pokemonImageBox.style.backgroundImage.match(/\d{3}/);
      number = number ? this.getPokemonNumberString(+number[0]) : 0;
      return number;
    }
  }, {
    key: 'changePokedexTitle',
    value: function changePokedexTitle(pokemonNumber) {
      var pokedexTitle = document.querySelector('#divPokedex .params > .title');
      if (pokedexTitle == null) return;
      var pokemonName = this.getPokemonNameByNumber(pokemonNumber);
      pokedexTitle.innerHTML = '#' + pokemonNumber + ' ' + pokemonName;
    }
  }, {
    key: 'isShineInPokedex',
    value: function isShineInPokedex(divWithImage) {
      var isShine = divWithImage.style.backgroundImage.match(/shine/);
      isShine = isShine != null;
      return isShine;
    }
  }, {
    key: 'changePokedex',
    value: function changePokedex() {
      var imageDiv = this.findPokemonInPokedex();
      if (imageDiv == null) return;

      var pokemonNumber = this.getPokemonNumberInPokedex(imageDiv);
      if (!pokemonNumber) return;
      var isShine = this.isShineInPokedex(imageDiv);
      var realImageUrl = this.getOldGoodPokemonImageSrc(pokemonNumber, isShine);
      imageDiv.style.backgroundImage = 'url("' + realImageUrl + '")';
      imageDiv.style.backgroundSize = '100% 100%';
      imageDiv.setAttribute('data-changed', '');

      this.changePokedexTitle(pokemonNumber);
    }

    /* main func */

  }, {
    key: 'compare',
    value: function compare() {
      this.changeAllPokemonCards();
      this.changeTinyCards();
      this.changeInlinePokemons();
      this.changePokedex();
    }
  }]);

  return League17MonsterComparator;
}();

exports.default = League17MonsterComparator;

/***/ }),

/***/ "./src/ImageReplacer/ReplacerTool/index.js":
/*!*************************************************!*\
  !*** ./src/ImageReplacer/ReplacerTool/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MonsterComparator = __webpack_require__(/*! ./../MonsterComparator */ "./src/ImageReplacer/MonsterComparator/index.js");

var _MonsterComparator2 = _interopRequireDefault(_MonsterComparator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var League17HelperApp = function () {
  function League17HelperApp() {
    _classCallCheck(this, League17HelperApp);

    this.init();
  }

  _createClass(League17HelperApp, [{
    key: 'init',
    value: function init() {
      this.comparator = new _MonsterComparator2.default();
      this.setDocumentObserver();
    }
  }, {
    key: 'setDocumentObserver',
    value: function setDocumentObserver() {
      var _this = this;

      var observer = new MutationObserver(function (mut) {
        if (!_this.isMainDivsLoaded()) return;
        observer.disconnect();
        _this.setObservers();
      });
      var config = { attributes: true, childList: true, subtree: true };
      observer.observe(document, config);
    }
  }, {
    key: 'switchOn',
    value: function switchOn(value) {
      if (!value) return this.stopObservers();
      this.setObservers();
    }
  }, {
    key: 'isMainDivsLoaded',
    value: function isMainDivsLoaded() {
      var myPokemonDiv = document.querySelector('#divFightI');
      var enemyPokemonDiv = document.querySelector('#divFightH');
      var myPokeTeam = document.querySelector('#divDockMenu > .divDockPanels');
      var pokeCards = document.querySelector('#divPokeCard');
      var pokedex = document.querySelector('#divPokedex');
      var farm = document.querySelector('.divDialog');

      var allMainDivsLoaded = myPokemonDiv && enemyPokemonDiv && myPokeTeam && pokeCards;
      pokeCards && pokedex && farm;
      return allMainDivsLoaded;
    }
  }, {
    key: 'setObservers',
    value: function setObservers() {
      var _this2 = this;

      if (this.observer) return;

      var myPokemonDiv = document.querySelector('#divFightI');
      var enemyPokemonDiv = document.querySelector('#divFightH');
      var myPokeTeam = document.querySelector('#divDockMenu > .divDockPanels'); // .divPokeTeam
      var pokeCards = document.querySelector('#divPokeCard');
      var pokedex = document.querySelector('#divPokedex');
      var farm = document.querySelector('.divDialog');

      var config = { attributes: true, childList: true, subtree: true };

      var observer = new MutationObserver(function (mut) {
        _this2.comparator.compare();
      });
      this.observer = observer;

      observer.observe(myPokemonDiv, config);
      observer.observe(enemyPokemonDiv, config);
      observer.observe(myPokeTeam, config);
      observer.observe(pokeCards, config);
      observer.observe(pokedex, config);
      observer.observe(farm, config);
    }
  }, {
    key: 'stopObservers',
    value: function stopObservers() {
      if (!this.observer) return;
      this.observer.disconnect();
      this.observer = undefined;
    }
  }]);

  return League17HelperApp;
}();

exports.default = League17HelperApp;

/***/ }),

/***/ "./src/ImageReplacer/index.js":
/*!************************************!*\
  !*** ./src/ImageReplacer/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ReplacerTool = __webpack_require__(/*! ./ReplacerTool */ "./src/ImageReplacer/ReplacerTool/index.js");

var _ReplacerTool2 = _interopRequireDefault(_ReplacerTool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ReplacerTool2.default;

/***/ }),

/***/ "./src/Killer/Alarm/index.js":
/*!***********************************!*\
  !*** ./src/Killer/Alarm/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Alarm = function () {
  function Alarm() {
    _classCallCheck(this, Alarm);

    this.init();
  }

  _createClass(Alarm, [{
    key: 'init',
    value: function init() {
      this.preloadAlarm();
      this.defaultSrc = chrome.runtime.getURL('audio/signal.ogx');
    }
  }, {
    key: 'preloadAlarm',
    value: function preloadAlarm() {
      var alarmAudio = document.createElement('audio');
      alarmAudio.classList.add('killer__alarm');
      alarmAudio.loop = true;
      alarmAudio.volume = 0.1;
      var alarmSource = document.createElement('source');
      alarmSource.src = this.defaultSrc;
      alarmAudio.appendChild(alarmSource);
      this.alarmAudio = alarmAudio;
      this.alarmSource = alarmSource;
    }
  }, {
    key: 'changeVolume',
    value: function changeVolume(value) {
      if (isNaN(+value)) return;
      if (+value < 1 && +value > 0) {
        this.alarmAudio.volume = value;
        return;
      }
      if (+value <= 0) {
        this.alarmAudio.volume = 0;
        return;
      }
      if (+value >= 100) {
        this.alarmAudio.volume = 1;
        return;
      }
      this.alarmAudio.volume = +value / 100;
    }
  }, {
    key: 'changeMelody',
    value: function changeMelody(src) {
      if (!src.trim()) {
        this.alarmAudio.src = this.defaultSrc;
        return;
      }
      this.alarmAudio.src = src;
    }
  }, {
    key: 'startPlay',
    value: function startPlay() {
      this.alarmAudio.play();
    }
  }, {
    key: 'stopPlay',
    value: function stopPlay() {
      this.alarmAudio.pause();
      this.alarmAudio.currentTime = 0;
    }
  }]);

  return Alarm;
}();

exports.default = Alarm;

/***/ }),

/***/ "./src/Killer/CatcherHeart/index.js":
/*!******************************************!*\
  !*** ./src/Killer/CatcherHeart/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var allBaseHPpoks = [0, 78, 60, 80, 39, 58, 78, 44, 59, 79, 45, 50, 60, 40, 45, 65, 40, 63, 83, 30, 55, 40, 65, 35, 60, 35, 60, 50, 75, 55, 70, 90, 46, 61, 81, 70, 95, 38, 73, 115, 140, 40, 75, 45, 60, 75, 35, 60, 60, 70, 10, 35, 40, 65, 50, 80, 40, 65, 55, 90, 40, 65, 90, 25, 40, 55, 70, 80, 90, 50, 65, 80, 40, 80, 40, 55, 80, 50, 65, 90, 95, 25, 50, 52, 35, 60, 65, 90, 80, 105, 30, 50, 30, 45, 60, 35, 60, 85, 30, 55, 40, 60, 60, 95, 50, 60, 50, 50, 90, 40, 65, 80, 105, 250, 65, 105, 30, 55, 45, 80, 30, 60, 40, 70, 65, 65, 65, 65, 75, 20, 95, 130, 48, 55, 130, 65, 65, 65, 35, 70, 30, 60, 80, 160, 90, 90, 90, 41, 61, 91, 106, 100, 45, 60, 80, 39, 58, 78, 50, 65, 85, 35, 85, 60, 100, 40, 55, 40, 70, 85, 75, 125, 20, 50, 90, 35, 55, 40, 65, 55, 70, 90, 75, 70, 100, 70, 90, 35, 55, 75, 55, 30, 75, 65, 55, 95, 65, 95, 60, 95, 60, 48, 190, 70, 50, 75, 100, 65, 75, 60, 90, 65, 70, 20, 80, 55, 60, 90, 40, 50, 50, 100, 55, 35, 75, 45, 65, 65, 45, 75, 75, 90, 90, 85, 73, 55, 35, 50, 45, 45, 45, 95, 255, 90, 115, 100, 50, 70, 100, 106, 106, 100, 40, 50, 70, 45, 60, 80, 50, 70, 100, 35, 70, 38, 78, 45, 50, 60, 50, 60, 40, 60, 80, 40, 70, 90, 40, 60, 40, 60, 28, 38, 68, 40, 70, 60, 60, 60, 80, 150, 31, 61, 1, 64, 84, 104, 72, 144, 50, 30, 50, 70, 50, 50, 50, 60, 70, 30, 60, 40, 70, 60, 60, 65, 65, 50, 70, 100, 45, 70, 130, 170, 60, 70, 70, 60, 80, 60, 45, 50, 80, 50, 70, 45, 75, 73, 73, 70, 70, 50, 110, 43, 63, 40, 60, 66, 86, 45, 75, 20, 95, 70, 60, 44, 64, 20, 40, 99, 65, 65, 95, 50, 80, 70, 90, 110, 35, 55, 55, 100, 43, 45, 65, 95, 40, 60, 80, 80, 80, 80, 80, 80, 100, 100, 105, 100, 50, 55, 75, 95, 44, 64, 76, 53, 64, 84, 40, 55, 85, 59, 79, 37, 77, 45, 60, 80, 40, 60, 97, 97, 30, 60, 40, 60, 70, 30, 70, 60, 55, 85, 45, 70, 76, 111, 75, 90, 150, 55, 65, 60, 100, 49, 71, 45, 63, 103, 57, 67, 50, 20, 100, 76, 50, 58, 68, 108, 135, 40, 70, 68, 108, 40, 70, 48, 83, 74, 49, 69, 45, 60, 90, 70, 70, 110, 115, 100, 75, 75, 85, 86, 65, 65, 75, 110, 85, 68, 60, 45, 70, 50, 75, 80, 75, 100, 90, 91, 110, 150, 120, 80, 100, 70, 100, 120, 100, 45, 60, 75, 65, 90, 110, 55, 75, 95, 45, 60, 45, 65, 85, 41, 64, 50, 75, 50, 75, 50, 75, 76, 116, 50, 62, 80, 45, 75, 55, 70, 85, 55, 67, 60, 110, 103, 75, 85, 105, 50, 75, 105, 120, 75, 45, 55, 75, 30, 40, 60, 40, 60, 45, 70, 70, 50, 60, 95, 70, 105, 75, 50, 70, 50, 65, 72, 38, 58, 54, 74, 55, 75, 50, 80, 40, 60, 55, 75, 45, 60, 70, 45, 65, 110, 62, 75, 36, 51, 71, 60, 80, 55, 50, 70, 69, 114, 55, 100, 165, 50, 70, 44, 74, 40, 60, 60, 35, 65, 85, 55, 75, 50, 60, 60, 46, 66, 76, 55, 95, 70, 50, 80, 109, 45, 65, 77, 59, 89, 45, 65, 95, 70, 100, 70, 110, 85, 58, 52, 72, 92, 55, 85, 91, 91, 91, 79, 79, 100, 100, 89, 125, 91, 100, 71, 56, 61, 88, 40, 59, 75, 41, 54, 72, 38, 85, 45, 62, 78, 38, 45, 80, 62, 86, 44, 54, 78, 66, 123, 67, 95, 75, 62, 74, 45, 59, 60, 78, 101, 62, 82, 53, 86, 42, 72, 50, 65, 50, 71, 44, 62, 58, 82, 77, 123, 95, 78, 67, 50, 45, 68, 90, 57, 43, 85, 49, 65, 55, 95, 40, 85, 126, 126, 108, 50, 80, 80];
//console.log(allBaseHPpoks.length);

var CatcherHeart = function () {
  function CatcherHeart() {
    _classCallCheck(this, CatcherHeart);

    this.init();
  }

  _createClass(CatcherHeart, [{
    key: 'init',
    value: function init() {
      this.settings = {};
      this.nextPulse = this.nextPulse.bind(this);
      this.setSettings = this.setSettings.bind(this);
      this.timeBetweenActions = 1000;
    }
  }, {
    key: 'nextPulse',
    value: function nextPulse() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var newParams = _extends({}, params);

      /* it should restrict disappearing of wild pokemon with time */
      if (params.waitingForCatchCounter > 30) {
        if (!this.isDivContextLoaded()) {
          this.clickPokeballOnDivFightI();
        } else this.changePokemonFromDivContext();
      }

      if (!params.needCatch || !this.settings.autocatch) return newParams;

      if (!this.isPokemonShouldBeCaughtAutomatically()) return newParams;

      var catchParams = {};
      if (!params.catchParams) {
        newParams.catchParams = catchParams;
      } else {
        catchParams = params.catchParams;
      }

      newParams.waitingForCatchCounter = 0;
      //console.log(catchParams.phase);
      //console.log(catchParams);

      if (!catchParams.phase) {
        var preparings = this.catchPreparing();
        if (!preparings) {
          //this.clickPokeballOnDivFightI();
          //catchParams.phase = 9; //??
          console.log('i cant catch with this parameters');
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

      if (catchParams.phase == 1) {
        var teamLoaded = this.isTeamOpenedAndLoaded();
        if (!teamLoaded) return newParams;
        var pokemonExist = this.findPokemonAndClickTheBallById(catchParams.pokemonId);
        if (!pokemonExist) {
          catchParams.phase = 9; //?
          return newParams;
        } else {
          var pokemonSended = this.sendPokemonInBattle();
          if (!pokemonSended) return newParams;
          catchParams.phase = 2;
          return newParams;
        }
      };

      if (catchParams.phase == 2) {
        var specialAttackClicked = this.doSpecialAttack(catchParams.specialAttackNumber);
        //this.settings.killerHeart.clickAttack(catchParams.specialAttackNumber);
        if (!specialAttackClicked) return newParams;

        catchParams.phase = 3;
        return newParams;
      }

      if (catchParams.phase == 3) {
        var enemyPreparedToCatch = this.isEnemyHpMinimal();
        if (enemyPreparedToCatch) {
          this.clickPokeballOnDivFightI();
          catchParams.phase = 5;
          return newParams;
        }

        var enemyHp = this.settings.killerHeart.getEnemyHPpercents();
        if (enemyHp != catchParams.enemyLastHP) catchParams.enemyLastHP = enemyHp;else {
          catchParams.idleCounter = catchParams.idleCounter ? catchParams.idleCounter + 1 : 1;
        }

        if (catchParams.idleCounter > 4) {
          catchParams.phase = 2;
          return newParams;
        }

        if (catchParams.waitAttackNumber >= 0 && catchParams.waitAttackNumber <= 3) {
          var waitAttackClicked = this.doAttackForWaiting(catchParams.waitAttackNumber);
          //this.settings.killerHeart.clickAttack(catchParams.waitAttackNumber);
          if (!waitAttackClicked) catchParams.waitAttackNumber = -1;
          return newParams;
        }

        this.clickPokeballOnDivFightI();
        catchParams.phase = 4;
        return newParams;
      }

      if (catchParams.phase == 4) {
        if (!this.isDivContextLoaded()) return newParams;
        this.changePokemonFromDivContext();
        catchParams.phase = 3;
        return newParams;
      }

      if (catchParams.phase == 5) {
        if (!this.isDivContextLoaded()) return newParams;
        this.chooseItemInFight();
        catchParams.phase = 6;
        return newParams;
      }

      if (catchParams.phase == 6) {
        if (!this.isHintsWithItemsLoaded()) return newParams;
        var throwingSuccess = this.findAndThrowPokeball(catchParams.allowedPokeballs);
        if (!throwingSuccess) {
          console.log('no pokeballs! cmon, man');
          return newParams;
        }
        catchParams.phase = 3;
        newParams.needHeal = true;
        this.settings.commonHeart.turnWildPokemons(false);
        return newParams;
      }

      if (catchParams.phase == 7) {
        //console.log(`catched: ${catchParams.catched}`);
        //console.log(`phase 7:`, newParams);
        if (!catchParams.catched) {
          newParams.needCatch = false;
          newParams.catchParams = undefined;
          return newParams;
        }

        //console.log(`phase 7: reached:${params.destinationReached} direction:${params.direction}`);
        if (params.destinationReached && params.direction == 'fwd') {
          //console.log('now i leave pokemonss')
          newParams.needCatch = false;
          newParams.catchParams = undefined;
          return this.leaveLastPokemonInPC().then(function (_) {
            return newParams;
          });
        }

        return newParams;
      }
    }
  }, {
    key: 'isPokemonShouldBeCaughtAutomatically',
    value: function isPokemonShouldBeCaughtAutomatically() {
      var numbersForCatch = this.settings.forbiddennumbers.match(/!\d+;?/g);
      if (!numbersForCatch || numbersForCatch.length < 1) return false;

      var enemyNumber = +this.settings.killerHeart.getEnemyPokemonNumberAsString();
      if (numbersForCatch.every(function (number) {
        return +number.replace(/!(\d+);?/, '$1') != +enemyNumber;
      })) return false;

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

  }, {
    key: 'setSettings',
    value: function setSettings() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.settings = settings;
    }

    /* catcher methods */

  }, {
    key: 'setObserverIV',
    value: function setObserverIV(mode) {
      var _this = this;

      if (!mode) {
        if (!this.observerIV) return;
        this.observerIV.disconnect();
        return;
      }
      var observer = new MutationObserver(function (_) {
        setTimeout(_this.showEnemyIVhp, 0);
      });
      var config = { attributes: true, childList: true, subtree: true };
      var enemyDiv = document.querySelector('#divFightH');
      if (!enemyDiv) return;
      observer.observe(enemyDiv, config);
      this.observerIV = observer;
    }
  }, {
    key: 'showEnemyIVhp',
    value: function showEnemyIVhp() {
      var lvlDiv = document.querySelector('#divFightH .pokemonBoxCard .lvl');

      if (!lvlDiv) return;
      if (lvlDiv.getAttribute('data-changed')) return;
      var globalVars = JSON.parse(document.querySelector('[data-globalvarsstore]').value);
      var hpStat = globalVars.enemyHPmax;
      var enemyNumber = globalVars.enemyNumber;
      var lvl = globalVars.enemyLvl;
      var hpBase = allBaseHPpoks[enemyNumber];

      var maxIVhp = Math.floor(100 * (hpStat - 9.5 - lvl) / lvl - hpBase * 2 - 0.0001);
      var minIVhp = Math.ceil(100 * (hpStat - 10.5 - lvl) / lvl - hpBase * 2);

      var spanWithIV = document.createElement('span');
      spanWithIV.classList.add('killerApp__spanIV');
      spanWithIV.innerHTML = ' /IVhp: ' + minIVhp + '-' + maxIVhp;
      lvlDiv.appendChild(spanWithIV);
      lvlDiv.setAttribute('data-changed', '1');
    }

    /* functions for catching: */

    /* phase 0: prepare to catch */

  }, {
    key: 'catchPreparing',
    value: function catchPreparing() {
      var pokemonId = +this.settings.autocatchsettings.replace(/[^]*?\/\s?(?:id)?([^]*?)\/[^]*/, '$1').trim();
      if (!pokemonId || isNaN(pokemonId)) {
        console.log('no pokemonId');
        return false;
      }
      //let pokemonId = '3660958';
      var catcherAttackNumber = +this.settings.autocatchsettings.replace(/[^]*?\/[^]*?\/\s*(\d+?)\s*?\/[^]*/, '$1').trim();
      if (!catcherAttackNumber || isNaN(catcherAttackNumber) || catcherAttackNumber < 1 || catcherAttackNumber > 4) {
        console.log('no correct catcher attack number');
        return false;
      }
      //console.log(`catchar attack ${catcherAttackNumber}`);
      var allowedPokeballs = ['1', '2', '4'];
      var pokeballsNames = ['покебол', 'монстробол', 'pokeball', 'гритбол', 'greatball', 'ультрабол', 'ultraball', 'мастербол', 'masterball'];
      var pokeballsParams = this.settings.autocatchsettings.replace(/([^]*?)\/[^]*/i, '$1').trim().split(';').filter(function (_) {
        return _;
      });
      //console.log(`pokeball params: `, pokeballsParams);
      pokeballsParams.forEach(function (pokeball) {
        var numberPokeball = pokeballsNames.findIndex(function (name) {
          return !!pokeball.match(new RegExp(name, 'i'));
        });
        switch (numberPokeball) {
          case 0:case 1:case 2:
            numberPokeball = 1;break;
          case 3:case 4:
            numberPokeball = 2;break;
          case 5:case 6:
            numberPokeball = 4;break;
          case 7:case 8:
            numberPokeball = 3;break;
          default:
            return;
        }
        var isPokeballDepricated = !!pokeball.match(/!/);
        if (isPokeballDepricated) {
          allowedPokeballs = allowedPokeballs.filter(function (allowedNumber) {
            return allowedNumber != numberPokeball;
          });
        } else {
          if (allowedPokeballs.findIndex(function (allowedNumber) {
            return allowedNumber == numberPokeball;
          }) != -1) return;
          allowedPokeballs.push(numberPokeball);
        }
      });

      var waitAttackNumber = +this.settings.autocatchsettings.replace(/[^]*?\/[^]*?\/[^]*?\/\s*?(\d+?)/, '$1').trim();
      waitAttackNumber = isNaN(waitAttackNumber) ? 0 : waitAttackNumber;
      //console.log(`wait attack: ${waitAttackNumber}`);
      return { id: pokemonId, specialAttackNumber: catcherAttackNumber,
        waitAttackNumber: waitAttackNumber, allowedPokeballs: allowedPokeballs };
    }

    /* phase 1: open team window */

  }, {
    key: 'isTeamOpenedAndLoaded',
    value: function isTeamOpenedAndLoaded() {
      var panelWithTeam = document.querySelector('#divDockMenu .divDockPanels');
      var teamDiv = panelWithTeam.querySelector('.divPokeTeam');
      if (teamDiv.classList.contains('ajxloading')) return false;
      return true;
    }
  }, {
    key: 'openTeamDiv',
    value: function openTeamDiv() {
      var menuButtons = document.querySelectorAll('#divDockMenu .divDockIn .icon');
      if (menuButtons.length < 1) return;
      menuButtons[1].click();
    }

    /* phase 2-3 */

  }, {
    key: 'findPokemonAndClickTheBallById',
    value: function findPokemonAndClickTheBallById(pokemonId) {
      //console.log(`trying to call poke with id${pokemonId}`);
      var ballWasClicked = Array.from(document.querySelectorAll('.divPokeTeam .pokemonBoxCard')).some(function (pokemonCard) {
        var currentIDdiv = pokemonCard.querySelector('.id');
        if (!currentIDdiv) return false;
        var currentID = currentIDdiv.innerHTML.match(pokemonId);
        if (!currentID) return false;
        var ballToClick = pokemonCard.querySelector('.ball');
        if (!ballToClick) return false;
        ballToClick.click();
        return true;
      });
      if (ballWasClicked) return true;
      console.log('i cant find pokemon with this id.');
      return false;
    }

    /* phase 4 */

  }, {
    key: 'sendPokemonInBattle',
    value: function sendPokemonInBattle() {
      //console.log(`now im trying to choose context item "В битву"`);
      var contextItems = Array.from(document.querySelectorAll('.divContext .divElement'));
      var pokemonChangeStarted = contextItems.some(function (item) {
        if (!item.innerHTML.match(/в битву/i)) return false;
        item.click();
        return true;
      });
      //console.log(`pokemon changing: ${pokemonChangeStarted}`);
      return pokemonChangeStarted;
    }

    /* phase 5 */

  }, {
    key: 'doSpecialAttack',
    value: function doSpecialAttack(attackNumber) {
      return this.settings.killerHeart.clickAttack(attackNumber);
    }

    /* phase 6 */

  }, {
    key: 'doAttackForWaiting',
    value: function doAttackForWaiting(attackNumber) {
      return this.settings.killerHeart.clickAttack(attackNumber);
    }
  }, {
    key: 'isEnemyHpMinimal',
    value: function isEnemyHpMinimal() {
      var enemyHp = this.settings.killerHeart.getEnemyHPpercents();
      if (enemyHp <= 30) return true;
      return false;
    }

    /* phase 7 */

  }, {
    key: 'clickPokeballOnDivFightI',
    value: function clickPokeballOnDivFightI() {
      var dummy = document.querySelector('#divFightI .pokemonBoxDummy');
      if (dummy) dummy.click();else document.querySelector('#divFightI .pokemonBoxCard .boxleft .ball').click();
    }
  }, {
    key: 'isDivContextLoaded',
    value: function isDivContextLoaded() {
      var divContext = document.querySelector('.divContext');
      if (!divContext || divContext.style.display == 'none') return false;
      var divContextTitle = document.querySelector('.divContext .divTitle').innerHTML;
      if (!divContextTitle.match(/выбрать монстра/i)) return false;
      var pokemons = document.querySelectorAll('.divContext .divElement');
      if (!pokemons || pokemons.length < 1) return false;
      return true;
    }

    /* phase 8 */

  }, {
    key: 'changePokemonFromDivContext',
    value: function changePokemonFromDivContext() {
      var pokemons = document.querySelectorAll('.divContext .divElement');
      var numberPokemons = document.querySelectorAll('.divContext .divElement .pokemonBoxTiny').length;
      pokemons[~~(numberPokemons * Math.random())].click();
    }

    /* phase 9 */

  }, {
    key: 'chooseItemInFight',
    value: function chooseItemInFight() {
      var callBag = document.querySelectorAll('.divContext .divElement');
      var numberPokemons = document.querySelectorAll('.divContext .divElement .pokemonBoxTiny').length;
      var bagNumber = callBag.length - numberPokemons == 2 ? callBag.length - 2 : callBag.length - 1;
      callBag[bagNumber].click();
    }

    /* phase 10 */

  }, {
    key: 'isHintsWithItemsLoaded',
    value: function isHintsWithItemsLoaded() {
      var divHintTitle = document.querySelector('.hint .hinttitle').innerHTML;
      if (!divHintTitle.match(/Использовать в битве/i)) {
        console.log('no "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432 \u0431\u0438\u0442\u0432\u0435"');
        return false;
      }
      var hintContent = document.querySelector('.hint .hintcontent');
      var balls = document.querySelectorAll('.hint .divItemFightlist .item');
      if (!balls || balls.length < 1 || hintContent.classList.contains('loading')) return false;
      return true;
    }
  }, {
    key: 'findAndThrowPokeball',
    value: function findAndThrowPokeball(allowedItems) {
      var items = document.querySelectorAll('.hint .divItemFightlist .item');
      items = Array.from(items);
      var ballThrowed = items.some(function (item) {
        var itemImage = item.querySelector('img');
        if (!itemImage) return false;
        var isItemBall = !!itemImage.src.match(/ball/i);
        if (!isItemBall) return false;
        var itemNumber = +itemImage.src.replace(/.*?(\d+)\.png/i, '$1');
        var isItemNumberAllowed = allowedItems.findIndex(function (item) {
          return item == itemNumber;
        });
        if (isItemNumberAllowed == -1) return false;
        item.click();
        return true;
      });
      if (!ballThrowed) {
        console.log('No pokeballs!!!', items);
        return false;
      }
      return true;
    }

    /*     */

  }, {
    key: 'isPokemonWasCaught',
    value: function isPokemonWasCaught() {
      return document.querySelector('#divFightLog .greennumber') && !!document.querySelector('#divFightLog .greennumber').innerHTML.match(/монстр пойман/i);
    }
  }, {
    key: 'isPokemonCanBeCaught',
    value: function isPokemonCanBeCaught() {
      var globalVars = JSON.parse(document.querySelector('[data-globalvarsstore]').value);
      var isPokemonCatchable = !!globalVars.enemyCatchable;
      /*
      let teamLink = 'https://game.league17.ru/do/pokes/load/team';
      let isTeamHaveEmptySlot = await this.settings.organism.sendRequest(teamLink)
        .then(response => {return response.object ? response.object.length < 6 : 0});*/
      return isPokemonCatchable;
    }
  }, {
    key: 'leaveLastPokemonInPC',
    value: function leaveLastPokemonInPC() {
      var _this2 = this;

      var teamLink = 'https://game.league17.ru/do/pokes/load/team';
      var leavePokemonLink = 'https://game.league17.ru/do/pc/farm/poke';
      var leavPokemonParams = [{ key: 'vars', value: 0 }];
      return this.settings.organism.sendRequest(teamLink).then(function (response) {
        return response.object && response.object[response.object.length - 1] && response.object[response.object.length - 1].id;
      }).then(function (id) {
        return _this2.settings.organism.sendRequest(leavePokemonLink, [{ key: 'vars', value: id + '/0' }]);
      });
      //.then(response => console.log(response.alerten && response.alerten.type) );
    }
  }]);

  return CatcherHeart;
}();

exports.default = CatcherHeart;

/***/ }),

/***/ "./src/Killer/CommonHeart/index.js":
/*!*****************************************!*\
  !*** ./src/Killer/CommonHeart/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommonHeart = function () {
  function CommonHeart() {
    _classCallCheck(this, CommonHeart);

    this.init();
  }

  _createClass(CommonHeart, [{
    key: 'init',
    value: function init() {
      this.settings = {};
      this.nextPulse = this.nextPulse.bind(this);
      this.setSettings = this.setSettings.bind(this);
    }
  }, {
    key: 'nextPulse',
    value: function nextPulse() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var newParams = _extends({}, params);

      var isFight = this.isFight();
      //this.showLocationIds();

      newParams.isFight = isFight;
      return newParams;
    }
  }, {
    key: 'setSettings',
    value: function setSettings() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.settings = settings;
    }

    /* game Functions */

  }, {
    key: 'showLocationIds',
    value: function showLocationIds() {
      var locationButtons = document.querySelectorAll('#divLocGo > .button');
      var nextLocationButtons = Array.from(locationButtons).forEach(function (locationButton) {
        if (locationButton.innerHTML.match(/\[id\d+\]/)) return;
        var btnWrapper = locationButton.outerHTML;
        var locationId = btnWrapper.match(/btnGo\d+/)[0].replace('btnGo', '');
        locationButton.innerHTML += ' [id' + locationId + ']';
        var contentWidth = locationButton.innerHTML.length * 10;
        if (locationButton.offsetWidth > contentWidth) return;
        locationButton.style.width = contentWidth + 'px';
      });
    }
  }, {
    key: 'isFight',
    value: function isFight() {
      var fightDiv = document.querySelector('#divVisioFight');
      if (fightDiv.style.display == 'none') return 0; //no fight
      return 1; //fight is right now
    }
  }, {
    key: 'turnWildPokemons',
    value: function turnWildPokemons(newState) {
      var buttonsDiv = document.querySelector('#divInputButtons');
      var turnWildButton = buttonsDiv.querySelector('.btnSwitchWilds');
      if (newState != turnWildButton.classList.contains('pressed')) turnWildButton.click();
    }
  }, {
    key: 'closeFightDiv',
    value: function closeFightDiv() {
      var movesDiv = document.querySelector('#divFightI .moves');
      var closeButton = document.querySelectorAll('#divFightButtons .button');
      if (movesDiv && movesDiv.style.display != 'none' || closeButton[4].style.display == 'none') return;
      closeButton[4].click();
    }
  }, {
    key: 'getPokemonOpenParameter',
    value: function getPokemonOpenParameter() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var nameDivWithPokemonInfo = options.pokemonOwner == 'player' ? '#divFightI' : '#divFightH';
      var nameDivWithParams = options.parameter == 'exp' ? '.barEXP' : '.barHP';
      var fightDivWithPokemon = document.querySelector(nameDivWithPokemonInfo);
      if (!fightDivWithPokemon) return -1; // no fight?
      var paramBar = fightDivWithPokemon.querySelector(nameDivWithParams);
      if (!paramBar) return -2; //no param bar ?
      var pokemonParamPercents = +paramBar.firstElementChild.style.width.replace('%', '');
      return pokemonParamPercents;
    }
  }, {
    key: 'turnAutoFight',
    value: function turnAutoFight(newState) {
      var autofightButtonCheckbox = document.querySelector('[data-changeaction=autofight]>input');
      if (newState != autofightButtonCheckbox.checked) autofightButtonCheckbox.click();
    }
  }, {
    key: 'checkingIsTeamOpenedAndLoaded',
    value: function checkingIsTeamOpenedAndLoaded() {
      var _this = this;

      var panelWithTeam = document.querySelector('#divDockMenu .divDockPanels');
      if (!panelWithTeam || panelWithTeam.style.display == 'none') return this.openTeamDiv();
      var teamDiv = panelWithTeam.querySelector('.divPokeTeam');
      if (teamDiv.classList.contains('ajxloading')) return this.settings.organism.wait(1000).then(function (_) {
        return _this.checkingIsTeamOpenedAndLoaded();
      });
    }
  }, {
    key: 'openTeamDiv',
    value: function openTeamDiv() {
      var _this2 = this;

      var menuButtons = document.querySelectorAll('#divDockMenu .divDockIn .icon');
      if (menuButtons.length < 1) return;
      menuButtons[1].click();
      return this.settings.organism.wait(1000).then(function (_) {
        return _this2.checkingIsTeamOpenedAndLoaded();
      });
    }
  }]);

  return CommonHeart;
}();

exports.default = CommonHeart;

/***/ }),

/***/ "./src/Killer/CookieMaker/index.js":
/*!*****************************************!*\
  !*** ./src/Killer/CookieMaker/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CookieMaker = function () {
  function CookieMaker() {
    _classCallCheck(this, CookieMaker);
  }

  _createClass(CookieMaker, null, [{
    key: "getCookie",

    // возвращает cookie с именем name, если есть, если нет, то undefined
    value: function getCookie(name) {
      var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
  }, {
    key: "setCookie",
    value: function setCookie(name, value, options) {
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
  }]);

  return CookieMaker;
}();

exports.default = CookieMaker;

/***/ }),

/***/ "./src/Killer/HealerHeart/index.js":
/*!*****************************************!*\
  !*** ./src/Killer/HealerHeart/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HealerHeart = function () {
  function HealerHeart() {
    _classCallCheck(this, HealerHeart);

    this.init();
  }

  _createClass(HealerHeart, [{
    key: 'init',
    value: function init() {
      this.settings = {};
      this.nextPulse = this.nextPulse.bind(this);
      this.setSettings = this.setSettings.bind(this);
      this.healAll = this.healAll.bind(this);
      this.isTeamRestored = this.isTeamRestored.bind(this);
    }
  }, {
    key: 'nextPulse',
    value: function nextPulse() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!params.needHeal || params.isFight || !this.settings.autoheal) return params;
      if (params.nextLocationNumber != null && !params.destinationReached) return params;
      var newParams = _extends({}, params);

      if (params.destinationReached && params.direction == 'fwd') {
        //console.log('we have reached a pc');
        newParams.direction = 'bck';
        newParams.destinationReached = false;
        return this.healAll().then(function (_) {
          return newParams;
        });
      }

      if (params.destinationReached && params.direction != 'fwd') {
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
  }, {
    key: 'setSettings',
    value: function setSettings() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.settings = settings;
    }

    /* healing commands */

  }, {
    key: 'healAll',
    value: function healAll() {
      var healLink = 'https://game.league17.ru/do/pc/heal/poke';
      var params = [{ key: 'vars', value: 0 }];
      var healResponseChecker = function healResponseChecker(response) {
        if (!response || !response.alerten || response.alerten.type != 'success') {
          //console.log(response.alerten);
          throw 'Error healing';
        }
        return true;
      };
      return this.settings.organism.sendRequest(healLink, params).then(healResponseChecker).then(this.isTeamRestored);
    }
  }, {
    key: 'isTeamRestored',
    value: function isTeamRestored() {
      var teamRestoringChecker = function teamRestoringChecker(teamResponse) {
        var team = teamResponse.object;
        var teamNotRestored = team.some(function (pokemon) {
          if (pokemon.hp < pokemon.hp_max) return true;
          var moves = Object.values(pokemon.moves);
          var isMovesNotRestored = moves.some(function (move) {
            if (!move) return false;
            return move.pp < move.pp_max;
          });
        });
        return !teamNotRestored;
      };

      return this.settings.organism.sendRequest('https://game.league17.ru/do/pokes/load/team').then(teamRestoringChecker);
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
  }]);

  return HealerHeart;
}();

exports.default = HealerHeart;

/***/ }),

/***/ "./src/Killer/Inject/RequestsHook.js":
/*!*******************************************!*\
  !*** ./src/Killer/Inject/RequestsHook.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRequestsHook;
var func = '(function() {\n  let tempStore = \'{}\';\n\n  function getOldInfo() {\n    let store = document.querySelector(\'[data-globalvarsstore]\');\n    if(!store) return JSON.parse(tempStore);\n    let oldInfo = store.value ? JSON.parse(store.value) : JSON.parse(tempStore);\n    return oldInfo;\n  }\n\n  function saveInfoToStore(infoData) {\n    let store = document.querySelector(\'[data-globalvarsstore]\');\n    if(!store) {\n      tempStore = JSON.stringify(infoData);\n      return;\n    }\n    store.value = JSON.stringify(infoData);\n  }\n\n  function parseResponse(request) {\n    try{\n      let respBody = JSON.parse(request.response);\n      let info = getOldInfo();\n      if(respBody.object) {\n        let obj = respBody.object;\n        info.t_key = obj.key ? obj.key : info.t_key;\n        info.locId = obj.loc ? obj.loc.id : info.locId;\n        if (obj.fight) {\n          info.enemyHPmax = obj.fight.side.H.poke.hp_max || info.enemyHPmax;\n          info.enemyNumber = obj.fight.side.H.poke.sp_id || info.enemyNumber;\n          info.enemyLvl = obj.fight.side.H.poke.lvl || info.enemyLvl;\n          info.enemyShine = obj.fight.side.H.poke.shine || info.enemyShine;\n          info.enemyCatchable = !obj.fight.side.H.poke.wild.nocatch || info.enemyCatchable;\n          info.weather = obj.fight.weather || info.weather;\n        }\n\n        let side = obj.fight && obj.fight.side || obj.side;\n        if(side) {\n          info.enemyHP = side.H.poke.hp || info.enemyHP;\n          info.playerPokHP = side.I.poke.hp || info.playerPokHP;\n          info.playerPokMaxHP = side.I.poke.hp_max || info.playerPokMaxHP;\n          info.playerPokExp = side.I.poke.exp.cur || info.playerPokExp;\n          info.playerPokNextExp = side.I.poke.exp.next || info.playerPokNextExp;\n          info.playerPokPrevExp = side.I.poke.exp.prev || info.playerPrevExp;\n          info.playerMovesPP = side.I.poke.moves && isNaN(side.I.poke.moves) &&\n            Object.values(side.I.poke.moves)\n            .filter(_ => _).map(move => ({pp: move.pp, maxpp: move.pp_max})) || info.playerMovesPP;\n        }\n\n        saveInfoToStore(info);\n      }\n    } catch(err) {\n      console.log(`Error getting response\n`, err, \'\\nRequest:\', {...request}, \'\\nResponse:\', JSON.stringify(request.response, null, 2));\n    }\n  }\n\n  let origOpen = XMLHttpRequest.prototype.open;\n  let origSend = XMLHttpRequest.prototype.send;\n  let exampleRequest = {};\n  XMLHttpRequest.prototype.open = function() {\n      exampleRequest.openArgs = arguments;\n      this.addEventListener(\'load\', function(evt) {\n          if(this.status != 200) return;\n          exampleRequest.response = this.responseText;\n          parseResponse(exampleRequest);\n      });\n\n      origOpen.apply(this, arguments);\n  };\n\n  XMLHttpRequest.prototype.send = function() {\n      exampleRequest.sendArgs = arguments;\n      origSend.apply(this, arguments);\n  };\n\n\n})();';

function createRequestsHook() {
  var scr = document.createElement('script');
  var code = document.createTextNode(func);
  scr.appendChild(code);
  (document.body || document.head).appendChild(scr);
}

/***/ }),

/***/ "./src/Killer/Inject/TKeyGetter.js":
/*!*****************************************!*\
  !*** ./src/Killer/Inject/TKeyGetter.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = spillGlobalVars;
function spillGlobalVars() {
  var scr = document.createElement('script');
  scr.setAttribute('data-mustbedeleted', '');
  var func = 'function getTKey() {\n    let elementToWrite = document.querySelector(\'[data-globalvarsstore]\');\n    let key = \'not_found\';\n    for(let keyWord in window){\n      if(window[keyWord] && window[keyWord].key && (typeof window[keyWord].key).match(/string/i)) {\n        key = window[keyWord].key;\n      }\n    }\n    let globalvarsobject = {\n      t_key: key\n    }\n    elementToWrite.value = JSON.stringify(globalvarsobject);\n    let src = document.querySelector(\'[data-mustbedeleted]\');\n    src.remove();\n  }';
  var code = document.createTextNode('(' + func + ')()');
  scr.appendChild(code);
  (document.body || document.head).appendChild(scr);
};

/***/ }),

/***/ "./src/Killer/KillerHeart/index.js":
/*!*****************************************!*\
  !*** ./src/Killer/KillerHeart/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KillerHeart = function () {
  function KillerHeart() {
    _classCallCheck(this, KillerHeart);

    this.init();
  }

  _createClass(KillerHeart, [{
    key: 'init',
    value: function init() {
      this.settings = {};
      this.nextPulse = this.nextPulse.bind(this);
      this.setSettings = this.setSettings.bind(this);
    }
  }, {
    key: 'switchAlarm',
    value: function switchAlarm(value) {
      if (!value || !this.settings.alarmswitch) return this.settings.organism.alarm.stopPlay();
      this.settings.organism.alarm.startPlay();
    }
  }, {
    key: 'nextPulse',
    value: function nextPulse() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!params.isFight) {
        return params;
      }

      var newParams = _extends({}, params);

      var isCaptcha = this.isCaptchaEnterNeed();
      newParams.isCaptcha = isCaptcha;
      if (isCaptcha) {
        console.log('u should enter captcha');

        // for electron wrapper
        if (window.killerExtension && window.killerExtension.shotCaptcha) {
          window.killerExtension.shotCaptcha();
        }

        this.switchAlarm(true);
        return newParams;
      };
      this.switchAlarm(false);

      var numberOfPermittedAttacks = this.getNumberOfPermittedAttacks();
      if (!numberOfPermittedAttacks) {
        //console.log('no permitted attacks');
        return newParams;
      };

      newParams.killedCounter = newParams.killedCounter ? newParams.killedCounter : 0;
      var fightStatus = this.getFightStatus();
      switch (fightStatus) {
        case 1:case 2:case 3:
          if (fightStatus == 2) this.settings.organism.killedCounter++;
          if (newParams.needCatch && newParams.catchParams) {
            newParams.catchParams.catched = this.settings.catcherHeart.isPokemonWasCaught();
            newParams.catchParams.phase = 7;
          }
          this.settings.commonHeart.closeFightDiv();
          return newParams;
        case 4:
          console.log('Pokemon was killed but enemy was killed too');
          this.settings.organism.killedCounter++;
          this.settings.commonHeart.turnWildPokemons(false);
          this.settings.commonHeart.closeFightDiv();
          newParams.needHeal = true;
          return newParams;
        case 5:
          console.log('Pokemon was killed');
          this.settings.commonHeart.turnWildPokemons(false);
          //this.settings.commonHeart.closeFightDiv();
          newParams.needHeal = true;
          return this.changePokemon().then(function (_) {
            return newParams;
          });
      }

      if (this.settings.controlexp && !isNaN(this.settings.controlexp)) {
        var currentExp = this.getPlayerPokemonCurrentEXPpercents();
        var criticalExp = this.settings.controlexp > 90 ? this.settings.controlexp : 90;
        if (currentExp >= criticalExp) return;
      }

      var currentHp = this.getPlayerPokemonCurrentHPpercents();
      var criticalHp = this.settings.controlhp > 20 ? this.settings.controlhp : 20;
      if (currentHp <= criticalHp) {
        this.settings.commonHeart.turnWildPokemons(false);
        newParams.needHeal = true;
      }

      var enemyPokemonNumber = this.getEnemyPokemonNumberAsString();
      newParams.lastPokemonNumber = enemyPokemonNumber;
      if (this.isAttackForbiddenForThisNumber() && (this.settings.catcherHeart.isPokemonCanBeCaught() || !this.settings.catcherHeart.isPokemonShouldBeCaughtAutomatically())) {
        //console.log('forbidden pokemon');

        newParams.waitingForCatchCounter && newParams.waitingForCatchCounter++ || (newParams.waitingForCatchCounter = 0);
        newParams.needCatch = true;
        return newParams;
      }

      var enemyType = this.isEnemyNormal();
      if (!enemyType) {
        console.log('Enemy is shine or smt else');
        this.switchAlarm();
        //newParams.needCatch = true;
        newParams.waitingForCatchCounter && newParams.waitingForCatchCounter++ || (newParams.waitingForCatchCounter = 0);
        return newParams;
      }

      this.repeatAttackCounter = 0;
      if (this.numberOfPermittedAttacksPP() < 2) {
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

  }, {
    key: 'isCaptchaEnterNeed',
    value: function isCaptchaEnterNeed() {
      var captchaDiv = document.querySelector('#divFightCaptcha');
      var captchaImage = captchaDiv.querySelector('img');
      if (captchaDiv.style.display == 'none' || !captchaImage || captchaImage.src == undefined) return 0; // there is no captcha form
      return 1; // oops, it wants captcha
    }
  }, {
    key: 'getFightStatus',
    value: function getFightStatus() {
      var fightStatusText = document.querySelector('#divFightAction').innerHTML;
      if (fightStatusText.match(/ничья/i)) return 1; // draw
      if (fightStatusText.match(/вы победили/i)) return 2; // victory
      if (fightStatusText.match(/вы проиграли/i)) return 3; // lose

      var dummyInsteadPlayerPokemon = document.querySelector('#divFightI .pokemonBoxDummy');
      var dummyInsteadEnemyPokemon = document.querySelector('#divFightH .pokemonBoxDummy');
      if (dummyInsteadPlayerPokemon && dummyInsteadEnemyPokemon) return 4;
      //pokemon was killed/changed but u can close window
      if (dummyInsteadPlayerPokemon && !dummyInsteadEnemyPokemon) return 5;
      //pokemon was killed/changed but u can get another

      return 0; // it's okay, fight is continuing
    }
  }, {
    key: 'getNumberOfPermittedAttacks',
    value: function getNumberOfPermittedAttacks() {
      return this.settings.attack.filter(function (attack) {
        return attack == 1;
      }).length;
    }
  }, {
    key: 'getWeather',
    value: function getWeather() {
      var weatherDiv = document.querySelector('#divFightWeather');
      var hail = weatherDiv.querySelector('.w3');
      if (hail) return 1; // hail
      var sandstorm = weatherDiv.querySelector('.w4');
      if (sandstorm) return 2; //sandstorm
      return 0; // sun/rain etc
    }
  }, {
    key: 'chooseAttack',
    value: function chooseAttack(lastTry) {
      if (!this.getNumberOfPermittedAttacks()) return;
      //if(this.numberOfPermittedAttacksPP() < 1) return; //excess checking
      var randomAttack = ~~(Math.random() * 4);
      if (this.settings.attack[randomAttack]) {
        var resultClicking = this.clickAttack(randomAttack, lastTry);
        if (resultClicking) return;
      }
      this.repeatAttackCounter++;
      if (this.repeatAttackCounter > 100) throw 'Too much attacks repeat';
      this.chooseAttack(lastTry);
    }
  }, {
    key: 'clickAttack',
    value: function clickAttack(attackNumber, lastTry) {
      if (attackNumber > 3 || attackNumber < 0) return false;
      if (this.getPlayerPokemonAttackPP(attackNumber) < 1 && !lastTry) return false;
      var moveBox = document.querySelectorAll('#divFightI .moveBox')[attackNumber];
      if (!moveBox) return false;
      if (!moveBox.querySelector('.divMove')) return false;
      var divForClicking = moveBox.querySelector('.divMoveInfo');
      divForClicking.click();
      return true;
    }

    /* switch pokemon */

  }, {
    key: 'checkIsPokemonsListToChangeLoaded',
    value: function checkIsPokemonsListToChangeLoaded() {
      var _this = this;

      var divContextTitle = document.querySelector('.divContext .divTitle').innerHTML;
      if (!divContextTitle.match(/выбрать монстра/i)) return this.changePokemon();
      var pokemons = document.querySelectorAll('.divContext .divElement');
      if (!pokemons || pokemons.length < 1) return this.settings.organism.wait(1000).then(function (_) {
        return _this.checkIsPokemonsListToChangeLoaded();
      });
      return true;
    }
  }, {
    key: 'changePokemon',
    value: function changePokemon() {
      var _this2 = this;

      return this.settings.organism.wait(500).then(function (_) {
        document.querySelector('#divFightI .pokemonBoxDummy').click();
      }).then(function (_) {
        return _this2.settings.organism.wait(1000);
      }).then(function (_) {
        return _this2.checkIsPokemonsListToChangeLoaded();
      }).then(function (_) {
        var pokemons = document.querySelectorAll('.divContext .divElement');
        pokemons[~~(pokemons.length * Math.random())].click();
      }).then(function (_) {
        return _this2.settings.organism.wait(1000);
      });
    }

    /* infight parametres & actions with player pokemon */

  }, {
    key: 'getPlayerPokemonCurrentHPpercents',
    value: function getPlayerPokemonCurrentHPpercents() {
      return this.settings.commonHeart.getPokemonOpenParameter({ pokemonOwner: 'player', parameter: 'hp' });
    }
  }, {
    key: 'getPlayerPokemonCurrentEXPpercents',
    value: function getPlayerPokemonCurrentEXPpercents() {
      return this.settings.commonHeart.getPokemonOpenParameter({ pokemonOwner: 'player', parameter: 'exp' });
    }
  }, {
    key: 'getPlayerPokemonAttackPP',
    value: function getPlayerPokemonAttackPP(attackNumber) {
      if (attackNumber > 3 || attackNumber < 0) return false;
      var stringWithPP = document.querySelectorAll('#divFightI .divMoveParams')[attackNumber].innerHTML;
      var currentPPValue = +stringWithPP.replace(/\/\d+/, '');
      return currentPPValue;
    }
  }, {
    key: 'numberOfPermittedAttacksPP',
    value: function numberOfPermittedAttacksPP() {
      var _this3 = this;

      var sumOfAllPermittedAttacksPP = this.settings.attack.reduce(function (sum, attackPermission, index) {
        if (!attackPermission) return sum;
        return sum + _this3.getPlayerPokemonAttackPP(index);
      }, 0);
      return sumOfAllPermittedAttacksPP;
    }

    /* infight parametres & actions with enemy pokemon */

  }, {
    key: 'isEnemyCanBeCaught',
    value: function isEnemyCanBeCaught() {
      var noCatch = document.querySelector('#divFightOptions .nocatch');
      return noCatch != null;
    }
  }, {
    key: 'getEnemyPokemonNumberAsString',
    value: function getEnemyPokemonNumberAsString() {
      var enemyImage = document.querySelector('#divFightH .image > img');
      if (!enemyImage) return 0;
      var enemyNumber = enemyImage.src.match(/\d{3}/)[0];
      return enemyNumber;
    }
  }, {
    key: 'getEnemyLevel',
    value: function getEnemyLevel() {
      var enemyLevelDiv = document.querySelector('#divFightH .lvl');
      if (!enemyLevelDiv) return 0;
      var enemyLevel = +enemyLevel.innerHTML;
      return enemyLevel;
    }
  }, {
    key: 'isEnemyNormal',
    value: function isEnemyNormal() {
      var enemyRankDiv = document.querySelector('#divFightH .rank');
      if (!enemyRankDiv) return true;
      var enemyRankSpan = enemyRankDiv.querySelector('span');
      if (!enemyRankSpan) {
        var enemyRank = enemyRankDiv.innerHTML;
        if (enemyRank.match(/\S+/)) return false;
      } else {
        if (enemyRankSpan.innerHTML.match(/\S+/)) return false;
      }
      return true;
    }
  }, {
    key: 'getEnemyHPpercents',
    value: function getEnemyHPpercents() {
      return this.settings.commonHeart.getPokemonOpenParameter({ pokemonOwner: 'enemy', parameter: 'hp' });
    }
  }, {
    key: 'isAttackForbiddenForThisNumber',
    value: function isAttackForbiddenForThisNumber() {
      var currentNumber = this.getEnemyPokemonNumberAsString();
      var forbiddenNumbers = this.settings.forbiddennumbers.match(/\d{1,3};?/g);
      if (!forbiddenNumbers) return false;
      return forbiddenNumbers.some(function (number) {
        return +currentNumber == +number.replace(';', '');
      });
    }

    /* common actions */

  }, {
    key: 'setSettings',
    value: function setSettings() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.settings = settings;
    }
  }]);

  return KillerHeart;
}();

exports.default = KillerHeart;

/***/ }),

/***/ "./src/Killer/MainContainer/index.js":
/*!*******************************************!*\
  !*** ./src/Killer/MainContainer/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var killerHtml = '<div class="killer__wrapper">\n  <div class="killer__topPanel"></div>\n  <div class="killer__controlPanel">\n    <label class="killer__controlPanelLabel killer__controlPanelLabel--row" data-changeaction="autofight">\n      <input type="checkbox" />\n      <span>AF</span>\n    </label>\n    <label class="killer__controlPanelLabel killer__controlPanelLabel--halfRow" data-changeaction="attack" data-attacknumber="1">\n      <input type="checkbox" />\n      <span>Attack 1</span>\n    </label>\n    <label class="killer__controlPanelLabel killer__controlPanelLabel--halfRow" data-changeaction="attack" data-attacknumber="2">\n      <input type="checkbox" />\n      <span>Attack 2</span>\n    </label>\n    <label class="killer__controlPanelLabel killer__controlPanelLabel--halfRow" data-changeaction="attack" data-attacknumber="3">\n      <input type="checkbox" />\n      <span>Attack 3</span>\n    </label>\n    <label class="killer__controlPanelLabel killer__controlPanelLabel--halfRow" data-changeaction="attack" data-attacknumber="4">\n      <input type="checkbox">\n      <span>Attack 4</span>\n    </label>\n    <div class="killer__controlPanelCell" data-action="showsettings">\n      <button class="button">Settings</button>\n    </div>\n  </div>\n  <input data-globalvarsstore="" type="hidden" value="">\n</div>';

var KillerContainer = function () {
  function KillerContainer() {
    _classCallCheck(this, KillerContainer);

    this.init();
  }

  _createClass(KillerContainer, [{
    key: 'createView',
    value: function createView() {
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = killerHtml;
      return tempDiv.firstChild;
    }
  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      this.mainContainer = this.createView();
      this.topPanel = this.mainContainer.querySelector('.killer__topPanel');
      this.controlPanel = this.mainContainer.querySelector('.killer__controlPanel');
      this.globalVarsStore = this.mainContainer.querySelector('[data-globalvarsstore]');

      this.addTopPanelDragListeners();

      this.controlPanel.addEventListener('click', function (evt) {
        _this.controlPanelClickListener(evt);
      });
    }
  }, {
    key: 'createTopPanel',
    value: function createTopPanel() {
      var topPanel = document.createElement('div');
      topPanel.classList.add('killerMainContainer__topPanel');
      return topPanel;
    }
  }, {
    key: 'createHiddenInputForGlobalVars',
    value: function createHiddenInputForGlobalVars() {
      var hiddenDB = document.createElement('input');
      hiddenDB.setAttribute('data-globalvarsstore', '');
      hiddenDB.type = 'hidden';
      return hiddenDB;
    }
  }, {
    key: 'addTopPanelDragListeners',
    value: function addTopPanelDragListeners() {
      var _this2 = this;

      var panel = this.topPanel;
      var moveFlag = false;
      panel.addEventListener('mousedown', function () {
        return moveFlag = true;
      });
      panel.addEventListener('mouseup', function () {
        return moveFlag = false;
      });
      document.body.addEventListener('mousemove', function (evt) {
        if (!moveFlag) return;
        var newTop = evt.pageY - 2 * _this2.topPanel.offsetHeight / 3;
        _this2.mainContainer.style.top = newTop + 'px';
        var newLeft = evt.pageX - _this2.mainContainer.offsetWidth / 2;
        _this2.mainContainer.style.left = newLeft + 'px';
      });
    }
  }, {
    key: 'getMainContainerElement',
    value: function getMainContainerElement() {
      return this.mainContainer;
    }
  }, {
    key: 'controlPanelClickListener',
    value: function controlPanelClickListener(evt) {
      if (evt.target.tagName == 'INPUT') {
        var changedAction = evt.target.parentNode.dataset['changeaction'];
        if (changedAction == 'autofight') {
          if (!this.autoFightStatusChangedListener) return;
          this.autoFightStatusChangedListener(evt.target.checked);
        }
        if (changedAction == 'attack') {
          if (!this.attackStatusChangedListener) return;
          var changedAttackNumber = evt.target.parentNode.dataset['attacknumber'];
          this.attackStatusChangedListener(evt.target.checked, changedAttackNumber);
        }
      }
      if (evt.target.tagName == 'BUTTON') {
        var action = evt.target.parentNode.dataset['action'];
        if (action == 'showsettings') {
          if (!this.settingsButtonClickListener) return;
          this.settingsButtonClickListener();
        }
      }
    }
  }, {
    key: 'setAutoFightStatusChangedListener',
    value: function setAutoFightStatusChangedListener(listener) {
      this.autoFightStatusChangedListener = listener;
    }
  }, {
    key: 'setAttackStatusChangedListener',
    value: function setAttackStatusChangedListener(listener) {
      this.attackStatusChangedListener = listener;
    }
  }, {
    key: 'setSettingsClickListener',
    value: function setSettingsClickListener(listener) {
      this.settingsButtonClickListener = listener;
    }
  }]);

  return KillerContainer;
}();

exports.default = KillerContainer;

/***/ }),

/***/ "./src/Killer/SettingsContainer/index.js":
/*!***********************************************!*\
  !*** ./src/Killer/SettingsContainer/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var settingsViewHtml = '<div class="killerSettings__wrapper">\n<div class="killerSettings__topPanel"></div>\n<div class="killerSettings__controlPanel">\n  <div class="killerSettings__controlPanelRow">\n    <div class="killerSettings__controlPanelCell">\n      <label class="killerSettings__row" data-changeaction="showpokemons">\n        <span>Show pokemons:</span>\n        <input type="checkbox" />\n      </label>\n      <label class="killerSettings__row killerSettings__row--innerColumn" data-changeaction="forbiddennumbers">\n        <span>Forbidden numbers:</span>\n        <textarea></textarea>\n      </label>\n      <label class="killerSettings__row killerSettings__row--innerColumn">\n        <span>Counter of killed wild pokemons:</span>\n        <input type="text" disabled class="killerSettings__input killerSettings__input--max" data-view="killedwild"/>\n      </label>\n      <label class="killerSettings__row" data-changeaction="controlexp">\n        <span>EXP control, %:</span>\n        <input type="text" class="killerSettings__input" />\n      </label>\n    </div>\n    <div class="killerSettings__controlPanelCell">\n      <label class="killerSettings__row" data-changeaction="autoheal">\n        <span>Auto heal:</span>\n        <input type="checkbox" />\n      </label>\n      <label class="killerSettings__row killerSettings__row--innerColumn" data-changeaction="waytoheal">\n        <span>Way to healing:</span>\n        <textarea></textarea>\n      </label>\n      <label class="killerSettings__row" data-changeaction="controlhp">\n        <span>HP control, %:</span>\n        <input type="text" class="killerSettings__input" />\n      </label>\n    </div>\n  </div>\n  <div class="killerSettings__controlPanelRow">\n    <div class="killerSettings__controlPanelCell">\n      <label class="killerSettings__row" data-changeaction="alarmswitch">\n        <span>Alarm:</span>\n        <input type="checkbox" />\n      </label>\n      <label class="killerSettings__row" data-changeaction="alarmvolume">\n        <span>Alarm volume (0-100):</span>\n        <input class="killerSettings__input killerSettings__input--min" type="text" value="10" />\n      </label>\n      <label class="killerSettings__row killerSettings__row--innerColumn" data-changeaction="alarmsrc" style="display:none">\n        <span>Alarm source:</span>\n        <input class="killerSettings__input killerSettings__input--max" type="text" />\n      </label>\n    </div>\n    <div class="killerSettings__controlPanelCell">\n      <label class="killerSettings__row" data-changeaction="showiv">\n        <span>Show IV HP:</span>\n        <input type="checkbox" />\n      </label>\n      <label class="killerSettings__row" data-changeaction="autocatch">\n        <span>Autocatch:</span>\n        <input type="checkbox" />\n      </label>\n      <label class="killerSettings__row killerSettings__row--innerColumn" data-changeaction="autocatchsettings">\n        <textarea></textarea>\n      </label>\n    </div>\n  </div>\n  <div class="killerSettings__controlPanelRow">\n    <button class="button">Save</button>\n  </div>\n</div>\n</div>';

var SettingsContainer = function () {
  function SettingsContainer() {
    _classCallCheck(this, SettingsContainer);

    this.init();
  }

  _createClass(SettingsContainer, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.mainWrapper = this.createView();
      this.topPanel = this.mainWrapper.querySelector('.killerSettings__topPanel');
      this.controlPanel = this.mainWrapper.querySelector('.killerSettings__controlPanel');

      this.addTopPanelDragListeners();

      this.changeListeners = {};

      this.controlPanel.addEventListener('change', function (evt) {
        _this.controlPanelChangeListener(evt);
      });
    }
  }, {
    key: 'createView',
    value: function createView() {
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = settingsViewHtml;
      return tempDiv.firstChild;
    }
  }, {
    key: 'getMainContainerElement',
    value: function getMainContainerElement() {
      return this.mainWrapper;
    }
  }, {
    key: 'addTopPanelDragListeners',
    value: function addTopPanelDragListeners() {
      var _this2 = this;

      var panel = this.topPanel;
      var moveFlag = false;
      panel.addEventListener('mousedown', function () {
        return moveFlag = true;
      });
      panel.addEventListener('mouseup', function () {
        return moveFlag = false;
      });
      document.body.addEventListener('mousemove', function (evt) {
        if (!moveFlag) return;
        var newTop = evt.pageY - 2 * panel.offsetHeight / 3;
        _this2.mainWrapper.style.top = newTop + 'px';
        var newLeft = evt.pageX - _this2.mainWrapper.offsetWidth / 2;
        _this2.mainWrapper.style.left = newLeft + 'px';
      });
    }
  }, {
    key: 'controlPanelChangeListener',
    value: function controlPanelChangeListener(evt) {
      if (evt.target.tagName == 'TEXTAREA' || evt.target.tagName == 'INPUT') {
        var changedAction = evt.target.parentNode.dataset['changeaction'];
        if (changedAction == 'forbiddennumbers' || changedAction == 'waytoheal' || changedAction == 'controlhp' || changedAction == 'controlexp' || changedAction == 'autocatchsettings' || changedAction == 'alarmvolume' || changedAction == 'alarmsrc') {
          if (!this.changeListeners[changedAction]) return;
          this.changeListeners[changedAction](evt.target.value);
        }
        if (changedAction == 'showpokemons' || changedAction == 'autoheal' || changedAction == 'showiv' || changedAction == 'autocatch' || changedAction == 'alarmswitch') {
          if (!this.changeListeners[changedAction]) return;
          this.changeListeners[changedAction](evt.target.checked);
        }
      }
    }

    /* funcs for setting listeners */

  }, {
    key: 'setChangeListener',
    value: function setChangeListener(type, listener) {
      this.changeListeners[type] = listener;
    }
  }]);

  return SettingsContainer;
}();

exports.default = SettingsContainer;

/***/ }),

/***/ "./src/Killer/TravellerHeart/index.js":
/*!********************************************!*\
  !*** ./src/Killer/TravellerHeart/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TravellerHeart = function () {
  function TravellerHeart() {
    _classCallCheck(this, TravellerHeart);

    this.init();
  }

  _createClass(TravellerHeart, [{
    key: 'init',
    value: function init() {
      this.nextPulse = this.nextPulse.bind(this);
      this.setSettings = this.setSettings.bind(this);
    }
  }, {
    key: 'setSettings',
    value: function setSettings() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.settings = settings;
    }
  }, {
    key: 'nextPulse',
    value: function nextPulse() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var newParams = _extends({}, params);
      if (!params.needMove) {
        newParams.nextLocationNumber = null;
        newParams.direction = 'fwd';
        newParams.waySource = '';
        newParams.prevLocationWays = null;
        newParams.destinationReached = false;
      }

      //console.log(`is fight? ${params.isFight}`, `is Need Move? ${params.needMove}`,
      // `isDestReached ${newParams.destinationReached}`);

      if (params.isFight || !params.needMove || newParams.destinationReached) return newParams;

      /*
      if(params.onWrongPlaceCounter > 3) {
        newParams.nextLocationNumber--;
        newParams.prevLocationWays = null;
        return newParams;
      } */

      //console.log(`place changed?: ${params.prevLocationWays != null && !this.isPlaceWasChanged(params.prevLocationWays)}`);
      if (params.prevLocationWays != null && !this.isPlaceWasChanged(params.prevLocationWays)) {
        //console.log(`place wasn't changed. prev:`, params.prevLocationWays, `counter: `, newParams.onWrongPlaceCounter);
        //newParams.onWrongPlaceCounter = newParams.onWrongPlaceCounter && newParams.onWrongPlaceCounter + 1 || 1;
        return newParams;
      }

      //newParams.onWrongPlaceCounter = 0;
      //console.log(`direction: ${newParams.direction}`);

      var wayChain = this.getWay(params.waySource, params.direction);
      var locationNumber = params.nextLocationNumber != null ? params.nextLocationNumber : 0;

      if (locationNumber >= wayChain.length) {
        newParams.nextLocationNumber = 0;
        newParams.destinationReached = true;
        return newParams;
      }

      //console.log(wayChain[locationNumber]);
      newParams.nextLocationNumber = locationNumber + 1;
      newParams.prevLocationWays = this.goToLocation(wayChain[locationNumber]);
      return newParams;
    }
  }, {
    key: 'getWay',
    value: function getWay(waytoheal, direction) {
      if (!waytoheal) return 1; //no input value or empty
      var way = direction == 'fwd' ? waytoheal.match(/([^]+?)\//) : waytoheal.match(/\/([^]+)/);
      if (!way) return 2; // no slash in input value
      way = way[1].split(';').map(function (_) {
        return _.trim();
      }).filter(function (_) {
        return _;
      });
      return way;
    }
  }, {
    key: 'goToLocation',
    value: function goToLocation(locationName) {
      //console.log(locationName);
      var locationNumber = locationName.match(/\s+\d+/);
      if (locationNumber) locationName = locationName.replace(/\s+\d+/, '');
      locationNumber = locationNumber && !isNaN(+locationNumber[0]) && +locationNumber[0] || 0;
      var locationButtons = document.querySelectorAll('#divLocGo > .button');
      if (locationButtons.length < 1) {
        console.log('There is no exit');
        throw 'No exit here';
      }

      var nextLocationButtons = Array.from(locationButtons).filter(function (locationButton) {
        return locationButton.innerHTML.match(new RegExp(locationName, 'i'));
      });

      if (nextLocationButtons.length < 1) {
        console.log('no such place: ' + locationName);
        throw 'no such place: ' + locationName;
      }

      //console.log(`nextLoc: ${locationNumber}`, nextLocationButtons);
      var nextLocationButton = nextLocationButtons[locationNumber];
      //console.log(`nextLocBtn:`, nextLocationButton);
      nextLocationButton.click();

      return locationButtons;
    }
  }, {
    key: 'isPlaceWasChanged',
    value: function isPlaceWasChanged(oldLocationButtons) {
      var locationButtons = document.querySelectorAll('#divLocGo > .button');
      if (oldLocationButtons.length != locationButtons.length) return true;

      for (var i = 0; i < oldLocationButtons.length; i++) {
        var locationIdForOldButton = oldLocationButtons[0].outerHTML.match(/btnGo\d+/).toString();
        var locationIdForNewButton = locationButtons[0].outerHTML.match(/btnGo\d+/).toString();
        if (locationIdForNewButton != locationIdForOldButton) return true;
      }

      return false;
    }
  }]);

  return TravellerHeart;
}();

exports.default = TravellerHeart;

/***/ }),

/***/ "./src/Killer/TravellerTentacle/index.js":
/*!***********************************************!*\
  !*** ./src/Killer/TravellerTentacle/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TravellerTentacle = function () {
  function TravellerTentacle() {
    _classCallCheck(this, TravellerTentacle);

    this.init();
  }

  _createClass(TravellerTentacle, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'setSettings',
    value: function setSettings() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.settings = settings;
    }
  }, {
    key: 'go',
    value: function go(to) {
      var _this = this;

      var direction = to == 'heal' ? 'fwd' : 'bck';
      var way = this.getWay(this.settings.waytoheal, direction);
      if (way == 1 || way == 2) throw 'no way';
      var walkingTheWay = way.reduce(function (chain, nextWay) {
        return chain.then(function (_) {
          return _this.goToLocation(nextWay);
        });
      }, Promise.resolve());
      return walkingTheWay;
    }
  }, {
    key: 'getWay',
    value: function getWay(waytoheal, direction) {
      if (!waytoheal) return 1; //no input value or empty
      var way = direction == 'fwd' ? waytoheal.match(/([^]+?)\//) : waytoheal.match(/\/([^]+)/);
      if (!way) return 2; // no slash in input value
      way = way[1].split(';').map(function (_) {
        return _.trim();
      }).filter(function (_) {
        return _;
      });
      return way;
    }
  }, {
    key: 'goToLocation',
    value: function goToLocation(locationName) {
      var _this2 = this;

      var locationNumber = locationName.match(/\s+\d+/);
      if (locationNumber) loactionName = locationName.replace(/\s+\d+/, '');
      locationNumber = locationNumber ? locationNumber[0] : 0;
      var locationButtons = document.querySelectorAll('#divLocGo > .button');
      if (locationButtons.length < 1) {
        console.log('There is no exit');
        throw 'No exit here';
      }

      var nextLocationButtons = Array.from(locationButtons).filter(function (locationButton) {
        return locationButton.innerHTML.match(new RegExp(locationName, 'i'));
      });

      if (nextLocationButtons.length < 1) {
        console.log('no such place: ' + locationName);
        throw 'no such place: ' + locationName;
      }

      var nextLocationButton = nextLocationButtons[locationNumber];
      //let locationId = nextLocationButton.outerHTML.match(/btnGo\d+/)[0].replace('btnGo','');

      nextLocationButton.click();

      return this.settings.organism.wait(1000).then(function (_) {
        return _this2.isPlaceWasChanged(locationButtons);
      });
    }
  }, {
    key: 'isPlaceWasChanged',
    value: function isPlaceWasChanged(oldLocationButtons) {
      var _this3 = this;

      var locationButtons = document.querySelectorAll('#divLocGo > .button');
      if (oldLocationButtons.length != locationButtons.length) return true;

      for (var i = 0; i < oldLocationButtons.length; i++) {
        var locationIdForOldButton = oldLocationButtons[0].outerHTML.match(/btnGo\d+/).toString();
        var locationIdForNewButton = locationButtons[0].outerHTML.match(/btnGo\d+/).toString();
        if (locationIdForNewButton != locationIdForOldButton) return true;
      }

      //console.log('waiting for place changing');
      return this.settings.organism.wait(1000).then(function (_) {
        return _this3.isPlaceWasChanged(oldLocationButtons);
      });
    }
  }]);

  return TravellerTentacle;
}();

exports.default = TravellerTentacle;

/***/ }),

/***/ "./src/Killer/index.js":
/*!*****************************!*\
  !*** ./src/Killer/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MainContainer = __webpack_require__(/*! ./MainContainer */ "./src/Killer/MainContainer/index.js");

var _MainContainer2 = _interopRequireDefault(_MainContainer);

var _CommonHeart = __webpack_require__(/*! ./CommonHeart */ "./src/Killer/CommonHeart/index.js");

var _CommonHeart2 = _interopRequireDefault(_CommonHeart);

var _KillerHeart = __webpack_require__(/*! ./KillerHeart */ "./src/Killer/KillerHeart/index.js");

var _KillerHeart2 = _interopRequireDefault(_KillerHeart);

var _HealerHeart = __webpack_require__(/*! ./HealerHeart */ "./src/Killer/HealerHeart/index.js");

var _HealerHeart2 = _interopRequireDefault(_HealerHeart);

var _CatcherHeart = __webpack_require__(/*! ./CatcherHeart */ "./src/Killer/CatcherHeart/index.js");

var _CatcherHeart2 = _interopRequireDefault(_CatcherHeart);

var _TravellerHeart = __webpack_require__(/*! ./TravellerHeart */ "./src/Killer/TravellerHeart/index.js");

var _TravellerHeart2 = _interopRequireDefault(_TravellerHeart);

var _TravellerTentacle = __webpack_require__(/*! ./TravellerTentacle */ "./src/Killer/TravellerTentacle/index.js");

var _TravellerTentacle2 = _interopRequireDefault(_TravellerTentacle);

var _SettingsContainer = __webpack_require__(/*! ./SettingsContainer */ "./src/Killer/SettingsContainer/index.js");

var _SettingsContainer2 = _interopRequireDefault(_SettingsContainer);

var _RequestsHook = __webpack_require__(/*! ./Inject/RequestsHook */ "./src/Killer/Inject/RequestsHook.js");

var _RequestsHook2 = _interopRequireDefault(_RequestsHook);

var _TKeyGetter = __webpack_require__(/*! ./Inject/TKeyGetter */ "./src/Killer/Inject/TKeyGetter.js");

var _TKeyGetter2 = _interopRequireDefault(_TKeyGetter);

var _CookieMaker = __webpack_require__(/*! ./CookieMaker */ "./src/Killer/CookieMaker/index.js");

var _CookieMaker2 = _interopRequireDefault(_CookieMaker);

var _Alarm = __webpack_require__(/*! ./Alarm */ "./src/Killer/Alarm/index.js");

var _Alarm2 = _interopRequireDefault(_Alarm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lifesCounter = 0;

var Killer = function () {
  function Killer(imageReplacer) {
    _classCallCheck(this, Killer);

    //this.init();
    this.setDocumentObserver();
    (0, _RequestsHook2.default)();
    this.imageReplacer = imageReplacer;
  }

  _createClass(Killer, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.alarm = new _Alarm2.default();
      this.settingsParametres = ['forbiddennumbers', 'waytoheal', 'showpokemons', 'autoheal', 'showiv', 'controlhp', 'controlexp', 'autocatch', 'autocatchsettings', 'alarmsrc', 'alarmswitch', 'alarmvolume'];
      var killerView = new _MainContainer2.default();
      var settingsView = new _SettingsContainer2.default();

      var commonHeart = new _CommonHeart2.default();
      var killerHeart = new _KillerHeart2.default();
      var healerHeart = new _HealerHeart2.default();
      var catcherHeart = new _CatcherHeart2.default();
      var travellerHeart = new _TravellerHeart2.default();
      var travellerTentacle = new _TravellerTentacle2.default();

      this.settings = {
        'autofight': false,
        'attack': [0, 0, 0, 0],
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

      document.addEventListener('keyup', function (evt) {
        if (evt.ctrlKey && evt.shiftKey) {
          if (evt.key == 'H' || evt.key == 'Р') {
            _this.toggleVisionMainContainer();
          }
        }
      });
    }
  }, {
    key: 'setDocumentObserver',
    value: function setDocumentObserver() {
      var _this2 = this;

      var observer = new MutationObserver(function (mut) {
        if (!document.querySelector('#divLocGo .button')) return;
        observer.disconnect();
        _this2.init();
        setTimeout(function (_) {
          return _this2.settings.globalVars = _this2.getGlobalVars();
        }, 1000);
      });
      var config = { attributes: true, childList: true, subtree: true };
      observer.observe(document, config);
    }
  }, {
    key: 'getGlobalVars',
    value: function getGlobalVars() {
      var hiddenStore = document.querySelector('[data-globalvarsstore]');
      var globalVars = JSON.parse(hiddenStore.value);
      return globalVars;
    }
  }, {
    key: 'startKillerLife',
    value: function startKillerLife() {
      this.currentKillerLife = lifesCounter++;
      this.killerHeartbeat({ life: this.currentKillerLife });
    }
  }, {
    key: 'wait',
    value: function wait(ms, paramToChain) {
      return new Promise(function (resolve) {
        setTimeout(function (_) {
          return resolve(paramToChain);
        }, ms);
      });
    }
  }, {
    key: 'showKilledCounter',
    value: function showKilledCounter(value) {
      var counterView = document.querySelector('[data-view=killedwild]');
      counterView.value = value ? value : 0;
    }
  }, {
    key: 'killerHeartbeat',
    value: function killerHeartbeat() {
      var _this3 = this;

      var blood = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!this.settings.autofight || this.currentKillerLife !== blood.life) return Promise.resolve(blood);

      this.showKilledCounter(this.killedCounter);

      var randomTimeInterval = (Math.random() * 5 + 2) * 1000;
      return Promise.resolve(blood).then(this.commonHeart.nextPulse).then(this.killerHeart.nextPulse).then(this.catcherHeart.nextPulse).then(this.healerHeart.nextPulse).then(this.travellerHeart.nextPulse).then(function (blood) {
        return _this3.wait(randomTimeInterval, blood);
      }).then(function (blood) {
        return _this3.killerHeartbeat(blood);
      });
    }
  }, {
    key: 'toggleVisionMainContainer',
    value: function toggleVisionMainContainer() {
      var killerView = this.killerView.getMainContainerElement();
      if (killerView.style.display != 'none') killerView.style.display = 'none';else killerView.style.display = 'block';
    }
  }, {
    key: 'toggleVisionSettingsView',
    value: function toggleVisionSettingsView() {
      var settingsView = this.settingsView.getMainContainerElement();
      if (settingsView.style.display != 'none') settingsView.style.display = 'none';else settingsView.style.display = 'block';
    }
  }, {
    key: 'injectViewsIntoDocument',
    value: function injectViewsIntoDocument() {
      document.body.appendChild(this.killerView.getMainContainerElement());
      document.body.appendChild(this.settingsView.getMainContainerElement());
      this.toggleVisionSettingsView();
    }
  }, {
    key: 'setMainViewListeners',
    value: function setMainViewListeners() {
      var _this4 = this;

      this.killerView.setAutoFightStatusChangedListener(function (newState) {
        _this4.changeSettings({
          parameter: 'autofight',
          value: newState
        });
      });

      this.killerView.setAttackStatusChangedListener(function (newState, attackNumber) {
        _this4.changeSettings({
          parameter: 'attack',
          value: newState,
          number: attackNumber - 1
        });
      });

      this.killerView.setSettingsClickListener(function (_) {
        return _this4.toggleVisionSettingsView();
      });
    }
  }, {
    key: 'setSettingsViewListeners',
    value: function setSettingsViewListeners() {
      var _this5 = this;

      var parametres = this.settingsParametres;
      parametres.forEach(function (parameter) {
        _this5.settingsView.setChangeListener(parameter, function (newValue) {
          _this5.changeSettings({
            parameter: parameter,
            value: newValue
          });
        });
      });
    }
  }, {
    key: 'changeSettings',
    value: function changeSettings() {
      var newPartOfSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var newSettings = _extends({}, this.settings);
      switch (newPartOfSettings.parameter) {
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
          if (newPartOfSettings.parameter == 'showpokemons') this.imageReplacer.switchOn(newSettings.showpokemons);
          if (newPartOfSettings.parameter == 'showiv') this.catcherHeart.setObserverIV(newSettings.showiv);
          if (newPartOfSettings.parameter == 'alarmvolume') this.alarm.changeVolume(newSettings.alarmvolume);
          if (newPartOfSettings.parameter == 'alarmsrc') this.alarm.changeMelody(newSettings.alarmsrc);
          break;
        case 'attack':
          var attackNumber = newPartOfSettings.number;
          newSettings.attack[attackNumber] = newPartOfSettings.value ? 1 : 0;
          break;
      }

      var oldAutofightStatus = this.settings.autofight;
      this.settings = _extends({}, newSettings);
      this.killerHeart.setSettings(this.settings);
      this.commonHeart.setSettings(this.settings);
      this.healerHeart.setSettings(this.settings);
      this.catcherHeart.setSettings(this.settings);
      this.travellerHeart.setSettings(this.settings);
      this.travellerTentacle.setSettings(this.settings);

      this.saveSettings();
      if (this.settings.autofight != oldAutofightStatus) this.startKillerLife();
    }
  }, {
    key: 'updateViews',
    value: function updateViews(settings) {
      var attackCheckboxes = document.querySelectorAll('[data-changeaction=attack] > input');
      attackCheckboxes.forEach(function (checkbox, index) {
        checkbox.checked = !!settings.attack[index];
      });

      var parametres = this.settingsParametres;
      var settingsInput = void 0;
      parametres.forEach(function (parameter) {
        switch (parameter) {
          case 'forbiddennumbers':
          case 'waytoheal':
          case 'autocatchsettings':
            settingsInput = document.querySelector('[data-changeaction=' + parameter + '] > textarea');
            settingsInput.value = settings[parameter];
            break;
          case 'showpokemons':
          case 'autoheal':
          case 'showiv':
          case 'autocatch':
          case 'alarmswitch':
            settingsInput = document.querySelector('[data-changeaction=' + parameter + '] > input');
            settingsInput.checked = settings[parameter];
            break;
          case 'controlhp':
          case 'controlexp':
          case 'alarmsrc':
          case 'alarmvolume':
            settingsInput = document.querySelector('[data-changeaction=' + parameter + '] > input');
            settingsInput.value = settings[parameter];
            break;
        }
      });
    }
  }, {
    key: 'saveSettings',
    value: function saveSettings() {
      var settingsToSave = JSON.stringify(this.getSettingsToSave());
      window.localStorage.setItem('killerSettings', settingsToSave);
    }
  }, {
    key: 'loadSettings',
    value: function loadSettings() {
      var _this6 = this;

      var loadedSettings = window.localStorage.getItem('killerSettings');
      if (!loadedSettings) return;
      loadedSettings = JSON.parse(loadedSettings);
      var parametres = this.settingsParametres;
      parametres.forEach(function (parameter) {
        var value = loadedSettings[parameter] && loadedSettings[parameter] != 'undefined' ? loadedSettings[parameter] : '';
        _this6.changeSettings({ parameter: parameter, value: value });
      });
      this.settings.attack = loadedSettings.attack;
    }
  }, {
    key: 'getSettingsToSave',
    value: function getSettingsToSave() {
      var _this7 = this;

      var parametres = this.settingsParametres;
      var settingsToSave = {
        'attack': this.settings.attack
      };
      parametres.forEach(function (parameter) {
        settingsToSave[parameter] = _this7.settings[parameter];
      });
      return settingsToSave;
    }
  }, {
    key: 'sendRequest',
    value: function sendRequest(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var formData = new FormData();
      formData.append('t_key', this.settings.globalVars.t_key);
      params.forEach(function (param) {
        formData.append(param.key, param.value);
      });
      var options = {
        method: 'POST',
        body: formData,
        credentials: 'include'
        //'http://game.league17.ru/do/pokes/load/team'
      };return fetch(url, options).then(function (_) {
        return _.json();
      });
    }
  }]);

  return Killer;
}();

exports.default = Killer;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _App = __webpack_require__(/*! ./App */ "./src/App/index.js");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(/*! ./styles/styles.css */ "./src/styles/styles.css");

var app = new _App2.default();

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