import s from './GridLayout.module.scss'

const GridLayout = ({ children, item }) => {
  return <section className={s[item]}>{children}</section>
}

export default GridLayout
