import { useEffect, useState } from 'react'

import s from './ProfileItemList.module.scss'

import ProfileFeedList from '../../FeedList/ProfileFeedList'
import ProfileProductList from '../../ProductList/ProfileProductList'

const ProfileItemList = ({ accountname }) => {
  const [showFeed, setShowFeed] = useState(true)
  const [showProduct, setShowProduct] = useState(false)

  const handleFeedClick = () => {
    setShowFeed(true)
    setShowProduct(false)
  }

  const handleProductClick = () => {
    setShowProduct(true)
    setShowFeed(false)
  }

  useEffect(() => {
    setShowFeed(true)
    setShowProduct(false)
  }, [accountname])

  return (
    <section className={s.container}>
      <div className={s.tab}>
        <button type='button' className={showFeed ? s.show : ''} onClick={handleFeedClick}>
          피드
        </button>
        <button type='button' className={showProduct ? s.show : ''} onClick={handleProductClick}>
          상품
        </button>
      </div>
      {showFeed ? <ProfileFeedList accountname={accountname} /> : <ProfileProductList accountname={accountname} />}
    </section>
  )
}

export default ProfileItemList
