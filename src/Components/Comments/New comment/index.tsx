import { useState } from "react";
import { useAuth } from "../../../hook/useAuth";
import style from "./styles.module.scss";

const NewComment = () => {
    const [value, setValue] = useState('');
    const { user } = useAuth();

    const handleChange = (e:any) => {
        setValue(e.target.value);
    };

    const handleClick = (e:any) => {
        setValue(prev => prev + e.target.outerText);
    };

    return ( 
        <div className={style.container}>
            <h3>Оставить комментарий</h3>
            <div className={style.text_area}>
                <div className={style.user}> Имя:<p>{user}</p></div>
                <div className={style.text}> Комментарий:
                    <textarea name="comments" cols={60} rows={8}
                    onChange={handleChange} value={value}>
                    </textarea>
                    <button type="reset" onClick={() => setValue('')} className={style.reset}>Очистить</button>
                    <button type="button" className={style.add}>Отправить 🗸</button>
                </div>
                <ul className={style.emoji} onClick={handleClick}>
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
            </div>
        </div>
    )
};

export {NewComment};