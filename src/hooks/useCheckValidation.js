import { useLocation } from 'react-router-dom'

import { ALREADY_EXSIST_ACCOUNTNAME, ALREADY_EXSIST_EMAIL, SIGN_NAME_ERROR } from 'constants/SIGN_ERROR'
import { verifyAccountNameAPI, verifyEmailAPI } from 'api/user'

const useCheckValidation = () => {
  const location = useLocation()

  const setValueIsNullState = ({ name, setError }) =>
    setError({ isError: true, errorMessage: `${SIGN_NAME_ERROR[name]}을(를) 입력해주세요` })
  const setOutOfPattern = ({ name, setError }) =>
    setError({ isError: true, errorMessage: `${SIGN_NAME_ERROR[name]} 형식이 맞지 않습니다` })
  const setNoneError = setError => setError({ isError: false, errorMessage: '' })

  // Validation Check
  const checkEmailValidation = async ({ valid, value, name, setError }) => {
    if (value === '') setValueIsNullState({ name, setError })
    else if (!valid) setOutOfPattern({ name, setError })
    else {
      const res = await verifyEmailAPI({ email: value })

      if (res.response) setOutOfPattern({ name, setError })
      else {
        if (location.pathname === '/signup')
          res.data.message === ALREADY_EXSIST_EMAIL
            ? setError({ isError: true, errorMessage: ALREADY_EXSIST_EMAIL })
            : setNoneError(setError)
        else if (location.pathname === '/signin') {
          setNoneError(setError)
        }
      }
    }
  }

  const checkPasswordValidation = ({ valid, value, name, setError }) => {
    if (value === '') setValueIsNullState({ name, setError })
    else if (!valid) setOutOfPattern({ name, setError })
    else setNoneError(setError)
  }

  const checkAccountNameValidation = async ({ valid, value, name, setError }) => {
    if (value === '') setValueIsNullState({ name, setError })
    else if (!valid) setOutOfPattern({ name, setError })
    else {
      const res = await verifyAccountNameAPI({ accountname: value })
      if (res.data.message === ALREADY_EXSIST_ACCOUNTNAME)
        setError({ isError: true, errorMessage: ALREADY_EXSIST_ACCOUNTNAME })
      else setNoneError(setError)
    }
  }

  const checkUserNameValidation = ({ value, name, setError }) => {
    if (value === '') setValueIsNullState({ name, setError })
    else setNoneError(setError)
  }

  return { checkEmailValidation, checkPasswordValidation, checkAccountNameValidation, checkUserNameValidation }
}

export default useCheckValidation
