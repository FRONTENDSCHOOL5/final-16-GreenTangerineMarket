import s from './FeedList.module.scss'

import Footer from 'components/Common/Footer/Footer'
import FeedItemList from 'components/FeedList/FeedItemList/FeedItemList'
import ListHeader from 'components/Common/Header/ListHeader'
import MainLayout from 'components/Common/Layout/Main/MainLayout'

const FeedList = () => {
  return (
    <MainLayout>
      <FeedItemList />
    </MainLayout>
  )
}

export default FeedList
