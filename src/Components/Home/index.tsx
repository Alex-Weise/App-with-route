import { useEffect, useState } from "react";
import { TContent } from "../../type/type";
import { Card } from "../Cards";
import { CircularProgress } from "@mui/material";
import style from "./styles.module.scss";
import { Search } from "../Search";

export const DEFAULT_REQUEST_LIMIT = 10;

const Home = () => {
    const [products, setProducts] = useState<TContent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [skip, setSkip] = useState(DEFAULT_REQUEST_LIMIT);
    const [total, setTotal] = useState(0);
    const DEFAULT_URL = `https://dummyjson.com/products?limit=${DEFAULT_REQUEST_LIMIT}`;

    useEffect ( () => {
        fetch(DEFAULT_URL)
            .then( response => response.json())
            .then( data => {
                setProducts(data.products);
                setTotal(data.total);
            })
            .catch( err => setIsError(true))
            .finally(() => setIsLoading(false));

        return () => {
            setProducts([]);
            setSkip(DEFAULT_REQUEST_LIMIT);
        }
    }, [DEFAULT_URL])

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
            window.removeEventListener('scroll', handlerscroll);
        }
    }, [total, products, DEFAULT_URL, skip])

    if (isError) return (<h2 className={style.err}>Произошла ошибка</h2>);

    return (
        <section>
            <section><Search /></section>
            <section>
            <div className={style.cards}>
            { isLoading ? <CircularProgress /> : 
            products.map( (item) => {
                return (<Card title={item.brand} img={item.images} id={item.id}
                  discr={item.description} key={item.id}/>)})}
            </div>
            </section>
        </section>
    );
};
export {Home};
