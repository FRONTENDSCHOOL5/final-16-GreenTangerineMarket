import s from './FeedDetail.module.scss'
import FeedAction from 'components/Common/Feed/Action/FeedAction'
import { useEffect, useState } from 'react'
import { getCommentsInFeedAPI, getFeedInfoAPI, postCommentsAPI } from 'api/feed'
import { useRecoilValue } from 'recoil'
import { myInfoAtom } from 'recoil/atom/user'
import { useParams } from 'react-router-dom'
import FeedDetailHeader from './FeedDetailHeader/FeedDetailHeader'
import AuthorButtonList from './AuthorButtonList/AuthorButtonList'
import MainLayout from 'components/Common/Layout/Main/MainLayout'
import { SmallButton } from 'components/Common/Button/Small/SmallButton'
import img from 'assets/img/basic-profile-img.png'

const FeedDetailPage = () => {
  const params = useParams()
  const [feedDetail, setFeedDetail] = useState(undefined)
  const [comments, setComments] = useState([])
  const [inputValue, setInputValue] = useState('')
  const myInfo = useRecoilValue(myInfoAtom)
  console.log(feedDetail)

  const handleGetFeedInfo = async () => {
    const res = await getFeedInfoAPI(params.id)
    setFeedDetail(res.data.post)
    console.log(res)
  }
  const handlePostComments = async () => {
    const res = await postCommentsAPI({ id: feedDetail.id, content: inputValue })
    await handleGetCommentsInFeed()
    setInputValue('')
    console.log(res)
  }
  const handleInput = e => {
    setInputValue(e.target.value)
  }

  const handleGetCommentsInFeed = async () => {
    const res = await getCommentsInFeedAPI(params.id)
    setComments(res.data.comments)
    console.log(res)
  }
  useEffect(() => {
    handleGetFeedInfo()
    handleGetCommentsInFeed()
  }, [])

  return (
    <MainLayout>
      {feedDetail && (
        <section className={s.container}>
          <img className={s.feedImg} src={feedDetail.image} alt='강아지사진' />
          <FeedDetailHeader username={feedDetail.author.username} commentCount={feedDetail.commentCount} />
          <hr className={s.line} />
          <section className={s.detailContent}>안녕하세요{feedDetail.author.content}</section>
          <hr className={s.line} />
          <div className={s.comment}>
            <p className={s.commentTitle}>댓글</p>
            <div className={s.feedAction}>
              <FeedAction id='64913f08b2cb2056634621bb'></FeedAction>
            </div>
          </div>
          <input
            className={s.commentInput}
            type='text'
            onChange={handleInput}
            value={inputValue}
            placeholder='댓글을 작성해주세요.'
          ></input>
          {feedDetail.author.accountname === myInfo.accountname && (
            <AuthorButtonList
              feedDetail={feedDetail}
              myInfo={myInfo}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
          )}
          <div className={s.commentButton}>
            <SmallButton onClickEvent={handlePostComments}>작성</SmallButton>
          </div>
          <section className={s.commentBox}>
            <div className={s.scrollBox}>
              {comments?.map(comment => {
                return (
                  <li className={s.liList}>
                    <img className={s.profileImg} src={img} alt='프로필사진'></img>
                    <div>{feedDetail.author.accountname}</div>
                    <div>{comment.content}</div>
                  </li>
                )
              })}
            </div>
          </section>
        </section>
      )}
    </MainLayout>
  )
}

export default FeedDetailPage
