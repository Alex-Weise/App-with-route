import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import style from "./styles.module.scss";


const GlobalPage = () => {

    return (
        <>
          <header className={style.header}>
            <Header />
          </header>
          <main className={style.main}>
              <Outlet />
          </main>
          <footer className={style.footer}> 
             <div className={style.foottext}>С заботой о природе. 2022</div>
          </footer>
        </>
    );
};
export {GlobalPage};