import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import style from "./styles.module.scss";


const GlobalPage = () => {

    return (
        <>
          <div className={style.header}>
            <Header />
          </div>
          <div className={style.main}>
              <Outlet />
          </div>
          <footer className={style.footer}> 
             <div className={style.foottext}>С заботой о природе. 2022</div>
          </footer>
        </>
    );
};
export {GlobalPage};