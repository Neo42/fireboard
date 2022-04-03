import {ProductList} from './products-list'
import {ProductSearch} from './products-search'

export function Dashboard() {
  return (
    <div>
      <div>
        <ProductSearch />
        <ProductList />
      </div>
    </div>
  )
}
