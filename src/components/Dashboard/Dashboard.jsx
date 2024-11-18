import { useNavigate } from "react-router-dom"

const Dashboard = ({ user, handleLogout }) => {
  const navigate = useNavigate()

  const handleCreateCapsule = () => {
    navigate("/capsule-form")
  }

  const handleViewCapsules = () => {
    navigate(`/capsule-list/${user.id}`)
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>This is your dashboard.</p>
      <div>
        <button onClick={handleCreateCapsule}>Create a Capsule</button>
        <button onClick={handleViewCapsules}>View Your Capsules</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Dashboard
