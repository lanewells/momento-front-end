import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const Profile = ({ handleLogout }) => {
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

  const handleEditAccount = () => {
    navigate(`/edit-user/${userId}`)
  }

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const token = localStorage.getItem("token")

        await axios.delete(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        alert("Account deleted successfully.")
        handleLogout()
        navigate("/signup")
      } catch (error) {
        const errorMessage =
          error.response?.data?.error ||
          "An error occurred while deleting the account. Please try again."
        alert(errorMessage)
      }
    }
  }

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
      <button onClick={handleEditAccount}>Edit Account</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  )
}

export default Profile
