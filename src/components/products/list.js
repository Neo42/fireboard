import React from 'react'
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore'
import {useProducts} from 'contexts/products'
import {db} from 'firebase-config'
import {ProductSummary} from './summary'

export function ProductList() {
  const [products, setProducts] = useProducts()

  React.useEffect(() => {
    const getProducts = async () => {
      const productRef = collection(db, 'products')
      const q = query(productRef, orderBy('createdAt', 'desc'))
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
