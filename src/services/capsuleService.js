import axios from "axios"
const API_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/capsules`

const getCapsules = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error("Error getting all capsules:", error)
    throw error
  }
}

const getCapsuleById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error getting capsule with id ${id}`, error)
    throw error
  }
}

const createCapsule = async (capsuleData) => {
  try {
    console.log("Sending POST request with data:", capsuleData)
    const response = await axios.post(API_URL, capsuleData)
    return response.data
  } catch (error) {
    console.error("Error creating capsule:", error)
    throw error
  }
}

const updateCapsule = async (id, capsuleData) => {
  try {
    console.log("Sending PUT request with data:", capsuleData)
    console.log("ID:", id)
    const response = await axios.put(`${API_URL}/${id}`, capsuleData)
    return response.data
  } catch (error) {
    console.error("Error updating capsule:", error)
    throw error
  }
}

const deleteCapsule = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
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
  getCapsuleById
}
