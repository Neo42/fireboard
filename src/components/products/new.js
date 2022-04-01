import {ProductImage} from 'components'
import React from 'react'

export function NewProduct() {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [image, setImage] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({title, description, image})
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
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="description">Product Description</label>
          <textarea
            id="description"
            className="materialize-textarea"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <ProductImage setImage={setImage} />
        <div className="input-field">
          <button className="btn pink lighten-1">Create Product</button>
        </div>
      </form>
    </div>
  )
}
