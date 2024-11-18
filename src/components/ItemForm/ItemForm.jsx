import { useState } from "react"
import axios from "axios"
import "./ItemForm.css" // Import the CSS file for styling

const ItemForm = () => {
  const [formData, setFormData] = useState({
    type: "",
    text: "",
    src: "",
    altText: "",
  })

  const [loading, setLoading] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)

  // Checkbox - only one checkbox at a time
  const handleChange = (e) => {
    const { value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      type: value,
    }))
  }

  // Text field changes
  const handleTextChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Form submission with Axios
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResponseMessage("")
    setShowMessage(false)

    try {
      // Replace with your API URL
      const apiUrl = "https://your-api-endpoint.com/items"

      // Make the POST request using Axios
      const response = await axios.post(apiUrl, formData)

      // Assuming response includes a success message
      setResponseMessage(response.data.message || "Item added successfully!")

      // Clear the form
      setFormData({
        type: "",
        text: "",
        src: "",
        altText: "",
      })
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || "Failed to add item. Please try again."
      )
      console.error("Error submitting the form:", error)
    } finally {
      setLoading(false)
      setShowMessage(true) // Show the response message after submission
    }
  }

  return (
    <div>
      {/* Header */}
      <header className="app-header">
        <div className="app-logo">MOMENTO</div>
      </header>

      {/* Form Container */}
      <div className="item-form-container">
        <h1 className="item-form-heading">Add a New Item</h1>
        <form className="item-form" onSubmit={handleSubmit}>
          {/* Type of Media (Checkboxes) */}
          <div className="item-form-section">
            <label className="item-form-label">Type of Media</label>
            <div className="checkbox-group">
              <label htmlFor="text">
                <input
                  type="checkbox"
                  id="text"
                  name="type"
                  value="text"
                  className="item-form-checkbox"
                  checked={formData.type === "text"}
                  onChange={handleChange}
                />
                Text
              </label>
              <label htmlFor="image">
                <input
                  type="checkbox"
                  id="image"
                  name="type"
                  value="image"
                  className="item-form-checkbox"
                  checked={formData.type === "image"}
                  onChange={handleChange}
                />
                Image
              </label>
              <label htmlFor="audio">
                <input
                  type="checkbox"
                  id="audio"
                  name="type"
                  value="audio"
                  className="item-form-checkbox"
                  checked={formData.type === "audio"}
                  onChange={handleChange}
                />
                Audio
              </label>
              <label htmlFor="hyperlink">
                <input
                  type="checkbox"
                  id="hyperlink"
                  name="type"
                  value="hyperlink"
                  className="item-form-checkbox"
                  checked={formData.type === "hyperlink"}
                  onChange={handleChange}
                />
                Hyperlink
              </label>
            </div>
          </div>

          {/* Message Textbox */}
          {formData.type === "text" && (
            <div className="item-form-section">
              <label className="item-form-label">Message</label>
              <textarea
                name="text"
                placeholder="Enter your message"
                value={formData.text}
                onChange={handleTextChange}
                className="item-form-textarea"
              />
            </div>
          )}

          {/* Source URL and Alt Text for Image, Audio, and Hyperlink */}
          {(formData.type === "image" ||
            formData.type === "audio" ||
            formData.type === "hyperlink") && (
            <>
              <div className="item-form-section">
                <label className="item-form-label">Source URL</label>
                <input
                  type="text"
                  name="src"
                  placeholder="Enter the source URL"
                  value={formData.src}
                  onChange={handleTextChange}
                  className="item-form-input"
                />
              </div>
              <div className="item-form-section">
                <label className="item-form-label">Alt Text</label>
                <input
                  type="text"
                  name="altText"
                  placeholder="Describe the content"
                  value={formData.altText}
                  onChange={handleTextChange}
                  className="item-form-input"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button type="submit" className="item-form-button" disabled={loading}>
            {loading ? "Submitting..." : "Submit Item"}
          </button>
        </form>

        {/* Response Message */}
        {showMessage && responseMessage && (
          <p className="item-form-response">{responseMessage}</p>
        )}
      </div>
    </div>
  )
}

export default ItemForm
