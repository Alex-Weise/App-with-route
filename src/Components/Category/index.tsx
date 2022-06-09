import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { CategoryCards } from "./CategoryCards";

const Category = () => {
    const [category, setCat] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect( () => {
        fetch('https://dummyjson.com/products/categories')
          .then(response => response.json())
          .then(data => setCat(data))
          .catch(() => setIsError(true))
          .finally(() => setIsLoading(false)) 
      }, [])

    if (isError) return (<h2>Произошла ошибка</h2>)

    return (
        <section>
            { isLoading ? <CircularProgress /> : 
             category.map( (item, index) => {
                return (
                <div>
                    <Link to={item} key={index}>{item}</Link>
                </div>)
                
            })
            }
        </section>
    )
}
export {Category};
// Добавить категории как карточки именно здесь, используя item 