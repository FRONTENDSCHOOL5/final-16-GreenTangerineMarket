import s from './MsmallButton.module.scss'

const MsmallButton = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.msmallButton} onClick={onClickEvent}>
      {children}
    </button>
  )
}

const MsmallWhiteButton = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.msmallWhiteButton} onClick={onClickEvent}>
      {children}
    </button>
  )
}

const MsmallWhiteButtonHover = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.msmallWhiteButtonHover} onClick={onClickEvent}>
      {children}
    </button>
  )
}

export { MsmallButton, MsmallWhiteButton, MsmallWhiteButtonHover }
