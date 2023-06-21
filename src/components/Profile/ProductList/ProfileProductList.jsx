import { useEffect, useState } from 'react'

import s from './ProfileProductList.module.scss'

import { getUserProductList } from 'api/product'
import InfiniteScroll from 'components/Common/InfiniteScroll/InfiniteScroll'
import ProductCard from 'components/Common/Product/Card/ProductCard'
import { useRecoilValue } from 'recoil'
import { myInfoAtom } from 'recoil/atom/user'
import ProfileNoItem from '../NoItem/ProfileNoItem'

const ProfileProductList = ({ accountname }) => {
  const myInfo = useRecoilValue(myInfoAtom)
  const [isMyProfile, setIsMyProfile] = useState(myInfo.accountname === accountname)
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
    setIsMyProfile(myInfo.accountname === accountname)
  }, [accountname])
  return (
    <InfiniteScroll loadData={loadUserProducts}>
      {userProducts.length ? (
        <div className={s.container}>
          {userProducts.map((product, index) => {
            return (
              <ProductCard
                key={product.id + index}
                id={product.id}
                image={product.itemImage}
                name={product.itemName}
                price={product.price}
                time={product.createdAt}
              />
            )
          })}
        </div>
      ) : isMyProfile ? (
        <ProfileNoItem item='product' action='add' />
      ) : (
        <ProfileNoItem item='product' />
      )}
    </InfiniteScroll>
  )
}

export default ProfileProductList
