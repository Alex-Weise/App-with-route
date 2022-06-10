import { Link, Outlet } from "react-router-dom";
import style from "./styles.module.scss";

const GlobalPage = () => {

    return (
        <>
          <header className={style.header}>
              <Link to="category">Категории</Link>
              <Link to="/">Сто и одна штучка</Link>
              <Link to="login">Авторизация</Link>
          </header>
          <main>
              <Outlet />
          </main>
          <footer> С заботой о природе. 2022</footer>
        </>
    );
};
export {GlobalPage};