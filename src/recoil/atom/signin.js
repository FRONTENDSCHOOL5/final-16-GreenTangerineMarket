import { atom } from 'recoil'

export const signInEmailErroAtom = atom({
  key: 'signInEmailErroAtom',
  default: {
    isError: true,
    errorMessage: '',
  },
})

export const signInPassWordErroAtom = atom({
  key: 'signInPassWordErroAtom',
  default: {
    isError: true,
    errorMessage: '',
  },
})
