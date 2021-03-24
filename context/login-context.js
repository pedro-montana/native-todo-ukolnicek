import React from 'react';

export const LogInContext = React.createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
});
