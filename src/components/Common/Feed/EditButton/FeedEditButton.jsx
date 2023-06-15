import { useNavigate } from 'react-router'

const FeedEditButton = ({ id }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/post/edit/${id}`)
  }
  return <button onClick={handleClick}>수정</button>
}

export default FeedEditButton
