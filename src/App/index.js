import PokemonReplacer from './../ImageReplacer';
import Killer from './../Killer';

class KillerApp {
  constructor() {
    this.init();
  }

  init() {
    let replacer = new PokemonReplacer();
    console.info('Image replacer was loaded');
    let killer = new Killer(replacer);
		console.info('Killer was loaded');
  }
}

export default KillerApp;
