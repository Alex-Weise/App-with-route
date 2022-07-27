import { CircularProgress, Button } from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import { useState, useEffect, FC } from "react";
import { TContent } from "../../../type/type";
import { Cards } from "../../Cards";
import { useParams, useNavigate } from "react-router-dom";
import style from "./styles.module.scss"


const CategoryCards:FC = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<TContent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const {title} = useParams();

    useEffect( () => {
        fetch(`https://dummyjson.com/products/category/${title}`)
          .then(response => response.json())
          .then(data => setCategories(data.products))
          .catch(() => setIsError(true))
          .finally(() => setIsLoading(false)) 
    }, [title])

    if (isError) return (<h2 className={style.err}>Произошла ошибка</h2>)

   

    return (<>
        <Button className={style.back} onClick={() => navigate(-1)} color="secondary" startIcon={<ReplyIcon />}>Назад</Button>
        <section className={style.cards}>
            {isLoading ? <CircularProgress /> : 
            categories.map( (item) => {
                return (<Cards title={item.brand} img={item.images} id={item.id}
                  discr={item.description} key={item.id}/>)})}
        </section>
       </>
    )

}
export {CategoryCards};