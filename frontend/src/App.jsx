import {BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import LandingPage from "./pages/LandingPage"
import './styles/App.css'
import ProductPage from "./pages/ProductPage"
import Layout from "./components/Layout"
import CheckoutPage from "./pages/CheckoutPage"
import PrivateRoute from "./components/PrivateRoute"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import OrderHistoryPage from './pages/OrderHistoryPage'

function App() {
  const { showLogin, setShowLogin, showSignup, setShowSignup } = useContext(AuthContext);

  return (
    <>
    <Router>
      <Routes>
      
        <Route path="/" element={<Layout><LandingPage /></Layout>} />
        <Route path="/category/:categoryName" element={<Layout><ProductPage/></Layout>} />

        <Route path="/checkout" element={
          <PrivateRoute>
            <Layout><CheckoutPage/></Layout>
          </PrivateRoute>
        } />

        <Route path="/orders" element={
          <PrivateRoute>
            <Layout><OrderHistoryPage/></Layout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
     {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
     {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
     </>
  )
}

export default App
