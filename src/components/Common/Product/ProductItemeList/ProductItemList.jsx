import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import s from './ProductItemList.module.scss'

import { getNextProductAPI } from 'api/product'
import ProductCard from 'components/Common/Product/Card/ProductCard'
import UpBtn from 'components/Common/UpBtn/UpBtn'

const ProductItemList = () => {
  const [products, setProducts] = useState([])

  const [page, setPage] = useState(0)

  const handleGetNextProduct = async () => {
    const res = await getNextProductAPI(page * 10)
    console.log(res.data.product)
    setProducts([...products, ...res.data.product])
  }

  const handleScroll = _.throttle(() => {
    const { scrollTop, scrollHeight } = document.documentElement
    if (scrollHeight - window.innerHeight - scrollTop < 200) {
      setPage(prevPage => prevPage + 1)
    }
  }, 1000)

  const _handleScroll = React.useCallback(handleScroll)
  useEffect(() => {
    window.addEventListener('scroll', _handleScroll)
    return () => {
      window.removeEventListener('scroll', _handleScroll)
    }
  }, [])

  useEffect(() => {
    handleGetNextProduct()
  }, [page])

  return (
    <>
      <div className={s.card}>
        <h2 className={s.title}>최신 상품</h2>
        <p>매일 자정! 새로운 특가!</p>
      </div>
      <section className={s.section}>
        {products.map(product => {
          return (
            <ProductCard
              key={product._id}
              id={product._id}
              image={product.itemImage}
              name={product.itemName}
              time={product.createdAt}
              price={product.price}
            />
          )
        })}
      </section>
      <UpBtn />
    </>
  )
}

export default ProductItemList
