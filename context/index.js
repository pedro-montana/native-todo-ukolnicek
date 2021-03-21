import React from "react";

// set the defaults
const LogInContext = React.createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {}
});

export default LogInContext;
