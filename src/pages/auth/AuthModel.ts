// AuthModel — Firebase authentication logic

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../../services/FirebaseService'

export const register = async (email: string, password: string) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  return credential.user
}

export const login = async (email: string, password: string) => {
  const credential = await signInWithEmailAndPassword(auth, email, password)
  return credential.user
}
