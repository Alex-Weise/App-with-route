import { FC } from "react";
import SearchIcon from '@mui/icons-material/Search';
import style from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

type TProp = {
  value?: string,
};

const Search:FC<TProp> = ({value}) => {
  const navigate = useNavigate();
  let search = "";

  const handleSubmit = (event:any) => {
        event.preventDefault();
        const form = event.target;
        search = form.search.value;
        navigate("/products/search", {state:search});
  };

    return ( 
      <section className={style.search}>
        <form onSubmit={handleSubmit}>
          <label className={style.label}>
                Что ищем? <input name="search" className={style.input}></input>
          </label>
          <button type="reset" className={style.reset}>X</button>
          <button type="submit" className={style.button}>Искать <SearchIcon sx={{color: "grey", fontSize: 18}}/></button>
        </form>
    </section>)
}

export {Search};