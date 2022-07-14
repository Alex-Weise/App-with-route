import { useAuth } from "../../hook/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { Box, Modal, Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import style from "./styles.module.scss";
import { Login } from "../Login";
import cx from 'classnames';
import IMg from '../../assets/img.jpg';
import { motion } from "framer-motion";

const Variants = {
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
  click: {
    backgroundColor: "#e1bee7",
    transition: {
      ease: "linear",
    }
  }
};

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeLink, setActive] = useState(false);
    const { user, signout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleOutClick = () => {
      signout( () => navigate("/products", {replace: true}))
    };    

    return (
        <header style={{position: "relative"}}>
          <div>
            <motion.img src={IMg} alt="LOGO" className={style.img}
              animate={Variants.spring}
             />
          </div>
          <motion.div className={style.tabs}>
              <motion.div
                style={{display: "contents", position: "relative"}}
                initial={{color: "#757575"}}
                animate={{color: activeLink ? "#ba68c8" : "#757575"}}
                whileTap={Variants.click}
              >
                <Link to="/category" className={style.tab} onClick={() => setActive(true)}>Категории {activeLink && <ActiveLine />}</Link>
              </motion.div>
              <motion.div
                style={{display: "contents", position: "relative"}}
                initial={{color: "#757575"}}
                animate={{color: activeLink ? "#757575" : "#ba68c8"}}
                whileTap={Variants.click}
                >
                  <Link to="/products" className={style.tab} onClick={() => setActive(false)}>Все товары {!activeLink && <ActiveLine />}</Link>
                </motion.div>
          </motion.div>
            {user ?
              <Box className={style.boxHi}>
                <p className={style.user}>{user}</p>
                <Button className={style.visible} variant="outlined" color="error" onClick={handleOutClick}>Выйти</Button>
                <Button className={ cx(style.hidden, style.logo)} variant="outlined" color="error" onClick={handleOutClick}
                startIcon={<LogoutIcon />}></Button>  
              </Box> :
              <section >
              <Button classes={{root: cx(style.visible, style.logo)}} id="auth" variant="outlined" color="secondary" onClick={handleOpen} 
              >Авторизация</Button>
              <Button className={ cx(style.hidden, style.logo)} id="auth2" variant="outlined" color="secondary" onClick={handleOpen} 
              startIcon={<LoginIcon />}></Button>
              </section>
            }
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

function ActiveLine () {
  return (
    <motion.div
      layoutId="underline"
      style={{
        width: "100%",
        height: "2px",
        position: "absolute",
        bottom: "-4px",
        backgroundColor: "#ba68c8",
      }}/>
  )
};