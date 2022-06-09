import { useLocation, Navigate } from "react-router-dom";

const Autorise = ({children}) => {
    const location = useLocation();
    const auth = false;

    if (!auth) {
        return <Navigate to="/login" state={{form: location}} />
    }

    return children

};

export {Autorise};