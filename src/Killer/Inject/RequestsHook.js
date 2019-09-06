function createRequestsCatcher() {
  const GLOBAL_HTML_STORE_SELECTOR = '[data-globalvarsstore]';
  let tempStore = '{}';

  function getOldInfo() {
    const store = document.querySelector(GLOBAL_HTML_STORE_SELECTOR);
    if (!store) {
      return JSON.parse(tempStore);
    }
    const oldInfo = store.value ? JSON.parse(store.value) : JSON.parse(tempStore);
    return oldInfo;
  }

  function saveInfoToStore(infoData) {
    const store = document.querySelector(GLOBAL_HTML_STORE_SELECTOR);
    if (!store) {
      tempStore = JSON.stringify(infoData);
      return;
    }
    store.value = JSON.stringify(infoData);
  }

  function parseResponse(request) {
    try {
      const responseBody = JSON.parse(request.response);
      const info = getOldInfo();
      if (responseBody.object) {
        const obj = responseBody.object;
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

        const side = obj.fight && obj.fight.side || obj.side;
        if (side) {
          info.enemyHP = side.H.poke.hp || info.enemyHP;
          info.playerPokHP = side.I.poke.hp || info.playerPokHP;
          info.playerPokMaxHP = side.I.poke.hp_max || info.playerPokMaxHP;
          info.playerPokExp = side.I.poke.exp.cur || info.playerPokExp;
          info.playerPokNextExp = side.I.poke.exp.next || info.playerPokNextExp;
          info.playerPokPrevExp = side.I.poke.exp.prev || info.playerPrevExp;
          info.playerMovesPP = side.I.poke.moves && isNaN(side.I.poke.moves) &&
            Object.values(side.I.poke.moves)
              .filter(_ => !!_).map(move => ({ pp: move.pp, maxpp: move.pp_max })) || info.playerMovesPP;
        }

        saveInfoToStore(info);
      }
    } catch(err) {
      console.log('Error getting response', err);
      console.log('Request:', {...request});
      console.log('Response:', JSON.stringify(request.response, null, 2));
    }
  }

  const origOpen = XMLHttpRequest.prototype.open;
  const origSend = XMLHttpRequest.prototype.send;
  const exampleRequest = {};
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
}

export default function createRequestsHook() {
  const scriptNode = document.createElement('script');
  const code = document.createTextNode(`(${createRequestsCatcher.toString()})()`);
  scriptNode.appendChild(code);
  (document.body || document.head).appendChild(scriptNode);
}