import React from 'react'
import {deleteDoc, doc, getDoc, updateDoc} from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import {useNavigate, useParams} from 'react-router-dom'
import {ProductImage} from 'components/products/image'
import {db, storage} from 'firebase-config'

export function ProductDetails() {
  const {id} = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [file, setFile] = React.useState(null)
  const [previewUrl, setPreviewUrl] = React.useState(null)

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
  }, [id])

  const handleSubmit = (e) => {
    if (!title || !description) {
      alert('Required field missing.')
      return
    }
    e.preventDefault()
    const productRef = doc(db, 'products', id)

    updateDoc(productRef, {title, description}).catch(console.error)

    if (!file) {
      navigate('/')
      return
    }

    const storageRef = ref(storage, `/images/${Date.now()}${file?.name}`)
    const uploadImage = uploadBytesResumable(storageRef, file)
    uploadImage.on(
      'state_changed',
      (snapshot) => console.log(snapshot.bytesTransferred),
      console.log,
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          updateDoc(productRef, {
            title,
            description,
            image: url,
          }).catch(console.error)
          navigate('/')
        })
      },
    )
  }

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, `products`, id))
      const storageRef = ref(storage, file)
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
        <div className="input-field">
          <button className="btn pink lighten-1" type="submit">
            Update Product
          </button>
          <button className="btn red darken-3 right" onClick={handleDelete}>
            Delete Product
          </button>
        </div>
      </form>
    </div>
  )
}
