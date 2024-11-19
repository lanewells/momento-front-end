import { useState, useEffect } from "react";
import axios from "axios";
import "./ItemList.css";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/items`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setItems(response.data);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to load items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      // Make a DELETE request to the backend
      await axios.delete(`${import.meta.env.VITE_BACK_END_SERVER_URL}/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the state to remove the deleted item
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
      setError("Failed to delete item. Please try again.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/itemform/${id}`); 
  };

  if (loading) {
    return <div className="item-list-loading">Loading items...</div>;
  }

  if (error) {
    return <div className="item-list-error">{error}</div>;
  }

  return (
    <div className="item-list-container">
      <h2 className="item-list-heading">List Items</h2>
      {items.length === 0 ? (
        <p className="item-list-empty">No items found.</p>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item._id} className="item-list-item">
              {item.type === "message" && (
                <p className="item-list-message">
                  <strong>Message:</strong> {item.text}
                </p>
              )}
              {item.type === "hyperlink" && (
                <div className="item-list-hyperlink">
                  <p>
                    <strong>Hyperlink:</strong>{" "}
                    <a
                      href={item.hyperlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="item-list-link"
                    >
                      {item.hyperlink}
                    </a>
                  </p>
                  <p>
                    <strong>Description:</strong> {item.hyperlinkDescription}
                  </p>
                </div>
              )}
              <div className="item-list-actions">
                <button
                  onClick={() => handleEdit(item._id)}
                  className="item-list-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="item-list-delete"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
