import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        image: string;
        title: string;
        price: number;
    }>();
    const { id } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://657b056e394ca9e4af1366a2.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                navigate('/');
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return 'Загрузка...';
    }

  return (
    <div className='container'>
        <img src={pizza.image} alt="pizza" />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} ₽</h4>
    </div>
  )
}

export default FullPizza;