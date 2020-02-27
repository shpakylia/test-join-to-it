import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import { userLogout } from '../../redux/actions/userActions';
import Langs from './Langs';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        padding: '0 20px',
        flexGrow: 1,
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const { isLoggedIn } = useSelector(state=> state.userReducer);
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(userLogout());
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to='/companies'>
                        <Typography variant="h6" className={classes.title}>
                            Companies
                        </Typography>
                    </Link>
                    <Link to='/workers'>
                        <Typography variant="h6" className={classes.title}>
                            Workers
                        </Typography>
                    </Link>
                    {isLoggedIn ?
                        <Typography variant="h6" className={classes.title} onClick={logOut}>log out</Typography> : ""}
                    {!isLoggedIn ?
                        <Link to="/login" color="inherit">Login</Link> : ""}

                    <Langs />

                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar
