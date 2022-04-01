import {ProductList} from './products/list'

export function Dashboard() {
  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m4">
          <ProductList />
        </div>
      </div>
    </div>
  )
}
