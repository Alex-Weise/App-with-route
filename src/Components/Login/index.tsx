import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import style from "./styles.module.scss"
import CheckIcon from '@mui/icons-material/Check';
import { FC } from "react";

type LocationProps = {
    state: {
      from: Location;
    };
};

type TProp = {
    close: Function,
};

const Login:FC<TProp>  = ({close}) => {
    const navigate = useNavigate();
    const location = useLocation() as LocationProps;
    const { signin } = useAuth();

    const fromPage = location.state?.from?.pathname || '/';

    const handleFormSubmit = (event:any) => {
        event.preventDefault();
        const form = event.target;
        const user = form.username.value;
        signin(user, () => { navigate(fromPage, {replace: true})});
        close();
    }

    return (
        <section className={style.form}>
            <form onSubmit={handleFormSubmit}>
                <label className={style.login}>
                    <h3>Для авторизации введите Имя:</h3>
                  <input name="username" className={style.input}></input>
                </label>
                <button type="submit" className={style.button}>Запомнить <CheckIcon sx={{color: "black", fontSize: 18}}/></button>
            </form>
        </section>
    )
}
export {Login};