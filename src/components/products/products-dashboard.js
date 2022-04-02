import {ProductList} from './products-list'
import {ProductSearch} from './products-search'

export function Dashboard() {
  return (
    <div className="dashboard container">
      <div className="col">
        <ProductSearch />
        <ProductList />
      </div>
    </div>
  )
}
