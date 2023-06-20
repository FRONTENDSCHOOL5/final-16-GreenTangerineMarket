import s from './SmallButton.module.scss'

const SmallButton = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.smallButton} onClick={onClickEvent}>
      {children}
    </button>
  )
}

const SmallButtonDisable = ({ children }) => {
  return (
    <button type='button' className={s.smallButtonDisable} disabled>
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

export { SmallButton, SmallButtonDisable, SmallWhiteButton, SmallWhiteButtonHover }
