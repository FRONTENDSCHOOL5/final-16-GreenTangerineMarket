import s from './Home.module.scss'

import Footer from 'components/Common/Footer/Footer'
import Header from 'components/Common/Header/Header'
import HomeFeed from 'components/Home/FeedList/HomeFeed'
import HomeProduct from 'components/Home/ProductList/HomeProduct'

const Home = () => {
  return (
    <>
      <Header />
      <main className={s.main}>
        <HomeFeed />
        <HomeProduct />
      </main>
      <Footer />
    </>
  )
}

export default Home
