import React from 'react'

export function ProductImage({
  setImageFile,
  previewUrl,
  setPreviewUrl,
  allowModify = true,
}) {
  const previewRef = React.useRef(null)

  const handleImageChange = (e) => {
    e.preventDefault()
    let reader = new FileReader()
    let image = e.target.files[0]
    reader.onloadend = () => {
      setImageFile(image)
      setPreviewUrl(reader.result)
    }
    reader.readAsDataURL(image)
  }

  return (
    <div className="previewComponent">
      {allowModify ? (
        <div className="file-field input-field">
          <div className="btn black">
            <span>Upload Cover</span>
            <input type="file" onChange={handleImageChange} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      ) : null}
      <div className="imgPreview">
        {previewUrl ? (
          <img
            src={previewUrl}
            ref={previewRef}
            alt="previewUrl"
            className="responsive-img"
          />
        ) : null}
      </div>
    </div>
  )
}
