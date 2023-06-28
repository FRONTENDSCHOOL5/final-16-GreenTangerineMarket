import { useNavigate } from 'react-router'
import { useSetRecoilState } from 'recoil'
import { showEditModalAtom } from 'recoil/atom/showFlag'

const FeedEditButton = ({ id }) => {
  const setShowEditModal = useSetRecoilState(showEditModalAtom)
  const navigate = useNavigate()

  const handleClick = () => {
    setShowEditModal(true)
    navigate(`/feed/detail/${id}`)
  }

  return <button onClick={handleClick}>수정</button>
}

export default FeedEditButton
