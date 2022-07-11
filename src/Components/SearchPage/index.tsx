import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TContent } from "../../type/type";
import { Search } from "../Search";
import { CircularProgress, Button } from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import { Cards } from "../Cards";
import { DEFAULT_REQUEST_LIMIT } from "../Home";
import style from "./styles.module.scss";

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
    const [skip, setSkip] = useState(DEFAULT_REQUEST_LIMIT);
    const [total, setTotal] = useState(0);
    const DEFAULT_URL = `https://dummyjson.com/products/search?q=${valueSearch}&limit=${DEFAULT_REQUEST_LIMIT}`;

    useEffect ( () => {
        setValueSearch(location.state);
        valueSearch && fetch(DEFAULT_URL)
          .then(response => response.json())
          .then(data => {
            if(data.products.length === 0) setIsSearchErr(true);
            setTotal(data.total);
            setProducts(data.products);
          })
          .catch(err => setIsError(true))
          .finally(() => setIsLoading(false));

        return () => {
            setIsError(false);
            setIsSearchErr(false);
            setValueSearch('')};
    }, [valueSearch, location, DEFAULT_URL]);

    useEffect ( () => {
        const concatURL = DEFAULT_URL + `&skip=${skip}`;
        const upload = () => {
            fetch(concatURL)
             .then(response => response.json())
             .then(data => setProducts(products.concat(data.products)))
        };

        const handlerscroll = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = Math.ceil(window.scrollY);
             if (scrolled === scrollable) {
                setSkip(skip + DEFAULT_REQUEST_LIMIT);
                upload();
            }
        };
        if (total > DEFAULT_REQUEST_LIMIT && !(skip >= total)) {
            window.addEventListener('scroll', handlerscroll)
        };

        return () => {
            setIsError(false);
            setIsSearchErr(false);
            window.removeEventListener('scroll', handlerscroll);
        }
    }, [total, products, DEFAULT_URL, skip])

    const goBack = () => navigate(-1);

    if (isError) return (<h2 className={style.err}>Произошла ошибка</h2>);

    if (isSerchErr) return (<h2 className={style.err}>
        <Button className={style.back} onClick={goBack} color="secondary" startIcon={<ReplyIcon />}>Назад</Button>
        Ничего не найдено
        </h2>);

    return (
        <section>
             <Search value={valueSearch}/> 
             <section>
             <Button className={style.back} onClick={goBack} color="secondary" startIcon={<ReplyIcon />}>Назад</Button>
            <div className={style.cards}>
            { isLoading ? <CircularProgress /> : 
            products.map( (item) => {
                return (<Cards title={item.brand} img={item.images} id={item.id}
                  discr={item.description} key={item.id}/>)})}
            </div>
            </section>
        </section>
    )
};

export {SearchPage};