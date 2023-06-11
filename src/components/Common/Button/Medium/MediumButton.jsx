import s from './MediumButton.module.scss'

const MediumButton = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.mediumButton} onClick={onClickEvent}>
      {children}
    </button>
  )
}

const MediumButtonDisabled = ({ text, onClickEvent }) => {
  return (
    <button type='button' className={s.mediumButtonDisabled} onClick={onClickEvent}>
      {text}
    </button>
  )
}

const MediumDarkButton = ({ text, onClickEvent }) => {
  return (
    <button type='button' className={s.mediumDarkButton} onClick={onClickEvent}>
      {text}
    </button>
  )
}

const MediumWhiteButton = ({ text, onClickEvent }) => {
  return (
    <button type='button' className={s.mediumWhiteButton} onClick={onClickEvent}>
      {text}
    </button>
  )
}

export { MediumButton, MediumButtonDisabled, MediumDarkButton, MediumWhiteButton }
