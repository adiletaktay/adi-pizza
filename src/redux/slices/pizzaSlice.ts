import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Pizza = {
    id: string;
    title: string;
    type: number[];
    price: number;
    size: number[];
    image: string;
    rating: number;
};

export enum Status {
    LOADING = "loading",
    SUCCES = "succes",
    ERROR = "error",
}

export interface PizzaSliceState {
    items: Pizza[];
    status: Status;
};

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};

export type SearchPizzaParams = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
    const { order, category, search, currentPage, sortBy } = params;
    const { data } = await axios.get<Pizza[]>(
        `https://657b056e394ca9e4af1366a2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
});

const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {},
        extraReducers: (builder) => {
            builder
               .addCase(fetchPizzas.pending, (state) => {
                  state.status = Status.LOADING
                  state.items = []
               })
               .addCase(fetchPizzas.fulfilled, (state, action) => {
                  state.items = action.payload
                  state.status = Status.SUCCES
               })
               .addCase(fetchPizzas.rejected, (state) => {
                  state.status = Status.ERROR
                  state.items = []
               })
        }
}); 

export const selectPizzaData = (state: RootState) => state.pizza;

export const {} = pizzaSlice.actions;

export default pizzaSlice.reducer;