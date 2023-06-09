import s from './MediumButton.module.scss'

const MediumButton = () => {
  return <button className={s.mediumButton}>버튼</button>
}

const MediumButtonDisabled = () => {
  return <button className={s.mediumButtonDisabled}>버튼</button>
}

const MediumDarkButton = () => {
  return <button className={s.mediumDarkButton}>버튼</button>
}

const MediumWhiteButton = () => {
  return <button className={s.mediumWhiteButton}>버튼</button>
}

export { MediumButton, MediumButtonDisabled, MediumDarkButton, MediumWhiteButton }
