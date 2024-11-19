import { useState } from "react"
import capsuleService from "../../services/capsuleService"

const CapsuleForm = ({
  currentUser,
  capsules,
  setCapsules,
  selectedCapsule,
  setSelectedCapsule,
  updateSelectedCapsule,
  capsuleFormOpen,
  setCapsuleFormOpen,
  handleCapsuleFormView
}) => {
  const initialState = {
    sender: currentUser._id,
    recipient: currentUser._id || "",
    sealDate: "",
    releaseDate: "",
    status: "",
    items: []
  }

  const [formData, setFormData] = useState(
    selectedCapsule ? selectedCapsule : initialState
  )

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.value]: evt.target.value })
  }

  const handleAddCapsule = async (formData) => {
    try {
      const newCapsule = await capsuleService.createCapsule(formData)

      if (newCapsule.error) {
        throw new Error(newCapsule.error)
      }

      setCapsules([newCapsule, ...capsules])
      setCapsuleFormOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateCapsule = async (id, formData) => {
    try {
      console.log("Updating capsule with id:", id)
      console.log("Form data:", formData)

      const updatedCapsule = await capsuleService.updateCapsule(id, formData)

      if (updatedCapsule.error) {
        throw new Error(updatedCapsule.error)
      }

      console.log("Updated capsule:", updatedCapsule)

      setCapsules((prevCapsules) =>
        prevCapsules.map((capsule) =>
          capsule._id === id ? updatedCapsule : capsule
        )
      )

      setSelectedCapsule(null)
      setCapsuleFormOpen(false)
      console.log("Capsule updated successfully!")
    } catch (error) {
      console.error("Failed to update capsule:", error)
    }
  }

  const handleSubmitForm = (evt) => {
    evt.preventDefault()
    if (!formData.releaseDate) {
      alert(
        "Please select a release date for your capsule. Don't worry, you can change it later!"
      )
    } else {
      if (selectedCapsule) {
        handleUpdateCapsule(formData._id, formData)
      } else {
        handleAddCapsule(formData)
      }
      setFormData(initialState)
    }
  }

  return (
    <>
      <h1>
        {selectedCapsule ? "Edit Existing Capsule" : "Create a New Capsule"}
      </h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="sender">Sender</label>
        <input id="sender" name="sender" value={formData.sender} readOnly />

        <label htmlFor="recipient">Recipient</label>
        <input
          id="recipient"
          name="recipient"
          value={formData.recipient}
          onChange={handleChange}
        />

        <label htmlFor="sealDate">Seal Date *Optional*</label>
        <input
          id="sealDate"
          name="sealDate"
          type="date"
          value={formData.sealDate}
          onChange={handleChange}
        />

        <label htmlFor="releaseDate">Release Date</label>
        <input
          id="releaseDate"
          name="releaseDate"
          type="date"
          value={formData.releaseDate}
          onChange={handleChange}
        />

        <label htmlFor="items">Items In Capsule</label>
        <input
          id="items"
          name="items"
          value={formData.items ? formData.items.join(",") : ""}
          onChange={(evt) =>
            setFormData({ ...formData, items: evt.target.value.split(",") })
          }
        />

        <button type="submit">
          {selectedCapsule ? "Save Changes" : "Save New Capsule"}
        </button>
      </form>
    </>
  )
}

export default CapsuleForm
