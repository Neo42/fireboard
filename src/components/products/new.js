import {addDoc, collection, Timestamp} from 'firebase/firestore'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import {ProductImage} from 'components'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {db, storage} from 'firebase-config'

export function NewProduct() {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [file, setFile] = React.useState(null)
  const [previewUrl, setPreviewUrl] = React.useState(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description || !file) {
      alert('Required field missing.')
      return
    }

    const storageRef = ref(storage, `/images/${Date.now()}${file.name}`)
    const uploadImage = uploadBytesResumable(storageRef, file)

    uploadImage.on(
      'state_changed',
      (snapshot) => console.log(snapshot.bytesTransferred),
      console.log,
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const productRef = collection(db, 'products')
          addDoc(productRef, {
            title,
            description,
            image: url,
            createdAt: Timestamp.now().toDate(),
          })
            .then(() => navigate('/'))
            .catch(console.error)
        })
      },
    )
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">New Product</h5>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="description">Product Description</label>
          <textarea
            id="description"
            className="materialize-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <ProductImage
          setImageFile={setFile}
          setPreviewUrl={setPreviewUrl}
          previewUrl={previewUrl}
        />
        <div className="input-field row">
          <button className="btn pink lighten-1 col s12 m3">
            Create Product
          </button>
        </div>
      </form>
    </div>
  )
}
