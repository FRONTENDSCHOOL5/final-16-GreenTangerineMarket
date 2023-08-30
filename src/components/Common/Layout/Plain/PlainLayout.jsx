import s from './PlainLayout.module.scss'

const PlainLayout = ({ children }) => {
  return <main className={s.container}>{children}</main>
}

export default PlainLayout
