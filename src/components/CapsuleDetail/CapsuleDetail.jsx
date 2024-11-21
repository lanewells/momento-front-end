import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import capsuleService from "../../services/capsuleService"
import ItemListCapsule from "../ItemList/ItemListCapsule"

const CapsuleDetail = ({
  selectedCapsule,
  setSelectedCapsule,
  updateSelectedCapsule,
  setCapsules
}) => {
  const { capsuleId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!selectedCapsule || selectedCapsule._id !== capsuleId) {
      const fetchCapsule = async () => {
        try {
          console.log("Fetching capsule with ID:", capsuleId)
          const capsule = await capsuleService.getCapsuleById(capsuleId)
          setSelectedCapsule(capsule)
        } catch (error) {
          console.error("Error fetching capsule:", error)
          navigate("/capsules-list")
        }
      }
      fetchCapsule()
    }
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
      <h1>Capsule Details</h1>
      <img src="../assets/capsule_icon.jpg" alt="Capsule Icon" />
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
        <ItemListCapsule capsuleId={selectedCapsule._id} />
      </div>
      <h3>Release Date: {selectedCapsule.releaseDate}</h3>
      {selectedCapsule.sealDate ? (
        <h3>Lock Date: {selectedCapsule.sealDate}</h3>
      ) : (
        <div>
          <button>Lock Capsule</button>
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
