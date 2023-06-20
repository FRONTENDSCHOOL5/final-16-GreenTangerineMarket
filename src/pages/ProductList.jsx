import s from './ProductList.module.scss'

import Footer from 'components/Common/Footer/Footer'
import ProductItemList from 'components/Common/Product/ProductItemeList/ProductItemList'
import ProductHeader from 'components/Common/Header/ProductHeader'

const ProductList = () => {
  return (
    <>
      <ProductHeader />
      <main className={s.main}>
        <ProductItemList />
      </main>

      <Footer />
    </>
  )
}

export default ProductList
