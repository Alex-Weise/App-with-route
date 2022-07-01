import { FC, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import style from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";  

type TProp = {
  value?: string,
};

const Search:FC<TProp> = ({value}) => {
  const navigate = useNavigate();
  let search = "";
  const [isVisible, setIsVisible] = useState(true);
  
  const handleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (event:any) => {
        event.preventDefault();
        const form = event.target;
        search = form.search.value;
        navigate("/products/search", {state:search});
  };

    return ( 
      <section className={isVisible ? style.search : style.searchHidden}>
        <form onSubmit={handleSubmit} className={!isVisible && style.hidden}>
          <label className={style.label}>
                Что ищем? <input name="search" className={style.input}></input>
          </label>
          <button type="reset" className={style.reset}>X</button>
          <button type="submit" className={style.button}>Искать <SearchIcon sx={{color: "grey", fontSize: 18}}/></button>
          <button type="button" className={style.close} onClick={handleVisibility}><ArrowForwardIosIcon fontSize="inherit" /></button>
        </form>
        <button type="button" className={!isVisible ? style.open : style.hidden } onClick={handleVisibility}>
          <SearchIcon fontSize='inherit' />
        </button>
    </section>)
}

export {Search};