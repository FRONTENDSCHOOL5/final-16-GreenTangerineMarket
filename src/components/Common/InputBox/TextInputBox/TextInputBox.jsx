import useFormInput from 'hooks/useFormInput'

import s from './TextInputBox.module.scss'

import useCheckValidation from 'hooks/useCheckValidation'

const TextInputBox = ({ initialValue = '', name, type, text, required, pattern, error, setError }) => {
  const [value, handleChangeValue] = useFormInput(initialValue, name, setError)
  const { isError, errorMessage } = error
  const handleOnBlurEvent = useCheckValidation().handleOnBlurEvent

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
          onBlur={() => handleOnBlurEvent({ value, name, setError })}
          pattern={pattern}
          required={required}
          autoComplete='off'
        />
      </label>
      <strong className={s.errorMessage}>{isError && errorMessage}</strong>
    </div>
  )
}

export default TextInputBox
