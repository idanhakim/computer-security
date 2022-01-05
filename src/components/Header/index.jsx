import React from 'react';
import './styles.css';
import {
    Link, useHistory,
} from "react-router-dom";
import {useAuth} from "../../store";


export const Header = () => {
    const auth = useAuth();
    let history = useHistory();

    const isLoggedIn = auth.user

    console.log(auth)

    const handleLogOut = () => {
        auth.signout(() => auth.signout(() => history.push("/")));
    }

    return (
        <header>
            {isLoggedIn && <button className='logout-button' onClick={handleLogOut}>Logout</button>}
            <h1>computer-security</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {
                        isLoggedIn ?
                            <>
                                <li>
                                    <Link to="/my-account">My Account</Link>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/forgot-password">Forgot Password</Link>
                                </li>
                                <li>
                                    <Link to="/reset-password">Reset Password</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                    }
                </ul>
            </nav>
        </header>
    );
}