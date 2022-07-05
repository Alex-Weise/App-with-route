import { useEffect, useState } from "react";
import { TContent } from "../../type/type";
import SearchIcon from '@mui/icons-material/Search';
import { MCards } from "../Cards";
import { CircularProgress } from "@mui/material";
import style from "./styles.module.scss";
import { MSearch } from "../Search";
import { AnimatePresence, motion } from "framer-motion";  


export const DEFAULT_REQUEST_LIMIT = 10;
const searchVariants = {
    hidden: {
        opacity: 0,
        x: 1000,
        transition: {duration: 2},
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {duration: 1},
    },
};

const cardsVariants = {
    hidden: {
        y: 100,
        opacity: 0,
    },
    visible: (index:number) => ({
        y: 0,
        opacity: 1,
        transition: {dalay: index * 0.5},
    }),
}

const Home = () => {
    const [products, setProducts] = useState<TContent[]>([]);
    const [isVisible, setIsVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [skip, setSkip] = useState(DEFAULT_REQUEST_LIMIT);
    const [total, setTotal] = useState(0);
    const DEFAULT_URL = `https://dummyjson.com/products?limit=${DEFAULT_REQUEST_LIMIT}`;

    const handleVisibility = () => {setIsVisible(!isVisible)};

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
        <motion.main
          initial="hidden"
          animate="visible"
          exit="hidden" 
          style={{position: 'relative',}}
        >
            <motion.button
                key="buttonSearch"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                type="button" className={style.open} onClick={handleVisibility}>
                    <SearchIcon fontSize='inherit' />
            </motion.button>
            <AnimatePresence initial={false} exitBeforeEnter>
                <motion.div className={style.search} variants={searchVariants} key="search">
                    {isVisible && <MSearch variants={searchVariants} />}
                </motion.div>
            </AnimatePresence>
            <AnimatePresence>
                <div className={style.cards} key="cards">
                  { isLoading ? <CircularProgress /> : 
                  products.map( (item, i) => {
                    return (
                        <MCards 
                        whileInView="visible"
                        custom={i}
                        variants={cardsVariants}
                        title={item.brand} 
                        img={item.images} id={item.id}
                        discr={item.description} key={item.id}/>
                    )})}
                </div>
            </AnimatePresence>
        </motion.main>
    );
};
export {Home};
