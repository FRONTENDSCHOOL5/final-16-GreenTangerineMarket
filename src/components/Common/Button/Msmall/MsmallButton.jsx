import s from './MsmallButton.module.scss'

const MsmallButton = () => {
  return <button className={s.msmallButton}>버튼</button>
}

const MsmallWhiteButton = () => {
  return <button className={s.msmallWhiteButton}>버튼</button>
}

const MsmallWhiteButtonHover = () => {
  return <button className={s.msmallWhiteButtonHover}>버튼</button>
}

export { MsmallButton, MsmallWhiteButton, MsmallWhiteButtonHover }
