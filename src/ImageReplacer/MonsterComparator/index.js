import {
  POKEMON_IMAGES_HOST_NORMAL,
  POKEMON_IMAGES_HOST_SHINE,
  POKEMON_NAMES_FILEPATH
} from './../../configs/monsterComparatorConfigs';

import {
  SELECTOR_INLINE_POKEMON,
  SELECTOR_INLINE_POKEMON_IMAGE,
  SELECTOR_TINY_POKEMON_CARDS,
  SELECTOR_POKEMON_CARDS,
  SELECTOR_POKEDEX_POKEMON_CARD,
  SELECTOR_POKEDEX_POKEMON_TITLE
} from './../../configs/querySelectors';

const ATTRIBUTE_FLAG_DATA_WAS_CHANGED = 'data-changed';

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
      this.normalHost = POKEMON_IMAGES_HOST_NORMAL;
      this.shineHost = POKEMON_IMAGES_HOST_SHINE;
      this.pokemons = [];
      this.pokemonsDataSrc = params.pokemonsDataSrc || POKEMON_NAMES_FILEPATH;

      this.loadPokemonsData(this.pokemonsDataSrc);
  }

  loadPokemonsData(pokemonsDataSrc) {
    return fetch(chrome.runtime.getURL(pokemonsDataSrc))
      .then(response => response.json())
      .then(data => this.pokemons = data);
  }

  getOldGoodPokemonImageSrc(pokemonNumber, isShine = false) {
    const host = isShine ? this.shineHost : this.normalHost;

    return `${host}${pokemonNumber}.png`;
  }

  getPokemonNameByNumber(pokemonNumber) {
    const pokemonFromData = this.pokemons.find(pokemon => pokemon.number == pokemonNumber);
    if (!pokemonFromData) {
      return `i don't know this pokemon`;
    }

    return pokemonFromData.name;
  }

  getPokemonNumberString(number = 0) {
    if(+number > 806) return 0;

    return (number).toString().padStart(3, '0');
  }

  /* inline pokemons */

  getInlinePokemonsNodes() {
    const inlinePokemonsNodes = document.querySelectorAll(SELECTOR_INLINE_POKEMON);
    return inlinePokemonsNodes;
  }

  getInlinePokemonNumber(inlinePokemonNode) {
    const attributeWithPokemonNumber = inlinePokemonNode.getAttribute('onclick') || '';
    const numberRegExpResult = attributeWithPokemonNumber.match(/'(\d+)'/); // onclick="Exp.Dex_poke('109', 1)"
    const number = numberRegExpResult != null ? this.getPokemonNumberString(numberRegExpResult[1]) : 0;

    return number;
  }

  isInlinePokemonShine(inlinePokemonNode) {
    const attributeWithIsShineInfo = inlinePokemonNode.getAttribute('onclick');
    const shineRegExpResult = attributeWithIsShineInfo.match(/\('(\d+)',[^\d]*?(\d+)\)/);  // onclick="Exp.Dex_poke('109', 1)"
    const isShine = +shineRegExpResult[2] === 1;

    return isShine;
  }

  changeInlinePokemonImage(inlinePokemonNode, pokemonNumber, isShine = false) {
    const realPokemonImage = this.makeOldGoodPokemonImage(pokemonNumber, isShine);
    const monsterImage = inlinePokemonNode.querySelector(SELECTOR_INLINE_POKEMON_IMAGE);
    if (monsterImage) {
      monsterImage.style.display = 'none';
    }
    const lastChild = inlinePokemonNode.lastChild;
    if (!lastChild) {
      inlinePokemonNode.appendChild(realPokemonImage);
    } else {
      inlinePokemonNode.insertBefore(realPokemonImage, lastChild);
    }
    realPokemonImage.classList.add('pk');
    realPokemonImage.style.maxHeight = '2rem';
  }

  changeInlinePokemonName(inlinePokemonNode, pokemonNumber) {
    const realPokemonName = this.getPokemonNameByNumber(pokemonNumber);
    const oldNameNode = inlinePokemonNode.lastChild;
    oldNameNode.textContent = realPokemonName;
  }

  changeInlinePokemonItemNameAndImage(inlinePokemonNode) {
    const pokemonNumber = this.getInlinePokemonNumber(inlinePokemonNode);
    if(!pokemonNumber) {
      return;
    }
    const isShine = this.isInlinePokemonShine(inlinePokemonNode);
    this.changeInlinePokemonImage(inlinePokemonNode, pokemonNumber, isShine);
    this.changeInlinePokemonName(inlinePokemonNode, pokemonNumber);
    inlinePokemonNode.setAttribute(ATTRIBUTE_FLAG_DATA_WAS_CHANGED, '');
  }

  changeInlinePokemonsNamesAndImages(inlinePokemonsNodes) {
    inlinePokemonsNodes.forEach(inlinePokemonNode => {
      this.changeInlinePokemonItemNameAndImage(inlinePokemonNode);
    });
  }

  changeInlinePokemons() {
    const inlinePokemonsNodes = this.getInlinePokemonsNodes();
    this.changeInlinePokemonsNamesAndImages(inlinePokemonsNodes);
  }

    /* tiny Cards */

  findAllTinyCardsNodes() {
    return document.querySelectorAll(SELECTOR_TINY_POKEMON_CARDS);
  }

  getTinyCardNumber(tinyCardNode) {
    const monsterImage = tinyCardNode.querySelector('.image');
    if (!monsterImage) {
      return;
    }
    const numberRegExpResult = monsterImage.src.match(/\d{3}/);
    const pokemonNumber = numberRegExpResult ? this.getPokemonNumberString(numberRegExpResult[0]) : 0;

    return pokemonNumber;
  }

  insertImageInTinyCard(tinyCardNode, realPokemonImage) {
    realPokemonImage.classList.add('image');

    const monsterImage = tinyCardNode.querySelector('.image');
    if (!monsterImage) {
      return;
    }
    monsterImage.style.display = 'none';

    const imageParentNode = monsterImage.parentNode;
    imageParentNode.insertBefore(realPokemonImage, monsterImage);
    if (!realPokemonImage.parentNode.classList.contains('pokemonBoxTiny')) {
      realPokemonImage.style = 'margin-top: 0; width: 100%; height: 100%;';
    }
  }

  changeNameInTinyCard(tinyCardNode, pokemonNumber) {
    const pokemonName = this.getPokemonNameByNumber(pokemonNumber);
    const nameNode = tinyCardNode.querySelector('.name');
    if (!nameNode) {
      return;
    }
    const nameTextNode = Array.from(nameNode.childNodes).find(child => child.nodeType == 3 && child.textContent.match(/#\d+/));
    nameTextNode.textContent = `#${pokemonNumber} ${pokemonName}`;
  }

  isTinyCardShine(tinyCardNode) {
    const tinyPokeCardImageNode = tinyCardNode.querySelector('.image');
    const shineRegExpResult = tinyPokeCardImageNode.src.match(/shine/);

    return shineRegExpResult != null;
  }

  changeTinyCardsImagesAndNames(tinyCardsNodes) {
    tinyCardsNodes.forEach(tinyCardNode => {
      const pokemonNumber = this.getTinyCardNumber(tinyCardNode);
      if (!pokemonNumber) {
        return;
      }
      const isShine = this.isTinyCardShine(tinyCardNode);
      const image = this.makeOldGoodPokemonImage(pokemonNumber, isShine);
      this.insertImageInTinyCard(tinyCardNode, image);
      this.changeNameInTinyCard(tinyCardNode, pokemonNumber);
      tinyCardNode.setAttribute(ATTRIBUTE_FLAG_DATA_WAS_CHANGED, '');
    });
  }

  changeTinyCards() {
    const tinyCardsNodes = this.findAllTinyCardsNodes();
    this.changeTinyCardsImagesAndNames(tinyCardsNodes);
  }

    /* pokemon Cards */

  isPokemonInCardShine(pokemonCardNode) {
    const pokemonImageNode = pokemonCardNode.querySelector('.image > img');
    if (!pokemonImageNode) {
      return false;
    }
    const isShine = !!pokemonImageNode.src.match(/shine/);

		return isShine;
  }

	getPokemonNumberForCards(pokemonBoxCardNode) {
    const pokemonImageNode = pokemonBoxCardNode.querySelector('.image > img');
    if (!pokemonImageNode) {
      return 0;
    }

    const numberRegExpResult = pokemonImageNode.src.match(/\d{3}/);
    const pokemonNumber = numberRegExpResult ? this.getPokemonNumberString(numberRegExpResult[0]) : 0;

		return pokemonNumber;
  }

  findAllPokemonsInCards() {
    return document.querySelectorAll(SELECTOR_POKEMON_CARDS);
	}

	makeOldGoodPokemonImage(pokemonNumber, isShine = false) {
		const image = new Image();
		image.src = this.getOldGoodPokemonImageSrc(pokemonNumber, isShine);
    image.classList.add('leagueHelper__pokemon-image');

		return image;
	}

	insertOldGoodPokemonImageForCards(pokemonBoxCardNode, pokemonImage) {
    const pokemonImageWrapperNode = pokemonBoxCardNode.querySelector('.image');
    if (!pokemonImageWrapperNode) {
      return;
    }
		pokemonImageWrapperNode.appendChild(pokemonImage);
	}

	hideOldNonameImageForCards(pokemonBoxCardNode) {
    const pokemonImageNode = pokemonBoxCardNode.querySelector('.image > img');
    if (!pokemonImageNode) {
      return;
    }
		pokemonImageNode.style.display = 'none';
  }

  changePokemonNameInCard(pokemonCardNode, pokemonName) {
    const pokeTitleNode = pokemonCardNode.querySelector('.title > .name');
    if (!pokeTitleNode) {
      return;
    }
    pokeTitleNode.innerHTML = pokemonName;
    if (pokemonCardNode.getAttribute('data-name-watcher') !== null) {
      return;
    }
    pokemonCardNode.addEventListener(
      'click',
      () => {
        if (pokeTitleNode.innerHTML !== pokemonName) {
          pokeTitleNode.innerHTML = pokemonName;
        }
      }
    );
    pokemonCardNode.setAttribute('data-name-watcher', '');
  }

	showRealPokemonsForCards(pokemonsCardsNodes) {
		pokemonsCardsNodes.forEach(pokemonCardNode => {
      const pokemonNumber = this.getPokemonNumberForCards(pokemonCardNode);
      if (!pokemonNumber ||
        !Number.isInteger(+pokemonNumber) ||
        this.isComparasionAlreadyDidForCards(pokemonCardNode)) {
        return;
      }
      const isShine = this.isPokemonInCardShine(pokemonCardNode);
      const realPokemonImage = this.makeOldGoodPokemonImage(pokemonNumber, isShine);
      this.hideOldNonameImageForCards(pokemonCardNode);
      this.insertOldGoodPokemonImageForCards(pokemonCardNode, realPokemonImage);
      const pokemonName = this.getPokemonNameByNumber(pokemonNumber);
      this.changePokemonNameInCard(pokemonCardNode, pokemonName);
      pokemonCardNode.setAttribute(ATTRIBUTE_FLAG_DATA_WAS_CHANGED,'');
		});
  }

	isComparasionAlreadyDidForCards(pokemonBoxCardNode) {
    const pokemonImagesNodes = pokemonBoxCardNode.querySelectorAll('.image > img');

		return pokemonImagesNodes.length > 1;
  }

  changeAllPokemonCards() {
    const pokemonsCardsNodes = this.findAllPokemonsInCards();
    this.showRealPokemonsForCards(pokemonsCardsNodes);
  }

    /* search in pokedex */

  findPokemonInPokedex() {
    const pokedexImageNode = document.querySelector(SELECTOR_POKEDEX_POKEMON_CARD);
    if (pokedexImageNode === null ||
        pokedexImageNode.getAttribute(ATTRIBUTE_FLAG_DATA_WAS_CHANGED) !== null) {
      return null;
    }

    return pokedexImageNode;
  }

  getPokemonNumberInPokedex(pokemonImageBoxNode) {
    const numberRegExpResult = pokemonImageBoxNode.style.backgroundImage.match(/\d{3}/);
    const number = numberRegExpResult ? this.getPokemonNumberString(+numberRegExpResult[0]) : 0;

    return number;
  }

  changePokedexTitle(pokemonNumber) {
    const pokedexTitleNode = document.querySelector(SELECTOR_POKEDEX_POKEMON_TITLE);
    if (pokedexTitleNode === null) {
      return;
    }
    const pokemonName = this.getPokemonNameByNumber(pokemonNumber);
    pokedexTitleNode.innerHTML = `#${pokemonNumber} ${pokemonName}`;
  }

  isShineInPokedex(pokemonImageNode) {
    return !!pokemonImageNode.style.backgroundImage.match(/shine/);
  }

  changePokedex() {
    const pokemonImageNode = this.findPokemonInPokedex();
    if (pokemonImageNode === null) {
      return;
    }

    const pokemonNumber = this.getPokemonNumberInPokedex(pokemonImageNode);
    if (!pokemonNumber) {
      return;
    }
    const isShine = this.isShineInPokedex(pokemonImageNode);
    const realPokemonImageUrl = this.getOldGoodPokemonImageSrc(pokemonNumber, isShine);
    pokemonImageNode.style.backgroundImage = `url("${realPokemonImageUrl}")`;
    pokemonImageNode.style.backgroundSize = `100% 100%`;
    pokemonImageNode.setAttribute(ATTRIBUTE_FLAG_DATA_WAS_CHANGED, '');

    this.changePokedexTitle(pokemonNumber);
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