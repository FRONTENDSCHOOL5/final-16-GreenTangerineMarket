import s from './SmallButton.module.scss'

const SmallButton = () => {
  return <button className={s.smallButton}>버튼</button>
}

const SmallWhiteButton = () => {
  return <button className={s.smallWhiteButton}>버튼</button>
}

const SmallWhiteButtonHover = () => {
  return <button className={s.smallWhiteButtonHover}>버튼</button>
}

export { SmallButton, SmallWhiteButton, SmallWhiteButtonHover }
