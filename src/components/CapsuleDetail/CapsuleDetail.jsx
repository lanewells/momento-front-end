import { useState } from "react"
import capsuleService from "../../services/capsuleService"
import ItemList from "../ItemList/ItemList.jsx"

const CapsuleDetail = ({
  selectedCapsule,
  setSelectedCapsule,
  setCapsules,
  setCapsuleFormOpen,
  handleCapsuleFormView
}) => {
  const handleDeleteCapsule = async (id) => {
    try {
      const deletedCapsule = await capsuleService.deleteCapsule(id)

      if (deletedCapsule.error) {
        throw new Error(deletedCapsule.error)
      }

      setCapsules((prevCapsules) =>
        prevCapsules.filter((capsule) => capsule._id !== id)
      )
      setSelectedCapsule(null)
      setCapsuleFormOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (!selectedCapsule)
    return (
      <div>
        <h1>No details found for this capsule.</h1>
      </div>
    )

  return (
    <div>
      <h1>Capsule Details</h1>
      <img src="../assets/capsule_icon.jpg" />
      <h3>
        {selectedCapsule.recipient === selectedCapsule.sender
          ? "To My Future Self"
          : `To ${selectedCapsule.recipient}`}
      </h3>
      <h3>
        {selectedCapsule.recipient === selectedCapsule.sender
          ? "From Me"
          : `From ${selectedCapsule.sender}`}
      </h3>
      <div>
        <ItemList capsuleId={selectedCapsule.id} />
      </div>
      {selectedCapsule.items.length < 1 ? (
        <button onClick={() => navigate("/item-form")}>
          Create First Item
        </button>
      ) : (
        <button onClick={() => navigate("/item-form")}>Add Another Item</button>
      )}
      <h3>Release date {selectedCapsule.releaseDate}</h3>
      {selectedCapsule.sealDate ? (
        <h3>Seal date {selectedCapsule.sealDate}</h3>
      ) : (
        <button>SEAL CAPSULE</button>
      )}

      <button onClick={() => handleCapsuleFormView(selectedCapsule)}>
        Edit Capsule
      </button>
      <button onClick={() => handleDeleteCapsule(selectedCapsule._id)}>
        Delete Capsule
      </button>
    </div>
  )
}

export default CapsuleDetail
