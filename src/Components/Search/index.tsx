import { FC, forwardRef } from "react";
import SearchIcon from '@mui/icons-material/Search';
import style from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";  

type TProp = {
  value?: string,
};

const Search:FC<TProp> = forwardRef<HTMLElement, TProp>(({value}, ref) => {
  const navigate = useNavigate();
  let search = "";

  const handleSubmit = (event:any) => {
        event.preventDefault();
        const form = event.target;
        search = form.search.value;
        navigate("/products/search", {state:search});
  };
  const myStorage = window.location;
  console.log(myStorage);
    return ( 
        <section ref={ref} className={style.search}>
        <form 
          onSubmit={handleSubmit}
          className={style.form}>
            <input name="search" className={style.input} placeholder="Поиск"></input>
          <motion.button
           whileHover={{ scale: 1.2 }}
           whileTap={{ scale: 0.8 }}
           type="reset" className={style.reset}>X</motion.button>
          <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          type="submit" className={style.button}>Искать <SearchIcon sx={{color: "grey", fontSize: 18}}/></motion.button>
          <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          type="submit" className={style.hidden}><SearchIcon sx={{color: "grey", fontSize: 18}}/></motion.button>
        </form>
    </section>
)
})

export {Search};
export const MSearch = motion(Search);