import { useAuth } from "../../hook/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tabs, Tab, Box, Modal, Button } from "@mui/material";
import style from "./styles.module.scss";
import { Login } from "../Login";

const styleSX = {
    fontSize: 20,
    textTransform: 'none',
    mx: 4,
    p: 0,
};

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
        <section>  
            <Tabs 
               className={style.tabs}
               value={tabValue}
               onChange={handleTabChange}
               textColor="secondary"
               indicatorColor="secondary"
               aria-label="secondary tabs example"
               centered
            >
              <Tab value="category" component={Link} to="category" label="Категории" sx={styleSX} />
              <Tab value="products" component={Link} to="products" label="Все товары" sx={styleSX} />
            </Tabs>
       { user ? <Box className={style.boxHi}
                  >
              <p className={style.user}>{user}</p>
              <Button variant="outlined" color="error" onClick={handleOutClick}>Выйти</Button> 
                </Box> :
            <Button variant="outlined" color="secondary" onClick={handleOpen} sx={{position: 'absolute', top: '3%', right: '3%'}}>Авторизация</Button>}
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