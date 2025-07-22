import LoginPage from "./Components/loginpage";
import Navbar from "./Components/navbar";
import Chatperent from "./Components/chatperent";
import Footer from "./Components/footer";
import Feedback from "./Components/feedback";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/chat"
          element={
            <div className="chatperent">
              {" "}
              <Navbar /> <Chatperent /> <Footer />
            </div>
          }
        />
        <Route
          path="/feedback"
          element={
            <>
              <Navbar /> <Feedback /> <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
