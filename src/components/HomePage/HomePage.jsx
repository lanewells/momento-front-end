const HomePage = ({ user, handleLogout }) => {
  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>This is your dashboard.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default HomePage
