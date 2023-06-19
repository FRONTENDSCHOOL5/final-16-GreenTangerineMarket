import useFormInput from 'hooks/useFormInput'

import s from './SignInput.module.scss'

const SignInput = ({ initialValue, name, type, text, required, pattern, error, setError }) => {
  const [value, handleChangeValue] = useFormInput(initialValue, name, setError)
  const { isError, errorMessage } = error

  return (
    <div className={s.container}>
      <label className={s.label}>
        {text}
        <input
          name={name}
          type={type}
          className={errorMessage ? `${s.input} ${s.error}` : `${s.input}`}
          value={value}
          onChange={handleChangeValue}
          pattern={pattern}
          required={required}
        />
      </label>
      <strong className={s.errorMessage}>{isError && errorMessage}</strong>
    </div>
  )
}

export default SignInput
