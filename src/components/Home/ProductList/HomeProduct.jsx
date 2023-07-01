import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import s from './HomeProduct.module.scss'

import { getProductListAPI } from 'api/product'
import ProductCard from 'components/Common/Product/Card/ProductCard'

const HomeProduct = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProductList = async () => {
      const res = await getProductListAPI()
      setProducts(res.data.product)
    }
    getProductList()
  }, [])

  return (
    <section>
      <div className={s.card}>
        <h2 className={s.title}>최신 상품</h2>
        <Link className={s.link} to='/product'>
          더보기
        </Link>
      </div>
      <div className={s.box}>
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
      </div>
    </section>
  )
}

export default HomeProduct
