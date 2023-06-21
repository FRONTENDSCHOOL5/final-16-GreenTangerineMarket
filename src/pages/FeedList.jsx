import FeedItemList from 'components/FeedList/FeedItemList/FeedItemList'
import ListLayout from 'components/Common/Layout/List/ListLayout'

const FeedList = () => {
  return (
    <ListLayout link='/feed/create' name='피드추가'>
      <FeedItemList />
    </ListLayout>
  )
}

export default FeedList
