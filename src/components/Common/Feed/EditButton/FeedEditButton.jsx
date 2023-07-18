import { useNavigate } from 'react-router-dom'

const FeedEditButton = ({ id }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/feed/detail/${id}?edit=true`)
  }

  return (
    <button type='button' onClick={handleClick}>
      수정
    </button>
  )
}

export default FeedEditButton
