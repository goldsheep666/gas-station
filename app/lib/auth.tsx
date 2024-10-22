import { auth } from "@/app/lib/firebase"
import {
  EmailAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  User,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { debugPort } from "process"

/**
 * Signs in with Google using Firebase
 * @returns {Promise<User>} - The result of signing in with Google
 */
const signInWithGoogle = async (): Promise<User> => {
  const googleProvider = new GoogleAuthProvider()
  googleProvider.addScope("email")
  try {
    const signInResult = await signInWithPopup(auth, googleProvider)
    return signInResult.user
  } catch (error) {
    console.error("Error signing in with Google:", error)
    throw error
  }
}

/**
 * Signs in with Facebook using Firebase
 * @returns {Promise<User>} - The result of signing in with Facebook
 */
const signInWithFacebook = async (): Promise<User> => {
  const provider = new FacebookAuthProvider()
  provider.addScope("email")
  try {
    const signInResult = await signInWithPopup(auth, provider)
    const token = signInResult.operationType
    return signInResult.user
  } catch (error) {
    console.error("Error signing in with Facebook:", error)
    throw error
  }
}

/**
 * 使用電子郵件登錄
 * @param {string} email - 使用者的電子郵件
 * @param {string} pwd - 使用者的密碼
 * @returns {Promise<User>} - 登錄結果
 */
const signInWithEmail = async (email: string, pwd: string) => {
  const provider = EmailAuthProvider.credential(email, pwd)
  try {
    const signInResult = await signInWithPopup(auth, provider)
    return signInResult.user
  } catch (error) {
    console.error("Error signing in with email:", error)
    throw error
  }
}

// 電子郵件註冊

const logOut = () =>
  signOut(auth)
    .then(() => console.log(`${auth} 登出成功`))
    .catch((err) =>
      console.log(`${auth} 登出失敗:${err}
`)
    )
export { signInWithGoogle, signInWithFacebook, signInWithEmail, logOut }
