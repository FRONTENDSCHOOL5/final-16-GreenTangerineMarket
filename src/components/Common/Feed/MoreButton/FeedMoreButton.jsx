import s from './FeedMoreButton.module.scss'

const FeedMoreButton = () => {
  const showMenu = () => {}
  return (
    <button type='button' onClick={showMenu} className={s.more}>
      <span className='a11y-hidden'>더보기 버튼</span>
    </button>
  )
}

export default FeedMoreButton
