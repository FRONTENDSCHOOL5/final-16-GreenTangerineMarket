import s from './TextInput.module.scss'

import useInput from 'hooks/useInput'

const TextInput = ({ type, text }) => {
  const [value, handleChangeValue] = useInput('')

  return <input className={s.input} type={type} placeholder={text} value={value} onChange={handleChangeValue} />
}

export default TextInput
