import LoginPage from "./Components/loginpage";
import Navbar from "./Components/navbar";
import Chatperent from "./Components/chatperent";
import Footer from "./Components/footer";
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<><Chatperent /> <Navbar /> <Footer /></>} />
        
      </Routes>


    </div>
  );
}

export default App;