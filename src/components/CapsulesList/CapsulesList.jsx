const CapsulesList = (props) => {
  const [selectedType, setSelectedType] = useState("outgoing")
  //TODO: pass props 1.updateSelected 2.capsulesList 3.currentUser 4.function attached to Create button
  const capsulesOutgoing = props.capsulesList.filter(
    (capsule) => capsule.sender === currentUser
  ) //TODO: define currentUser
  const capsulesIncoming = props.capsulesList.filter(
    (capsule) => capsule.recipient === currentUser
  )

  const capsulesOutgoingList = capsulesOutgoing.map((capsule) => (
    <a key={capsule._id} onClick={() => props.updateSelected(capsule)}>
      //TODO: updateSelectedFunction
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

  const capsulesIncomingList = capsulesIncoming.map((capsule) => (
    <a key={capsule._id} onClick={() => props.updateSelected(capsule)}>
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
    selectedType === "outgoing" ? capsulesOutgoingList : capsulesIncomingList

  const handleTypeChange = (e) => setSelectedType(e.target.value)

  return (
    <div>
      <h1>My Capsules</h1>
      <button>Create</button> //TODO: function for "Create" button that creates
      a new capsule (routes to capsule form component)
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
      {!props.currentList.length ? (
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
