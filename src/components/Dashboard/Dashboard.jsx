const Dashboard = ({ user }) => {
  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <img src="../src/assets/logo_bkg_cream.png" alt="Momento In Time" />
    </div>
  )
}

export default Dashboard
