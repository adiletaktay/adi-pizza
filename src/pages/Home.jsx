import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const { categoryId, sort, currentPage } = useSelector(state => state.filter);

    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };
    
    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    }

    const fetchPizzas = async () => {
        setIsLoading(true);

        const search = searchValue ? `&search=${searchValue}` : '';

        try {
            const res = await axios.get(
                `https://657b056e394ca9e4af1366a2.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sort.sortProperty}&order=desc${search}`
            );
            setItems(res.data);
        } catch (error) {
            setItems([]);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage]);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort,
                }),
            );
            isSearch.current = true;
        }
    }, []);
  
    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            fetchPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sort, searchValue, currentPage]);
    
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

    return (
        <div className='container'>
            <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
            <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
            {isLoading ? skeletons : pizzas}
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home;