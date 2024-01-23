import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    Navigate,
} from 'react-router-dom';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const handleRegister = (username, password) => {
        // Retrieve existing users from local storage or initialize an empty array
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the username is already taken
        if (existingUsers.some((user) => user.username === username)) {
            alert('Username is already taken. Please choose a different one.');
            return;
        }

        // Append the new user to the array and store it in local storage
        const newUser = { username, password };
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Set the current user and log them in
        setLoggedIn(true);
        setUser(newUser);
    };

    const handleLogin = (username, password) => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the entered credentials match any user
        const loggedInUser = existingUsers.find(
            (user) => user.username === username && user.password === password
        );

        if (loggedInUser) {
            setLoggedIn(true);
            setUser(loggedInUser);
        } else {
            alert('Invalid username or password.');
        }
    };

    const handleLogout = () => {
        // localStorage.removeItem('users');
        setLoggedIn(false);
        setUser(null);
    };

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            {loggedIn ? (
                                <button onClick={handleLogout}>Logout</button>
                            ) : (
                                <Link to="/login">Login</Link>
                            )}
                        </li>
                        {!loggedIn && (
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        )}
                    </ul>
                </nav>

                <hr />

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
            </div>
        </Router>
    );
};

const Home = ({ user }) => (
    <div>
        <h2>Welcome, {user.username}!</h2>
    </div>
);

const RegisterForm = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">Register</button>
        </form>
    );
};

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <br />
            <button type="submit">Login</button>
        </form>
    );
};

export default App;