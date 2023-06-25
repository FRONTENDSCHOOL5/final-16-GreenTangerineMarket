import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
export const myInfoAtom = atom({
  key: 'myInfoAtom',
  default: {
    accountname: undefined,
  },
  effects_UNSTABLE: [persistAtom],
})
