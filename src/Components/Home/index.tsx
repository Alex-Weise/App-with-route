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
    const [skip, setSkip] = useState(0);
    const DEFAULT_URL = `https://dummyjson.com/products?limit=${DEFAULT_REQUEST_LIMIT}&skip=${skip}`;

    useEffect ( () => {
        fetch(DEFAULT_URL)
         .then(response => response.json())
         .then(data => {setProducts(data.products)})
         .catch(err => setIsError(true))
         .finally(() => setIsLoading(false));

        return () => setProducts([]);
    }, [DEFAULT_URL, skip])

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
