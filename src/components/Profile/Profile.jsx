import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const Profile = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/signin")
    } else {
      axios
        .get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data))
        .catch((err) => {
          setError(err.response?.data?.error || "Failed to fetch profile.")
          if (err.response?.status === 403 || err.response?.status === 404) {
            navigate("/")
          }
        })
    }
  }, [userId, navigate])

  if (error) return <p>{error}</p>
  if (!user) return <p>Loading...</p>

  return (
    <div>
      <h1>{user.username}'s Account</h1>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Birth Date:</strong>{" "}
        {new Date(user.birthDate).toLocaleDateString()}
      </p>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  )
}

export default Profile
