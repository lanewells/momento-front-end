import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import "./ItemForm.css"

const ItemForm = () => {
  const { id } = useParams()
  const location = useLocation()
  const capsuleId = location.state?.capsuleId
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    type: "message",
    text: "",
    hyperlink: "",
    hyperlinkDescription: "",
    capsule: capsuleId || "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          setLoading(true)
          const token = localStorage.getItem("token")
          const response = await axios.get(
            `${import.meta.env.VITE_BACK_END_SERVER_URL}/items/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          setFormData(response.data)
        } catch (err) {
          console.error("Error fetching item:", err)
          setError("Failed to load item for editing.")
        } finally {
          setLoading(false)
        }
      }

      fetchItem()
    }
  }, [id])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    if (!formData.type) {
      alert("Item type is required.")
      return
    }

    if (formData.type === "message" && !formData.text.trim()) {
      alert("Please enter a message.")
      return
    }

    if (formData.type === "hyperlink") {
      if (!formData.hyperlink.trim()) {
        alert("Please enter a hyperlink.")
        return
      }
      if (!formData.hyperlinkDescription.trim()) {
        alert("Please enter a description for the hyperlink.")
        return
      }
    }

    if (!capsuleId) {
      alert("Capsule ID is missing. Cannot save the item.")
      return
    }

    const filteredFormData =
      formData.type === "message"
        ? { type: formData.type, text: formData.text, capsule: capsuleId }
        : {
            type: formData.type,
            hyperlink: formData.hyperlink,
            hyperlinkDescription: formData.hyperlinkDescription,
            capsule: capsuleId,
          }

    try {
      const token = localStorage.getItem("token")

      if (id) {
        // Update existing item
        await axios.put(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/items/${id}`,
          filteredFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      } else {
        // Create new item

        await axios.post(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/items`,
          filteredFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      }

      navigate(`/capsule-detail/${capsuleId}`)
    } catch (err) {
      console.error("Error saving item:", err.response?.data || err.message)
      setError(
        err.response?.data?.message || "Failed to save item. Please try again."
      )
    }
  }

  return (
    <div className="item-form-container">
      <h2 className="item-form-heading">{id ? "Edit Item" : "Create Item"}</h2>
      <form className="item-form" onSubmit={handleSubmit}>
        <div className="item-form-section">
          <label className="item-form-label">Type</label>
          <ul className="item-form-type-list">
            <li>
              <input
                type="radio"
                id="message"
                name="type"
                value="message"
                checked={formData.type === "message"}
                onChange={handleChange}
              />
              <label htmlFor="message">Message</label>
            </li>
            <li>
              <input
                type="radio"
                id="hyperlink"
                name="type"
                value="hyperlink"
                checked={formData.type === "hyperlink"}
                onChange={handleChange}
              />
              <label htmlFor="hyperlink">Hyperlink</label>
            </li>
          </ul>
        </div>
        {formData.type === "message" && (
          <div className="item-form-section">
            <label className="item-form-label">Message</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              className="item-form-textarea"
              placeholder="Enter your message"
            />
          </div>
        )}
        {formData.type === "hyperlink" && (
          <div className="item-form-section">
            <label className="item-form-label">Hyperlink</label>
            <input
              type="url"
              name="hyperlink"
              value={formData.hyperlink}
              onChange={handleChange}
              className="item-form-input"
              placeholder="Enter a URL"
            />
            <label className="item-form-label">Description</label>
            <textarea
              name="hyperlinkDescription"
              value={formData.hyperlinkDescription}
              onChange={handleChange}
              className="item-form-textarea"
              placeholder="Enter a description"
            />
          </div>
        )}
        <button type="submit" className="item-form-button">
          {id ? "Update Item" : "Create Item"}
        </button>
      </form>
    </div>
  )
}

export default ItemForm
