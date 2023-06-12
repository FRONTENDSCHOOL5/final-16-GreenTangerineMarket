import s from './LargeButton.module.scss'

const LargeButton = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.largeButton} onClick={onClickEvent}>
      {children}
    </button>
  )
}

const LargeButtonDisabled = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.largeButtonDisabled} onClick={onClickEvent}>
      {children}
    </button>
  )
}

export { LargeButton, LargeButtonDisabled }
