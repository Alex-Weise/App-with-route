import { SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import style from "./styles.module.scss"
import CheckIcon from '@mui/icons-material/Check';


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
                <label className={style.login}>
                    Введите Имя: <input name="username" className={style.input}></input>
                </label>
                <button type="submit" className={style.button}>Запомнить <CheckIcon sx={{color: "black", fontSize: 18}}/></button>
            </form>
        </section>
    )
}
export {Login};