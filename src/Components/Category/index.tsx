import { CircularProgress, Stack, Pagination } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./styles.module.scss";

const DEFAULT_LIMIT_CAT = 5;
const variantMotion = {
  visible: (i:number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.5,
      ease: "easeInOut",
    }
  }),
  hidden: {
    opacity: 0,
    x: -1000,
  },
};

const Category = () => {
    const [category, setCat] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [countPage, setCountPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect( () => {
        const load = async () => {
         await fetch('https://dummyjson.com/products/categories')
          .then(response => response.json())
          .then(data => {
            setMaxPage(Math.ceil(data.length / DEFAULT_LIMIT_CAT));
            for (let i = 1; i <= maxPage; i++ ) {
              if (i === countPage && i === 1) return setCat( data.slice(0, DEFAULT_LIMIT_CAT));
              else if (i === countPage) return setCat( data.slice(DEFAULT_LIMIT_CAT * (i - 1), DEFAULT_LIMIT_CAT * i))}
            })
          .catch(() => setIsError(true))
          .finally(() => setIsLoading(false));
        }
        load();
        return () => setCat([]);
    }, [countPage, maxPage])

    // useEffect( () => {
    //    category.map( async (item) => {
    //       return await fetch(`https://dummyjson.com/products/category/${item}`)
    //       .then(response => response.json())
    //       .then(data => setImgSRC( prev => prev.concat(data.products[0].images[1])))
    //       .catch(() => setIsError(true))
    //       .finally(() => setIsLoading(false)); 
    //    });

    //    return () => setImgSRC([])
    // }, [category])
    // const loadIMG = async (str:string) => {
    //   const response = await fetch(`https://dummyjson.com/products/category/${str}`);
    //   const data = await response.json();
    //   const urlIMG = data.products[0].images[1];
    //   setImgSRC(urlIMG);
    // };

    const handlePageChange = (event:React.ChangeEvent<unknown>, page:number) => {
        event.preventDefault();
        setCountPage(page);
    }

    if (isError) return (<h2>Произошла ошибка</h2>)

    return (
      <>
        <Stack spacing={2}>
            <Pagination count={maxPage} color="secondary" className={style.section} onChange={handlePageChange} />
        </Stack>
        <section className={style.category}>
            { isLoading ? <CircularProgress /> : 
             category.map( (item, index) => {
                let cat = item.slice(0,1).toUpperCase() + item.slice(1);
                return (
                <motion.div key={index} className={style.text}
                  variants={variantMotion}
                  initial='hidden'
                  animate='visible'
                  custom={index}>
                    <Link to={`/category/${item}`} className={style.link}>{cat}</Link>
                </motion.div>)
            })
            }
        </section>
      </>
    )
}
export {Category};


// const loadAndIMG = async () => {
//   try {
//   const response = await fetch('https://dummyjson.com/products/categories');
//   const data = await response.json();
//   setMaxPage(Math.ceil(data.length / DEFAULT_LIMIT_CAT));
//   for (let i = 1; i <= maxPage; i++ ) {
//     if (i === countPage && i === 1) {
//       const arr = data.slice(0, DEFAULT_LIMIT_CAT);
//         arr.map( async (item:string) => {
//          return await fetch(`https://dummyjson.com/products/category/${item}`)
//           .then(response => response.json())
//           .then(data => setImgSRC( prev => prev.concat(data.products[0].images[1])))
//           .catch(() => setIsError(true))
//           .finally(() => setIsLoading(false)); 
//        });
//       return setCat( data.slice(0, DEFAULT_LIMIT_CAT))
//     }
//     else if (i === countPage) {
//       const arr = data.slice(0, DEFAULT_LIMIT_CAT);
//       arr.map( async (item:string) => {
//        return await fetch(`https://dummyjson.com/products/category/${item}`)
//         .then(response => response.json())
//         .then(data => setImgSRC( prev => prev.concat(data.products[0].images[1])))
//         .catch(() => setIsError(true))
//         .finally(() => setIsLoading(false)); 
//      });
//       return setCat( data.slice(DEFAULT_LIMIT_CAT * (i - 1), DEFAULT_LIMIT_CAT * i))}}
//   } 
//   catch(err) { setIsError(true)}
//   finally { setIsLoading(false)};

// }