import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const { order, category, search, currentPage, sortBy } = params;
    const { data } = await axios.get(
        `https://657b056e394ca9e4af1366a2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
})

const initialState = {
    items: [],
    status: 'loading',
};

const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {},
        extraReducers: (builder) => {
            builder
               .addCase(fetchPizzas.pending, (state) => {
                  state.status = "loading"
                  state.items = []
               })
               .addCase(fetchPizzas.fulfilled, (state, action) => {
                  state.items = action.payload
                  state.status = "success"
               })
               .addCase(fetchPizzas.rejected, (state) => {
                  state.status = "error"
                  state.items = []
               })
         }
}); 

export const {} = pizzaSlice.actions;

export default pizzaSlice.reducer;