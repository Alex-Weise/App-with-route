import { createContext, FC, ReactNode, useState } from "react";

type TCont = {
    user: string,
    signin: Function,
    signout: Function,
};

type TProp = {
    children: ReactNode,
};

export const AuthContext = createContext<TCont>({} as TCont);

export const Provider:FC<TProp> = ({children}) => {
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