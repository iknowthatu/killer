import EnvironmentUtils from '../../Utils/EnvironmentUtils';

class TravellerHeart {
  static nextPulse(state) {
    const moving = state.getParam('moving');

    if (!moving) {
      return state;
    }

    state.end();

    const way = state.getParam('way');
    const locationInfo = {
      next: {},
      current: { position: -1 },
      previous: {},
      ...state.getParam('locationInfo')
    };
    locationInfo.current.hash = EnvironmentUtils.getLocationInfoByAvailableTransitions();

    if (locationInfo.current.hash === locationInfo.previous.hash) {
      locationInfo.current = {...locationInfo.previous};
      locationInfo.previous = {};
      state.setParam('locationInfo', locationInfo);
      return state;
    }

    const wayChain = TravellerHeart.getWaySteps(way);
    const nextLocationPositionInWayChain = locationInfo.current.position + 1;
    locationInfo.next.position = nextLocationPositionInWayChain;

    if (nextLocationPositionInWayChain >= wayChain.length) {
      console.log('place was reached');
      state = TravellerHeart.finishTravelling(state);
      return state;
    }

    TravellerHeart.goToLocation(wayChain[nextLocationPositionInWayChain]);
    locationInfo.previous = {...locationInfo.current};
    locationInfo.current = {...locationInfo.next};
    state.setParam('locationInfo', locationInfo);

    return state;
  }

  static finishTravelling(state) {
    state.setParam('moving', false);
    state.removeParam('locationInfo');
    if (state.getParam('turnOnWild')) {
      EnvironmentUtils.turnWildPokemons(true);
      state.removeParam('turnOnWild');
    }

    return state;
  }

  static getWaySteps(way) {
    if (!way) {
      return []; // no input value or empty
    }

    return way.split(';')
      .map(wayStep => wayStep.trim())
      .filter(wayStep => !!wayStep);
  }

  static goToLocation(locationName) {
    let locationNumber = locationName.match(/\s+\d+/) || [0]; // for locations with similar names
    locationNumber = parseInt(locationNumber[0]);
    locationName = locationName.replace(/\s+\d+/, '');

    const locationButtonsNodes = EnvironmentUtils.getLocationButtons();
    if (locationButtonsNodes.length < 1) {
      console.log('There is no exit. HELP!!!');
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
  }
}

export default TravellerHeart;