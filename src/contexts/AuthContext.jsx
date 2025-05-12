// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    // Load user from localStorage or API
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("loggedInUser"));
        if (userData) {
            setLoggedInUser(userData);
        }
    }, []);

    // Function to log in (you can replace this with API logic)
    const login = (user) => {
        setLoggedInUser(user);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
    };

    // Function to log out
    const logout = () => {
        setLoggedInUser(null);
        localStorage.removeItem("loggedInUser");
    };

    return (
        <AuthContext.Provider value={{ loggedInUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
