import s from './SmallButton.module.scss'

const SmallButton = () => {
  return <button className={s.smallButton}>버튼</button>
}

const SmallButtonDisabled = () => {
  return <button className={s.smallButtonDisabled}>버튼</button>
}

const SmallWhiteButton = () => {
  return <button className={s.smallWhiteButton}>버튼</button>
}

export { SmallButton, SmallButtonDisabled, SmallWhiteButton }
