import {ProductList} from '../products/list'
import {Notifications} from './notifications'

export function Dashboard() {
  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m6">
          <ProductList />
        </div>
        <div className="col s12 m5 offset-m1">
          <Notifications />
        </div>
      </div>
    </div>
  )
}
