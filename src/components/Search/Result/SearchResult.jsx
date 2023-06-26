import { useEffect, useState } from 'react'

import s from './SearchResult.module.scss'

import { getSearchUserAPI } from 'api/search'
import SearchUserListItem from '../UserListItem/SearchUserListItem'

const SearchResult = ({ keyword }) => {
  const [searchResult, setSearchResult] = useState([])

  const loadSearchUserData = async () => {
    const res = await getSearchUserAPI(keyword)
    if (res.status === 200) {
      setSearchResult(res.data)
    }
  }

  useEffect(() => {
    if (keyword) loadSearchUserData()
    else setSearchResult([])
  }, [keyword])

  return (
    <section className={s.result}>
      {searchResult.length ? (
        <>
          <p className={s.count}>총 {searchResult.length}건의 검색결과</p>
          <ul>
            {searchResult.map(user => {
              return (
                <SearchUserListItem
                  key={user._id}
                  image={user.image}
                  accountname={user.accountname}
                  username={user.username}
                  follow={user.isfollow}
                  keyword={keyword}
                />
              )
            })}
          </ul>
        </>
      ) : (
        keyword && (
          <div className={s.notice}>
            <p>
              <strong>'{keyword}'</strong>에 대한 검색결과가 없습니다
            </p>
          </div>
        )
      )}
    </section>
  )
}

export default SearchResult
