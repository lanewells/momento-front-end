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
            {capsule.items.length} Item{capsule.items.length > 1 ? "s" : ""}
          </p>
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
    <div>
      <h1>My Capsules</h1>
      <button onClick={handleCreateButton}>Create</button>

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
          <ul>{currentList}</ul>
        </>
      )}
    </div>
  )
}

export default CapsulesList
