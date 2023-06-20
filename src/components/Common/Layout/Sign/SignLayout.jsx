import s from './SignLayout.module.scss'

const SignLayout = ({ children }) => {
  return <main className={s.container}>{children}</main>
}

export default SignLayout
