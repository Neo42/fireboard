import {ProductList} from './products/list'

export function Dashboard() {
  return (
    <div className="dashboard container">
      <div className="row">
        <ProductList />
      </div>
    </div>
  )
}
