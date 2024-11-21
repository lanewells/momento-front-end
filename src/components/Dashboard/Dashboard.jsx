import { useNavigate } from "react-router-dom"
import axios from "axios"

const Dashboard = ({ user, handleLogout }) => {
  const navigate = useNavigate()

  const handleEditAccount = () => {
    navigate(`/edit-user/${user.id}`)
  }

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const token = localStorage.getItem("token")

        const response = await axios.delete(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        console.log(response)
        alert("Account deleted successfully.")
        handleLogout()
      } catch (error) {
        const errorMessage =
          error.response?.data?.error ||
          "An error occurred while deleting the account. Please try again."
        alert(errorMessage)
      }
    }
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>This is your dashboard.</p>
      <img src="../src/assets/logo_bkg_cream.png" alt="Momento In Time" />

      <div>
        <button onClick={() => navigate(`/capsules-list/${user.id}`)}>
          Create a Capsule
        </button>
        <button onClick={() => navigate(`/capsules-list/${user.id}`)}>
          View Your Capsules
        </button>
        <button onClick={() => navigate("/notifications")}>
          View Notifications
        </button>
        <button onClick={() => navigate(`/profile/${user.id}`)}>
          View Profile
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div> 
    </div>
  )
}

export default Dashboard
