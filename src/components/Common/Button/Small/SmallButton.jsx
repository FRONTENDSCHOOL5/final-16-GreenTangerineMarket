import s from './SmallButton.module.scss'

const SmallButton = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.smallButton} onClick={onClickEvent}>
      {children}
    </button>
  )
}

const SmallWhiteButton = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.smallWhiteButton} onClick={onClickEvent}>
      {children}
    </button>
  )
}

const SmallWhiteButtonHover = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.smallWhiteButtonHover} onClick={onClickEvent}>
      {children}
    </button>
  )
}

export { SmallButton, SmallWhiteButton, SmallWhiteButtonHover }
