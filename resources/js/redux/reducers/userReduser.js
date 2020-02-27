export const initialState = {
    token: '',
    name: '',
    email: '',
    isLoggedIn: false,
    is_admin: 0
};

export default function userReducer (state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case 'LOGIN_SUCCESS': {
          return { ...state, ...action.payload };
        }
        case 'LOGIN_FAIL': {
          return { ...initialState, ...action.payload };
        }
        case 'LOGOUT': {
            return { ...initialState };
        }


        default: {
          return state
        }
  }
}
