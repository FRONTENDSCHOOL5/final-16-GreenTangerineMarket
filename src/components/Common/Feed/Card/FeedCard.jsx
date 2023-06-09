import { Link } from 'react-router-dom'
import { useState } from 'react'

import s from './FeedCard.module.scss'

import defaultProfile from 'assets/img/default-profile.svg'
import noImage from 'assets/img/no-image.png'
import formatUpdateTime from 'utils/formatUpdateTime'
import imageLayers from 'assets/img/icon-img-layers.svg'
import FeedAction from '../Action/FeedAction'

const FeedCard = ({ id, author, content, image, time }) => {
  const mainImage = image.split(',', 1)
  const isMultiImage = image.indexOf(',') !== -1
  const updateTime = formatUpdateTime(time)
  const [imageError, setImageError] = useState(false)

  const handleError = e => {
    setImageError(true)
  }
  return (
    <article className={s.card}>
      <header className={s.header}>
        <Link to={`/profile/${author.accountname}`} className={s.profile}>
          {
            <img
              src={!imageError ? author.image : defaultProfile}
              onError={handleError}
              alt={`${author.accountname} 프로필 이미지`}
              className={s.profileImg}
            />
          }
          <div className={s.author}>
            <p className={s.user}>{author.username}</p>
            <p className={s.account}>@{author.accountname}</p>
          </div>
        </Link>
        <p className={s.time}>{updateTime}</p>
      </header>
      <Link to={`/FeedDetail/${id}`} className={s.link}>
        {<img src={image ? mainImage : noImage} alt='피드 이미지' className={s.image} />}
        {isMultiImage && <img src={imageLayers} alt='여러장' className={s.layers} />}
        <p className={s.content}>{content}</p>
      </Link>
      <FeedAction id={id} />
    </article>
  )
}

export default FeedCard
