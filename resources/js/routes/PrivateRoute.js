import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const user = useSelector(state=> state.userReducer);
    return (
        <Route path={path}
               {...rest}
               render={props => user.isLoggedIn && user.is_admin ? (
                       <>
                        <NavBar />
                           <Component {...props} />
                       </>) : (<Redirect to={{
                       pathname: "/login",
                       state: {
                           prevLocation: path,
                           error: "You need to login first!",
                       },
                   }}
                   />
               )
               }
        />);
}
export default PrivateRoute;
