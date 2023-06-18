import { useState, useEffect } from 'react'

import s from './HomeProduct.module.scss'

import { getProductListAPI } from 'api/product'
import ProductCard from 'components/Common/Product/Card/ProductCard'
import { Link } from 'react-router-dom'

const HomeProduct = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const getPorductList = async () => {
      const res = await getProductListAPI()
      console.log(res)
      setProducts(res.data.product)
    }
    getPorductList()
  }, [])
  return (
    <>
      <div className={s.card}>
        <h2 className={s.title}>최신 상품</h2>
        <Link className={s.link} to='/product'>
          더보기
        </Link>
      </div>
      <section className={s.section}>
        {products.map(product => {
          return (
            <ProductCard
              key={product._id}
              id={product._id}
              image={product.itemImage}
              name={product.itemName}
              createTime={product.createdAt}
              price={product.price}
            />
          )
        })}
      </section>
    </>
  )
}

export default HomeProduct
