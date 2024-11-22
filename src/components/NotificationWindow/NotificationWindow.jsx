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

  const markAsRead = async (notifId) => {
    try {
      const token = localStorage.getItem("token")
      await axios.patch(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/${
          user.id
        }/notifications/${notifId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === notifId ? { ...notif, read: true } : notif
        )
      )
    } catch (err) {
      console.error("Failed to mark notification as read:", err.message)
    }
  }

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
              {!notif.read && (
                <button onClick={() => markAsRead(notif._id)}>
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default NotificationWindow
