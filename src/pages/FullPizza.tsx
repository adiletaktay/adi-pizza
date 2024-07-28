import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    image: string
    title: string
    price: number
  }>()
  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get("https://657b056e394ca9e4af1366a2.mockapi.io/items/" + id)
        setPizza(data)
      } catch (error) {
        navigate("/")
      }
    }

    fetchPizza()
  }, [])

  if (!pizza) {
    return "Загрузка..."
  }

  return (
    <div className="container">
      <div className="full-pizza">
        <img src={pizza.image} alt="pizza" />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} ₽</h4>
        <Link to="/">
          <button className="button button--outline button--add">
            <span>Вернуться назад</span>
          </button>
        </Link>
      </div>
    </div>
  )
}
