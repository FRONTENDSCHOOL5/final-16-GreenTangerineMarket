import useInput from 'hooks/useInput'

import s from './TextInputBox.module.scss'

const TextInputBox = ({ name, type, text, error }) => {
  const [value, handleChangeValue] = useInput('')

  return (
    <div className={s.container}>
      <label className={s.label}>
        {text}
        <input
          name={name}
          type={type}
          className={s.input}
          value={value}
          onChange={handleChangeValue}
          data-value={value}
          required
        />
      </label>
      {error && error.isError && <strong className={s.errorMesaage}>{error.errorMessage}</strong>}
    </div>
  )
}

export default TextInputBox
