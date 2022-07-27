import { FC } from "react";
import SearchIcon from '@mui/icons-material/Search';
import style from "./styles.module.scss";
import { motion } from "framer-motion";  

type TProp = {
  value?: string,
  onChange: (value: string) => void,
  onClick: () => void,
};

const Search:FC<TProp> = ({value, onChange, onClick}) => {

    return ( 
        <section className={style.search}>
        <div 
          className={style.form}>
            <input className={style.input} id="inpSearch" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Поиск" />
          <motion.button
           whileHover={{ scale: 1.2 }}
           whileTap={{ scale: 0.8 }}
           onClick={ () => onChange('')}
           type="button" className={style.reset}>X</motion.button>
          <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={onClick}
          type="button" className={style.button}>Искать <SearchIcon sx={{color: "grey", fontSize: 18}}/></motion.button>
          <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={onClick}
          type="button" className={style.hidden}><SearchIcon sx={{color: "grey", fontSize: 18}}/></motion.button>
        </div>
    </section>
)
}

export {Search};