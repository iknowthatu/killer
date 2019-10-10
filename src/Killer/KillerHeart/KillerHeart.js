import EnvironmentUtils from '../../Utils/EnvironmentUtils';
import FightUtils from './../../Utils/FightUtils';
import {
  FIGHT_STATUS_VICTORY,
  FIGHT_STATUS_FAIL,
  FIGHT_STATUS_DRAW,
  FIGHT_STATUS_HARD_DRAW,
  FIGHT_STATUS_POKEMON_LOST,
  FIGHT_KILLED_COUNTER_NAME
} from '../../configs/killerConfigs';
import alarm from './../Alarm/Alarm';

class KillerHeart {
  static wrapperCall(methodName, ...args) {
    // for electron wrapper
    if (window.killerExtension && window.killerExtension[methodName]) {
      window.killerExtension[methodName](...args);
    }
  }

  static switchAlarm(value) {
    if (!value) {
      return alarm.stopPlay();
    }

    alarm.startPlay();
  }

  static async nextPulse(state) {
    const fightMode = EnvironmentUtils.isFight();
    if (!fightMode) {
      return state;
    }

    state.end(); // fight mode, don't allow another middlewares process this state

    const captchaBlockedProcess = EnvironmentUtils.isCaptchaVisible();
    if (captchaBlockedProcess) {
      console.log('u should enter captcha');
      KillerHeart.wrapperCall('sendMessage', 'captcha');
      KillerHeart.wrapperCall('shotCaptcha');
      state.settings.alarmswitch && KillerHeart.switchAlarm(true);
      return state;
    };
    KillerHeart.switchAlarm(false);

    const numberOfPermittedAttacks = FightUtils.getNumberOfPermittedAttacks(state.settings.attack);
    if (!numberOfPermittedAttacks) {
      console.log('no permitted attacks');
      return state;
    };

    const fightStatus = FightUtils.getFightStatus();
    switch (fightStatus) {
      case FIGHT_STATUS_VICTORY:
      case FIGHT_STATUS_FAIL:
      case FIGHT_STATUS_DRAW:
        if (fightStatus === FIGHT_STATUS_VICTORY) {
          state.incrementStatisticValue(FIGHT_KILLED_COUNTER_NAME);
        }

        EnvironmentUtils.closeFightLayerNode();
        return state;

      case FIGHT_STATUS_HARD_DRAW:
        console.log(`Pokemon was killed but enemy was killed too`);
        state.incrementStatisticValue(FIGHT_KILLED_COUNTER_NAME);
        EnvironmentUtils.closeFightLayerNode();
        KillerHeart.setNeedHeal(state);
        return state;

      case FIGHT_STATUS_POKEMON_LOST:
        console.log(`Pokemon was killed`);
        // EnvironmentUtils.closeFightLayerNode();
        KillerHeart.setNeedHeal(state);
        await FightUtils.changePokemon();
        return state;
    }

    if (state.settings.controlexp && !isNaN(state.settings.controlexp)) {
      const currentExp = EnvironmentUtils.getPlayerPokemonCurrentEXPpercents();
      const criticalExp = state.settings.controlexp > 90 ? state.settings.controlexp : 90;
      if (currentExp >= criticalExp) {
        return state;
      }
    }

    const currentHp = EnvironmentUtils.getPlayerPokemonCurrentHPpercents();
    const criticalHp = state.settings.controlhp > 20 ? state.settings.controlhp : 20;
    if (currentHp <= criticalHp) {
      KillerHeart.setNeedHeal(state);
    }

    // const enemyPokemonNumber = EnvironmentUtils.getEnemyPokemonNumberAsString();
    // newParams.lastPokemonNumber = enemyPokemonNumber;
    if (FightUtils.isAttackForbiddenForThisNumber(state.settings.forbiddennumbers)) {
      KillerHeart.wrapperCall('sendMessage', 'forbidden');
      return state;
    }

    const enemyIsNormal = FightUtils.isEnemyNormal();
    if (!enemyIsNormal) {
      console.log('Enemy is shine or smt else');
      // state.settings.alarmswitch &&
      KillerHeart.wrapperCall('sendMessage', 'shiny');
      KillerHeart.switchAlarm(true);

      return state;
    }

    if (FightUtils.getNumberOfPermittedAttacksPP(state.settings.attack) < 2) {
      console.log('PP is over. Need Heal');
      KillerHeart.setNeedHeal(state);
      FightUtils.usePokemonMove(state.settings.attack, { lastTry: true, attackCounter: 0 });
      return state;
    }

    FightUtils.usePokemonMove(state.settings.attack, { lastTry: true });
    return state;
  }

  static setNeedHeal(state) {
    EnvironmentUtils.turnWildPokemons(false);
    state.setParam('needHeal', true);
  }
}

export default KillerHeart;