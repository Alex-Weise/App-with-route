import { FC, useEffect } from "react";
import { TComments } from "../../type/type";
import style from "./styles.module.scss";

type TProps = {
    data: TComments[],
};

const Comments:FC<TProps> = ({data}) => {
    useEffect(() => {}, [data])
    return (
        <section className={style.container}>
            <h3>Комментарии (примеры комментариев):</h3>
            <div className={style.comments}>
                {data.map( (item, index) => {
                    return (
                    <div className={style.onecomment} key={index}>
                       <div className={style.user}> Имя:<p>{item.user.username}</p></div>
                       <div className={style.text}> Комментарий:<p>{item.body}</p></div>
                    </div>)
                })}
            </div>
        </section>
    )
}

export {Comments};