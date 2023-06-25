import React, { useState } from 'react'

import s from './GuideLine.module.scss'

const GuideLine = ({ name, about, limit, only, photo, text }) => {
  const [showList, setShowList] = useState(true)

  const handleButtonClick = () => {
    setShowList(!showList)
  }

  return (
    <section className={s.section}>
      {showList ? (
        <button onClick={handleButtonClick} className={s.opendBox}>
          {name} 등록 가이드 보기 <span className={s.sub}>원할한 {name} 발행을 위해 꼭 읽어주세요!</span>
        </button>
      ) : (
        <button onClick={handleButtonClick} className={s.closedBox}>
          {name} 등록 가이드 보기 <span className={s.sub}>원할한 {name} 발행을 위해 꼭 읽어주세요!</span>
        </button>
      )}

      {showList && (
        <ul className={s.listBox}>
          <li>현재 고객님이 보시는 페이지는 {name} 등록 페이지입니다.</li>
          <li>여러분들의 {about}</li>
          <li>
            {name}는/은 {limit} 입력하셔야 등록이 됩니다.
          </li>
          <li>사진은 {photo}까지 등록이 가능합니다.</li>
          <li>텍스트는 최대 {text}자까지 입력이 가능합니다.</li>
          <li>{only}</li>
          <li>모두가 공유하는 정보이기에 타인에게 불편이나 불쾌함을 제공하는 내용은 등록하지 말아주세요!</li>
          <li>글 작성과 이미지 업로드 시, 타인의 지식재산권을 침해하지 않도록 유의해주세요.</li>
        </ul>
      )}
    </section>
  )
}

export default GuideLine
