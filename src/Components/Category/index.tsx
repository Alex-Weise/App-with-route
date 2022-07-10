import { CircularProgress, Stack, Pagination } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./styles.module.scss";

const DEFAULT_LIMIT_CAT = 5;
const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];
const variantMotion = {
  visible: (i:number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: (i + 0.5) * 0.5,
      ease: "easeInOut",
    }
  }),
  hidden: {
    opacity: 0,
    x: -1000,
  },
};

const Category = () => {
    const navigate = useNavigate();
    const [category, setCat] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [countPage, setCountPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState(1);
    const [imageAndCat, setImageAndCat] = useState<string[][]>([]);

    useEffect( () => {
      const load = async () => {
         await fetch('https://dummyjson.com/products/categories')
          .then(response => response.json())
          .then(data => {
            setMaxPage(Math.ceil(data.length / DEFAULT_LIMIT_CAT));
            for (let i = 1; i <= maxPage; i++ ) {
              if (i === countPage && i === 1) setCat(data.slice(0, DEFAULT_LIMIT_CAT))
              else if (i === countPage) setCat(data.slice(DEFAULT_LIMIT_CAT * (i - 1), DEFAULT_LIMIT_CAT * i));
            }
          })
          .catch(() => setIsError(true))
          .finally(() => setIsLoading(false));
      };

      load();
      return () => {
        setCat([]);}
    }, [countPage, maxPage])

    useEffect( () => {
      const loadIMG = async (str:string) => {
        return await fetch(`https://dummyjson.com/products/category/${str}`)
          .then(response => response.json())
          .then(data => {
            const arr:string[] = [str, data.products[0].images[1]];
            if (imageAndCat.find(item => item[0] === str)) return null;
            else {setImageAndCat(prev => prev.concat([arr]))}
          })
      };

      category.forEach( (item:string) => {
        loadIMG(item);
       });

       return () => {setImageAndCat([])}
// eslint-disable-next-line
    }, [category])

    const handlePageChange = (event:React.ChangeEvent<unknown>, page:number) => {
        event.preventDefault();
        setCountPage(page);
    }

    if (isError) return (<h2>Произошла ошибка</h2>)

    return (
      <>
        <Stack spacing={2}>
            <Pagination count={maxPage} color="secondary" classes={{root: style.section}} onChange={handlePageChange} />
        </Stack>
        <section className={style.category}>
            { isLoading ? <CircularProgress /> : 
             category.map( (item, index) => {
                let cat = item.slice(0,1).toUpperCase() + item.slice(1);
                let image = imageAndCat.find(i => i[0] === item);
                return (
                <motion.div key={index} className={style.text}
                  onClick={ () => navigate(`/category/${item}`)}
                  variants={variantMotion}
                  initial='hidden'
                  animate='visible'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  custom={index}>
                    {image && <img src={image[1]} alt={image[0]} className={style.img}
                        style={{border: `1.5px solid ${colors[index]}`}} />}
                    <div style={{borderBottom: `1.5px solid ${colors[index]}`, padding: '5px', borderRadius: '8px'}}>
                      <Link to={`/category/${item}`} className={style.link}>
                        {cat}
                      </Link>
                    </div>
                </motion.div>)
            })
            }
        </section>
      </>
    )
}
export {Category};