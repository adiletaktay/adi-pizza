import React from "react"
import { Link } from "react-router-dom"

import cartEmpty from "../assets/img/cartEmpty.svg"

export const CartEmpty: React.FC = () => (
  <div className="cart cart--empty">
    <h2>Корзина пустая 😕</h2>
    <p>
      Вероятней всего, вы не заказывали ещё пиццу.
      <br />
      Для того, чтобы заказать пиццу, перейди на главную страницу.
    </p>
    <img src={cartEmpty} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Вернуться назад</span>
    </Link>
  </div>
)
