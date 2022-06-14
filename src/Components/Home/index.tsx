import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { TContent } from "../../type/type";
import { Card } from "../Cards";
import style from "./styles.module.scss"

export const DEFAULT_REQUEST_LIMIT = 12;
export const DEFAULT_URL = `https://dummyjson.com/products?limit=${DEFAULT_REQUEST_LIMIT}`;

const Home = () => {
    const [products, setProducts] = useState<TContent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false)

    useEffect ( () => {
        fetch(DEFAULT_URL)
         .then(response => response.json())
         .then(data => {setProducts(data.products)})
         .catch(err => setIsError(true))
         .finally(() => setIsLoading(false)) 
    }, [DEFAULT_URL])

    if (isError) return (<h2>Произошла ошибка</h2>)

    return (
        <section className={style.cards}>
            { isLoading ? <CircularProgress /> : 
            products.map( (item) => {
                return (<Card title={item.brand} img={item.images} id={item.id}
                  discr={item.description} key={item.id}/>)})}
        </section>
    );
};
export {Home};
