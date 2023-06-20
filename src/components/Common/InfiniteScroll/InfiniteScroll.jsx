import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import UpBtn from '../UpBtn/UpBtn'

const InfiniteScroll = ({ children, loadData }) => {
  const [page, setPage] = useState(0)

  const handleLoadItem = () => {
    loadData(page)
  }

  const handleScroll = _.throttle(() => {
    const { scrollTop, scrollHeight } = document.documentElement
    if (scrollHeight - window.innerHeight - scrollTop < 200) {
      setPage(prevPage => prevPage + 1)
    }
  }, 1000)

  const handleScrollEvent = React.useCallback(handleScroll)
  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent)
    return () => {
      window.removeEventListener('scroll', handleScrollEvent)
    }
  }, [])

  useEffect(() => {
    handleLoadItem()
  }, [page])
  return (
    <>
      {children}
      <UpBtn />
    </>
  )
}

export default InfiniteScroll
