import { useState, useEffect } from "react"
import axios from "axios"
import "./NotificationWindow.css"

const NotificationWindow = ({ user }) => {
  const [notifications, setNotifications] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token")
      axios
        .get(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${
            user.id
          }/notifications`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => setNotifications(response.data))
        .catch((err) =>
          setError(
            err.response?.data?.error || "Failed to fetch notifications."
          )
        )
    }
  }, [user])

  if (error) return <p className="error-message">{error}</p>

  return (
    <div className="notifications-window">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul>
          {notifications.map((notif) => (
            <li key={notif._id} className={notif.read ? "read" : "unread"}>
              <p>{notif.message}</p>
              <small>{new Date(notif.createdAt).toLocaleString()}</small>
              {!notif.read}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default NotificationWindow
