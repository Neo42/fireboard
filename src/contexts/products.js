import React from 'react'

const ProductsContext = React.createContext(null)

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = React.useState(null)
  return (
    <ProductsContext.Provider
      value={[products, setProducts]}
      children={children}
    />
  )
}

export function useProducts() {
  const context = React.useContext(ProductsContext)
  if (!context) throw new Error('Not in the ProductsContext.')
  return React.useContext(ProductsContext)
}
