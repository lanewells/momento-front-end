import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./SigninForm.css"

const SigninForm = ({ onSignin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/signin`,
        {
          username: formData.username,
          password: formData.password,
        }
      )

      setError("")
      onSignin(response.data)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.error || "Signin failed. Please try again.")
    }
  }

  return (
    <div className="signin-form">
      <h2>Signin</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signin-button">
          Signin
        </button>
      </form>
    </div>
  )
}

export default SigninForm
