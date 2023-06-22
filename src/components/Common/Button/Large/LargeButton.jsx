import s from './LargeButton.module.scss'

const LargeButton = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.largeButton} onClick={onClickEvent}>
      {children}
    </button>
  )
}

const LargeWhiteButton = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.largeWhiteButton} onClick={onClickEvent}>
      {children}
    </button>
  )
}

const LargeButtonDisabled = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.largeButtonDisabled} onClick={onClickEvent} disabled>
      {children}
    </button>
  )
}

export { LargeButton, LargeWhiteButton, LargeButtonDisabled }
