import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TContent } from "../../type/type";
import { Search } from "../Search";
import { CircularProgress, Button } from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import { Card } from "../Cards";
import style from "../Home/styles.module.scss";

type TPropLoc = {
    state: string,
};

const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation() as TPropLoc;
    const [valueSearch, setValueSearch] = useState<string>("");
    const [products, setProducts] = useState<TContent[]>([]);
    const [isSerchErr, setIsSearchErr] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect ( () => {
        setValueSearch(location.state);
        valueSearch && fetch(`https://dummyjson.com/products/search?q=${valueSearch}`)
          .then(response => response.json())
          .then(data => {
            if(data.products.length === 0) setIsSearchErr(true);
            setProducts(data.products);
          })
          .catch(err => setIsError(true))
          .finally(() => setIsLoading(false));

        return () => setValueSearch('');
    }, [valueSearch, location]);

    const goBack = () => navigate(-1);

    if (isError) return (<h2 className={style.err}>Произошла ошибка</h2>);

    if (isSerchErr) return (<h2 className={style.err}>
        <Button onClick={goBack} color="secondary" startIcon={<ReplyIcon />}>Назад</Button>
        Ничего не найдено
        </h2>);

    return (
        <section>
             <Search /> 
             <section>
             <Button onClick={goBack} color="secondary" startIcon={<ReplyIcon />}>Назад</Button>
            <div className={style.cards}>
            { isLoading ? <CircularProgress /> : 
            products.map( (item) => {
                return (<Card title={item.brand} img={item.images} id={item.id}
                  discr={item.description} key={item.id}/>)})}
            </div>
            </section>
        </section>
    )
};

export {SearchPage};