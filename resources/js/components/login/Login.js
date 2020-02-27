import React, { history } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginContainer from './LoginContainer';

function Login(){
    const history = useHistory();
    const user = useSelector((state)=> state.userReducer);
    if(user.isLoggedIn){
    console.log(user.isLoggedIn);

        history.push('/');
    }


    return (
        <div className="content">
            <LoginContainer redirect={history.location} />
        </div>
    )
}
export default Login;
