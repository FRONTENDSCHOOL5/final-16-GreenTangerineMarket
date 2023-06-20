import { useCallback, useState } from 'react'
import { debounce } from 'lodash'

import useCheckValidation from './useCheckValidation'

const useFormInput = (initialValue, name, setError) => {
  const { checkEmailValidation, checkPasswordValidation, checkAccountNameValidation, checkUserNameValidation } =
    useCheckValidation()
  const [value, setValue] = useState(initialValue)

  const handler = useCallback(e => {
    setValue(e.target.value)
    handleCheckValidation(e)
  }, [])

  const handleCheckValidation = useCallback(
    debounce(e => {
      const valid = e.target.validity.valid
      const value = e.target.value

      if (name === 'email') checkEmailValidation({ valid, value, name, setError })
      else if (name === 'password') checkPasswordValidation({ valid, value, name, setError })
      else if (name === 'accountname') checkAccountNameValidation({ valid, value, name, setError, initialValue })
      else if (name === 'username') checkUserNameValidation({ valid, value, name, setError })
    }, 200),
    [],
  )

  return [value, handler]
}

export default useFormInput
