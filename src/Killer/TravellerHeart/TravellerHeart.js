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
    const newParams = {...params};
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

    const wayChain = this.getWay(params.waySource, params.direction);
    const locationNumber = params.nextLocationNumber != null ? params.nextLocationNumber : 0;

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
    const locationButtons = document.querySelectorAll('#divLocGo > .button');
    if(locationButtons.length < 1) {
      console.log('There is no exit');
      throw 'No exit here';
    }

    const nextLocationButtons = Array.from(locationButtons)
      .filter(locationButton => locationButton.innerHTML.match(new RegExp(locationName, 'i')));

    if(nextLocationButtons.length < 1) {
      console.log(`no such place: ${locationName}`);
      throw `no such place: ${locationName}`;
    }

    //console.log(`nextLoc: ${locationNumber}`, nextLocationButtons);
    const nextLocationButton = nextLocationButtons[locationNumber];
    //console.log(`nextLocBtn:`, nextLocationButton);
    nextLocationButton.click();

    return locationButtons;
  }

  isPlaceWasChanged(oldLocationButtons) {
    const locationButtons = document.querySelectorAll('#divLocGo > .button');
    if(oldLocationButtons.length != locationButtons.length) return true;

    for(let i = 0; i < oldLocationButtons.length; i++) {
      const locationIdForOldButton = oldLocationButtons[0].outerHTML.match(/btnGo\d+/).toString();
      const locationIdForNewButton = locationButtons[0].outerHTML.match(/btnGo\d+/).toString();
      if(locationIdForNewButton != locationIdForOldButton) return true;
    }

    return false;
  }
}

export default TravellerHeart;