let settingsViewHtml = `<div class="killerSettings__wrapper">
<div class="killerSettings__topPanel"></div>
<div class="killerSettings__controlPanel">
  <div class="killerSettings__controlPanelRow">
    <div class="killerSettings__controlPanelCell">
      <label class="killerSettings__row" data-changeaction="showpokemons">
        <span>Show pokemons:</span>
        <input type="checkbox" />
      </label>
      <label class="killerSettings__row killerSettings__row--innerColumn" data-changeaction="forbiddennumbers">
        <span>Forbidden numbers:</span>
        <textarea></textarea>
      </label>
      <label class="killerSettings__row killerSettings__row--innerColumn">
        <span>Counter of killed wild pokemons:</span>
        <input type="text" disabled class="killerSettings__input killerSettings__input--max" data-view="killedwild"/>
      </label>
      <label class="killerSettings__row" data-changeaction="controlexp">
        <span>EXP control, %:</span>
        <input type="text" class="killerSettings__input" />
      </label>
    </div>
    <div class="killerSettings__controlPanelCell">
      <label class="killerSettings__row" data-changeaction="autoheal">
        <span>Auto heal:</span>
        <input type="checkbox" />
      </label>
      <label class="killerSettings__row killerSettings__row--innerColumn" data-changeaction="waytoheal">
        <span>Way to healing:</span>
        <textarea></textarea>
      </label>
      <label class="killerSettings__row" data-changeaction="controlhp">
        <span>HP control, %:</span>
        <input type="text" class="killerSettings__input" />
      </label>
    </div>
  </div>
  <div class="killerSettings__controlPanelRow">
    <div class="killerSettings__controlPanelCell">
      <label class="killerSettings__row" data-changeaction="alarmswitch">
        <span>Alarm:</span>
        <input type="checkbox" />
      </label>
      <label class="killerSettings__row" data-changeaction="alarmvolume">
        <span>Alarm volume (0-100):</span>
        <input class="killerSettings__input killerSettings__input--min" type="text" value="10" />
      </label>
      <label class="killerSettings__row killerSettings__row--innerColumn" data-changeaction="alarmsrc" style="display:none">
        <span>Alarm source:</span>
        <input class="killerSettings__input killerSettings__input--max" type="text" />
      </label>
    </div>
    <div class="killerSettings__controlPanelCell">
      <label class="killerSettings__row" data-changeaction="showiv">
        <span>Show IV HP:</span>
        <input type="checkbox" />
      </label>
      <label class="killerSettings__row" data-changeaction="autocatch">
        <span>Autocatch:</span>
        <input type="checkbox" />
      </label>
      <label class="killerSettings__row killerSettings__row--innerColumn" data-changeaction="autocatchsettings">
        <textarea></textarea>
      </label>
    </div>
  </div>
  <div class="killerSettings__controlPanelRow">
    <button class="button">Save</button>
  </div>
</div>
</div>`;

class SettingsContainer {
  constructor() {
    this.init();
  }

  init() {
    this.mainWrapper = this.createView();
      this.topPanel = this.mainWrapper.querySelector('.killerSettings__topPanel');
      this.controlPanel = this.mainWrapper.querySelector('.killerSettings__controlPanel');

    this.addTopPanelDragListeners();

    this.changeListeners = {};

    this.controlPanel.addEventListener(
      'change',
      (evt)=>{this.controlPanelChangeListener(evt);}
    );
  }

  createView() {
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = settingsViewHtml;
    return tempDiv.firstChild;
  }

  getMainContainerElement() {
    return this.mainWrapper;
  }

  addTopPanelDragListeners() {
    let panel = this.topPanel;
    let moveFlag = false;
    panel.addEventListener('mousedown', ()=>moveFlag=true);
    panel.addEventListener('mouseup', ()=>moveFlag=false);
    document.body.addEventListener('mousemove',(evt)=>{
      if(!moveFlag) return;
      let newTop = evt.pageY - 2*panel.offsetHeight/3;
      this.mainWrapper.style.top = `${newTop}px`;
      let newLeft = evt.pageX - this.mainWrapper.offsetWidth/2;
      this.mainWrapper.style.left = `${newLeft}px`;
    });
  }

  controlPanelChangeListener(evt) {
    if(evt.target.tagName == 'TEXTAREA' || evt.target.tagName == 'INPUT'){
      let changedAction = evt.target.parentNode.dataset['changeaction'];
      if(changedAction == 'forbiddennumbers' ||
         changedAction == 'waytoheal' ||
         changedAction == 'controlhp' ||
         changedAction == 'controlexp' ||
         changedAction == 'autocatchsettings' ||
         changedAction == 'alarmvolume' ||
         changedAction == 'alarmsrc') {
        if(!this.changeListeners[changedAction]) return;
        this.changeListeners[changedAction](evt.target.value);
      }
      if(changedAction == 'showpokemons' ||
         changedAction == 'autoheal' ||
         changedAction == 'showiv' ||
         changedAction == 'autocatch' ||
         changedAction == 'alarmswitch' ) {
        if(!this.changeListeners[changedAction]) return;
        this.changeListeners[changedAction](evt.target.checked);
      }
    }
  }

  /* funcs for setting listeners */
  setChangeListener(type, listener) {
    this.changeListeners[type] = listener;
  }
}

export default SettingsContainer;