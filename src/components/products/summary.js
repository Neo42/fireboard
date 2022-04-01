import {Link} from 'react-router-dom'

export function ProductSummary({product}) {
  return (
    <Link to={`/product/${product?.id}`} className="col m4 s12">
      <div className="card hoverable product-summary">
        <div className="card-image">
          <img
            src={product?.image}
            alt={product?.title}
            style={{objectFit: 'cover'}}
            height={180}
          />
        </div>
        <div className="card-content">
          <span className="card-title black-text">{product?.title}</span>
          <p>{product?.description}</p>
        </div>
      </div>
    </Link>
  )
}
