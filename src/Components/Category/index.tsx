import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Category = () => {
    const [category, setCat] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false)

    useEffect( () => {
        fetch('https://dummyjson.com/products/categories')
          .then(response => response.json())
          .then(data => setCat(data))
          .catch(() => setIsError(true))
          .finally(() => setIsLoading(false)) 
      }, [])

    if (isError) return (<h2>Произошла ошибка</h2>);

    return (
        <section>
            { category.map( (item, index) => {
                return <li>
                <Link to="category" key={index}>{item}</Link>
                </li>
            })
            }
        </section>
    );
};
export {Category};