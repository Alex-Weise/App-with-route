import { useEffect, useState } from "react";
import { TContent } from "../../type/type";
import { Card } from "../Cards";
import { CircularProgress, Pagination, Stack } from "@mui/material";
import style from "./styles.module.scss";

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
         .finally(() => setIsLoading(false)) 
    }, [DEFAULT_URL, skip])

const handleChange = (event:React.ChangeEvent<unknown>, page:number) => {
    event.preventDefault();
    setSkip((page - 1) * DEFAULT_REQUEST_LIMIT);
}

    if (isError) return (<h2>Произошла ошибка</h2>)

    return (
        <section>
            <Stack spacing={2} className={style.section}>
                <Pagination count={10} color="secondary" onChange={handleChange} />
            </Stack>
            <div className={style.cards}>
            { isLoading ? <CircularProgress /> : 
            products.map( (item) => {
                return (<Card title={item.brand} img={item.images} id={item.id}
                  discr={item.description} key={item.id}/>)})}
            </div>
        </section>
    );
};
export {Home};
