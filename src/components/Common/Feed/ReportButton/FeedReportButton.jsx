import { toast } from 'react-hot-toast'

import { reportFeedAPI } from 'api/feed'
import getToastStyle from 'utils/getToastStyle'

const FeedReportButton = ({ id, closeMenu }) => {
  const reportFeed = async () => {
    const res = await reportFeedAPI(id)
    if (res.status === 200) {
      toast('해당 피드가 신고되었습니다', {
        style: getToastStyle(),
      })
    }
    closeMenu()
  }

  return (
    <button type='button' onClick={reportFeed}>
      신고
    </button>
  )
}

export default FeedReportButton
