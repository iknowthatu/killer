export class FSM_StateTransition {
  constructor() {
    this.conditions = [];
    this.targetStateName = null;
    this.priority = 0;
    // this.actionsBeforeTransition = [];
  }

  addCondition(condition) {
    this.conditions.push(condition);
  }
}

export class FSM_State {
  constructor(name) {
    if (!name) throw new Error('Name is mandatory parameter');

    this.transitions = [];
    this.name = name;
    this.isInitial = false;
    this.isFinal = false;
    this.action = null;
  }

  addTransition(transition) {
    this.transitions.push(transition);
  }
}

export class FSM {
  constructor() {
    this.states = [];
    this.initialState = null;
    this.currentState = null;
  }

  addState(state) {
    if (state.isInitial) {
      this.initialState = state;
      this.currentState = state;
    }

    this.states.push(state);
  }

  async step(state = this.currentState) {
    if (!state) {
      throw new Error('No initial state');
    }

    await state.action && state.action.call(this);

    const transitionToNextState = this.getTransitionToNextState(state);
    if (transitionToNextState) {
      this.currentState = this.getStateByName(transitionToNextState.targetStateName);
    }
  }

  getStateByName(stateName) {
    return this.states.find(state => state.name === stateName);
  }

  getTransitionToNextState(state) {
    let transitionToNextState;
    let possibleTransitions = state.transitions
      .filter(transition => transition.conditions
        .some(condition => condition.call(this)));

    possibleTransitions.forEach(transition => {
      if(!transitionToNextState || transition.priority > transitionToNextState.priority) {
        transitionToNextState = transition;
      }
    });

    return transitionToNextState;
  }
}
