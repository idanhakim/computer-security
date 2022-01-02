import './App.css';
import {Header} from "./components/Header";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";
import {ForgotPassword} from "./pages/ForgotPassword";
import {Register} from "./pages/Register";
import {ProvideAuth} from "./store";
import {MyAccount} from "./pages/MyAccount";

function App() {
    return (
        <ProvideAuth>
            <Router>
                <Header/>
                <main>
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/forgot-password">
                            <ForgotPassword/>
                        </Route>
                        <Route path="/register">
                            <Register/>
                        </Route>
                        <Route path="/my-account/">
                            <MyAccount/>
                        </Route>
                    </Switch>
                </main>
            </Router>
        </ProvideAuth>
    );
}

export default App;
