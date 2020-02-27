import React, { useState, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {Link, Redirect, useHistory} from 'react-router-dom';
import FlashMessage from 'react-flash-message';
import { userLoginSuccess } from '../../redux/actions/userActions';


function LoginContainer ({redirect}) {
    const [user, setUser] = useState(
        {
            email: '',
            password: ''
        });

    const [error, setError] = useState('');
    const [formSubmitting, setFormSubmitting] = useState(false);
    const isLoggedIn = useSelector(state=> state.userReducer.isLoggedIn);
    const history = useHistory();
    useEffect(()=> {
        const { prevLocation } = redirect.state || { prevLocation: { pathname: '/' } };
        if (prevLocation && isLoggedIn) {
            return history.push(prevLocation);
        }
    }, []);

    const dispatch = useDispatch();
    const userLoginDispatch = useCallback((userData) => {
        dispatch(userLoginSuccess(userData))
    }, [dispatch]);

    const handleSubmit= (e) => {
        e.preventDefault();
        setFormSubmitting(true);
        axios.post("/api/login", user)
            .then(response => {
                return response;
            })
            .then(result => {
                if (result.status = 200) {
                    userLoginDispatch(result.data);
                    setError('');
                }
                else {
                    alert(`Our System Failed To Register Your Account!`);
                }
            })
            .catch(error => {
                let err = error.response.data;
                setError(err);
            })
            .finally( setFormSubmitting(false));
    }
    const handleEmail = (e) => {
        let value = e.target.value;
        setUser({...user, email: value});
    };
    const handlePassword = (e) => {
        let value = e.target.value;
        setUser({...user, password: value});
    };
    return (
        <div className="container">
            <div className="row">
                <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                    <h2 className="text-center mb30">Log In To Your Accountt</h2>
                    {isLoggedIn ? <FlashMessage duration={60000} persistOnHover={true}>
                        <h5 className={"alert alert-success"}>Login successful, redirecting...</h5></FlashMessage> : ''}
                    {error ? <FlashMessage duration={100000} persistOnHover={true}>
                        <h5 className={"alert alert-danger"}>Error: {error}</h5></FlashMessage> : ''}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input id="email" type="email" name="email" placeholder="E-mail" className="form-control" required onChange={handleEmail}/>
                        </div>
                        <div className="form-group">
                            <input id="password" type="password" name="password" placeholder="Password" className="form-control" required onChange={handlePassword}/>
                        </div>
                        <button disabled={formSubmitting} type="submit" name="singlebutton" className="btn btn-default btn-lg  btn-block mb10"> {formSubmitting ? "Logging You In..." : "Log In"} </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default LoginContainer;
