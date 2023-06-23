import MainLayout from 'components/Common/Layout/Main/MainLayout'
import HomeFeed from 'components/Home/FeedList/HomeFeed'
import HomeProduct from 'components/Home/ProductList/HomeProduct'

const Home = () => {
  return (
    <MainLayout>
      <HomeFeed />
      <HomeProduct />
    </MainLayout>
  )
}

export default Home
