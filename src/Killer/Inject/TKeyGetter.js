export default function spillGlobalVars() {
  const scr = document.createElement('script');
  scr.setAttribute('data-mustbedeleted','');
  const func = `function getTKey() {
    let elementToWrite = document.querySelector('[data-globalvarsstore]');
    let key = 'not_found';
    for(let keyWord in window){
      if(window[keyWord] && window[keyWord].key && (typeof window[keyWord].key).match(/string/i)) {
        key = window[keyWord].key;
      }
    }
    let globalvarsobject = {
      t_key: key
    }
    elementToWrite.value = JSON.stringify(globalvarsobject);
    let src = document.querySelector('[data-mustbedeleted]');
    src.remove();
  }`;
  const code = document.createTextNode(`(${func})()`);
  scr.appendChild(code);
  (document.body || document.head).appendChild(scr);
};