import { atom } from 'recoil'

export const signUpEmailErroAtom = atom({
  key: 'signUpEmailErroAtom',
  default: {
    isError: true,
    errorMessage: '',
  },
})

export const signUpPassWordErroAtom = atom({
  key: 'signUpPassWordErroAtom',
  default: {
    isError: true,
    errorMessage: '',
  },
})

export const signUpUserNameErroAtom = atom({
  key: 'signUpUserNameErroAtom',
  default: {
    isError: true,
    errorMessage: '',
  },
})

export const signUpAccountNameErroAtom = atom({
  key: 'signUpAccountNameErroAtom',
  default: {
    isError: true,
    errorMessage: '',
  },
})

export const signUpIntroErroAtom = atom({
  key: 'signUpIntroErroAtom',
  default: {
    isError: true,
    errorMessage: '',
  },
})
