import { useEffect, useState } from "react";
import { TContent } from "../../type/type";
import ReplyIcon from '@mui/icons-material/Reply';
import SearchIcon from '@mui/icons-material/Search';
import { MCards } from "../Cards";
import { CircularProgress, Button } from "@mui/material";
import style from "./styles.module.scss";
import { Search } from "../Search";
import { motion } from "framer-motion";


export const DEFAULT_REQUEST_LIMIT = 15;

const Home = () => {
    const [products, setProducts] = useState<TContent[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isSerchErr, setIsSearchErr] = useState(false);
    const [skip, setSkip] = useState(DEFAULT_REQUEST_LIMIT);
    const [total, setTotal] = useState(0);
    const DEFAULT_URL = `https://dummyjson.com/products?limit=${DEFAULT_REQUEST_LIMIT}`;
    const [search, setSearch] = useState('');
    const DEFAULT_SEARCH_URL = `https://dummyjson.com/products/search?q=${search}&limit=${DEFAULT_REQUEST_LIMIT}`;

    useEffect ( () => {
        if (search === "") { fetch(DEFAULT_URL)
            .then( response => response.json())
            .then( data => {
                setProducts(data.products);
                setTotal(data.total);
            })
            .catch( err => setIsError(true))
            .finally(() => setIsLoading(false));
        } else { fetch(DEFAULT_SEARCH_URL)
            .then(response => response.json())
            .then(data => {
              if(data.products.length === 0) return setIsSearchErr(true);
              setTotal(data.total);
              setProducts(data.products);
              setIsSearchErr(false);
            })
            .catch(err => setIsError(true))
            .finally(() => setIsLoading(false));}

        return () => {
            setProducts([]);
            setSkip(DEFAULT_REQUEST_LIMIT);
            setIsVisible(false);
            setIsError(false);
            setIsSearchErr(false);
        }
    }, [DEFAULT_URL, DEFAULT_SEARCH_URL, search])

    useEffect ( () => {
        const concatURL = (search ? DEFAULT_SEARCH_URL : DEFAULT_URL) + `&skip=${skip}`;
        const upload = () => {
            fetch(concatURL)
             .then(response => response.json())
             .then(data => setProducts(products.concat(data.products)))
        };

        const handlerscroll = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = Math.ceil(window.scrollY);
            scrolled > 200 ? setIsVisible(true) : setIsVisible(false);
            if (scrolled === scrollable && skip <= total) {
                setSkip(skip + DEFAULT_REQUEST_LIMIT);
                upload();
            };
        };
        if (total > DEFAULT_REQUEST_LIMIT && !(skip >= total + 20)) {
            window.addEventListener('scroll', handlerscroll)
        };

        return () => {
            window.removeEventListener('scroll', handlerscroll);
        }
    }, [total, products, DEFAULT_URL, skip, search, DEFAULT_SEARCH_URL])

    const handleScrollToSearch = () => {
        window.scrollTo(0, 0);
        document.getElementById('inpSearch')?.focus();
    };

    if (isError) return (<h2 className={style.err}>Произошла ошибка</h2>);

    if (isSerchErr) return (
        <h2 className={style.err}>
            <Button className={style.back} 
             onClick={() => {setIsSearchErr(false); setSearch("")}}
             color="secondary" startIcon={<ReplyIcon />}>Назад</Button>
            Ничего не найдено
        </h2>);

    return (
        <main
          style={{position: 'relative'}}
        >
            <div className={style.search}>
                <Search
                    onClick={setSearch} />
                <motion.button
                initial={{opacity: 0, y: -60}}
                animate={{opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -60}}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                type="button" className={style.scrollto}
                onClick={handleScrollToSearch}>
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
