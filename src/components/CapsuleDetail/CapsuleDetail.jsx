import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import capsuleService from "../../services/capsuleService"
import ItemList from "../ItemList/ItemList"

const CapsuleDetail = ({
  selectedCapsule,
  setSelectedCapsule,
  updateSelectedCapsule,
  setCapsules,
  currentUser,
}) => {
  const { capsuleId } = useParams()
  const navigate = useNavigate()

  const lockCapsule = async () => {
    try {
      const updatedCapsule = await capsuleService.updateCapsule(
        selectedCapsule._id,
        { status: "sealed", sealDate: new Date().toISOString() }
      )
      console.log("Capsule locked successfully:", updatedCapsule)

      setSelectedCapsule(updatedCapsule)
      setCapsules((prevCapsules) =>
        prevCapsules.map((capsule) =>
          capsule._id === updatedCapsule._id ? updatedCapsule : capsule
        )
      )
    } catch (error) {
      console.error("Error locking capsule:", error)
    }
  }

  const shouldShowItems = () => {
    const isSender = selectedCapsule.sender === currentUser.id
    const isRecipient = selectedCapsule.recipient === currentUser.id
    const isReleaseDateReached =
      new Date() >= new Date(selectedCapsule.releaseDate)
    if (isReleaseDateReached) {
      return true
    }
    if (isSender && isRecipient) {
      return false
    }
    if (isRecipient) {
      return false
    }
    return true
  }

  const autoReleaseIfNeeded = async () => {
    const isReleaseDateReached =
      new Date() >= new Date(selectedCapsule.releaseDate)

    if (selectedCapsule.status !== "released" && isReleaseDateReached) {
      try {
        const updatedCapsule = await capsuleService.updateCapsule(
          selectedCapsule._id,
          { status: "released" }
        )
        console.log("Capsule auto-released:", updatedCapsule)
        setSelectedCapsule(updatedCapsule)
        setCapsules((prevCapsules) =>
          prevCapsules.map((capsule) =>
            capsule._id === updatedCapsule._id ? updatedCapsule : capsule
          )
        )
      } catch (error) {
        console.error("Error auto-releasing capsule:", error)
      }
    }
  }

  useEffect(() => {
    const fetchCapsule = async () => {
      if (!selectedCapsule || selectedCapsule._id !== capsuleId) {
        try {
          console.log("Fetching capsule with ID:", capsuleId)
          const capsule = await capsuleService.getCapsuleById(capsuleId)
          setSelectedCapsule(capsule)
        } catch (error) {
          console.error("Error fetching capsule:", error)
          navigate("/capsules-list")
        }
      }
    }

    fetchCapsule()
    autoReleaseIfNeeded()
  }, [capsuleId, selectedCapsule, setSelectedCapsule, navigate])

  if (!selectedCapsule) {
    return <h1>Loading Capsule Details...</h1>
  }

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
      console.log("Navigating to:", `/capsules-list/${currentUser.id}`)
      navigate(`/capsules-list/${currentUser.id}`)
    } catch (error) {
      console.error("Error deleting capsule:", error)
    }
  }

  const handleEditCapsule = () => {
    updateSelectedCapsule(selectedCapsule)
    navigate(`/capsule-form/edit/${selectedCapsule._id}`)
  }

  return (
    <div>
      <button onClick={() => navigate(`/capsules-list/${currentUser.id}`)}>
        Return to Capsules
      </button>
      <h1>Capsule Details</h1>
      <img src="../assets/capsule_icon.jpg" alt="Capsule Icon" />

      <h3>
        {selectedCapsule.recipient === selectedCapsule.sender
          ? "To My Future Self"
          : `To ${selectedCapsule.recipient?.username || "Unknown Sender"}`}
      </h3>
      <h3>
        {selectedCapsule.recipient === selectedCapsule.sender
          ? "From Me"
          : `From ${selectedCapsule.sender?.username || "Unknown Recipient"}`}
      </h3>
      <div>
        {shouldShowItems() ? (
          <ItemList capsuleId={selectedCapsule._id} />
        ) : (
          <p>
            Items are hidden until the capsule is unlocked on its release date.
          </p>
        )}
      </div>
      <h3>Release Date: {selectedCapsule.releaseDate}</h3>
      {selectedCapsule.sealDate ? (
        <h3>Lock Date: {selectedCapsule.sealDate}</h3>
      ) : (
        <div>
          <button onClick={lockCapsule}>Lock Capsule</button>
        </div>
      )}
      <button onClick={handleEditCapsule}>Edit Capsule Details</button>
      <button onClick={() => handleDeleteCapsule(selectedCapsule._id)}>
        Delete Capsule
      </button>
    </div>
  )
}

export default CapsuleDetail
