import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  product: {
    title: '',
    description: '',
    file: null,
    previewUrl: null,
  },
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    receivedProduct(state, action) {
      state.product = action.payload
    },
  },
})

export const {receivedProduct} = productSlice.actions

export default productSlice.reducer
