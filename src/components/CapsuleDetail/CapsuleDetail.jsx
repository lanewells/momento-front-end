import { useState } from "react"
import capsuleService from "../../services/capsuleService"
import ItemList from "../ItemList/ItemList"

const CapsuleDetail = ({
  selectedCapsule,
  setSelectedCapsule,
  updateSelectedCapsule,
  setCapsules,
  setCapsuleFormOpen,
  handleCapsuleFormView,
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
        <ItemList capsuleId={selectedCapsule._id} />
      </div>
      <h3>Release Date: {selectedCapsule.releaseDate}</h3>
      {selectedCapsule.sealDate ? (
        <h3>Lock Date: {selectedCapsule.sealDate}</h3>
      ) : (
        <div>
          <button>Lock Capsule</button>
        </div>
      )}
      <button
        onClick={() => {
          updateSelectedCapsule(selectedCapsule)
          setTimeout(() => handleCapsuleFormView(selectedCapsule), 0)
        }}
      >
        Edit Capsule Details
      </button>

      <button onClick={() => handleDeleteCapsule(selectedCapsule._id)}>
        Delete Capsule
      </button>
    </div>
  )
}

export default CapsuleDetail
