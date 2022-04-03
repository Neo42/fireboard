import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {addDoc, collection, Timestamp} from 'firebase/firestore'
import {ProductImage} from 'components'
import {db, storage} from 'firebase-config'

export function NewProduct() {
  const {uid} = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [previewUrl, setPreviewUrl] = React.useState('')
  const [file, setFile] = React.useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description || !file) {
      alert('Required field missing.')
      return
    }

    const storageRef = ref(storage, `/images/${Date.now()}${file.name}`)
    const uploadImage = uploadBytesResumable(storageRef, file)

    uploadImage.on('state_changed', null, console.error, () => {
      getDownloadURL(uploadImage.snapshot.ref).then((url) => {
        const productRef = collection(db, 'products')
        addDoc(productRef, {
          title,
          description,
          image: url,
          createdAt: Timestamp.now().toDate(),
          uid,
        })
          .then(() => navigate('/'))
          .catch(console.error)
      })
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h5>New Product</h5>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Product Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <ProductImage
          setImageFile={setFile}
          setPreviewUrl={setPreviewUrl}
          previewUrl={previewUrl}
        />
        <div>
          <button>Create Product</button>
        </div>
      </form>
    </div>
  )
}
