import { useLocation, useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from?.pathname || '/';

    return ();
};