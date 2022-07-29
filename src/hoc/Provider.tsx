import { createContext, FC, ReactNode, useEffect } from "react";
import { setCookie } from "../cookie/setCoockie";
import { deleteCookie } from "../cookie/deleteCookie";
import { getCookie } from "../cookie/getCookie";

type TCont = {
    user: string | undefined,
    token: string | undefined,
    signin: Function,
    signout: Function,
};

type TProp = {
    children: ReactNode,
};

export const AuthContext = createContext<TCont>({} as TCont);

export const Provider:FC<TProp> = ({children}) => {

    const signin = (newUser:string) => {
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              
              username: 'kminchelle',
              password: '0lelplR',
            })
          })
          .then(res => res.json())
          .then(data => {
            setCookie("username", newUser, {});
            setCookie("token", data.token, {});
            window.location.reload();
        });
    };

    const signout = () => {
        deleteCookie("username");
        deleteCookie("token");
        window.location.reload();
    };

    const user = getCookie("username");
    const token = getCookie("token");
    const value = {user, token, signin, signout};

    useEffect (() => {}, [user, token]);

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}