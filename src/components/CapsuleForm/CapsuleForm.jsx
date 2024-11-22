import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import capsuleService from "../../services/capsuleService"
import axios from "axios"

const CapsuleForm = ({
  currentUser,
  capsules,
  setCapsules,
  selectedCapsule,
  setSelectedCapsule,
}) => {
  const { userId, capsuleId } = useParams()
  const navigate = useNavigate()

  const initialState = {
    sender: userId || currentUser?.id,
    recipient: "",
    sealDate: "",
    releaseDate: "",
    status: "pending seal",
  }

  const [formData, setFormData] = useState(initialState)
  const [usernames, setUsernames] = useState([])

  useEffect(() => {
    const fetchCapsuleIfNeeded = async () => {
      if (
        capsuleId &&
        (!selectedCapsule || selectedCapsule._id !== capsuleId)
      ) {
        try {
          console.log("Fetching capsule with ID:", capsuleId)
          const capsule = await capsuleService.getCapsuleById(capsuleId)
          setSelectedCapsule(capsule)

          setFormData({
            ...capsule,
            recipient: capsule.recipient._id || "",
            sealDate: capsule.sealDate?.split("T")[0] || "",
            releaseDate: capsule.releaseDate?.split("T")[0] || "",
          })
        } catch (error) {
          console.error("Error fetching capsule:", error)
        }
      } else if (selectedCapsule) {
        setFormData({
          ...selectedCapsule,
          recipient: selectedCapsule.recipient._id || "",
          sealDate: selectedCapsule.sealDate?.split("T")[0] || "",
          releaseDate: selectedCapsule.releaseDate?.split("T")[0] || "",
        })
      }
    }

    fetchCapsuleIfNeeded()

    const fetchUsernames = async () => {
      try {
        const token = localStorage.getItem("token")
        console.log("Token:", token)
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/usernames`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setUsernames(response.data)
        console.log("Usernames fetched:", response.data)
      } catch (error) {
        console.error("Error fetching usernames:", error)
      }
    }

    fetchUsernames()
  }, [capsuleId, selectedCapsule, setSelectedCapsule])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleAddCapsule = async (formData) => {
    try {
      console.log("Creating capsule with data:", formData)
      const newCapsule = await capsuleService.createCapsule(formData)
      setCapsules([newCapsule, ...capsules])
      console.log("New capsule created:", newCapsule)
      setFormData(initialState)
      navigate(`/capsules-list/${currentUser.id}`)
    } catch (error) {
      console.error("Error creating capsule:", error)
      alert("Failed to create capsule. Please try again!")
    }
  }

  const handleUpdateCapsule = async (id, formData) => {
    try {
      console.log("Updating capsule with ID:", id)
      const updatedCapsule = await capsuleService.updateCapsule(id, formData)
      setCapsules((prevCapsules) =>
        prevCapsules.map((capsule) =>
          capsule._id === id ? updatedCapsule : capsule
        )
      )
      setSelectedCapsule(updatedCapsule)
      console.log("Capsule updated successfully:", updatedCapsule)
      return updatedCapsule
    } catch (error) {
      console.error("Error updating capsule:", error)
      alert("Failed to update capsule. Please try again!")
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

    if (!formData.recipient) {
      alert("Please select a recipient.")
      return
    }

    try {
      const formattedData = {
        ...formData,
        sealDate: formData.sealDate
          ? new Date(formData.sealDate).toISOString()
          : null,
        releaseDate: formData.releaseDate
          ? new Date(formData.releaseDate).toISOString()
          : null,
      }

      if (capsuleId) {
        await handleUpdateCapsule(capsuleId, formattedData)
      } else {
        await handleAddCapsule(formattedData)
      }
      navigate(`/capsules-list/${currentUser.id}`)
    } catch (error) {
      console.error("Error submitting capsule form:", error)
      if (error.response) {
        console.error("Error response data:", error.response.data)
        alert(`An error occurred: ${error.response.data.error}`)
      } else {
        alert("An error occurred. Please try again.")
      }
    }
  }

  const handleCancel = () => {
    console.log("Canceling form...")
    setSelectedCapsule(null)
    navigate(`/capsules-list/${currentUser.id}`)
  }

  return (
    <>
      <h1>{capsuleId ? "Edit Existing Capsule" : "Create a New Capsule"}</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="sender">Sender</label>
        <input
          id="sender"
          name="sender"
          value={formData.sender || currentUser?.id || ""}
          readOnly
        />

        <label htmlFor="recipient">Recipient</label>
        <select
          id="recipient"
          name="recipient"
          value={formData.recipient || ""}
          onChange={handleChange}
        >
          <option value="">Select a recipient</option>
          {usernames.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>

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
          value={formData.releaseDate || ""}
          onChange={handleChange}
        />

        <button type="submit">
          {capsuleId ? "Save Changes" : "Create Capsule"}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </>
  )
}

export default CapsuleForm
