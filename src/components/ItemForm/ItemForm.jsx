import { useState } from 'react';
import axios from 'axios';
import "./ItemForm.css";

const ItemForm = (props) => {
  const [formData, setFormData] = useState({ type: "", text: "", src: "", altText: "" });
  const [submittedData, setSubmittedData] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleTextChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitForm = async (evt) => {
    evt.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/items`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     // console.log("Submitted Data:", response.data);

      setSubmittedData(response.data);

      
      setFormData({ type: "", text: "", altText: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="item-form-container">
      <h2 className="item-form-heading">Submit Your Item</h2>
      <form className="item-form" onSubmit={handleSubmitForm}>
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

        <button
          type="submit"
          className="item-form-button"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Item"}
        </button>
      </form>

      {/* Display submission response */}
      {submittedData && (
        <div className="item-form-response"><h3>Submitted</h3></div>
      )}

      {/* Display errors */}
      {error && (
        <div className="item-form-error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ItemForm;
