import Header from 'components/Common/Header/Header'
import s from './FeedDetail.module.scss'
import FeedAction from 'components/Common/Feed/Action/FeedAction'
import { useEffect, useState } from 'react'
import { deletePostAPI, getFeedInfoAPI, postCommentsAPI } from 'api/feed'
import { SmallButton } from 'components/Common/Button/Small/SmallButton'
import { useRecoilState, useRecoilValue } from 'recoil'
import { myInfoAtom } from 'recoil/atom/user'
import { useParams } from 'react-router-dom'
import FeedDetailHeader from './FeedDetailHeader/FeedDetailHeader'
import AuthorButtonList from './AuthorButtonList/AuthorButtonList'

const FeedDetailPage = () => {
  const params = useParams()
  const [feedDetail, setFeedDetail] = useState(undefined)
  const [comments, setComments] = useState([])
  const [inputValue, setInputValue] = useState('')
  const myInfo = useRecoilValue(myInfoAtom)

  // 피드리스트를 누른다 => 누른 피드리스트에 피드 id를 이동된다
  // https://localhost:3000/detail/648eff03b2cb20566339b578
  // const parmas = useParams() // useParams() === 게시글id

  const handleGetFeedInfo = async () => {
    const res = await getFeedInfoAPI(params.id)
    setFeedDetail(res.data.post)
    console.log(res)
  }

  const handleInput = e => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    handleGetFeedInfo()
  }, [])

  return (
    <>
      {feedDetail && (
        <>
          <Header />
          <main className={s.container}>
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
            <section className={s.commentBox}>
              <div>
                {comments?.map(comment => {
                  return <p>{comment.content}</p>
                })}
              </div>
            </section>
          </main>
        </>
      )}
    </>
  )
}

export default FeedDetailPage
