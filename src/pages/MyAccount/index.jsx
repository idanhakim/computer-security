import React from 'react';
import './styles.css';
import {useAuth} from "../../store";
import {
    Link, Route, Switch, Redirect, useRouteMatch
} from "react-router-dom";
import {ChangePassword} from "./ChangePassword";
import {AddClient} from "./AddClient";


export const MyAccount = () => {
    let {path, url} = useRouteMatch();
    let auth = useAuth();
    const isLoggedIn = auth.user

    return (
        isLoggedIn ?
            <div>
                <h2>My Account</h2>
                <ul className={'my-account-menu'}>
                    <li>
                        <Link to={`${url}/change-password`}>Change Password</Link>
                    </li>
                    <li>
                        <Link to={`${url}/add-client`}>Add Client</Link>
                    </li>
                </ul>

                <Switch>
                    <Route path={`${path}change-password`}>
                        <ChangePassword/>
                    </Route>
                    <Route path={`${path}add-client`}>
                        <AddClient/>
                    </Route>
                </Switch>

            </div>
            :
            <Redirect
                to={{
                    pathname: "/login",
                }}
            />
    );
}