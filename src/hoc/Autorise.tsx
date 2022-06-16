import { FC, ReactNode } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

type TProp = {
    children: ReactNode,
}
const Autorise:FC<TProp> = ({children}) => {
    const location = useLocation();
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" state={{form: location}} />
    }

    return <>{children}</>

};

export {Autorise};