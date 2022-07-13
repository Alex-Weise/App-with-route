import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import style from "./styles.module.scss"
import CheckIcon from '@mui/icons-material/Check';
import { FC } from "react";

// type LocationProps = {
//     state: {
//       from: Location;
//     };
// };

type TProp = {
    close: Function,
    from: string,
};

const Login:FC<TProp>  = ({close, from}) => {
    const navigate = useNavigate();
    const { signin } = useAuth();

    const fromPage = from || '/products';

    const handleFormSubmit = (event:any) => {
        event.preventDefault();
        const form = event.target;
        const user = form.username.value;
        signin(user, () => { navigate(fromPage, {replace: true})});
        close();
    };

    return (
        <section className={style.form}>
            <form onSubmit={handleFormSubmit}>
                <label className={style.login}>
                    <h3>Для авторизации введите Имя:</h3>
                  <input name="username" className={style.input} autoFocus={true}></input>
                </label>
                <button type="submit" className={style.button}>Запомнить <CheckIcon sx={{color: "black", fontSize: 18}}/></button>
            </form>
        </section>
    )
}
export {Login};