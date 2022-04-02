import {ProductSearch, ProductList} from 'components/products'

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
