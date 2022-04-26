import React, { useState } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/login";
import Register from "./components/register";
import Home from './components/home';
import Leaderboard from "./components/leaderboard";
import Profile from "./components/profile";
import Quiz from "./components/quiz";
import { logout, auth } from "./firebase";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    })

    return (
        <BrowserRouter>
            <nav>
                <ul id="navbar">
                    <li>
                        <NavLink
                            to="/"
                            className={({isActive}) => isActive ? 'active' : 'inactive'}
                        >
                            Home
                        </NavLink>
                    </li>
                    {!loggedIn && (
                        <li>
                            <NavLink
                                to="/login"
                                className={({isActive}) => isActive ? 'active' : 'inactive'}
                            >
                                Login
                            </NavLink>
                        </li>
                    )}
                    {!loggedIn && (
                        <li>
                            <NavLink
                                to="/register"
                                className={({isActive}) => isActive ? 'active' : 'inactive'}
                            >
                                Register
                            </NavLink>
                        </li>
                    )}
                    {loggedIn && (
                        <li>
                            <NavLink
                                to="/profile"
                                className={({isActive}) => isActive ? 'active' : 'inactive'}
                            >
                                Profile
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink
                            to="/quiz"
                            className={({isActive}) => isActive ? 'active' : 'inactive'}
                        >
                            Quiz
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/leaderboard"
                            className={({isActive}) => isActive ? 'active' : 'inactive'}
                        >
                            Leaderboard
                        </NavLink>
                    </li>
                    {loggedIn && (
                        <li>
                            <NavLink
                                to="/logout"
                                className="inactive"
                                onClick={logout}
                            >
                                Logout
                            </NavLink>
                        </li>
                    )}
                </ul>

                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/logout" element={<Home />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/profile" element={<Profile />}/>
                    <Route path="/quiz" element={<Quiz />}/>
                    <Route path="/leaderboard" element={<Leaderboard />}/>
                </Routes>
            </nav>
        </BrowserRouter>
    );
}

export default App;
