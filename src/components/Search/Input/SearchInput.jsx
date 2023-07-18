import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import s from './SearchInput.module.scss'

import SearchResult from '../Result/SearchResult'

const SearchInput = () => {
  const [keyword, setKeyword] = useSearchParams()
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()

  const handleInput = e => {
    setInputValue(e.target.value)
  }

  const handleSearchClick = e => {
    e.preventDefault()
    if (!inputValue) {
      navigate('/search')
    } else {
      if (/[#+&]/.test(inputValue)) navigate(`/search/?keyword=${encodeURIComponent(inputValue)}`)
      else navigate(`/search/?keyword=${inputValue}`)
    }
  }

  useEffect(() => {
    if (keyword) setInputValue(keyword.get('keyword'))
  }, [keyword])

  return (
    <>
      <form className={s.container} onSubmit={handleSearchClick}>
        <h2 className='a11y-hidden'>계정검색 페이지</h2>
        <label className={s.search}>
          <input
            type='text'
            className={s.input}
            placeholder='청귤마켓 사용자 검색'
            value={inputValue || ''}
            onChange={handleInput}
          />
        </label>
        <button className={s.button}>
          <span className='a11y-hidden'>검색</span>
        </button>
      </form>
      <SearchResult keyword={keyword.get('keyword')} />
    </>
  )
}

export default SearchInput
