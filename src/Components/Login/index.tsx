import { SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signin } = useAuth();

    const fromPage = location.state?.from?.pathname || '/';

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const form = event.target;
        const user = form.username.value;
        signin(user, () => { navigate(fromPage, {replace: true})});
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label>
                    Name: <input name="username"></input>
                </label>
                <button type="submit">Login</button>
            </form>
        </section>
    )
}
export {Login};