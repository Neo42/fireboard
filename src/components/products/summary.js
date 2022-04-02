import {Link} from 'react-router-dom'

export function ProductSummary({product}) {
  return (
    <Link to={`/product/${product?.id}`} className="col m4 s12">
      <div className="card hoverable product-summary">
        <div className="card-image">
          <img
            src={product?.image}
            alt={product?.title}
            style={{objectFit: 'cover', height: '15rem'}}
          />
        </div>
        <div className="card-content">
          <span className="card-title black-text">{product?.title}</span>
          <p
            className="black-text"
            style={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 7,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product?.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
