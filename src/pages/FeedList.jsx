import s from './FeedList.module.scss'

import Footer from 'components/Common/Footer/Footer'
import FeedItemList from 'components/FeedList/FeedItemList/FeedItemList'
import ListHeader from 'components/Common/Header/ListHeader'

const FeedList = () => {
  return (
    <>
      <ListHeader />
      <main className={s.main}>
        <FeedItemList />
      </main>
      <Footer />
    </>
  )
}

export default FeedList
