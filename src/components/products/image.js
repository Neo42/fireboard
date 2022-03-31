import React from 'react'
import M from 'materialize-css'

export function ProductImage({setImage}) {
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState('')
  const previewRef = React.useRef(null)

  const handleImageChange = (e) => {
    e.preventDefault()
    let reader = new FileReader()
    let image = e.target.files[0]
    reader.onloadend = () => {
      setImage(image)
      setImagePreviewUrl(reader.result)
    }
    reader.readAsDataURL(image)
  }

  React.useEffect(() => {
    if (previewRef) {
      M.Materialbox.init(previewRef.current)
    }
  }, [previewRef])

  return (
    <div className="previewComponent">
      <div className="file-field input-field">
        <div className="btn">
          <span>Upload Cover</span>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div className="file-path-wrapper">
          <input
            className="file-path validate"
            type="text"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="imgPreview">
        {imagePreviewUrl ? (
          <img
            src={imagePreviewUrl}
            ref={previewRef}
            alt="preview"
            className="materialboxed"
            width="250"
          />
        ) : null}
      </div>
    </div>
  )
}
