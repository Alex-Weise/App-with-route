import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const Provider = ({children}:any) => {
    const [user, setUser] = useState<string>('');

    const signin = (newUser:string, callback:Function) => {
        setUser(newUser);
        callback();
    }
    const signout = (callback:Function) => {
        setUser('');
        callback();
    }

    const value = { user, signin, signout};

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}