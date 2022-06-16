import React, { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import style from "./styles.module.scss";


const Search = () => {
    const [value, setValue] = useState<string>('');

    const handleSubmit = (event:any) => {
        event.preventDefault();
        const form = event.target;
        const search = form.search.value;
        setValue(search);
    }
    return ( 
      <section className={style.search}>
        <form onSubmit={handleSubmit}>
          <label className={style.label}>
                Что ищем? <input name="search" className={style.input}></input>
          </label>
          <button type="submit" className={style.button}>Искать <SearchIcon sx={{color: "grey", fontSize: 18}}/></button>
        </form>
    </section>)
}

export {Search};