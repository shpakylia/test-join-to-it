export const initialState = {
    langsList: {},
    langActive: {}
};

export default function langsReducer (state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case 'FETCH_LANGS_SUCCESS': {
          return { ...state, langsList: action.payload.langs, langActive: action.payload.langs[Object.keys(action.payload.langs)[0]] };
        }
        case 'CHANGE_ACTIVE_LANG': {
          return { ...state, langActive: action.payload };
        }
        case 'FETCH_LANGS_FAIL': {
          return { ... state };
        }


        default: {
          return state
        }
  }
}
