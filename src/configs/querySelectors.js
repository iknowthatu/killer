export const SELECTOR_FIGHT_POKEMON_PANEL_PLAYER = '#divFightI';
export const SELECTOR_FIGHT_POKEMON_PANEL_ENEMY = '#divFightH';
export const SELECTOR_MENU_PANELS = '#divDockMenu > .divDockPanels';
export const SELECTOR_POKE_CARDS = '#divPokeCard'; // i don't remember what is it
export const SELECTOR_POKEDEX_PANEL = '#divPokedex';
export const SELECTOR_NURSERY_PANEL = '.divDialog';

export const SELECTOR_INLINE_POKEMON = '.intextpoke:not([data-changed])';
export const SELECTOR_INLINE_POKEMON_IMAGE = '.pk';
export const SELECTOR_TINY_POKEMON_CARDS = '.pokemonBoxTiny:not([data-changed])';
export const SELECTOR_POKEMON_CARDS = '.pokemonBoxCard:not([data-changed])';

export const SELECTOR_POKEDEX_POKEMON_CARD = '#divPokedex .imagebox';
export const SELECTOR_POKEDEX_POKEMON_TITLE = '#divPokedex .params > .title';

export const SELECTOR_FIGHT_VIEW = '#divVisioFight';
export const SELECTOR_CAPTCHA = '#divFightCaptcha';
export const SELECTOR_FIGHT_STATUS = '#divFightAction';
export const SELECTOR_FIGHT_DUMMY_POKEMON = '.pokemonBoxDummy';
export const SELECTOR_FIGHT_PLAYER_DUMMY_POKEMON = `${SELECTOR_FIGHT_POKEMON_PANEL_PLAYER} ${SELECTOR_FIGHT_DUMMY_POKEMON}`;

export const SELECTOR_INTERFACE_TOGGLE_WILD = '#divInputButtons .btnSwitchWilds';

export const SELECTOR_FIGHT_PLAYER_POKEMON_MOVES = '#divFightI .moves';
export const SELECTOR_FIGHT_PLAYER_POKEMON_MOVE_INFO = '#divFightI .moveBox .divMove .divMoveInfo';
export const SELECTOR_FIGHT_PLAYER_ACTION_BUTTON = '#divFightButtons .button';

export const SELECTOR_FIGHT_PLAYER_POKEMON_MOVE_PARAMS = '#divFightI .divMoveParams';
export const SELECTOR_FIGHT_ENEMY_POKEMON_IMAGE = '#divFightH .image > img';

export const SELECTOR_FIGHT_ENEMY_POKEMON_RANK = '#divFightH .rank';
export const SELECTOR_FIGHT_ENEMY_POKEMON_RANK_ALT = '#divFightH .rank span';

export const SELECTOR_GLOBAL_CONTEXT_MENU = '.divContext';
export const SELECTOR_GLOBAL_CONTEXT_MENU_TITLE = `${SELECTOR_GLOBAL_CONTEXT_MENU} .divTitle`;
export const SELECTOR_GLOBAL_CONTEXT_MENU_BODY = `${SELECTOR_GLOBAL_CONTEXT_MENU} .divElement`;


export const SELECTOR_LOCATION_TRANSITIONS_BUTTONS = '#divLocGo > .button';
export const SELECTOR_LOCATION_NPCS = '#divLocNpc';
export const SELECTOR_POKECENTER_HEAL_BUTTON = `${SELECTOR_LOCATION_NPCS} .btnLocHeal`;
export const SELECTOR_POKECENTER_FARM_BUTTON = `${SELECTOR_LOCATION_NPCS} .btnLocFarm`;