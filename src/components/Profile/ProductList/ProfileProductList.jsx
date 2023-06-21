import { useEffect, useState } from 'react'

import s from './ProfileProductList.module.scss'

import { getUserProductList } from 'api/product'
import InfiniteScroll from 'components/Common/InfiniteScroll/InfiniteScroll'
import ProductCard from 'components/Common/Product/Card/ProductCard'

const ProfileProductList = ({ accountname }) => {
  const [userProducts, setUserProducts] = useState([])
  const [isMoreData, setIsMoreData] = useState(true)
  const loadUserProducts = async page => {
    if (isMoreData) {
      const res = await getUserProductList({ num: page * 10, accountname: accountname })
      if (res.status === 200) {
        res.data.data === 0 ? setIsMoreData(false) : setUserProducts([...userProducts, ...res.data.product])
      }
    }
  }
  useEffect(() => {
    setUserProducts([])
    setIsMoreData(true)
  }, [accountname])
  return (
    <InfiniteScroll loadData={loadUserProducts}>
      {userProducts.length ? (
        <div className={s.container}>
          {userProducts.map(product => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.itemImage}
                name={product.itemName}
                price={product.price}
                time={product.createdAt}
              />
            )
          })}
        </div>
      ) : (
        <div>게시글을 등록하세요</div>
      )}
    </InfiniteScroll>
  )
}

export default ProfileProductList
