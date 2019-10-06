import EnvironmentUtils from '../../Utils/EnvironmentUtils';

class CommonHeart {
  constructor() {
    this.init();
  }

  init() {
    this.settings = {};
    this.nextPulse = this.nextPulse.bind(this);
    this.setSettings = this.setSettings.bind(this);
  }

  nextPulse(state) {
    /*
    const newParams = { ...params };

    const isFight = EnvironmentUtils.isFight();
    //this.showLocationIds();
    newParams.isFight = isFight;

    return newParams;
    */

    return state;
  }

  /**
   * @public
   * @param {object} settings
   */
  setSettings(settings = {}) {
    this.settings = settings;
  }

  /* game Functions */
  // showLocationIds() {
  //   const locationButtons = document.querySelectorAll('#divLocGo > .button');
  //   const nextLocationButtons = Array.from(locationButtons)
  //     .forEach(locationButton => {
  //       if(locationButton.innerHTML.match(/\[id\d+\]/)) return;
  //       const btnWrapper = locationButton.outerHTML;
  //       const locationId = btnWrapper.match(/btnGo\d+/)[0].replace('btnGo','');
  //       locationButton.innerHTML += ` [id${locationId}]`;
  //       const contentWidth = locationButton.innerHTML.length * 10;
  //       if(locationButton.offsetWidth > contentWidth) return;
  //       locationButton.style.width = `${contentWidth}px`;
  //     });
  // }

  // turnAutoFight(newState) {
  //   const autofightButtonCheckbox = document.querySelector('[data-changeaction=autofight]>input');
  //   if(newState != autofightButtonCheckbox.checked) autofightButtonCheckbox.click();
  // }

  // checkingIsTeamOpenedAndLoaded() {
  //   const panelWithTeam = document.querySelector('#divDockMenu .divDockPanels');
  //   if(!panelWithTeam || panelWithTeam.style.display == 'none') return this.openTeamDiv();
  //   const teamDiv = panelWithTeam.querySelector('.divPokeTeam');
  //   if(teamDiv.classList.contains('ajxloading'))
  //   return CommonUtils.wait(1000)
  //     .then(_ => this.checkingIsTeamOpenedAndLoaded());
  // }

  // openTeamDiv() {
  //   const menuButtons = document.querySelectorAll('#divDockMenu .divDockIn .icon');
  //   if(menuButtons.length < 1) return;
  //   menuButtons[1].click();
  //   return CommonUtils.wait(1000)
  //     .then(_ => this.checkingIsTeamOpenedAndLoaded());
  // }

}

export default CommonHeart;