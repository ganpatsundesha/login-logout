import React from 'react'

const Home = ({ user }) => (
    <div>
        <h2>Welcome, {user.username}!</h2>
    </div>
);

export default Home