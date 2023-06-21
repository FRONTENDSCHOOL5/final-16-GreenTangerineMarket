import { useNavigate } from 'react-router-dom'

import s from './ProfileNoItem.module.scss'

import imageNoItem from 'assets/img/no-item.svg'
import imageAddItem from 'assets/img/add-item.svg'

const ProfileNoItem = ({ item, action = '' }) => {
  const navigate = useNavigate()
  const handleAddItemClick = () => {
    navigate(`/${item}/create`)
  }
  console.log(action)
  return (
    <div className={s.container}>
      {action ? (
        <button type='button' onClick={handleAddItemClick} className={s.info}>
          <img src={imageAddItem} alt='청귤' />
          <span>{item === 'feed' ? '피드를' : '상품을'} 등록해보세요</span>
        </button>
      ) : (
        <div className={s.info}>
          <img src={imageNoItem} alt='청귤' />
          <p>등록된 {item === 'feed' ? '피드가' : '상품이'} 없습니다</p>
        </div>
      )}
    </div>
  )
}

export default ProfileNoItem
