import { FC, useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import style from "./styles.module.scss";
import { motion } from "framer-motion";  

type TProp = {
  onClick: (value: string) => void,
};

const Search:FC<TProp> = ({onClick}) => {
  const [valueSearch, setValue] = useState("");

  useEffect( () => {
    const handleReset = () => {
      setValue("");
      onClick("");
    };

    document.getElementById("All")?.addEventListener("click", handleReset);

    return () => {
      document.getElementById("All")?.removeEventListener("click", handleReset);
    }
  })

    return ( 
        <section className={style.search}>
        <div 
          className={style.form}>
            <input className={style.input} id="inpSearch" value={valueSearch} onChange={(e) => setValue(e.target.value)} placeholder="Поиск" />
          <motion.button
           whileHover={{ scale: 1.2 }}
           whileTap={{ scale: 0.8 }}
           onClick={ () => {setValue(""); onClick("")}}
           type="button" className={style.reset}>X</motion.button>
          <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => onClick(valueSearch)}
          type="button" className={style.button}>Искать <SearchIcon sx={{color: "grey", fontSize: 18}}/></motion.button>
          <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => onClick(valueSearch)}
          type="button" className={style.hidden}><SearchIcon sx={{color: "grey", fontSize: 18}}/></motion.button>
        </div>
    </section>
)
}

export {Search};