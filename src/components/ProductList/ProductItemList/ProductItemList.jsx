import { useState } from 'react'
import _ from 'lodash'

import s from './ProductItemList.module.scss'

import { getNextProductAPI } from 'api/product'
import ProductCard from 'components/Common/Product/Card/ProductCard'
import InfiniteScroll from 'components/Common/InfiniteScroll/InfiniteScroll'
import GridLayout from 'components/Common/Layout/Grid/GridLayout'

const ProductItemList = () => {
  const [products, setProducts] = useState([])

  const loadProduct = async page => {
    const res = await getNextProductAPI(page * 20)
    if (res.status === 200) setProducts([...products, ...res.data.product])
  }
  return (
    <InfiniteScroll loadData={loadProduct}>
      <div className={s.card}>
        <h2 className={s.title}>최신 상품</h2>
        <p>매일 자정! 새로운 특가!</p>
      </div>
      <GridLayout item='product'>
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
      </GridLayout>
    </InfiniteScroll>
  )
}
export default ProductItemList
