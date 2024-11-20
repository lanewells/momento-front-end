import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ItemList.css";

const ItemListForCapsule = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { capsuleId } = useParams(); 
  useEffect(() => {
    const fetchItemsForCapsule = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/capsules/${capsuleId}/items`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const sortedItems = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setItems(sortedItems);
      } catch (err) {
        console.error("Error fetching items for capsule:", err);
        setError("Failed to load items for this capsule. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchItemsForCapsule();
  }, [capsuleId]);

  if (loading) {
    return <div className="item-list-loading">Loading items...</div>;
  }

  if (error) {
    return <div className="item-list-error">{error}</div>;
  }

  return (
    <div className="item-list-container">
      <div className="item-list-header">
        <h2 className="item-list-heading">Items in Capsule</h2>
      </div>
      {items.length === 0 ? (
        <p className="item-list-empty">No items found for this capsule. Add your first item!</p>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item._id} className="item-list-item">
              {item.type === "message" && (
                <p className="item-list-message">
                  <strong>Message:</strong> {item.text || "No message provided."}
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
                    <strong>Description:</strong>{" "}
                    {item.hyperlinkDescription || "No description provided."}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemListForCapsule;
