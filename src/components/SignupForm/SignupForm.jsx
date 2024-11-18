import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./SignupForm.css"

const SignupForm = ({ onSignup }) => {
  const navigate = useNavigate()
  const initialFormState = {
    username: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
  }

  const [formData, setFormData] = useState(initialFormState)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/signup`,
        {
          username: formData.username,
          password: formData.password,
          birthDate: formData.birthDate,
        }
      )

      setError("")
      setFormData(initialFormState)

      if (onSignup && typeof onSignup === "function") {
        onSignup(response.data)
      }

      navigate("/")
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Unexpected server error.")
      } else if (err.request) {
        setError("No response from server. Please try again later.")
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    }
  }

  return (
    <div className="signup-form">
      <h2>Signup</h2>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Birth Date</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          Signup
        </button>
      </form>
    </div>
  )
}

export default SignupForm
