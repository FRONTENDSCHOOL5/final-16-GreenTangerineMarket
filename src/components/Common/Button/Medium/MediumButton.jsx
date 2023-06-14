import s from './MediumButton.module.scss'

const MediumButton = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.mediumButton} onClick={onClickEvent}>
      {children}
    </button>
  )
}

const MediumButtonDisabled = ({ children }) => {
  return (
    <button type='button' className={s.mediumButtonDisabled} disabled>
      {children}
    </button>
  )
}

const MediumDarkButton = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.mediumDarkButton} onClick={onClickEvent}>
      {children}
    </button>
  )
}

const MediumWhiteButton = ({ children, onClickEvent }) => {
  return (
    <button type='button' className={s.mediumWhiteButton} onClick={onClickEvent}>
      {children}
    </button>
  )
}

export { MediumButton, MediumButtonDisabled, MediumDarkButton, MediumWhiteButton }
