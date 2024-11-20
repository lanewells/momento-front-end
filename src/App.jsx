import { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import MasterPage from "./MasterPage/MasterPage"
import SignupForm from "./components/SignupForm/SignupForm"
import SigninForm from "./components/SigninForm/SigninForm"
import ItemForm from "./components/ItemForm/ItemForm"
import ItemList from "./components/ItemList/ItemList"
import Dashboard from "./components/Dashboard/Dashboard"
import capsuleService from "./services/capsuleService"
import CapsulesList from "./components/CapsulesList/CapsulesList"
import CapsuleForm from "./components/CapsuleForm/CapsuleForm"
import CapsuleDetail from "./components/CapsuleDetail/CapsuleDetail"
import EditUser from "./components/EditUser/EditUser"
import Profile from "./components/Profile/Profile"
import NotificationWindow from "./components/NotificationWindow/NotificationWindow"
import axios from "axios"

const App = () => {
  const [user, setUser] = useState(null)
  const [capsules, setCapsules] = useState([])
  const [selectedCapsule, setSelectedCapsule] = useState(null)
  const [capsuleFormOpen, setCapsuleFormOpen] = useState(false)
  const [openDetails, setOpenDetails] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
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
    console.log("Capsule id into form:", capsule._id)
    setCapsuleFormOpen(!capsuleFormOpen)
  }

  const openDetailsPage = (capsule) => {
    if (capsule._id) {
      console.log("Capsule id:", capsule._id)
      console.log("Capsule:", capsule)
      updateSelectedCapsule(capsule)
      setOpenDetails(!openDetails)
    } else {
      console.log("Capsule id:", capsule._id)
      console.log("Capsule:", capsule)
      console.log("Error opening details page. No capsule id")
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<MasterPage />}>
          <Route
            index
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
          <Route path="/itemlist" element={<ItemList />} />
          <Route path="/itemform" element={<ItemForm />} />
          <Route path="/itemform/:id?" element={<ItemForm />} />
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
            path="/capsules-list/:userId"
            element={
              capsuleFormOpen ? (
                <CapsuleForm
                  currentUser={user}
                  capsules={capsules}
                  setCapsules={setCapsules}
                  selectedCapsule={selectedCapsule}
                  setSelectedCapsule={setSelectedCapsule}
                  setCapsuleFormOpen={setCapsuleFormOpen}
                />
              ) : !openDetails ? (
                <CapsulesList
                  currentUser={user}
                  capsules={capsules}
                  openDetailsPage={openDetailsPage}
                  handleCapsuleFormView={handleCapsuleFormView}
                />
              ) : (
                <Navigate to="/capsule-detail/:capsuleId" />
              )
            }
          />
          <Route
            path="/capsule-detail/:capsuleId"
            element={
              capsuleFormOpen ? (
                <CapsuleForm
                  currentUser={user}
                  capsules={capsules}
                  setCapsules={setCapsules}
                  selectedCapsule={selectedCapsule}
                  setSelectedCapsule={setSelectedCapsule}
                  setCapsuleFormOpen={setCapsuleFormOpen}
                />
              ) : (
                <CapsuleDetail
                  selectedCapsule={selectedCapsule}
                  setSelectedCapsule={setSelectedCapsule}
                  setCapsules={setCapsules}
                  setCapsuleFormOpen={setCapsuleFormOpen}
                  handleCapsuleFormView={handleCapsuleFormView}
                />
              )
            }
          />
          <Route
            path="/edit-user/:userId"
            element={<EditUser user={user} onUserUpdate={setUser} />}
          />
          <Route
            path="/profile/:userId"
            element={user ? <Profile /> : <Navigate to="/signin" />}
          />
          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard user={user} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/notifications"
            element={
              user ? (
                <NotificationWindow user={user} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
