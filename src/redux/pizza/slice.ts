import { createSlice } from "@reduxjs/toolkit"
import { PizzaSliceState, Status } from "./types"
import { fetchPizzas } from "./asyncActions"

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
}

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPizzas.pending, state => {
        state.status = Status.LOADING
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = Status.SUCCES
      })
      .addCase(fetchPizzas.rejected, state => {
        state.status = Status.ERROR
        state.items = []
      })
  },
})

export const {} = pizzaSlice.actions

export default pizzaSlice.reducer
