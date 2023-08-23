import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});

export const userIdAtom = atom({
  key: "userId",
  default: null,
});

export const userNameAtom = atom({
  key: "userName",
  default: null,
});

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});