import { useState, useEffect } from "react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
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

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user || response.data)
        })
        .catch(() => localStorage.removeItem("token"))
    }
  }, [])

  const handleSignup = (userData) => {
    setUser(userData.user || userData)
    localStorage.setItem("token", userData.token)
  }

  const handleSignin = (userData) => {
    setUser(userData.user || userData)
    localStorage.setItem("token", userData.token)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("token")
  }
  const navigate = useNavigate()
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
    if (!capsule) return
    const preparedCapsule = {
      ...capsule,
      sealDate: capsule.sealDate ? capsule.sealDate.split("T")[0] : null,
      releaseDate: capsule.releaseDate
        ? capsule.releaseDate.split("T")[0]
        : null,
    }
    setSelectedCapsule(preparedCapsule)
  }

  const openDetailsPage = (capsule) => {
    if (capsule._id) {
      updateSelectedCapsule(capsule)
      console.log("Selected capsule:", selectedCapsule)
      console.log("capsule:", capsule)
      navigate(`/capsule-detail/${capsule._id}`)
    } else {
      console.log("Error opening details page. No capsule id")
    }
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<MasterPage user={user} handleLogout={handleLogout} />}
        >
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
              <CapsulesList
                currentUser={user}
                capsules={capsules}
                setCapsules={setCapsules}
                setSelectedCapsule={setSelectedCapsule}
                openDetailsPage={openDetailsPage}
              />
            }
          />
          <Route
            path="/capsules-list"
            element={
              <Navigate to={`/capsules-list/${user?.id || "/signin"}`} />
            }
          />
          <Route
            path="/capsule-form/new/:userId"
            element={
              <CapsuleForm
                currentUser={user}
                capsules={capsules}
                setCapsules={setCapsules}
                selectedCapsule={selectedCapsule}
                setSelectedCapsule={setSelectedCapsule}
              />
            }
          />
          <Route
            path="/capsule-form/edit/:capsuleId"
            element={
              <CapsuleForm
                currentUser={user}
                capsules={capsules}
                setCapsules={setCapsules}
                selectedCapsule={selectedCapsule}
                setSelectedCapsule={setSelectedCapsule}
              />
            }
          />
          <Route
            path="/capsule-detail/:capsuleId"
            element={
              <CapsuleDetail
                selectedCapsule={selectedCapsule}
                setSelectedCapsule={setSelectedCapsule}
                updateSelectedCapsule={updateSelectedCapsule}
                setCapsules={setCapsules}
                currentUser={user}
              />
            }
          />

          <Route
            path="/edit-user/:userId"
            element={<EditUser user={user} onUserUpdate={setUser} />}
          />
          <Route
            path="/profile/:userId"
            element={
              user ? (
                <Profile handleLogout={handleLogout} />
              ) : (
                <Navigate to="/signin" />
              )
            }
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
          <Route path="/itemform/:id?" element={<ItemForm />} />
          <Route
            path="/itemlist"
            element={
              user ? <ItemList user={user} /> : <Navigate to="/signin" />
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
