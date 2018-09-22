let killerHtml = `<div class="killer__wrapper">
  <div class="killer__topPanel"></div>
  <div class="killer__controlPanel">
    <label class="killer__controlPanelLabel killer__controlPanelLabel--row" data-changeaction="autofight">
      <input type="checkbox" />
      <span>AF</span>
    </label>
    <label class="killer__controlPanelLabel killer__controlPanelLabel--halfRow" data-changeaction="attack" data-attacknumber="1">
      <input type="checkbox" />
      <span>Attack 1</span>
    </label>
    <label class="killer__controlPanelLabel killer__controlPanelLabel--halfRow" data-changeaction="attack" data-attacknumber="2">
      <input type="checkbox" />
      <span>Attack 2</span>
    </label>
    <label class="killer__controlPanelLabel killer__controlPanelLabel--halfRow" data-changeaction="attack" data-attacknumber="3">
      <input type="checkbox" />
      <span>Attack 3</span>
    </label>
    <label class="killer__controlPanelLabel killer__controlPanelLabel--halfRow" data-changeaction="attack" data-attacknumber="4">
      <input type="checkbox">
      <span>Attack 4</span>
    </label>
    <div class="killer__controlPanelCell" data-action="showsettings">
      <button class="button">Settings</button>
    </div>
  </div>
  <input data-globalvarsstore="" type="hidden" value="">
</div>`;


class KillerContainer {
  constructor() {
    this.init();
  }

  createView() {
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = killerHtml;
    return tempDiv.firstChild;
  }

  init() {
    this.mainContainer = this.createView();
      this.topPanel = this.mainContainer.querySelector('.killer__topPanel');
      this.controlPanel = this.mainContainer.querySelector('.killer__controlPanel');
      this.globalVarsStore = this.mainContainer.querySelector('[data-globalvarsstore]');

    this.addTopPanelDragListeners();

    this.controlPanel.addEventListener(
      'click',
      (evt)=>{this.controlPanelClickListener(evt);}
    );
  }

  createTopPanel() {
    let topPanel = document.createElement('div');
      topPanel.classList.add('killerMainContainer__topPanel');
    return topPanel;
  }

  createHiddenInputForGlobalVars() {
    let hiddenDB = document.createElement('input');
    hiddenDB.setAttribute('data-globalvarsstore','');
    hiddenDB.type = 'hidden';
    return hiddenDB;
  }

  addTopPanelDragListeners() {
    let panel = this.topPanel;
    let moveFlag = false;
    panel.addEventListener('mousedown', ()=>moveFlag=true);
    panel.addEventListener('mouseup', ()=>moveFlag=false);
    document.body.addEventListener('mousemove',(evt)=>{
      if(!moveFlag) return;
      let newTop = evt.pageY - 2*this.topPanel.offsetHeight/3;
      this.mainContainer.style.top = `${newTop}px`;
      let newLeft = evt.pageX - this.mainContainer.offsetWidth/2;
      this.mainContainer.style.left = `${newLeft}px`;
    });
  }

  getMainContainerElement() {
    return this.mainContainer;
  }

  controlPanelClickListener(evt) {
    if(evt.target.tagName == 'INPUT'){
      let changedAction = evt.target.parentNode.dataset['changeaction'];
      if(changedAction == 'autofight') {
        if(!this.autoFightStatusChangedListener) return;
        this.autoFightStatusChangedListener(evt.target.checked);
      }
      if(changedAction == 'attack') {
        if(!this.attackStatusChangedListener) return;
        let changedAttackNumber = evt.target.parentNode.dataset['attacknumber'];
        this.attackStatusChangedListener(evt.target.checked, changedAttackNumber);
      }
    }
    if(evt.target.tagName == 'BUTTON') {
      let action = evt.target.parentNode.dataset['action'];
      if(action == 'showsettings') {
        if(!this.settingsButtonClickListener) return;
        this.settingsButtonClickListener();
      }
    }
  }

  setAutoFightStatusChangedListener(listener) {
    this.autoFightStatusChangedListener = listener;
  }

  setAttackStatusChangedListener(listener) {
    this.attackStatusChangedListener = listener;
  }

  setSettingsClickListener(listener) {
    this.settingsButtonClickListener = listener;
  }
}

export default KillerContainer;