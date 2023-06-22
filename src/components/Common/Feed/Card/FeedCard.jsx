import s from './FeedCard.module.scss'

import formatCreateTime from 'utils/formatCreateTime'
import FeedAction from '../Action/FeedAction'
import FeedProfile from '../Profile/FeedProfile'
import FeedContent from '../Content/FeedContent'
import FeedMoreButton from '../MoreButton/FeedMoreButton'

const FeedCard = ({ id, author, content, image, time }) => {
  const createTime = formatCreateTime(time)

  return (
    <article className={s.card}>
      <header>
        <FeedProfile author={author} />
        <FeedMoreButton id={id} author={author} />
      </header>
      <FeedContent id={id} image={image} content={content} />
      <footer>
        <FeedAction id={id} />
        <p className={s.time}>{createTime}</p>
      </footer>
    </article>
  )
}

export default FeedCard
