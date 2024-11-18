const HomePage = ({ user, handleLogout }) => {
  return (
    <div>
      <h1>Welcome, {user.username || "Guest"}!</h1>
      <p>This is your dashboard. Explore your options below.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default HomePage
