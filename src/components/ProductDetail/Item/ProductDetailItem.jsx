import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'

import s from './ProductDetailItem.module.scss'

import { getProductDetailAPI } from 'api/product'
import ProfileImage from 'components/Common/ProfileImage/ProfileImage'
import formatCreateTime from 'utils/formatCreateTime'
import formatNumberWithComma from 'utils/formatNumberWithComma'
import { myInfoAtom } from 'recoil/atom/user'
import { SmallButton, SmallWhiteButton } from 'components/Common/Button/Small/SmallButton'
import defaultImage from 'assets/img/no-image.png'

const ProductDetailItem = () => {
  const params = useParams()
  const [imageError, setImageError] = useState(false)
  const [product, setProduct] = useState(null)
  const myInfo = useRecoilValue(myInfoAtom)

  const getProductDetail = async () => {
    const res = await getProductDetailAPI(params.id)
    if (res.status === 200) {
      setProduct(res.data.product)
    }
  }

  const handleImageError = () => setImageError(true)

  useEffect(() => {
    getProductDetail()
  }, [])
  return (
    <>
      {product && (
        <>
          <section className={s.container}>
            <img
              className={s.image}
              src={!imageError ? product.itemImage : defaultImage}
              alt='상품이미지'
              onError={handleImageError}
            />
            <div className={s.info}>
              <p className={s.name}>{product.itemName}</p>
              <p className={s.price}>{formatNumberWithComma(product.price)}원</p>
              <p className={s.seller}>판매자 정보</p>
              <Link to={`/profile/${product.author}`} className={s.author}>
                <ProfileImage image={product.author.image} name={product.author.username} className={s.profile} />
                <div>
                  <p className={s.user}>{product.author.username}</p>
                  <p className={s.account}>@{product.author.accountname}</p>
                </div>
              </Link>
              <p className={s.time}>{formatCreateTime(product.createdAt)}</p>
            </div>
          </section>
          {myInfo.accountname === product.author.accountname && (
            <div className={s.button}>
              <SmallButton>수정</SmallButton>
              <SmallWhiteButton>삭제</SmallWhiteButton>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default ProductDetailItem
