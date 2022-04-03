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
    <div>
      {allowModify ? (
        <div>
          <div>
            <span>Upload Cover</span>
            <input type="file" onChange={handleImageChange} />
          </div>
          <div>
            <input />
          </div>
        </div>
      ) : null}
      <div>
        {previewUrl ? (
          <img src={previewUrl} ref={previewRef} alt="previewUrl" />
        ) : null}
      </div>
    </div>
  )
}
