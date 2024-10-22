import * as admin from "firebase-admin"

export const verifyIdToken = async (token: string) => {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        privateKey: privateKey?.replace(/\\n/g, "\n"),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    })
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(() => null)
}
