import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./CapsulesList.css"

const CapsulesList = ({ currentUser, capsules, openDetailsPage }) => {
  const [selectedType, setSelectedType] = useState("outgoing")

  const navigate = useNavigate()

  const handleCreateButton = () => {
    navigate(`/capsule-form/new/${currentUser.id}`)
  }

  const handleTypeChange = (evt) => setSelectedType(evt.target.value)

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
    <h3>{capsule.recipient}</h3>
    <p>{capsule.status}</p>
    <p>
      {capsule.items.length} Item{capsule.items.length > 1 ? "s" : ""}
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
        <img src="../assets/capsule_icon.jpg" alt="Capsule icon" />
        <div>
          <h3>{capsule.recipient}</h3>
          <p>{capsule.status}</p>
          <p>
            {capsule.items.length} Item{capsule.items.length === 0 ? "s" : ""}
          </p>
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
        <button  onClick={handleCreateButton} className="item-list-add-button">
          Add New Capsule
        </button>
      </div>
      <div className="radio-buttons">
        <label htmlFor="outgoing">Outgoing</label>
        <input
          type="radio"
          id="outgoing"
          name="capsuleType"
          value="outgoing"
          checked={selectedType === "outgoing"}
          onChange={handleTypeChange}
        />
        <label htmlFor="incoming">Incoming</label>
        <input
          type="radio"
          id="incoming"
          name="capsuleType"
          value="incoming"
          checked={selectedType === "incoming"}
          onChange={handleTypeChange}
        />
      </div>
      {!currentList.length ? (
        <h3>
          You don't have any {selectedType} capsules yet. Create a new capsule
          to get started!
        </h3>
      ) : (
        <>
          <h2>{selectedType}</h2>
          <ul className="item-list">{currentList}</ul>
        </>
      )}
    </div>
  )
}

export default CapsulesList
