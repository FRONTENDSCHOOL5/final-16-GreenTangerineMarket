import ListLayout from 'components/Common/Layout/List/ListLayout'
import ProductItemList from 'components/ProductList/ProductItemList/ProductItemList'

const ProductList = () => {
  return (
    <ListLayout link='/product/create' name='상품등록'>
      <ProductItemList />
    </ListLayout>
  )
}

export default ProductList
