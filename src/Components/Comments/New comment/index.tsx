import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../hook/useAuth";
import { TComments } from "../../../type/type";
import style from "./styles.module.scss";

type TProps = {
    setComment: Function,
};

const NewComment:FC<TProps> = ({setComment}) => {
    const location = useLocation();
    const [value, setValue] = useState('');
    const { user } = useAuth();
    let comment = {} as TComments;

    const handleChange = (e:any) => {
        setValue(e.target.value);
    };

    const handleClickEmoji = (e:any) => {
        setValue(prev => prev + e.target.outerText);
    };
    const handleClickAdd = () => {
        comment = {
            body: value,
            postId: Number(location.pathname.slice(-1)),
            user: {
                username: user,
            },
        };
        setComment((prev:TComments[]) => prev.concat(comment));
        setValue('');
    };

    const handleClickAuth = () => {
        const auth = document.getElementById("auth");
        auth?.click();
    };

    return ( 
        <div className={style.container}>
            <h3>Оставить комментарий</h3>
            { user ?
            <div className={style.text_area}>
                <div className={style.user}> Имя:<p>{user}</p></div>
                <div className={style.text}> Комментарий:
                    <textarea name="comments" cols={60} rows={8}
                    onChange={handleChange} value={value}>
                    </textarea>
                    <button type="reset" onClick={() => setValue('')} className={style.reset}>Очистить</button>
                    <button type="button" onClick={handleClickAdd} 
                        className={style.add}>Отправить 🗸</button>
                </div>
                <ul className={style.emoji} onClick={handleClickEmoji}>
                    <li>🙂</li>
                    <li>😁</li>
                    <li>🤣</li>
                    <li>🙃</li>
                    <li>😊</li>
                    <li>😍</li>
                    <li>😐</li>
                    <li>😡</li>
                    <li>😎</li>
                    <li>🙁</li>
                    <li>😩</li>
                    <li>😱</li>
                    <li>😢</li>
                    <li>💩</li>
                    <li>💣</li>
                    <li>💯</li>
                    <li>👍</li>
                    <li>👎</li>
                </ul>
            </div> :
            <div className={style.notauth}> Чтобы оставить комментарий нужно <button className={style.auth} onClick={handleClickAuth}>Авторизоваться</button></div>
            }
        </div>
    )
};

export {NewComment};