import { useState } from 'react'
import { toast } from 'react-hot-toast'

import s from './FeedReportButton.module.scss'

import { MsmallButton, MsmallWhiteButton } from 'components/Common/Button/Msmall/MsmallButton'
import { reportFeedAPI } from 'api/feed'
import getToastStyle from 'utils/getToastStyle'
import Modal from 'components/Common/Modal/Modal'

const FeedReportButton = ({ id, closeMenu }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleReportClick = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)

  const cancelReport = () => {
    closeModal()
    closeMenu()
  }

  const reportFeed = async () => {
    const res = await reportFeedAPI(id)
    if (res.status === 200) {
      toast('해당 피드가 신고되었습니다', {
        style: getToastStyle(),
      })
    }
    closeModal()
    closeMenu()
  }

  return (
    <>
      <button type='button' onClick={handleReportClick}>
        신고
      </button>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <div className={s.container}>
            <p className={s.announce}>
              해당 피드를 <strong>신고</strong>하시겠습니까?
            </p>
            <div className={s.button}>
              <MsmallWhiteButton onClickEvent={cancelReport}>취소</MsmallWhiteButton>
              <MsmallButton onClickEvent={reportFeed}>확인</MsmallButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default FeedReportButton
