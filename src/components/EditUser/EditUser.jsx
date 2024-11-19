import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const EditUser = ({ user, onUserUpdate }) => {
  const { userId } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: user?.username || "",
    birthDate: user?.birthDate || "",
  })
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user || user.id !== userId) {
      navigate("/signin")
    }
  }, [user, userId, navigate])

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
      const token = localStorage.getItem("token")
      const response = await axios.put(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${userId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setError("")
      onUserUpdate(response.data.user)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update account.")
    }
  }

  return (
    <div>
      <h2>Edit Account</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
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
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default EditUser
