import { useState, useEffect } from "react"
import capsuleService from "../../services/capsuleService"

const CapsulesList = (props) => {
  const [capsules, setCapsules] = useState([])
  const [selectedType, setSelectedType] = useState("outgoing")
  const [selectedCapsule, setSelectedCapsule] = useState(null)

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const capsuleData = await capsuleService.getCapsules()
        setCapsules(capsuleData)
      } catch (error) {
        setError("Failed to get capsules")
      }
    }
    fetchCapsules()
  }, [])

  const updateSelectedCapsule = (capsule) => {
    setSelectedCapsule(capsule)
  }

  const handleTypeChange = (e) => setSelectedType(e.target.value)

  // TODO: pass props  4.function attached to Create button
  // TODO: updateSelectedCapsuleFunction
  // TODO: replace capsule.recipient (currently id only) with recipient's username (in map)
  // TODO: function for "Create" button that creates a new capsule (routes to capsule form component)

  //   console.log("Props.currentUser:", props.currentUser

  const capsulesOutgoingFiltered = capsules.filter(
    (capsule) => capsule.sender === props.currentUser._id
  )
  const capsulesIncomingFiltered = capsules.filter(
    (capsule) => capsule.recipient === props.currentUser._id
  )
  const capsulesOutgoing = capsulesOutgoingFiltered.map((capsule) => (
    <a key={capsule._id} onClick={() => updateSelectedCapsule(capsule)}>
      <li>
        <img src="../assets/capsule_icon.jpg" alt="Capsule icon" />
        <div>
          <h3>{capsule.recipient}</h3>
          <p>{capsule.status}</p>
          <p>
            {capsule.items.length} Item{capsule.items.length > 1 ? "s" : ""}
          </p>
        </div>
      </li>
    </a>
  ))

  const capsulesIncoming = capsulesIncomingFiltered.map((capsule) => (
    <a key={capsule._id} onClick={() => props.updateSelectedCapsule(capsule)}>
      <li>
        <img src="../assets/capsule_icon.jpg" alt="Capsule icon" />
        <div>
          <h3>{capsule.recipient}</h3>
          <p>{capsule.status}</p>
          <p>
            {capsule.items.length} Item{capsule.items.length > 1 ? "s" : ""}
          </p>
        </div>
      </li>
    </a>
  ))

  const currentList =
    selectedType === "outgoing" ? capsulesOutgoing : capsulesIncoming

  return (
    <div>
      <h1>My Capsules</h1>
      <button>Create</button>

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
