import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./CapsulesList.css"

const CapsulesList = ({ currentUser, capsules, openDetailsPage }) => {
  const [selectedType, setSelectedType] = useState("outgoing")

  const navigate = useNavigate()

  const handleCreateButton = () => {
    navigate(`/capsule-form/new/${currentUser.id}`)
  }

  const capsulesOutgoingFiltered = capsules.filter(
    (capsule) => capsule.sender === currentUser.id
  )

  const capsulesIncomingFiltered = capsules.filter(
    (capsule) => capsule.recipient === currentUser.id
  )

  const capsulesOutgoing = capsulesOutgoingFiltered.map((capsule) => (
    <li className="item-list-item" key={capsule._id}>
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
            <h3>To: {capsule.recipient}</h3>
            <p>Status: {capsule.status}</p>
            <p>Release Date: {capsule.releaseDate}</p>
          </div>
        </div>
      </button>
    </li>
  ))

  const capsulesIncoming = capsulesIncomingFiltered.map((capsule) => (
    <li className="item-list-item"  key={capsule._id}>
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
            <h3>From: {capsule.sender}</h3>
            <p>Status: {capsule.status}</p>
            <p>Release Date: {capsule.releaseDate} </p>
          </div>
        </div>
      </button>
    </li>
  ))

  const currentList =
    selectedType === "outgoing" ? capsulesOutgoing : capsulesIncoming

  return (
    <div className="item-list-container">
      <div className="item-list-header">
        <h2 className="item-list-heading">My Capsules</h2>
        <button onClick={handleCreateButton} className="item-list-add-button">
          Add New Capsule
        </button>
      </div>
      <div className="tabs">
        <button
          className={`tab ${selectedType === "outgoing" ? "active" : ""}`}
          onClick={() => setSelectedType("outgoing")}
        >
          Outgoing
        </button>
        <button
          className={`tab ${selectedType === "incoming" ? "active" : ""}`}
          onClick={() => setSelectedType("incoming")}
        >
          Incoming
        </button>
      </div>
      <div className="tab-content">
        {!currentList.length ? (
          <h3>
            You don't have any {selectedType} capsules yet. Create a new capsule to get started!
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
