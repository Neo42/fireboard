import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  products: [],
  searchInput: '',
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    receivedProducts(state, action) {
      state.products = action.payload
    },
    changeSearchInput(state, action) {
      state.searchInput = action.payload
    },
  },
})

export const {receivedProducts, changeSearchInput} = productsSlice.actions

export default productsSlice.reducer
