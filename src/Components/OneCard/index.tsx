import React, { FC, useEffect, useState } from "react";
import { CircularProgress, Rating, Typography, styled } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { TContent } from "../../type/type";
import { useParams } from "react-router-dom";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });


const OneCard:FC = () => {
  const {id} = useParams()
  const [product, setProduct] = useState<TContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [imageURL, setImageURL] = useState<string>('')
  useEffect( () => {
    fetch(`https://dummyjson.com/products/${id}`)
    .then(response => response.json())
    .then(data => {
        setImageURL(data.thumbnail);
        setProduct(data)})
    .catch(() => setIsError(true))
    .finally(() => setIsLoading(false));
  }, [id])

  if (isError) return (<h2>Произошла ошибка</h2>)

    return (
        <section>
          {isLoading ? <CircularProgress /> : 
            product && <><div>
                <h2>{product.title}</h2>
                <h3>Price {product.price}$</h3>
            </div>
            <div>
              <div>
                  { product.images.map( (item, index) => {
                     return (<button type="button" key={item}
                      onClick={ () => setImageURL(item) }>{index + 1}</button>)})
                  }
              </div>
              <div>
                  <img src={imageURL} alt={product.title}></img>
              </div>
              <div>
                  <Typography component="legend">Рейтинг продукта {product.rating}</Typography>
                     <StyledRating
                        name="read-only"
                        defaultValue={product.rating}
                        getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={0.1}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      />
              </div>
            </div>
            <div>
                <p>{product.description}</p>
            </div> </>}
        </section>
    );
}

export {OneCard};