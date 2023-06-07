import useInput from 'hooks/useInput'

import s from './TextInputBox.module.scss'

const TextInputBox = ({ type, text }) => {
  const [value, handleChangeValue] = useInput('')

  return (
    <label className={s.wrapper}>
      <div className={s.text}>{text}</div>
      <input type={type} placeholder={text} className={s.input} value={value} onChange={handleChangeValue} />
    </label>
  )
}

export default TextInputBox
