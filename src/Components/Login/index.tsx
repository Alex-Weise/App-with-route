import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import style from "./styles.module.scss"
import CheckIcon from '@mui/icons-material/Check';

type LocationProps = {
    state: {
      from: Location;
    };
  };

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation() as LocationProps;
    const { signin } = useAuth();

    const fromPage = location.state?.from?.pathname || '/';

    const handleSubmit = (event:any) => {
        event.preventDefault();
        const form = event.target;
        const user = form.username.value;
        if ( signin !== undefined) signin(user, () => { navigate(fromPage, {replace: true})});
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