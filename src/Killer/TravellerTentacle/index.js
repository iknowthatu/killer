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

export default TravellerTentacle;