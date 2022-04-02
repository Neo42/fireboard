import React from 'react'
import {deleteDoc, doc, getDoc, updateDoc} from 'firebase/firestore'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {useNavigate, useParams} from 'react-router-dom'
import {ProductImage} from 'components/products/image'
import {db, storage} from 'firebase-config'
import {textareaAutoResize} from 'materialize-css'

export function ProductDetails() {
  const {id} = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [previewUrl, setPreviewUrl] = React.useState('')
  const [file, setFile] = React.useState(null)

  const textareaRef = React.useRef(null)

  React.useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, 'products', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const {title, description, image} = docSnap.data()
        setTitle(title)
        setDescription(description)
        setPreviewUrl(image)
      } else {
        console.log('No such document!')
      }
    }
    getProduct()

    if (description) {
      textareaAutoResize(textareaRef.current)
    }
  }, [description, id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description) {
      alert('Required field missing.')
      return
    }
    const productRef = doc(db, 'products', id)

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
    const product = doc(db, `products`, id)
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
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5>Product Details</h5>
        <div className="input-field">
          <label htmlFor="title" className="active">
            Title
          </label>
          <input
            type="text"
            id="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="input-field">
          <label htmlFor="description" className="active">
            Product Description
          </label>
          <textarea
            ref={textareaRef}
            id="description"
            className="materialize-textarea"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <ProductImage
          setImageFile={setFile}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
        />
        <div className="input-field row">
          <button className="btn black col s12 m3" type="submit">
            Update Product
          </button>
          <button
            type="button"
            className="btn black right col s12 m3"
            onClick={handleDelete}
          >
            Delete Product
          </button>
        </div>
      </form>
    </div>
  )
}
