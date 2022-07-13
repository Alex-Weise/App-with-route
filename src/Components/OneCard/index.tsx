import React, { FC, useEffect, useState } from "react";
import { CircularProgress, Rating, Typography, styled, Button } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
import { TComments, TContent } from "../../type/type";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import style from "../OneCard/styles.module.scss";
import { Comments } from "../Comments";
import { NewComment } from "../Comments/New comment";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
});

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
const wrap = ( min:number, max:number, v:number) => {
  const result = v % max;
  if (result < min) return result * (-1);
  return result;
};


const OneCard:FC = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [product, setProduct] = useState<TContent>({} as TContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imageURL, setImageURL] = useState<string[]>([]);
  const [[page, direction], setPage] = useState([0, 0]);
  const [comments, setComments] = useState<TComments[]>([]);

  useEffect( () => {
    const load = async() => {
     return await fetch(`https://dummyjson.com/products/${id}`)
      .then(response => {
        if (!response.ok) {
          setIsError(true);
          throw new Error(response.status.toString())}
        return response.json()})
      .then(data => {
          setImageURL(data.images);
          setProduct(data)})
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
    };

    load();
    
  }, [id])

  useEffect( () => {
    fetch(`https://dummyjson.com/comments/post/${id}`)
      .then(res => res.json())
      .then(data => setComments(data.comments))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [id])

  const goBack = () => navigate(-1);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

 const imageIndex = wrap(0, imageURL.length, page);

  if (isError) return (<h2 className={style.err}>
    <Button onClick={goBack} color="secondary" startIcon={<ReplyIcon />}>Назад</Button>
    Произошла ошибка
    </h2>);
    
    return (
        <section className={style.one_card}>
          {isLoading ? <CircularProgress /> : 
            product && <>
            <Button className={style.back} onClick={goBack} color="secondary" startIcon={<ReplyIcon />}>Назад</Button>
            <div className={style.title}>
                {product.title}
                <p>Цена <b className={style.price}>{product.price}$</b></p>
            </div>
            <div className={style.images}>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                      className={style.img}
                      key={page}
                      alt={product.title}
                      src={ isNaN(imageIndex) ? product.images[0] : product.images[imageIndex]}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                          paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                          paginate(-1);
                        }
                      }}
                    />
                </AnimatePresence>
                <motion.div className={style.next} 
                    onClick={() => paginate(1)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.7 }}
                > {"‣"}
                </motion.div>
                <motion.div className={style.prev} 
                    onClick={() => paginate(-1)}
                    initial={{scale: -1}}
                    whileHover={{ scale: -1.3 }}
                    whileTap={{ scale: -0.7 }}
                > {"‣"}
                </motion.div>
            </div>
            <div>
                <Typography className={style.rating_text} component="legend">Рейтинг продукта {product.rating}</Typography>
                <StyledRating
                    name="read-only"
                    readOnly={true}
                    defaultValue={product.rating}
                    getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                    precision={0.1}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  />
            </div>
            <div className={style.descrip}>
                <p>{product.description}</p>
            </div>
            <NewComment setComment={setComments} />
            <Comments data={comments} />
            </>}
        </section>
    );
}

export {OneCard};

// { product.images.map( (item, index) => {
//   return (<button type="button" key={item}
//    onClick={ () => setImageURL(item) }>{index + 1}</button>)})
// }