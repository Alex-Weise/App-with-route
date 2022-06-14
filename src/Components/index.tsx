import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./styles.module.scss";
import { Tab, Tabs } from "@mui/material";
import { useAuth } from "../hook/useAuth";
import { Box } from "@mui/system";

const GlobalPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState("products");
    const { user, signout, signin } = useAuth();

    useEffect ( () => {
        setValue(location.pathname.slice(1));
        return () => setValue("products");
    }, [user])

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };

    return (
        <>
          <header className={style.header}>
            <Tabs 
              className={style.tabs}
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              centered
            >
              <Tab value="category" component={Link} to="category" label="Категории" sx={{ fontSize: 20, textTransform: 'none' , mx: 4, p: 0 }} />
              <Tab value="products" component={Link} to="products" label="Сто и одна штучка" sx={{ fontSize: 20, textTransform: 'none', mx: 4, p: 0 }} />
              { user ? <Box sx={{ typography: 'subtitle1', mx: 4, p: 0}}
                        >
                     <h3>Привет! Вы вошли как <p className={style.user}>{user}</p></h3>
                    <button type="button" onClick={() => signout( () => navigate("/", {replace: true}))}>Выйти</button>
               </Box> :
               <Tab value="login" component={Link} to="login" label="Авторизация" sx={{ fontSize: 20, textTransform: 'none', mx: 4, p: 0 }} />}
            </Tabs>
          </header>
          <main className={style.main}>
              <Outlet />
          </main>
          <footer> С заботой о природе. 2022</footer>
        </>
    );
};
export {GlobalPage};