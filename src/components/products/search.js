import {useDispatch} from 'react-redux'
import {changeSearchInput} from 'features/products-slice'
import {debounce} from 'utils'
import {useSelector} from 'react-redux'
import React from 'react'

export function ProductSearch() {
  const dispatch = useDispatch()
  const searchRef = React.useRef(null)
  const searchInput = useSelector((state) => state.products.searchInput)

  const handleChange = debounce(
    (e) => dispatch(changeSearchInput(e.target.value)),
    {wait: 500},
  )

  React.useEffect(() => {
    searchRef.current.value = searchInput
  }, [searchInput])

  return (
    <div className="center">
      <i className="material-icons prefix">search</i>
      <div className="input-field inline row">
        <input
          type="text"
          className="col s12"
          ref={searchRef}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
