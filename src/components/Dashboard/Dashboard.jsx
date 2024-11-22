import { useNavigate } from "react-router-dom"

const Dashboard = ({ user, handleLogout }) => {
  const navigate = useNavigate()

  return (
    <div className="dashboard-main">
      <h1>Welcome, {user.username}!</h1>
      <img src="../src/assets/logo_bkg_cream.png" alt="Momento In Time" />
    </div>
  )
}

export default Dashboard
