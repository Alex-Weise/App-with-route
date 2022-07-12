import { useAuth } from "../../hook/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tabs, Tab, Box, Modal, Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import style from "./styles.module.scss";
import { Login } from "../Login";
import cx from 'classnames';
import IMg from '../../assets/img.jpg';
import { motion } from "framer-motion";

const logoVariants = {
  spring: {
    rotate: -25,
    transition: {
      delay: 1.5,
      type: "spring",
      stiffness: 350,
      bounce: 0.3,
      damping: 25,
      mass: 25,
    },
  },
};

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tabValue, setTabValue] = useState("products");
    const { user, signout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    useEffect ( () => {
        setTabValue(location.pathname.slice(1,9));
        return () => setTabValue("products");
    }, [user, location])

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
      setTabValue(newValue);
    };

    const handleOutClick = () => {
      signout( () => navigate("/products", {replace: true}))
    };    

    return (
        <header style={{position: "relative"}}>
          <div>
            <motion.img src={IMg} alt="LOGO" className={style.img}
              animate={logoVariants.spring}
             />
          </div>
            <Tabs 
               className={style.tabs}
               value={tabValue}
               onChange={handleTabChange}
               textColor="secondary"
               indicatorColor="secondary"
               aria-label="secondary tabs example"
               centered
            >
              <Tab value="category" component={Link} to="category" label="Категории" className={style.tab} />
              <Tab value={"products" || "" } component={Link} to="products" label="Все товары" className={style.tab} />
            </Tabs>
       { user ?
            <Box className={style.boxHi}>
              <p className={style.user}>{user}</p>
              <Button className={style.visible} variant="outlined" color="error" onClick={handleOutClick}>Выйти</Button>
              <Button className={ cx(style.hidden, style.logo)} variant="outlined" color="error" onClick={handleOutClick}
              startIcon={<LogoutIcon />}></Button>  
            </Box> :
            <section >
            <Button classes={{root: cx(style.visible, style.logo)}} variant="outlined" color="secondary" onClick={handleOpen} 
            >Авторизация</Button>
            <Button className={ cx(style.hidden, style.logo)} variant="outlined" color="secondary" onClick={handleOpen} 
             startIcon={<LoginIcon />}></Button>
            </section>}
            <Modal
               open={isOpen}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
            >
              <div className={style.modal}>
                  <Login close={handleClose} from={location.pathname} />
              </div>
            </Modal>
        </header>
    )
};
export {Header};