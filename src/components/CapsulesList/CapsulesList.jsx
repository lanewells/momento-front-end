import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CapsulesList.css"

const CapsulesList = ({ currentUser, capsules, openDetailsPage }) => {
  const [selectedType, setSelectedType] = useState("outgoing")
  const navigate = useNavigate()

  const handleCreateButton = () => {
    navigate(`/capsule-form/new/${currentUser.id}`)
  }

  const capsulesOutgoingFiltered = capsules.filter(
    (capsule) => capsule.sender && capsule.sender._id === currentUser.id
  )

  const capsulesIncomingFiltered = capsules.filter(
    (capsule) => capsule.recipient && capsule.recipient._id === currentUser.id
  )

  const capsulesOutgoing = capsulesOutgoingFiltered.map((capsule) => (
    <li key={capsule._id}>
      <button
        className="clickable-area"
        onClick={() => openDetailsPage(capsule)}
      >
        <div className="container-capsule">
          <img
            src="../src/assets/capsule_bkg_cream.png"
            className="image-capsule"
            alt="Capsule icon"
          />
          <div className="text-capsule">
            <h3>To: {capsule.recipient?.username || "Unknown Recipient"}</h3>
            <p>Status: {capsule.status}</p>
            <p>
              Release Date: {new Date(capsule.releaseDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </button>
    </li>
  ))

  const capsulesIncoming = capsulesIncomingFiltered.map((capsule) => (
    <li key={capsule._id}>
      <button
        className="clickable-area"
        onClick={() => openDetailsPage(capsule)}
      >
        <div className="container-capsule">
          <img
            src="../src/assets/capsule_bkg_cream.png"
            className="image-capsule"
            alt="Capsule icon"
          />
          <div className="text-capsule">
            <h3>From: {capsule.sender?.username || "Unknown Sender"}</h3>
            <p>Status: {capsule.status}</p>
            <p>
              Release Date: {new Date(capsule.releaseDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </button>
    </li>
  ))

  const currentList =
    selectedType === "outgoing" ? capsulesOutgoing : capsulesIncoming

  return (
    <div className="capsules-list-container">
      <div className="item-list-container">
        <div className="item-list-header">
          <h2 className="item-list-heading">My Capsules</h2>
          <button onClick={handleCreateButton} className="item-list-add-button">
            Add New Capsule
          </button>
        </div>

        <div className="capsule-tabs">
          <div
            className={`tab ${selectedType === "outgoing" ? "active-tab" : ""}`}
            onClick={() => setSelectedType("outgoing")}
          >
            Outgoing
          </div>
          <div
            className={`tab ${selectedType === "incoming" ? "active-tab" : ""}`}
            onClick={() => setSelectedType("incoming")}
          >
            Incoming
          </div>
        </div>

        {!currentList.length ? (
          <h3>
            You don't have any {selectedType} capsules yet. Create a new capsule
            to get started!
          </h3>
        ) : (
          <>
            <ul className="item-list">{currentList}</ul>
          </>
        )}
      </div>
    </div>
  )
}

export default CapsulesList