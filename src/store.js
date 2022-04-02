import {configureStore} from '@reduxjs/toolkit'
import authReducer from 'features/auth-slice'
import productsReducer from 'features/products-slice'
import productReducer from 'features/product-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    product: productReducer,
  },
})
