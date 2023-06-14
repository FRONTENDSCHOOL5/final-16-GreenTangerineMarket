import useInput from 'hooks/useInput'

import s from './SignInput.module.scss'

import { ALREADY_EXSIST_ACCOUNTNAME, ALREADY_EXSIST_EMAIL, SIGN_NAME_ERROR } from 'constants/SIGN_ERROR'
import { verifyAccountNameAPI, verifyEmailAPI } from 'api/user'
import { useLocation } from 'react-router-dom'

const SignInput = ({ name, type, text, required, pattern, error, setError }) => {
  const location = useLocation()
  const [value, handleChangeValue] = useInput('')
  const { isError, errorMesaage } = error

  const handleNullTest = async e => {
    const setValueIsNullState = () =>
      setError({ isError: true, errorMesaage: `${SIGN_NAME_ERROR[name]}을(를) 입력해주세요` })

    const setOutOfPattern = () =>
      setError({ isError: true, errorMesaage: `${SIGN_NAME_ERROR[name]} 형식이 맞지 않습니다` })

    const setNoneError = () => setError({ isError: false, errorMesaage: '' })

    // 이메일
    if (name === 'email') {
      if (value === '') setValueIsNullState()
      else if (!e.target.validity.valid) setOutOfPattern()
      else {
        // 회원가입 페이지 일 때
        if (location.pathname === '/signup') {
          const res = await verifyEmailAPI({ email: value })
          res.data.message === ALREADY_EXSIST_EMAIL
            ? setError({ isError: true, errorMesaage: ALREADY_EXSIST_EMAIL })
            : setNoneError()
        } // 로그인 페이지 일 때
        else if (location.pathname === '/signin') setNoneError()
      }
    } // 패스워드
    else if (name === 'password') {
      if (value === '') setValueIsNullState()
      else if (!e.target.validity.valid) setOutOfPattern()
      else setNoneError()
    }
    // 계정 ID
    else if (name === 'accountname') {
      if (value === '') setValueIsNullState()
      else {
        const res = await verifyAccountNameAPI({ accountname: value })
        if (res.data.message === ALREADY_EXSIST_ACCOUNTNAME)
          setError({ isError: true, errorMesaage: ALREADY_EXSIST_ACCOUNTNAME })
        else setNoneError()
      }
    }
    // 사용자 이름
    else if (name === 'username') {
      console.log(e.target.validity.valid)
      if (value === '') setValueIsNullState()
      else if (!e.target.validity.valid) {
        console.log(e.target.validity.valid)
        setError({ isError: true, errorMesaage: '사용자 이름은 영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.' })
      } else setNoneError()
    }
  }

  return (
    <div className={s.container}>
      <label className={s.label}>
        {text}
        <input
          name={name}
          type={type}
          className={errorMesaage ? `${s.input} ${s.error}` : `${s.input}`}
          value={value}
          onChange={handleChangeValue}
          onBlur={handleNullTest}
          pattern={pattern}
          required={required}
        />
      </label>
      <strong className={s.errorMesaage}>{isError && errorMesaage}</strong>
    </div>
  )
}

export default SignInput
