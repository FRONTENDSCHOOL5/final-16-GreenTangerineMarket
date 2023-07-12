import { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'

import s from './InfiniteScroll.module.scss'

import UpBtn from '../UpBtn/UpBtn'

const InfiniteScroll = ({ children, loadData, change = '' }) => {
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadItem = async () => {
    await loadData(page)
    setIsLoading(false)
  }

  const handleScroll = _.throttle(() => {
    const { scrollTop, scrollHeight } = document.documentElement
    if (scrollHeight - window.innerHeight - scrollTop < 200) {
      setPage(prevPage => prevPage + 1)
    }
  }, 1000)

  const handleScrollEvent = useCallback(handleScroll)
  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent)
    return () => {
      window.removeEventListener('scroll', handleScrollEvent)
    }
  }, [])

  useEffect(() => {
    handleLoadItem()
    setIsLoading(true)
  }, [page])

  useEffect(() => {
    if (page !== 0) setPage(0)
    else handleLoadItem()
  }, [change])

  return (
    <>
      {children}
      <UpBtn />
      {isLoading && (
        <div className={s.spinner}>
          <div className={s.loading} />
          <p>Loading</p>
        </div>
      )}
    </>
  )
}

export default InfiniteScroll
