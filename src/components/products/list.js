import React from 'react'
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore'
import {db} from 'firebase-config'
import {ProductSummary} from './summary'

export function ProductList() {
  const [products, setProducts] = React.useState(null)

  React.useEffect(() => {
    const getProducts = async () => {
      const productsRef = collection(db, 'products')
      const q = query(productsRef, orderBy('createdAt', 'desc'))
      onSnapshot(q, (snapshot) => {
        const products = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setProducts(products)
      })
    }
    getProducts()
  }, [setProducts])

  return (
    <div className="product-list section">
      {products?.map((product) => (
        <ProductSummary product={product} key={product.id} />
      ))}
    </div>
  )
}
