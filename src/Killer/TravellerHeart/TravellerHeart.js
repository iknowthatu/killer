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
    if (!params.needMove) {
      newParams.nextLocationNumber = null;
      newParams.direction = 'fwd';
      newParams.waySource = '';
      newParams.prevLocationWays = null;
      newParams.destinationReached = false;
    }

    if (params.isFight || !params.needMove || newParams.destinationReached) {
      return newParams;
    }

    if (params.prevLocationWays !== null && !this.isPlaceWasChanged(params.prevLocationWays)) {
      return newParams;
    }

    const wayChain = this.getWay(params.waySource, params.direction);
    const locationNumber = params.nextLocationNumber !== null ? params.nextLocationNumber : 0;

    if (locationNumber >= wayChain.length) {
      newParams.nextLocationNumber = 0;
      newParams.destinationReached = true;
      return newParams;
    }

    newParams.nextLocationNumber = locationNumber + 1;
    newParams.prevLocationWays = this.goToLocation(wayChain[locationNumber]);

    return newParams;
  }

  getWay(waytoheal, direction) {
    if (!waytoheal) {
      return 1; //no input value or empty
    }
    let way = direction == 'fwd' ? waytoheal.match(/([^]+?)\//) : waytoheal.match(/\/([^]+)/);

    if (!way) {
      return 2; // no slash in input value
    }
    way = way[1].split(';').map(wayStep => wayStep.trim()).filter(wayStep => !!wayStep);

    return way;
  }

  static getLocationButtons() {
    return document.querySelectorAll('#divLocGo > .button');
  }

  goToLocation(locationName) {
    let locationNumber = locationName.match(/\s+\d+/);
    if (locationNumber) {
      locationName = locationName.replace(/\s+\d+/, '');
    }

    locationNumber = locationNumber && !isNaN(parseInt(locationNumber[0])) && parseInt(locationNumber[0]) || 0;
    const locationButtonsNodes = TravellerHeart.getLocationButtons();
    if (locationButtonsNodes.length < 1) {
      console.log('There is no exit');
      throw 'No exit here';
    }

    const nextLocationButtons = Array.from(locationButtonsNodes)
      .filter(locationButtonNode => locationButtonNode.innerHTML.match(new RegExp(locationName, 'i')));

    if (nextLocationButtons.length < 1) {
      console.log(`no such place: ${locationName}`);
      throw `no such place: ${locationName}`;
    }

    const nextLocationButton = nextLocationButtons[locationNumber];
    nextLocationButton.click();

    return locationButtonsNodes;
  }

  isPlaceWasChanged(oldLocationButtonsNodes) {
    const locationButtonsNodes = TravellerHeart.getLocationButtons();
    if (oldLocationButtonsNodes.length !== locationButtonsNodes.length) {
      return true;
    }

    for (let i = 0, length = oldLocationButtonsNodes.length; i < length; i++) {
      // @TODO seems this zero should be 'i' ?
      const locationIdForOldButton = oldLocationButtonsNodes[0].outerHTML.match(/btnGo\d+/).toString();
      const locationIdForNewButton = locationButtonsNodes[0].outerHTML.match(/btnGo\d+/).toString();
      if (locationIdForNewButton !== locationIdForOldButton) {
        return true;
      }
    }

    return false;
  }
}

export default TravellerHeart;