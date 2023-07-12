import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { Link } from 'react-router-dom'

import s from './ProductDetailItem.module.scss'

import { deleteProductAPI, getProductDetailAPI } from 'api/product'
import ProfileImage from 'components/Common/ProfileImage/ProfileImage'
import formatCreateTime from 'utils/formatCreateTime'
import formatNumberWithComma from 'utils/formatNumberWithComma'
import { myInfoAtom } from 'recoil/atom/user'
import { SmallButton, SmallWhiteButton } from 'components/Common/Button/Small/SmallButton'
import defaultImage from 'assets/img/no-image.png'
import { showEditModalAtom } from 'recoil/atom/showFlag'
import { toast } from 'react-hot-toast'
import getToastStyle from 'utils/getToastStyle'
import EditModal from 'components/Common/Modal/EditModal'
import NotFoundPage from 'components/NotFound/NotFoundPage'

const ProductDetailItem = () => {
  const params = useParams()
  const [imageError, setImageError] = useState(false)
  const [product, setProduct] = useState(null)
  const [isNoProduct, setIsNoProduct] = useState(false)
  const myInfo = useRecoilValue(myInfoAtom)
  const navigate = useNavigate()
  const [showEditModal, setShowEditModal] = useRecoilState(showEditModalAtom)

  const getProductDetail = async () => {
    const res = await getProductDetailAPI(params.id)
    if (res.status === 200) {
      setProduct(res.data.product)
    } else {
      setIsNoProduct(true)
    }
  }

  const handleImageError = () => setImageError(true)

  const handleDeleteProduct = async () => {
    const res = await deleteProductAPI(params.id)
    if (res.status === 200) {
      toast('상품을 삭제했습니다', { style: getToastStyle() })
      navigate(-1)
    }
  }

  useEffect(() => {
    getProductDetail()
    window.scrollTo({ top: 0 })
  }, [])
  return (
    <>
      {!isNoProduct ? (
        product && (
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
                <Link to={`/profile/${product.author.accountname}`} className={s.author}>
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
                <SmallButton onClickEvent={() => setShowEditModal(true)}>수정</SmallButton>
                <SmallWhiteButton onClickEvent={handleDeleteProduct}>삭제</SmallWhiteButton>
              </div>
            )}
            {showEditModal && <EditModal type='product' info={product} />}
          </>
        )
      ) : (
        <NotFoundPage />
      )}
    </>
  )
}

export default ProductDetailItem
