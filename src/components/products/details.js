import {useParams} from 'react-router-dom'

export function ProductDetails() {
  const {id} = useParams()
  return (
    <div className="container section product-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Product Title - {id}</span>
          <p>
            Officia mollitia esse. Voluptas odit velit est. Ullam ex excepturi
            tempore. Debitis minima neque ducimus assumenda voluptatibus iste
            aliquid aliquam. Et quo et corporis ullam rerum quas.
          </p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>Posted by Neo42</div>
          <div>March 31th, 4:57pm</div>
        </div>
      </div>
    </div>
  )
}
