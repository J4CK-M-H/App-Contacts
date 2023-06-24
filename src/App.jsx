import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"
import NotFound from "./components/NotFound"
import { AuthProvider } from "./context/AuthProvider"
import { ContactProvider } from "./context/ContactsProvider"
import AddContact from "./pages/AddContact"
import EditContact from "./pages/EditContact"

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ContactProvider>

          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/add" element={<AddContact />} />
              <Route path="home/edit/contacto/:id" element={<EditContact />} />

            </Route>

            <Route path="*" element={<Navigate to={'/home'}/>} />
            {/* <Route path="*" element={<NotFound />} /> */}

            <Route path="/auth" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
          </Routes>

        </ContactProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
