import axios from 'axios';

const loginAction = () => (dispatch) => {

    const localToken = localStorage.getItem('token');
    if (!localToken) {
        dispatch(userLoginFail());
    }
    axios.defaults.headers.common.Authorization = localToken ? 'Bearer ' + localToken :  '';
    axios.get("/api/user")
        .then(response => {
            return response;
        })
        .then(result => {
            if(result.status === 200){
                let userData = result.data;
                dispatch(userLoginByTokenSuccess(userData));
                // return result.data;
            }
            else{
                dispatch(userLoginFail());
            }
        });
};
const userLoginSuccess = (user) => {
    localStorage.setItem('token', user.token);
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            ...user,
            isLoggedIn: true
        }
    }
};
const userLoginByTokenSuccess = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            ...user,
            isLoggedIn: true
        }
    }
};
const userLoginFail = () => {
    return {
        type: 'LOGIN_FAIL',
        payload: {
            isLoggedIn: false
        }
    }
};

const userLogout = () => {
    return {
        type: 'LOGOUT'
    }
};

export {
    loginAction,
    userLoginSuccess,
    userLoginFail,
    userLogout,
    userLoginByTokenSuccess
}

