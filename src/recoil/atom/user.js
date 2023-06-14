import { atom } from 'recoil'

export const myInfoAtom = atom({
  key: 'myInfoAtom',
  default: {
    _id: undefined,
    username: undefined,
    accountname: undefined,
    image: undefined,
    isfollow: undefined,
    following: undefined,
    follower: undefined,
    followerCount: undefined,
    followingCount: undefined,
  },
})
