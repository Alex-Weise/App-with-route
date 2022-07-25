import { useEffect, useState } from "react";
import { TContent } from "../../type/type";
import SearchIcon from '@mui/icons-material/Search';
import { MCards } from "../Cards";
import { CircularProgress } from "@mui/material";
import style from "./styles.module.scss";
import { Search } from "../Search";
import { motion } from "framer-motion";  


export const DEFAULT_REQUEST_LIMIT = 15;

const Home = () => {
    const [products, setProducts] = useState<TContent[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [skip, setSkip] = useState(DEFAULT_REQUEST_LIMIT);
    const [total, setTotal] = useState(0);
    const DEFAULT_URL = `https://dummyjson.com/products?limit=${DEFAULT_REQUEST_LIMIT}`;

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
            setIsVisible(false);
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
            scrolled > 200 ? setIsVisible(true) : setIsVisible(false);
            if (scrolled === scrollable) {
                setSkip(skip + DEFAULT_REQUEST_LIMIT);
                upload();
            };
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
        <main
          style={{position: 'relative'}}
        >
            <div className={style.search}>
                <Search />
                <motion.button
                initial={{opacity: 0}}
                animate={{opacity: isVisible ? 1 : 0}}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                type="button" className={style.scrollto}
                onClick={() => window.scrollTo(0, 0)}>
                    <SearchIcon fontSize='inherit' />
                </motion.button>
            </div>
            <div className={style.cards} key="cards">
                  { isLoading ? <CircularProgress /> : 
                  products.map( (item) => {
                    return (
                        <MCards 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title={item.brand} 
                        img={item.images} id={item.id}
                        discr={item.description} key={item.id}/>
                    )})}
            </div>
        </main>
    );
};
export {Home};
