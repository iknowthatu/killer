import EnvironmentUtils from '../../Utils/EnvironmentUtils';
import CommonUtils from '../../Utils/CommonUtils';

class HealerHeart {
  static getWayToPC(state) {
    const WAY_TO_PC_REGEXP = /[^/]*/;
    const wayToPcRegExpResult = state.settings.waytoheal.match(WAY_TO_PC_REGEXP);
    return wayToPcRegExpResult ? wayToPcRegExpResult[0] : '';
  }

  static getWayFromPC(state) {
    const WAY_FROM_PC_REGEXP = /\/([^]*)/;
    const wayToPcRegExpResult = state.settings.waytoheal.match(WAY_FROM_PC_REGEXP);
    return wayToPcRegExpResult ? wayToPcRegExpResult[1] : '';
  }

  static async nextPulse(state) {
    const needHeal = state.getParam('needHeal');
    if (!needHeal || !state.settings.autoheal) {
      return state;
    }

    if (!EnvironmentUtils.isPokecenter()) {
      state.setParam('moving', true);
      state.setParam('way', HealerHeart.getWayToPC(state));
      return state;
    }

    await HealerHeart.healAll();
    state.setParam('needHeal', false);
    state.setParam('moving', true);
    state.setParam('turnOnWild', true);
    state.setParam('way', HealerHeart.getWayFromPC(state));
    return state;
  }

  /* healing commands */
  static async healAll() {
    const healLink = 'https://game.league17.ru/do/pc/heal/poke';
    const params = [{ key:'vars', value: 0 }];
    const healResponseChecker = response => {
      if (!response || !response.alerten || response.alerten.type !== 'success') {
        //console.log(response.alerten);
        throw 'Error healing';
      }
      return true;
    };

    const healResponse = await CommonUtils.sendRequest(healLink, params);
    healResponseChecker(healResponse);
    return await HealerHeart.isTeamRestored();
  }

  static async isTeamRestored() {
    const teamRestoringChecker = teamCheckResponse => {
      const team = teamCheckResponse.object;
      const teamNotRestored = team.some(pokemon => {
        if (pokemon.hp < pokemon.hp_max) {
          return true;
        }

        const moves = Object.values(pokemon.moves);
        return moves.some(move => {
          if (!move) {
            return false;
          }

          return move.pp < move.pp_max;
        });
      });

      return !teamNotRestored;
    };

    const teamLoadResponse = await CommonUtils.sendRequest('https://game.league17.ru/do/pokes/load/team');
    return teamRestoringChecker(teamLoadResponse);
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
