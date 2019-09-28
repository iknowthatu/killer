import EnvironmentUtils from '../../Utils/EnvironmentUtils';

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
      EnvironmentUtils.turnWildPokemons(true);
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

export default HealerHeart;