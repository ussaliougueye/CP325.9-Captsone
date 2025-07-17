import LoginPage from "./Components/loginpage";
import Navbar from "./Components/navbar";
import Chatperent from "./Components/chatperent";
import Footer from "./Components/footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
      
      <Navbar />
      {/* <LoginPage />  */}
      <Chatperent />
      <Footer />
      


    </>
  );
}

export default App;