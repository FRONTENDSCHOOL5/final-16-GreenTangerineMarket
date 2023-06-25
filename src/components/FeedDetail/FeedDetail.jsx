import { useRecoilValue } from 'recoil'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import s from './FeedDetail.module.scss'

import FeedAction from 'components/Common/Feed/Action/FeedAction'
import { myInfoAtom } from 'recoil/atom/user'
import FeedDetailHeader from './FeedDetailHeader/FeedDetailHeader'
import AuthorButtonList from './AuthorButtonList/AuthorButtonList'
import MainLayout from 'components/Common/Layout/Main/MainLayout'
import { SmallButton } from 'components/Common/Button/Small/SmallButton'
import { getFeedInfoAPI } from 'api/feed'
import { getCommentsInFeedAPI, postCommentsAPI } from 'api/comment'
import CommentList from './CommentList/CommentList'

const FeedDetailPage = () => {
  const params = useParams()
  const [feedDetail, setFeedDetail] = useState(undefined)
  const [comments, setComments] = useState([])
  const [inputValue, setInputValue] = useState('')
  const myInfo = useRecoilValue(myInfoAtom)

  const getFeedInfo = async () => {
    const res = await getFeedInfoAPI(params.id)
    setFeedDetail(res.data.post)
  }
  const handlePostComments = async () => {
    const res = await postCommentsAPI({ id: feedDetail.id, content: inputValue })
    await getCommentsInFeed()
    setInputValue('')
  }
  const handleInput = e => {
    setInputValue(e.target.value)
  }

  const getCommentsInFeed = async () => {
    const res = await getCommentsInFeedAPI(params.id)
    setComments(res.data.comments)
  }

  useEffect(() => {
    getFeedInfo()
    getCommentsInFeed()
  }, [])

  return (
    <>
      {feedDetail && (
        <section className={s.container}>
          <FeedDetailHeader author={feedDetail.author} commentCount={feedDetail.commentCount} />
          <hr className={s.line} />
          <section className={s.detailContent}>안녕하세요{feedDetail.author.content}</section>
          {feedDetail.author.accountname === myInfo.accountname && (
            <AuthorButtonList feedDetail={feedDetail} setInputValue={setInputValue} inputValue={inputValue} />
          )}
          <hr className={s.line} />
          <div className={s.comment}>
            <p className={s.commentTitle}>댓글</p>
            <div className={s.feedAction}>
              <FeedAction id={params.id}></FeedAction>
            </div>
          </div>
          <input
            className={s.commentInput}
            type='text'
            onChange={handleInput}
            value={inputValue}
            placeholder='댓글을 작성해주세요.'
          ></input>
          <div className={s.commentButton}>
            <SmallButton onClickEvent={handlePostComments}>작성</SmallButton>
          </div>
          <section className={s.commentBox}>
            <div className={s.scrollBox}>
              {comments?.map(comment => {
                return (
                  <CommentList key={comment.id} comment={comment} feedId={params.id} getComment={getCommentsInFeed} />
                )
              })}
            </div>
          </section>
        </section>
      )}
    </>
  )
}

export default FeedDetailPage
