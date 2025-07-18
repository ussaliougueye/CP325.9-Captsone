import LoginPage from "./Components/loginpage";
import Navbar from "./Components/navbar";
import Chatperent from "./Components/chatperent";
import Footer from "./Components/footer";
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<><Chatperent /> <Navbar /></>} />
        
      </Routes>


    </>
  );
}

export default App;