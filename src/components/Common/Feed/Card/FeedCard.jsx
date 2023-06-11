import s from './FeedCard.module.scss'

import formatUpdateTime from 'utils/formatUpdateTime'
import FeedAction from '../Action/FeedAction'
import FeedProfile from '../Profile/FeedProfile'
import FeedContent from '../Content/FeedContent'

const FeedCard = ({ id, author, content, image, time }) => {
  const updateTime = formatUpdateTime(time)
  return (
    <article className={s.card}>
      <header>
        <FeedProfile author={author} />
      </header>
      <FeedContent id={id} image={image} content={content} />
      <footer>
        <FeedAction id={id} />
        <p className={s.time}>{updateTime}</p>
      </footer>
    </article>
  )
}

export default FeedCard
