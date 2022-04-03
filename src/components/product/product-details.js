import React from 'react'
import {deleteDoc, doc, getDoc, updateDoc} from 'firebase/firestore'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {useNavigate, useParams} from 'react-router-dom'
import {ProductImage} from './product-image'
import {db, storage} from 'firebase-config'
import {useSelector} from 'react-redux'

export function ProductDetails() {
  const {productId} = useParams()
  const navigate = useNavigate()

  const {uid: userId} = useSelector((state) => state.auth)

  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [previewUrl, setPreviewUrl] = React.useState('')
  const [file, setFile] = React.useState(null)
  const [allowModify, setAllowModify] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    setIsLoading(true)
    const getProduct = async () => {
      const docRef = doc(db, 'products', productId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const {title, description, image, uid} = docSnap.data()
        setTitle(title)
        setDescription(description)
        setPreviewUrl(image)
        if (userId === uid) setAllowModify(true)
        setIsLoading(false)
      } else {
        console.log('No such document!')
      }
    }
    getProduct()
  }, [productId, userId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description) {
      alert('Required field missing.')
      return
    }
    const productRef = doc(db, 'products', productId)

    updateDoc(productRef, {title, description}).catch(console.error)

    if (!file) {
      navigate('/')
      return
    }

    const storageRef = ref(storage, `/images/${Date.now()}${file?.name}`)
    const uploadImage = uploadBytesResumable(storageRef, file)

    uploadImage.on('state_changed', null, console.log, async () => {
      const url = await getDownloadURL(uploadImage.snapshot.ref)
      try {
        updateDoc(productRef, {title, description, image: url})
      } catch (error) {
        console.error(error)
      }
      navigate('/')
    })
  }

  const handleDelete = async () => {
    const product = doc(db, `products`, productId)
    if (!product) return

    try {
      await deleteDoc(product)
      navigate('/')
      return
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading Product...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h5>Product Details</h5>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              disabled={!allowModify}
            />
          </div>
          <div>
            <label htmlFor="description">Product Description</label>
            <input
              type="text"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              disabled={!allowModify}
            />
          </div>
          <ProductImage
            setImageFile={setFile}
            previewUrl={previewUrl}
            setPreviewUrl={setPreviewUrl}
            allowModify={allowModify}
          />
          {allowModify ? (
            <div>
              <button>Update Product</button>
              <button type="button" onClick={handleDelete}>
                Delete Product
              </button>
            </div>
          ) : null}
        </form>
      )}
    </div>
  )
}
