import { useState } from 'react';
import "./ItemForm.css" 

const ItemForm = (props) => {
  const [formData, setFormData] = useState({type: "", text: "", src: "", altText: "",})
  const [selectedImage, setSelectedImage] = useState(null); 
  const [preview, setPreview] = useState(null); 

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  //Message
  const handleTextChange = (evt) => {
    const { name, value } = evt.target
    setFormData({ ...formData, [name]: value })
  }

  //Image
  const handleImageChange = (evt) => {
    const file = evt.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();

    // Create a FormData object to handle the file and other fields
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("type", formData.type);
    formDataToSubmit.append("text", formData.text);
    formDataToSubmit.append("altText", formData.altText);

    if (selectedImage) {
      formDataToSubmit.append("image", selectedImage); // Append image file
    }

    // Reset the form after submission
    setFormData({ type: '', text: '', altText: '' });
    setSelectedImage(null);  // Reset image
    setPreview(null);         // Reset image preview
  };

  return(
    <>
      <form onSubmit={handleSubmitForm}>
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

        {/* Image Input */}
        {formData.type === "image" && (
          <div>
            <label htmlFor="image">Choose an image:</label>
            <input 
              type="file" 
              id="image" 
              accept="image/*" 
              onChange={handleImageChange} 
            />
            {/* Display Image Preview */}
            {preview && (
              <div>
                <img src={preview} alt="Image preview" className="image-preview" />
              </div>
            )}
          </div>
        )}  

      













        <button type="submit">Submit Item</button>
      </form>
    </>
  )
}

export default ItemForm;