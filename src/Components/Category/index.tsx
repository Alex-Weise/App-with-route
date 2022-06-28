import { CircularProgress, Stack, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./styles.module.scss";

const Category = () => {
    const [category, setCat] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [imgSRC, setImgSRC] = useState<string[]>([]);

    useEffect( () => {
        fetch('https://dummyjson.com/products/categories')
          .then(response => response.json())
          .then(data => setCat(data))
          .catch(() => setIsError(true))
          .finally(() => setIsLoading(false));

        return () => setCat([]);
    }, [])

    useEffect( () => {
       category.map( (item) => {
          return fetch(`https://dummyjson.com/products/category/${item}`)
          .then(response => response.json())
          .then(data => setImgSRC( imgSRC => imgSRC.concat(data.products[0].images[1])))
          .catch(() => setIsError(true))
          .finally(() => setIsLoading(false)); 
       });

       return () => setImgSRC([])
    }, [category])

    const handlePageChange = (event:React.ChangeEvent<unknown>, page:number) => {
        event.preventDefault();
    }

    if (isError) return (<h2>Произошла ошибка</h2>)

    return (
      <>
        <Stack spacing={2}>
            <Pagination count={4} color="secondary" className={style.section} onChange={handlePageChange} />
        </Stack>
        <section className={style.category}>
            { isLoading ? <CircularProgress /> : 
             category.map( (item, index) => {
                let cat = item.slice(0,1).toUpperCase() + item.slice(1);
                return (
                <div key={index} className={style.images}>
                    <img src={imgSRC[index]} alt={item} className={style.img} />
                    <Link to={`/category/${item}`} className={style.link}>{cat}</Link>
                </div>)
            })
            }
        </section>
      </>
    )
}
export {Category};