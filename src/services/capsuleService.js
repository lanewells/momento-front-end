import axios from "axios"

const API_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/capsules`

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return { Authorization: `Bearer ${token}` }
}

const getCapsules = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeaders(),
    })
    return response.data
  } catch (error) {
    console.error("Error getting all capsules:", error)
    throw error
  }
}

const getCapsuleById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    })
    return response.data
  } catch (error) {
    console.error(`Error getting capsule with id ${id}`, error)
    throw error
  }
}

const createCapsule = async (capsuleData) => {
  try {
    const response = await axios.post(API_URL, capsuleData, {
      headers: getAuthHeaders(),
    })
    return response.data
  } catch (error) {
    console.error("Error creating capsule:", error)
    throw error
  }
}

const updateCapsule = async (id, capsuleData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, capsuleData, {
      headers: getAuthHeaders(),
    })
    return response.data
  } catch (error) {
    console.error("Error updating capsule:", error)
    throw error
  }
}

const deleteCapsule = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    })
    return response.data
  } catch (error) {
    console.error(`Error deleting capsule with id ${id}`, error)
    throw error
  }
}

export default {
  createCapsule,
  updateCapsule,
  deleteCapsule,
  getCapsules,
  getCapsuleById,
}
