import { useNavigate } from "react-router-dom"

const Dashboard = ({ user, handleLogout }) => {
  const navigate = useNavigate()

  return (
    <div className="dashboard-main">
      <h1>Welcome, {user.username}!</h1>
      <img src="../assets/logo_bkg_cream.png" alt="Momento In Time" />
      <div>
        <button onClick={() => navigate(`/capsule-form/new/${user.id}`)}>
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
