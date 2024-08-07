import React from "react"
import { useSelector } from "react-redux"
import qs from "qs"
import { useNavigate } from "react-router-dom"

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from "../components"
import { sortList } from "../components/SortList"
import { useAppDispatch } from "../redux/store"
import { selectFilter } from "../redux/filter/selectors"
import { selectPizzaData } from "../redux/pizza/selectors"
import { setCategoryId, setCurrentPage, setFilters } from "../redux/filter/slice"
import { fetchPizzas } from "../redux/pizza/asyncActions"
import { SearchPizzaParams } from "../redux/pizza/types"

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const { items, status } = useSelector(selectPizzaData)
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx))
  }, [])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc"
    const sortBy = sort.sortProperty.replace("-", "")
    const category = categoryId > 0 ? `category=${categoryId}` : ""
    const search = searchValue ? `&search=${searchValue}` : ""

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    )

    window.scrollTo(0, 0)
  }

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, currentPage])

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams

      const sort = sortList.find(obj => obj.sortProperty === params.sortBy)
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category) || 0,
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      )
      isSearch.current = true
    }
  }, [])

  React.useEffect(() => {
    getPizzas()
    isMounted.current = true
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="cart cart--empty">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы,
            <br />
            попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}
