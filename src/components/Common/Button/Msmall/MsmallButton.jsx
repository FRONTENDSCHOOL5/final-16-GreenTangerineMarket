import s from './MsmallButton.module.scss'

const MsmallButton = () => {
  return <button className={s.msmallButton}>버튼</button>
}

const MsmallButtonDisabled = () => {
  return <button className={s.msmallButtonDisabled}>버튼</button>
}

const MsmallWhiteButton = () => {
  return <button className={s.msmallWhiteButton}>버튼</button>
}

export { MsmallButton, MsmallButtonDisabled, MsmallWhiteButton }
