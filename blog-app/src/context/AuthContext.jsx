import { createContext, useState, useEffect } from "react"
import api from "../lib/api"

export const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [token, setToken] = useState(
    localStorage.getItem("token")
  )

  // 🔄 garde le token synchronisé
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  // =========================
  // LOGIN
  // =========================
  const login = async (email, password) => {
    const res = await api.post("/login", {
      email,
      password
    })

    localStorage.setItem("token", res.data.token)
    setToken(res.data.token)
  }

  // =========================
  // REGISTER
  // =========================
  const register = async (email, password) => {

  console.log("REGISTER CLICKED")

  try {
    console.log("CALL API...")

    const res = await api.post("/register", {
      email,
      password
    })

    console.log("REGISTER OK:", res.data)
    alert("OK register")

  } catch (err) {
    console.log("REGISTER ERROR FULL:", err)
    alert("ERROR register")
  }
}

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{
      token,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}