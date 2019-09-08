import PokemonReplacer from './../ImageReplacer';
import Killer from './../Killer/Killer.js';

class KillerApp {
  constructor() {
    this.init();
  }

  init() {
    const replacer = new PokemonReplacer();
    console.info('Image replacer was loaded');
    const killer = new Killer(replacer);
		console.info('Killer was loaded');
  }
}

export default KillerApp;
