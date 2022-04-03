import {Link} from 'react-router-dom'

export function ProductSummary({product}) {
  return (
    <Link to={`/product/${product?.id}`}>
      <div>
        <div>
          <img
            src={product?.image}
            alt={product?.title}
            style={{objectFit: 'cover', height: '15rem'}}
          />
        </div>
        <div>
          <span>{product?.title}</span>
          <p
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
