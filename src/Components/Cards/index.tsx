import React, { FC, forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./styles.module.scss";
import { motion } from "framer-motion";

type TCards = {
  title: string,
  img: string[],
  discr: string,
  id:number,
}

const Cards:FC<TCards> = forwardRef<HTMLDivElement, TCards>(({title, img, discr, id}, ref) =>  {
  const navigate = useNavigate();

    return (
        <div className={style.card} ref={ref}
            onClick={ () =>  navigate(`/products/${id}`)}>
          <div className={style.image}>
            <img src={img[0]} alt={title} className={style.img}/>
          </div>
          <span style={{padding: '10px 5px 2px 5px'}}>
            <Link to={`/products/${id}`} className={style.title}> {title} </Link>
            <p className={style.text}>{discr}</p>
          </span>
        </div>
    );
})

export {Cards};
export const MCards = motion(Cards);