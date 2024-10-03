// src/components/UserContext.js

import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signIn = (email) => {
        // Implement your sign-in logic here, e.g., fetching user data
        console.log(`User signed in: ${email}`);
        setUser({ email });
    };

    const signOut = () => {
        // Implement your sign-out logic here
        console.log('User signed out');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </UserContext.Provider>
    );
};
