import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginBusiness } from "../api/businessApi"

export default function BusinessLogin() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {

      setLoading(true)

      const res = await loginBusiness({
        email,
        password
      })

      // store token
      localStorage.setItem("businessToken", res.data.token)

      // redirect to dashboard
      navigate("/business/dashboard")

    } catch (err) {

      alert(err?.response?.data?.message || "Login failed")

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Business Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            className="input"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="input"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  )
}