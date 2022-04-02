import React from 'react'
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore'
import {db} from 'firebase-config'
import {ProductSummary} from './summary'

import {useDispatch, useSelector} from 'react-redux'
import {receivedProducts} from 'features/products-slice'

export function ProductList() {
  const dispatch = useDispatch()
  const {products, searchInput} = useSelector((state) => state.products)
  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchInput.toLowerCase()),
  )

  React.useEffect(() => {
    const getProducts = async () => {
      const productsRef = collection(db, 'products')
      const q = query(productsRef, orderBy('createdAt', 'desc'))
      onSnapshot(q, (snapshot) => {
        const products = snapshot.docs.map((doc) => {
          const {createdAt, ...rest} = doc.data()
          return {
            ...rest,
            id: doc.id,
          }
        })
        dispatch(receivedProducts(products))
      })
    }
    getProducts()
  }, [dispatch])

  return (
    <div className="product-list section row">
      {filteredProducts?.map((product) => (
        <ProductSummary product={product} key={product.id} />
      ))}
      {Array.isArray(filteredProducts) && !filteredProducts.length ? (
        <span>Oops! Found nothing...</span>
      ) : null}
    </div>
  )
}
