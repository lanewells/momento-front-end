import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ItemForm.css";

const ItemForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    type: "message",
    text: "",
    hyperlink: "",
    hyperlinkDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${import.meta.env.VITE_BACK_END_SERVER_URL}/items/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFormData(response.data);
        } catch (err) {
          console.error("Error fetching item:", err);
          setError("Failed to load item for editing.");
        } finally {
          setLoading(false);
        }
      };

      fetchItem();
    }
  }, [id]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
  
    if (formData.type === "message" && !formData.text.trim()) {
      alert("Please enter a message.");
      return;
    }
  
    if (formData.type === "hyperlink") {
      if (!formData.hyperlink.trim()) {
        alert("Please enter a hyperlink.");
        return;
      }
      if (!formData.hyperlinkDescription.trim()) {
        alert("Please enter a description for the hyperlink.");
        return;
      }
    }
    try {
      const token = localStorage.getItem("token")
      if (id) {
        await axios.put(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/items/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/items`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      window.location.href = "/itemlist";
    } catch (err) {
      console.error("Error saving item:", err);
      setError("Failed to save item. Please try again.");
    }
  }

  if (loading) {
    return <div className="item-form-loading">Loading item...</div>;
  }

  if (error) {
    return <div className="item-form-error">{error}</div>;
  }

  return (
    <div className="item-form-container">
      <h2 className="item-form-heading">
        {id ? "Edit Item" : "Create Item"}
      </h2>
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
  );
};

export default ItemForm;
