import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const Autorise = ({children}: any) => {
    const location = useLocation();
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" state={{form: location}} />
    }

    return children

};

export {Autorise};