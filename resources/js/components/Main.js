import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Routes from '../routes/router';
import { loginAction } from '../redux/actions/userActions';
import {BrowserRouter} from 'react-router-dom';

export default function Main() {

    const dispatch = useDispatch();
    const loadData = useCallback(
        () => { dispatch(loginAction()) },
        [dispatch]
    );

    useEffect(() => {
        loadData()
    }, []);

    return(
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    )
}
