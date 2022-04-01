import {ProductImage} from 'components/products/image'
import {useProducts} from 'contexts/products'
import {db, storage} from 'firebase-config'
import {deleteDoc, doc} from 'firebase/firestore'
import {deleteObject, ref} from 'firebase/storage'
import {useNavigate, useParams} from 'react-router-dom'

export function ProductDetails() {
  const {id} = useParams()
  const [products] = useProducts()
  const product = products?.find((product) => product?.id === id)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, `products`, id))
      const storageRef = ref(storage, product?.image)
      await deleteObject(storageRef)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Product Details</h5>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input type="text" id="text" onChange={() => {}} />
        </div>
        <div className="input-field">
          <label htmlFor="description">Product Description</label>
          <textarea
            id="description"
            className="materialize-textarea"
            onChange={() => {}}
          />
        </div>
        <ProductImage setImage={() => {}} />
        <div className="input-field">
          <button className="btn pink lighten-1" type="submit">
            Create Product
          </button>
          <button className="btn red darken-3 right" onClick={handleDelete}>
            Delete Product
          </button>
        </div>
      </form>
    </div>
  )
}
