import { useAuth } from "../../hook/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tabs, Tab, Box, Modal, Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import style from "./styles.module.scss";
import { Login } from "../Login";
import cx from 'classnames';

const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: 'darkGrey',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
      signout( () => navigate("/", {replace: true}))
    };

    return (
        <section style={{position: "relative"}}>
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
              <Tab value="products" component={Link} to="products" label="Все товары" className={style.tab} />
            </Tabs>
       { user ?
            <Box className={style.boxHi}>
              <p className={style.user}>{user}</p>
              <Button className={style.visible} variant="outlined" color="error" onClick={handleOutClick}>Выйти</Button>
              <Button className={ cx(style.hidden, style.logo)} variant="outlined" color="error" onClick={handleOutClick}
              startIcon={<LogoutIcon />}></Button>  
            </Box> :
            <section >
            <Button className={ cx(style.visible, style.logo)} variant="outlined" color="secondary" onClick={handleOpen} 
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
                <Box sx={styleModal}>
                    <Login close={handleClose}/>
                </Box>
            </Modal>
        </section>
    )
};
export {Header};