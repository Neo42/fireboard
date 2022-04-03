import React from 'react'
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore'
import {useDispatch, useSelector} from 'react-redux'
import {receivedProducts} from 'features/products-slice'
import {db} from 'firebase-config'
import {ProductSummary} from '../product/product-summary'

export function ProductList() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = React.useState(false)
  const {products, searchInput} = useSelector((state) => state.products)
  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchInput.toLowerCase()),
  )
  const foundNone = !filteredProducts.length

  React.useEffect(() => {
    setIsLoading(true)
    const getProducts = async () => {
      const productsRef = collection(db, 'products')
      const q = query(productsRef, orderBy('createdAt', 'desc'))
      onSnapshot(q, (snapshot) => {
        const products = snapshot.docs.map((doc) => {
          const {createdAt, ...rest} = doc.data()
          return {...rest, id: doc.id}
        })
        setIsLoading(false)
        dispatch(receivedProducts(products))
      })
    }
    getProducts()
  }, [dispatch])

  return (
    <div>
      {isLoading ? (
        <p>Loading Products...</p>
      ) : foundNone ? (
        <span>Oops! Found nothing...</span>
      ) : (
        filteredProducts?.map((product) => (
          <ProductSummary product={product} key={product.id} />
        ))
      )}
    </div>
  )
}
