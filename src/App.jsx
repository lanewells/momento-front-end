import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import SignupForm from "./components/SignupForm/SignupForm"
import SigninForm from "./components/SigninForm/SigninForm"
import ItemForm from "./components/ItemForm/ItemForm"
import Dashboard from "./components/Dashboard/Dashboard"
import capsuleService from "./services/capsuleService"
import CapsulesList from "./components/CapsulesList/CapsulesList"
import CapsuleForm from "./components/CapsuleForm/CapsuleForm"
import CapsuleDetail from "./components/CapsuleDetail/CapsuleDetail"
import EditUser from "./components/EditUser/EditUser"
import axios from "axios"
import { Navigate } from "react-router-dom"

const App = () => {
  const [user, setUser] = useState(null)
  const [capsules, setCapsules] = useState([])
  const [selectedCapsule, setSelectedCapsule] = useState(null)
  const [capsuleFormOpen, setCapsuleFormOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          console.log("Profile fetch response:", response.data)
          setUser(response.data.user || response.data)
        })
        .catch(() => localStorage.removeItem("token"))
    }
  }, [])

  const handleSignup = (userData) => {
    console.log("User data after signup:", userData)
    setUser(userData.user || userData)
    localStorage.setItem("token", userData.token)
  }

  const handleSignin = (userData) => {
    console.log("User data after signin:", userData)
    setUser(userData.user || userData)
    localStorage.setItem("token", userData.token)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("token")
  }

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const capsuleData = await capsuleService.getCapsules()
        setCapsules(capsuleData)
      } catch (error) {
        console.error("Failed to get capsules", error)
      }
    }
    fetchCapsules()
  }, [])

  const updateSelectedCapsule = (capsule) => {
    setSelectedCapsule(capsule)
  }

  const handleCapsuleFormView = (capsule) => {
    if (!capsule._id) {
      setSelectedCapsule(null)
    }
    setCapsuleFormOpen(!capsuleFormOpen)
  }

  return (
    <div>
      <Routes>
        <Route path="/itemform" element={<ItemForm />} />
        <Route
          path="/"
          element={
            user ? (
              <Dashboard user={user} handleLogout={handleLogout} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/signup"
          element={<SignupForm onSignup={handleSignup} />}
        />
        <Route
          path="/signin"
          element={<SigninForm onSignin={handleSignin} />}
        />
        <Route
          path="/capsules-list/:userId"
          element={
            capsuleFormOpen ? (
              <CapsuleForm
                currentUser={user}
                capsules={capsules}
                setCapsules={setCapsules}
                selectedCapsule={selectedCapsule}
                setSelectedCapsule={setSelectedCapsule}
                updateSelectedCapsule={updateSelectedCapsule}
                capsuleFormOpen={capsuleFormOpen}
                setCapsuleFormOpen={setCapsuleFormOpen}
                handleCapsuleFormView={handleCapsuleFormView}
              />
            ) : (
              <CapsulesList
                currentUser={user}
                capsules={capsules}
                selectedCapsule={selectedCapsule}
                updateSelectedCapsule={updateSelectedCapsule}
                capsuleFormOpen={capsuleFormOpen}
                setCapsuleFormOpen={setCapsuleFormOpen}
                handleCapsuleFormView={handleCapsuleFormView}
              />
            )
          }
        />
        <Route
          path="/capsule-detail/:capsuleId"
          element={
            <CapsuleDetail
              capsules={capsules}
              selectedCapsule={selectedCapsule}
              setSelectedCapsule={setSelectedCapsule}
              setCapsules={setCapsules}
              setCapsuleFormOpen={setCapsuleFormOpen}
              handleCapsuleFormView={handleCapsuleFormView}
            />
          }
        />
        <Route
          path="/edit-user/:userId"
          element={<EditUser user={user} onUserUpdate={setUser} />}
        />
      </Routes>
    </div>
  )
}

export default App
