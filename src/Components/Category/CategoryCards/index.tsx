import { CircularProgress } from "@mui/material";
import { useState, useEffect, FC } from "react";
import { TContent } from "../../../type/type";
import { Card } from "../../Cards";
import { useParams } from "react-router-dom";
import style from "./styles.module.scss"


const CategoryCards:FC = () => {
    const [categories, setCategories] = useState<TContent[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const {title} = useParams();

    useEffect( () => {
        fetch(`https://dummyjson.com/products/category/${title}`)
          .then(response => response.json())
          .then(data => setCategories(data.products))
          .catch(() => setIsError(true))
          .finally(() => setIsLoading(false)) 
    }, [title])

    if (isError) return (<h2>Произошла ошибка</h2>)

    return (
        <section className={style.cards}>
            {isLoading ? <CircularProgress /> : 
            categories.map( (item) => {
                return (<Card title={item.brand} img={item.images} id={item.id}
                  discr={item.description} key={item.id}/>)})}
        </section>
    )

}
export {CategoryCards};