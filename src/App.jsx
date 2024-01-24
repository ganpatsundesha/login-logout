import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    Navigate,
} from 'react-router-dom';
import Home from './components/Home';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        // Check local storage for user data on page load
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setLoggedIn(true);
            setUser(storedUser);
        }
    }, []); // Empty dependency array to run only on mount

    const handleRegister = (username, password) => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        if (existingUsers.some((user) => user.username === username)) {
            alert('Username is already taken. Please choose a different one.');
            return;
        }

        const newUser = { username, password };
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        localStorage.setItem('user', JSON.stringify(newUser));
        setLoggedIn(true);
        setUser(newUser);
    };

    const handleLogin = (username, password) => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        const loggedInUser = existingUsers.find(
            (user) => user.username === username && user.password === password
        );

        if (loggedInUser) {
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            setLoggedIn(true);
            setUser(loggedInUser);
        } else {
            alert('Invalid username or password.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setLoggedIn(false);
        setUser(null);
    };

    return (
        <Router>
            <div>
                {loggedIn ? (
                    <>
                        <Link to="/">Home</Link>
                        <h5>Welcome, {user.username}</h5>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <br />
                    </>
                )}
                {!loggedIn && (
                    <Link to="/register">Register</Link>
                )}

                <hr />
            </div>
            <Routes>
                <Route
                    path="/"
                    element={loggedIn ? <Home user={user} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/register"
                    element={<RegisterForm onRegister={handleRegister} />}
                />
                <Route
                    path="/login"
                    element={<LoginForm onLogin={handleLogin} />}
                />
            </Routes>
        </Router>
    );
};

export default App;