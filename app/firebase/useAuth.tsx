import { useState, useContext, createContext } from "react"

type authType = {
  user: string
  logout: () => void
  authenticated: boolean
}

const AuthContext = createContext<authType>({
  user: "",
  logout: () => null,
  authenticated: false,
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
