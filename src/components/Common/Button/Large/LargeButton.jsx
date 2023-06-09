import s from './LargeButton.module.scss'

const LargeButton = () => {
  return <button className={s.largeButton}>버튼</button>
}

const LargeButtonDisabled = () => {
  return <button className={s.largeButtonDisabled}>버튼</button>
}

export { LargeButton, LargeButtonDisabled }
