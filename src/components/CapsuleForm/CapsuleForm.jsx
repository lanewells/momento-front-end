import { useState, useEffect } from "react"
import capsuleService from "../../services/capsuleService"

const CapsuleForm = ({
  currentUser,
  capsules,
  setCapsules,
  selectedCapsule,
  setSelectedCapsule,
  setCapsuleFormOpen
}) => {
  const initialState = {
    sender: currentUser.id,
    recipient: "",
    sealDate: "",
    releaseDate: "",
    status: "",
    items: []
  }

  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    if (selectedCapsule) {
      setFormData(selectedCapsule)
    }
  }, [selectedCapsule])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
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

  const handleSubmitForm = async (evt) => {
    evt.preventDefault()

    if (!formData.releaseDate) {
      alert(
        "Please select a release date for your capsule. Don't worry, you can change it later!"
      )
      return
    }

    const formattedData = {
      ...formData,
      sealDate: formData.sealDate
        ? new Date(formData.sealDate).toISOString()
        : null,
      releaseDate: formData.releaseDate
        ? new Date(formData.releaseDate).toISOString()
        : null,
      status: "pending seal"
    }

    try {
      if (selectedCapsule) {
        await handleUpdateCapsule(formattedData._id, formattedData)
      } else {
        await handleAddCapsule(formattedData)
      }
      setFormData(initialState)
    } catch (error) {
      console.error("Error submitting create capsule form:", error)
      alert("Womp, womp. Something went wrong. Please try again!")
    }
  }

  return (
    <>
      <h1>
        {selectedCapsule ? "Edit Existing Capsule" : "Create a New Capsule"}
      </h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="sender">Sender</label>
        <input
          id="sender"
          name="sender"
          value={formData.sender || currentUser.id}
          readOnly
        />

        <label htmlFor="recipient">Recipient</label>
        <input
          id="recipient"
          name="recipient"
          type="text"
          value={formData.recipient || ""}
          onChange={handleChange}
        />

        <label htmlFor="sealDate">Seal Date (Optional)</label>
        <input
          id="sealDate"
          name="sealDate"
          type="date"
          value={formData.sealDate || ""}
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
          value={formData.items ? formData.items.join(",") : []}
          onChange={(evt) =>
            setFormData({ ...formData, items: evt.target.value.split(",") })
          }
        />

        <button type="submit">
          {selectedCapsule ? "Save Changes" : "Create Capsule"}
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedCapsule(null)
            setCapsuleFormOpen(false)
          }}
        >
          Cancel
        </button>
      </form>
    </>
  )
}
export default CapsuleForm
